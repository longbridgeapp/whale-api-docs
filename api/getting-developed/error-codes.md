---
title: 通用错误码
id: error-codes
slug: /error-codes
sidebar_position: 10
---

### 错误码

| HTTP Status | code   | message                | 说明                                     |
| ----------- | ------ | ---------------------- | ---------------------------------------- |
| 403         | 403201 | signature invalid      | 签名无效                                 |
| 403         | 403203 | apikey illegal         | App Key 无效                             |
| 403         | 403305 | ip is not allowed      | IP 地址无权访问                          |
| 401         | 401003 | token expired          | Access Token 已过期                      |
| 401         | 401004 | token invalid          | token 不正确                             |
| 429         | 429002 | api request is limited | 接口访问过于频繁，请稍后再试             |
| 500         | 500000 | internal error         | 服务内部错误，请联系客户经理进行处理     |
