import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/BackEnd/Services/auth-user.service';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.scss']
})
export class AdminPagesComponent implements OnInit {

  constructor(private auth:AuthUserService,private router:Router,) { }

  ngOnInit(): void {
    if(!this.auth.IsLoggin())
    {
        this.router.navigate(['signInOut'])
    }
  }
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }


}
