import { PurchasesDetailsModel } from "./purchases-details-model";

export interface PurchasesModel {
    bill_id?:number
    //[Required]
    bill_date?:Date
    //[Required]
    totalPrice?:number
    //[StringLength(100)]
    vendorName?:string
    type:string
    purchasesSalesDetailsModels?:PurchasesDetailsModel[]
}
