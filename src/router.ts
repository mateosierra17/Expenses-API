import type { IncomingMessage, ServerResponse } from "node:http";
import {text} from 'stream/consumers'
import { getInvoices, addInvoice, deleteInvoiceById } from './operations.js'
import type { Invoice } from "./types.js";

export default function router(request: IncomingMessage, response: ServerResponse) {
    const { httpVersion, method, url, headers } = request

    switch (url) {
        case "/expenses":
            if (method == "GET"){
                const myInvoices = getInvoices()
                response.writeHead(200, { "content-type": "application/json" })
                response.end(JSON.stringify({
                    totalInvoices: myInvoices.length,
                    allInvoices: myInvoices
                }))
            }
            break;
        case "/expenses/add": 
            if(method == "POST"){
                text(request).then(body =>{
                    response.writeHead(200, {'content-type': 'application/json'})
                    addInvoice(JSON.parse(body) as Invoice)
                    response.end(JSON.stringify({ requestBody : body}))
                } )
            }else{
                response.writeHead(400, {'content-type': 'application/json'})
                response.end(JSON.stringify(
                    { 
                        error: ">> Bad Request", 
                        message: ">> using wrong method",
                        statusCode: response.statusCode
                    }))
            }
            break;
        case "/expenses/delete":
            if (method == "DELETE") {
                text(request).then(body => {
                    deleteInvoiceById(JSON.parse(body).id)
                    response.writeHead(200, {'content-type': 'application/json'})
                    response.end(JSON.stringify(
                        {
                            message: `succesfully deleted message with id`,
                            statusCode: response.statusCode,
                        }))
                })
            }else{
                response.writeHead(400, {'content-type': 'application/json'})
                response.end(JSON.stringify(
                    { 
                        error: ">> Bad Request", 
                        message: ">> using wrong method",
                        statusCode: response.statusCode
                    }))
            }
            break;
        case "/":
            response.write("this is a vanilla node HTTP server :) \n")
            response.write("use /expenses for json example\n")
            response.write("\n")
            response.end()
            break;
        default:
            response.end(`>> There is no content for this url: ${url}`)
            break;
    }

}