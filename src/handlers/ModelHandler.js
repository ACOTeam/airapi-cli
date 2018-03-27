import BaseHandler from '../basehandler'
import fs from 'fs'
const Regex = require('regexper.js')

class ModelHandler extends BaseHandler {
  check ({filePath}) {
    this.content = fs.readFileSync(filePath)
    let checkRegex = /@apiModel\s*\S+/ig
    return checkRegex.test(this.content)
  }
  handle ({ data }) {
    let areaRegex = new Regex(/^(\/\*+|#+|"+|%\{|=)[\s\S]*?^\s*(?:\*+\/|#+|"+|%\}|=)/, 'img')
    for (let area of areaRegex.matches(this.content)) {
      let fieldRegex = new Regex('^\\s*(\\S+)\\s*\\:\\s*([a-zA-Z]*)(?:[^\r\n]*?\\,*[^\r\n]*?(\\[)?[^\r\n]*?{?)([^}[\r\n]*)$', 'img')
      let model = {
        name: /@apiModel\s*(\S+)/.exec(area.value)[1],
        fields: []
      }
      for (let match of fieldRegex.matches(area.value)) {
        model.fields.push({
          name: match.groups[1],
          type: match.groups[3] === '[' ? 'Array' : match.groups[2],
          detail: match.groups[4]
        })
      }

      data.models.push(model)
    }
  }
}

export default ModelHandler
