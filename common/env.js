const devBase = "http://rap2api.taobao.org/app/mock/239513" // mock server
const testBase = "http://rap2api.taobao.org/app/mock/239513"  // test server
const testBaseLocal = "http://192.168.31.5:7073"  // local test server in same wifi
const testBaseSelf = 'http://192.168.31.191:8000' // local test server in pc-of-self
const prodBase = "http://rap2api.taobao.org/app/mock/239513"  // product server

// devBase是开发环境，连的是淘宝的mock服务；testBase是测试环境；prodBase是正式环境
export const baseUrl = process.env.NODE_ENV === 'development' ? devBase : prodBase

// use in mock server since it has a new-style response data
export const isMockServer = true

export const isDev = process.env.NODE_ENV === 'development'
