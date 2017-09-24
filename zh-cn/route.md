# 路由

#### demo:
```
/**
  @api {post} /users/order
  @apiName PostOrder
  @apiVersion 0.1.0
  @apiGroup Order
  @apiPermission User
  @apiDescription
      create one order
  @apiHeaders
    {
      x-consumer-custom-id : string //user id after auth
      x-consumer-username : string //user name after auth
    }
  @apiBody
    {
        venuesId: string //id of venues
    }
*/
```

##### 1. api  : {#api}
@api {routeMeth}  {path} 
routeMeth :  get  post  put delete

说明： 定义路由的基本信息，包括路由的方法、路由的路径


Example:

```
@api {get} /region/:_regionId/news 
```

##### 2. apiName  : {#apiName}
@apiName {name} 

说明： API的名称

Example:

```
@apiName getNews
```

##### 3. apiVersion  : {#apiVersion}
@apiVersion {version} 

说明：API的版本号


Example:

```
@apiVersion 0.1.0
```

##### 4. apiGroup  : {#apiGroup}
@apiGroup {groupName} 

说明：API的分组，例如用户相关的API可以设置为同一个用户分组


Example:

```
@apiGroup News
```

##### 5. apiPermission  : {#apiPermission}
@apiPermission {permission} 

说明：API的权限定义，可以调用该API的用户列表


Example:

```
@apiPermission public,user
```

##### 6. apiDescription  : {#apiDescription}
@apiDescription {description} 

说明：API的描述


Example:

```
@apiDescription
    获取新闻列表
```

##### 6. apiHeaders  : {#apiHeaders}
@apiHeaders

说明：API的Headers 描述，可以在此处定义支持的header头


Example:

```
@apiHeaders
    {
      x-user-id : string //授权过后的用户id
    }
```

##### 7. apiParams  : {#apiParams}
@apiParams

说明：API的Params 描述，可以在此处定义支持的paramas


Example:

```
@apiParams
    {
      _regionId : string //区域id
    }
```

##### 8. apiQuery  : {#apiQuery}
@apiQuery

说明：API的Query 描述，可以在此处定义支持的querys, 应该将通用的Query写在配置文件中，此处写特有的query


Example:

```js
@apiQuery
    {
        userId: String //用户id
    }
```