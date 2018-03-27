import BaseHandler from '../basehandler'
import path from 'path'
import fs from 'fs'

class ProjectHandler extends BaseHandler {
  check (ball) {
    return path.basename(ball.filePath) === '.airapi.json'
  }

  handle (ball) {
    ball.data.project = JSON.parse(fs.readFileSync(ball.filePath))
    console.log('bengen project handle')
  }
}

export default ProjectHandler
