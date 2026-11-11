import fs from 'node:fs'
import type { Invoice } from './types.js'
import {nanoid} from 'nanoid'

function generateNewId(size: number = 10) : string{
    return nanoid(size) 
}

export const databasePath : string = "./data/database.json"

export function getBashNotes(): string{
    const data = fs.readFileSync("./data/docs.txt", 'utf-8') 
    return data
}

export function getInvoices(): Invoice[] {
    const data = fs.readFileSync(databasePath, 'utf8')
    return JSON.parse(data)
}

export function deleteInvoiceById(id:String ){
    const data = getInvoices()
    const newFileContent = JSON.stringify(data.filter(invoice => invoice.id !== id), null , 2)
    
    try {
        fs.writeFileSync(databasePath, newFileContent)
    } catch (error) {
        console.log(">> error deleting new invoice: ", error)
        throw new Error(">> error deleting new invoice:");
        
    }
    
    return id 
}

export function addInvoice(newInvoice: Invoice): string {
    const data = fs.readFileSync(databasePath, 'utf-8')
    const parsedData : Invoice[] = JSON.parse(data)
    newInvoice.id = generateNewId()
    parsedData.push(newInvoice)

    try {
        const newFileContent = JSON.stringify(parsedData, null , 2)
        fs.writeFileSync(databasePath, newFileContent)
    } catch (error) {
        console.log(">> error adding invoice: ", error)
    }

    return newInvoice.id
}

//example operation 

// let newExpense = {
//   type: "expense",
//   amount: 349.00,
//   currency: "USD",
//   dateAdded: {
//     Day: 10,
//     Month: 4,
//     Year: 2026
//   },
//   description: "DISTINCTIVE_APOLLO_PROJECT_EXPENSE: Cloud server subscription"
// }


// fetch('http://localhost:3001/expenses/add', { 
//     method: 'POST', 
//     body: JSON.stringify(newExpense)
//         }).then(data => data.json()).then(data=>{
//     console.log(JSON.parse(data.requestBody))
//         })