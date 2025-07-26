# express-video 接口文档

## 接口说明

* 基于 RESTful API 接口规范
* 基于 JWT 身份认证
* 使用 CORS 跨域
* 接口基础请求地址：`http:127.0.0.1:3000/api/v1`
* 使用 JSON 格式进行数据通信





## 用户注册

path：`/user/registers`

method:`post`

是否认证：否

| 字段名   | 字段类型 | 是否必须 |
| -------- | -------- | -------- |
| username | string   | 是       |
| email    | sting    | 是       |
| phone    | string   | 是       |
| password | string   | 是       |



请求示例：

```json
{
    "username":"kaka",
    "email":"kaka@qq.com",
    "phone":"13166667777",
    "password":"123456"
}
```



响应实例：

```json
//success
{
    "username": "kaka",
    "email": "kaka@qq.com",
    "password": "123456",
    "phone": "13166667777",
    "image": null,
    "_id": "6882171c2e44391baabb6ff3",
    "createAt": "2025-07-24T11:21:00.540Z",
    "updateAt": "2025-07-24T11:21:00.540Z",
    "__v": 0
}
```



```json	
//fail
{
    "error": [
        {
            "type": "field",
            "value": "kaka",
            "msg": "用户名已存在",
            "path": "username",
            "location": "body"
        }
    ]
}
```

