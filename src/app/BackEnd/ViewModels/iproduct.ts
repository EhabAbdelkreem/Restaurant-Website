export interface IProduct {
    
    product_id?:number
    //[Required]
    product_name?:string
    //[Range(minimum: 0, maximum: int.MaxValue)]
    product_price?:number
    //[StringLength(50)]
    product_description?:string,
    product_imagePathSrc?:File,
    product_imagePath?:string,

    cat_id?:number,
    cat_name?:string
}
