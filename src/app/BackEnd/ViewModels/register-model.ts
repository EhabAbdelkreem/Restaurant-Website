export interface RegisterModel {
    //    public string name { get; set; }
    name?: string,
//[Required(ErrorMessage = "User Name is required")]
    
    //public string username { get; set; }
    username?:string,
//[Required(ErrorMessage = "Phone is required")]
//[RegularExpression(@"(010|011|015|012)[0-9]{8}")]
  
    //public string phone { get; set; }
    phone?:string
//[Required(ErrorMessage = "Password is required")]
//[RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")]
  
    //public string password { get; set; }
    password?:string
}
