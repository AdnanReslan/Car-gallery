import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Token } from '../shared/Token.service';
import { DOCUMENT } from '@angular/common';
import { MessageService, PrimeNGConfig } from 'primeng/api';
interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {
  resetPasword !: FormGroup;
  displayPosition!: boolean;
  position!: string;
  isManage!:boolean;
  displayPositionc!: boolean;
  positionc!: string;
  creatAdmin!: FormGroup;
  type!: City[];
  constructor(private http : HttpClient,
              private token : Token,
              @Inject(DOCUMENT) private _document: Document,
              private messageService: MessageService, 
              private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.creatAdmin=new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null,Validators.required),
      'userName':new FormControl(null,Validators.required),
      'role':new FormControl(null,Validators.required),
      })

      this.resetPasword=new FormGroup({
        'password':new FormControl(null,Validators.required)
        })
      if(this.token.getRole()=="Manager"){
        this.isManage=true;
      }
      else{
        this.isManage=false;
      }
      this.type = [
        {name: 'CAR_ADMIN', code: 'CA'},
        {name: 'Blogadmin', code: 'BA'}
        
    ];
  }
 
  

  showPositionDialog(position: string) {
      this.position = position;
      this.displayPosition = true;
  }

  showPositionDialogcreatadmin(position: string) {
    this.positionc = position;
    this.displayPositionc = true;
}

  onResetPassword(){
    this.http.post<any>('http://car-gallery684456.herokuapp.com/auth/reset-password',{
      password:this.resetPasword.value.password,
      token:this.token.get_token()
    }).subscribe(
      resData=>{
        
        this.resetPasword.reset();
        this.displayPosition=false;
        this.showSuccessReset()
      },erorr=>{
        this.showErrorReset()
      }
    )
  }

  onCreatAdmin(){
    const httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        Authorization: 'Bearer '+this.token.get_token()!.toString()
      })
    };
    
    this.http.post('http://car-gallery684456.herokuapp.com/admin', {
      user_name:this.creatAdmin.value.userName,
      email:this.creatAdmin.value.email,
      password:this.creatAdmin.value.password,
      role:this.creatAdmin.value.role.name
    } ,httpOptions).subscribe(res=>{
     this.creatAdmin.reset();
      this.displayPositionc=false
      this.showSuccessCreatAdmin()
    },erorr=>{
      this.showErrorCreatAdmin()
    })
  }

  onLogout(){
    localStorage.clear();
    this._document.defaultView!.location.reload();
  }







  showSuccessReset() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'You reset password successfly'});
}

showErrorReset() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'The password didn not reset'});
}

showSuccessCreatAdmin() {
  this.messageService.add({severity:'success', summary: 'Success', detail: 'You Create admin successfly'});
}

showErrorCreatAdmin() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'The admin didn not Creat'});
}


onConfirm() {
    this.messageService.clear('c');
}

onReject() {
    this.messageService.clear('c');
}

clear() {
    this.messageService.clear();
}
  
}
