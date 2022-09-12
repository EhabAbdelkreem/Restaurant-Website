import { ExpensesDetailsModel } from "./expenses-details-model";

export interface ExpensesModel {
    bill_id?:number,
    bill_date?:Date,
    type?:string,
    expensesDetailsModels?:ExpensesDetailsModel[];
}
