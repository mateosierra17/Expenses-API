import http from 'node:http'
import router from './router.js'
const port = 3001

const server = http.createServer((request, response)=>{

    router(request,response)



}).listen(port)

console.log(">> server operating at port: ", port)
