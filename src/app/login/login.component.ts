import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Token } from '../shared/Token.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login !: FormGroup;
  errormessage : string="";
  navigate!:string;
  msgs1!: Message[];
  loding=false;
  constructor(private http : HttpClient,
              private route : Router,
              private token : Token,
              @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    this.login=new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null,Validators.required)
      })
  }
  onLogin(){
   if(!this.login.valid){
      console.log("Invalid input");
     
   }
    this.loding=true;
   this.http.post<any>('http://car-gallery684456.herokuapp.com/auth/login',
   {
     email:this.login.value.email,
     password:this.login.value.password
   }).subscribe(
     resData=>{
      
       this.loding=false;
      const role = resData.data.user.role;
      
      if(role=="pageadmin"||role=="Blogadmin"){
       this.navigate = "Pageadmin"
      }
      else if (role=="carAdmin"||role=="CAR_ADMIN"){
        this.navigate="CarAdmin"
      }
      else if (role=="MANAGER"|| role=="MANAGE"){
        this.navigate = "Pageadmin"
      }
      else{
        this.navigate="not-found"
      }
      localStorage.setItem('token',resData.data.token);
      localStorage.setItem('Islogin','true')
      localStorage.setItem('role', resData.data.user.role)
      localStorage.setItem('iduser', resData.data.user.id)
      this.route.navigate([this.navigate]);
      this.token.IsLogIn.next(true)
      localStorage.setItem('first','true');
      sessionStorage.setItem('first','true')
      this._document.defaultView!.location.reload();
     },
     errorMessage=>{
       this.login.reset();
      this.loding=false;
       this.errormessage=errorMessage.message;
       this.msgs1 = [
        {severity:'error', summary:'error : ', detail:this.errormessage},
       ];
     })
    
  }
  
}
