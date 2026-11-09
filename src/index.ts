import http from 'node:http'
import fs from 'node:fs'
import {invoices} from './mock-data.js'

const port = 3001

function getBashNotes (){
    const data = fs.readFileSync("./data/docs.txt", 'utf-8') 
    return data
}



const server = http.createServer((request, response)=>{
    
    const { httpVersion, method, url, headers } = request

    switch (url) {
        case "/application-json":
                response.writeHead(200, { "Content-Type": "application-json" });
                response.end(JSON.stringify({ message: "hello :(", status: "error" }));
            break;
        case "/text/html":
                response.writeHead(200, { "Content-Type": "text/html" });
                response.end("<h1>Hello world</h1>")
            break;
        case "/notes":
                const notes = getBashNotes()
                console.log("trying to send", notes)
                response.end(notes)
            break;
        case "/expenses":

            const myInvoices = invoices
            
            response.writeHead(200, {"content-type": "application-json"})
            response.end(JSON.stringify({
                totalInvoices : myInvoices.length,
                allInvoices: myInvoices
            }))

            break;
        case "/":
                response.write("this is a vanilla node HTTP server :) \n")
                response.write("use /application-json for json example\n")
                response.write("use /text/html for html example\n")
                response.write("use /notes for html example\n")
                response.write("\n")
                response.write("Node parameters\n")
                response.write(`${request.headers.host}`)
                response.end()
            break;

        default:
            response.end(`>> There is no content for this url: ${url}`)
            break;
    }


}).listen(port)
