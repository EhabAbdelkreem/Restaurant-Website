export class PurchasesDetailsModel {
    constructor(
    public item_id?:number,
    public item_name?:string,
    //[Range(minimum: 0, maximum: int.MaxValue)]
    public quantity?:number,
    //[Range(minimum: 0, maximum: int.MaxValue)]
    public price?:number
    ){}
}
