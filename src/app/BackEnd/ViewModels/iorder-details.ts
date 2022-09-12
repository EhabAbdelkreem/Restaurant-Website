export class IOrderDetails {
    constructor(
        public  product_id?: number,
        public  product_name?: string,
        public  quantityMeal?: number,
        public  priceMeal?: number,
        public  description?: string
    ){}
}