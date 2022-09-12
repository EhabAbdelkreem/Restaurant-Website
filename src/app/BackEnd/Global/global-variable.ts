import { HttpHeaders } from "@angular/common/http";

export class GlobalVariable {

   static headerWithAuth() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': `*/*`,
            "Authorization": `Bearer ${localStorage.getItem("AuthUserToken")}`
        });
    }
    static headerWithAuthNoCT() {
        return new HttpHeaders({
            "Authorization": `Bearer ${localStorage.getItem("AuthUserToken")}`
        });
    }
    static headerWithNoAuth() {
        return new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': `*/*`,
        });
    }
}
