import { IProduct } from "./iproduct";

export interface ICategory {
    id?:number,
    //[Required]
    name?:string,
    imagePath?:string,
    description?:string,

    Products?:Array<IProduct|null>
}
