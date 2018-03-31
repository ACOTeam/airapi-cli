import path from 'path'
import jsonfile from 'jsonfile'
import logAdepter from './runtime/log'
import fs from 'fs'
import HandleCenter from './runtime/HandleCenter'
import glob from 'glob'
import walker from 'easy-file-walker'
const logger = logAdepter.get('app')

function fsExistsSync (path) {
  try {
    fs.accessSync(path, fs.F_OK)
  } catch (e) {
    return false
  }
  return true
}

function parseArgs (options) {
  let result = {
    sourceDirPath: [],
    targePath: path.join(process.cwd(), 'airapi'),
    configPath: path.join(process.cwd(), '.airapi.json')
  }
  let args = options.parent.rawArgs
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-i' && i + 1 < args.length) {
      result.sourceDirPath.push(path.join(process.cwd(), args[i + 1]))
    }
    if (args[i] === '-o' && i + 1 < args.length) {
      result.targePath = path.join(process.cwd(), args[i + 1])
    }
  }
  return result
}

module.exports = {
  init: async () => {
    let airapiPath = __dirname
    let executePath = process.cwd()

    let templateConfig = jsonfile.readFileSync(path.join(airapiPath, '../templates/.airapi.template.json'))
    jsonfile.writeFileSync(
      path.join(executePath, '.airapi.json'), templateConfig, {
        spaces: 4
      }
    )

    logger.info(`Successfully created .airapi.json file in ${executePath}`)
  },
  build: async (options) => {
    try {
      let handlePaths = parseArgs(options)
      if (!fs.existsSync(handlePaths.configPath)) {
        throw new Error(`${handlePaths.configPath} not exist , please run 'airapi-cli init'`)
      }
      let ball = {
        filePath: handlePaths.configPath,
        data: {
          apis: [],
          models: []
        }
      }
      let handler = new HandleCenter()
      ball.filePath = handlePaths.configPath
    // project handle
      handler.begin(ball)
    // api & model handle
      for (let dir of handlePaths.sourceDirPath) {
        let files = []
        if (fs.lstatSync(dir).isDirectory()) {
          let tmp = glob.sync('**/*.*', {
            root: '',
            cwd: dir
          })
          for (let file of tmp) {
            files.push(path.join(dir, file))
          }
        } else {
          files.push(dir)
        }
        console.log(files)

        for (let file of files) {
          ball.filePath = file
          handler.begin(ball)
        }
      }
      let airapiwebPath = path.join(__dirname, '../node_modules/airapi-web/dist')
      if (!fsExistsSync(airapiwebPath)) {
        airapiwebPath = path.join(__dirname, '../../airapi-web/dist')
      }

      if (!fsExistsSync(handlePaths.targePath)) {
        fs.mkdirSync(handlePaths.targePath)
      }

      let files = await walker.walk(airapiwebPath)

      for (let file of files) {
        let fromPath = path.join(airapiwebPath, file)
        let toPath = path.join(handlePaths.targePath, file)
        console.log('from ' + fromPath)
        console.log('to ' + toPath)
        if (fs.lstatSync(fromPath).isDirectory()) {
          if (!fsExistsSync(toPath)) {
            fs.mkdirSync(toPath)
          }
        } else {
          let temp = fs.readFileSync(fromPath)
          fs.writeFileSync(toPath, temp, 'utf8')
        }
      }

      fs.writeFileSync(path.join(handlePaths.targePath, 'middle.js'),
      'var data =' + JSON.stringify(ball.data, null, 5),
      'utf8')

      console.log(handlePaths.targePath)
    } catch (err) {
      logger.error(err)
    }
  }
}
