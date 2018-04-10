/**
  @api {get} /account/users
  @apiName GetUserList
  @apiVersion 0.1.0
  @apiGroup Acount
  @apiPermission public
  @apiDescription
      获取用户列表

  @apiSuccessExample
    {
      "status": "OK",
      "code": 200,
      "data": [
          {
              "id": 1,
              "name": "test1",
              "logo": "http://image.airapi.com/s.jpg"
          }
      ]
    }

  @apiParamExample
    {
      "name":"test",
    }

*/
global.router.get('/account/users',
  require('/routes/account/get')
)

/**
  @api {get} /account/users
  @apiName GetUserList
  @apiVersion 0.2.0
  @apiGroup Acount
  @apiPermission public
  @apiDescription
      获取用户列表
*/
global.router.get('/account/users',
require('/routes/account/get')
)

/**
  @api {get} /account/user/:_id
  @apiName GetUser
  @apiVersion 0.1.0
  @apiGroup Acount
  @apiPermission public
  @apiDescription
      获取用户详情
  @apiParams
    {
      _id : string  // 用户id
    }
*/
global.router.get('/account/user/:_id',
  require('/routes/account/get')
)

/**
  @api {get} /region/:_regionId/news
  @apiName GetNews
  @apiVersion 0.1.0
  @apiGroup News
  @apiPermission public
  @apiDescription
      获取新闻列表
  @apiHeaders
    {
      x-user-id : string //授权过后的用户id
    }
  @apiParams
    {
      _regionId : string //区域id
    }
  @apiQuery
    {
      limit? : number, //限制条数
      skip? : number,  //跳过条数
      sort? : string   //排序字段
    }
*/
global.router.get('/region/:_regionId/news',
  require('/routes/news/get')
)
