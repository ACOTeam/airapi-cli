class BaseHandler {
  constructor () {
    this.nextHandler = ''
  }

  begin (ball) {
    if (this.check(ball)) {
      this.handle(ball)
    } else {
      if (this.nextHandler) {
        this.nextHandler.begin(ball)
      }
    }
  }

  check (ball) {
    throw new Error('This method must be overwritten!')
  }

  handle (ball) {
    throw new Error('This method must be overwritten!')
  }
}

export default BaseHandler
