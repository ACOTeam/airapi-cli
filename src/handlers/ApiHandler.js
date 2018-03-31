import BaseHandler from '../basehandler'
import fs from 'fs'
import _ from 'lodash'
const Regex = require('regexper.js')

class ApiHandler extends BaseHandler {
  check ({ filePath }) {
    this.content = fs.readFileSync(filePath)
    let checkRegex = /@api\s*\{[^}]+\}\s*\S+/ig
    return checkRegex.test(this.content)
  }

  handle ({ data }) {
    let areaRegex = new Regex(/^(\/\*+|#+|"+|%\{|=)(?:(?!\1)[\s\S])+?(?:\*\/+|#+|"+|%\}|=)/, 'img')
    let apiList = []
    for (let area of areaRegex.matches(this.content)) {
      if (!/@apiName\s*(\S+)/.exec(area.value)) {
        continue
      }
      let api = {
        name: /@apiName\s*(\S+)/.exec(area.value) ? /@apiName\s*(\S+)/.exec(area.value)[1] : '',
        method: /@api\s*\{\s*([^}]+)\s*\}\s*([\S]+)/.exec(area.value) ? /@api\s*\{\s*([^}]+)\s*\}\s*([\S]+)/.exec(area.value)[1] : '',
        url: /@api\s*\{\s*([^}]+)\s*\}\s*([\S]+)/.exec(area.value) ? /@api\s*\{\s*([^}]+)\s*\}\s*([\S]+)/.exec(area.value)[2] : '',
        version: /@apiVersion\s*(\S+)/.exec(area.value) ? /@apiVersion\s*(\S+)/.exec(area.value)[1] : '',
        permission: [
          /@apiPermission\s*(\S+)/.exec(area.value) ? /@apiPermission\s*(\S+)/.exec(area.value)[1] : ''
        ],
        description: /@apiDescription\s*([^@*/#"%={]+)/.exec(area.value) ? /@apiDescription\s*([^@*/#"%={]+)/.exec(area.value)[1] : '',
        group: /@apiGroup[^@]+?([^@*/#"%=]+)/.exec(area.value) ? /@apiGroup[^@]+?([^@*/#"%=]+)/.exec(area.value)[1].trim() : '',
        headers: [],
        params: [],
        query: [],
        body: []
      }

      // header handler
      let headerArea = /@apiHeaders[^@]+([^@*/#"%=]+)/.exec(area.value)
      let fieldRegex = new Regex('^\\s*([^\\s?]+\\s*)(\\??)\\s*\\:\\s*([a-zA-Z]*)(?:\\s*\\,*\\s*{?)([^\r\n]*)$', 'img')
      for (let match of fieldRegex.matches(headerArea)) {
        api.headers.push({
          name: match.groups[1],
          required: match.groups[2] ? 'false' : 'true',
          type: match.groups[3],
          detail: match.groups[4]
        })
      }

      // params handler
      let paramsArea = /@apiParams[^@]+([^@*/#"%=]+)/.exec(area.value)
      for (let match of fieldRegex.matches(paramsArea)) {
        api.params.push({
          name: match.groups[1],
          required: match.groups[2] ? 'false' : 'true',
          type: match.groups[3],
          detail: match.groups[4]
        })
      }

      // query handler
      let queryArea = /@apiQuery[^@]+([^@*/#"%=]+)/.exec(area.value)
      for (let match of fieldRegex.matches(queryArea)) {
        api.query.push({
          name: match.groups[1],
          required: match.groups[2] ? 'false' : 'true',
          type: match.groups[3],
          detail: match.groups[4]
        })
      }

      // body handler
      let bodyArea = /@apiBody[^@]+([^@*/#"%=]+)/.exec(area.value)
      for (let match of fieldRegex.matches(bodyArea)) {
        api.body.push({
          name: match.groups[1],
          required: match.groups[2] ? 'false' : 'true',
          type: match.groups[3],
          detail: match.groups[4]
        })
      }

      apiList.push(api)
    }

    let groupedApis = _.groupBy(apiList, 'group')
    for (let api in groupedApis) {
      let nameApis = _.groupBy(groupedApis[api], 'name')
      let apiList = []
      for (let nameApi in nameApis) {
        let versoinsApis = _.groupBy(nameApis[nameApi], 'version')
        let versionList = []
        for (let versionApi in versoinsApis) {
          versionList.push(versoinsApis[versionApi][0])
        }
        apiList.push({
          name: nameApi,
          versionApis: versionList
        })
      }
      // groupedApis[api]
      data.apis.push({
        related: api,
        apiList
      })
    }
  }
}

export default ApiHandler
