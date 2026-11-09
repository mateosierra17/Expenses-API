import type { Invoice } from './types.ts';

export const invoices: Invoice[] = [
    {
        type: 'expense',
        amount: 120.5,
        currency: 'USD',
        dateAdded: { Day: 3, Month: 1, Year: 2026 },
        description: 'Office supplies'
    },
    {
        type: 'cash flow',
        amount: 5000,
        currency: 'USD',
        dateAdded: { Day: 5, Month: 1, Year: 2026 },
        description: 'Client payment: Website redesign'
    },
    {
        type: 'expense',
        amount: 89.99,
        currency: 'USD',
        dateAdded: { Day: 12, Month: 2, Year: 2026 },
        description: 'Software subscription'
    },
    {
        type: 'expense',
        amount: 450,
        currency: 'USD',
        dateAdded: { Day: 20, Month: 2, Year: 2026 },
        description: 'Team lunch'
    },
    {
        type: 'cash flow',
        amount: 2300.75,
        currency: 'USD',
        dateAdded: { Day: 1, Month: 3, Year: 2026 },
        description: 'Consulting fee'
    },
    {
        type: 'expense',
        amount: 1200,
        currency: 'USD',
        dateAdded: { Day: 15, Month: 3, Year: 2026 },
        description: 'Monthly office rent'
    }
];