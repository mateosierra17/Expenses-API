export type Invoice = {
    type : 'expense' | 'cash flow'
    amount: Number
    currency: 'USD'
    dateAdded: {
        Day: Number
        Month: Number
        Year: Number
    }
    description: String
}