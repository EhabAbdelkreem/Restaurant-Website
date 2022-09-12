export class Items {
    constructor(
        public id?:number,
        public name?:string,
        // [Required]
        public priceKilo?:number,
       // [Range(minimum: 1, maximum: int.MaxValue)]
        //[Required]
        public expectedQuantityInDay?:number,
        //[StringLength(150), MaxLength(150)]
        public  description?:string,
        public totalQuantity?:number,
    ){}
}
