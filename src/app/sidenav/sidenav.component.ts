import { Component, OnInit } from '@angular/core';
import { JwtParserService } from '../BackEnd/Global/jwt-parser.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private jwtParser:JwtParserService) { }
  Role:boolean;
  ngOnInit(): void {
    this.jwtParser.setToken(localStorage.getItem("AuthUserToken"));
    this.jwtParser.decodeToken();
    let Role  = this.jwtParser.getUserRole();
    if(Role=='Admin'){
        this.Role = true;
    }
    else{this.Role = false}
  }

}
