import { IOrderDetails } from "./iorder-details";
import { OrderStatus } from "./order-status.enum";
import { OrderType } from "./order-type.enum";

export interface IOrderModel {
    //public int order_id { get; set; }
    order_id?: number,
    //[Required]
    //public DateTime order_date { get; set; } // order default date from system
    order_date?: Date,
    // [Required]
    // [Range(minimum:0,maximum:int.MaxValue)]
    // public int? totalPrice { get; set; }
    totalPrice?: number
    // [MinLength(20)]
    // public string notes { get; set; }
    notes?: string,
    // [Required]
    // public string orderType { get; set; } //(delivery / in restaurant)
    orderType?: OrderType,
    //[Required]
    //public string orderStatus { get; set; } //(Ok|cancel|wait)
    orderStatus?: OrderStatus,
    // [Required]
    // public string nameClient { get; set; }
    nameClient?: string
    //[RegularExpression(@"(010|011|015|012)[0-9]{8}")]
    //public string phoneClient { get; set; }
    phoneClient?: string,
    // [Required]
    // [StringLength(50)]
    //public string AddressClient { get; set; }
    addressClient?: string,
    // public string username { get; set; }
    username?: string,
    //public List<OrderDetailsModel> orderDetailsModels { get; set; } = new List<OrderDetailsModel>();
    orderDetailsModels?:IOrderDetails[]

}
