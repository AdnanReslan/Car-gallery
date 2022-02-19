
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Token } from './shared/Token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  islogin!:boolean;
  constructor(private token : Token,private route : Router,private primengConfig: PrimeNGConfig){
    
  }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
   onload = () => {
    if (localStorage.getItem('Islogin')=="true") 
    {
      this.token.IsLogIn.next(true);
    }

    if(localStorage.getItem('token') && localStorage.getItem('first')){
      this.token.IsLogIn.next(true);
      this.route.navigate(['Pageadmin']);
      localStorage.removeItem('first')
    }
  }
  if(localStorage.getItem('token') && !sessionStorage.getItem('first') ){
    if(localStorage.getItem('role')=="carAdmin" || localStorage.getItem('role')=="CAR_ADMIN" ){
      this.route.navigate(['CarAdmin']);
      sessionStorage.setItem('first','true')
    }
    else{
      this.route.navigate(['Pageadmin']);
      sessionStorage.setItem('first','true')
    }
  }
    this.token.IsLogIn.subscribe(
     res=>{
       this.islogin=res;
     }
    )
  }
}
