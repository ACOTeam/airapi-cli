import ApiHandler from '../handlers/ApiHandler'
import ModelHandler from '../handlers/ModelHandler'
import ProjectHandler from '../handlers/ProjectHandler'

class handleCenter {
  constructor () {
    let projectNode = new ProjectHandler()
    let apiNode = new ApiHandler()
    let modelNode = new ModelHandler()
    projectNode.nextHandler = apiNode
    apiNode.nextHandler = modelNode
    this.root = projectNode
  }
  begin (ball) {
    this.root.begin(ball)
  }
}

export default handleCenter
