export interface DeptCalculation {
    cost: number;
    months: number;
    items: { 
        amount: number;
        capital: number;
        dept: number;
        interest: number
    }[]
}