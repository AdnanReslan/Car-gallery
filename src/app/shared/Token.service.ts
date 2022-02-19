import { Subject } from "rxjs";

export class Token{
   token !:string;
     id!:string;
   IsLogIn = new Subject<boolean>();
   urlimg ="http://localhost:4000/post/photo/"
  get_token() : string{
    return localStorage.getItem('token')!.toString() ;
  }

  del_token(){
    localStorage.removeItem('token');
    this.token="";
}
 getRole(){
     if(localStorage.getItem('role')=="carAdmin"||localStorage.getItem('role')=="CAR_ADMIN"){
           return "CarAdmin"
     }
     else if(localStorage.getItem('role')=="pageadmin"||localStorage.getItem('role')=="Blogadmin"){
        return "Pageadmin"
     }
     else if(localStorage.getItem('role')=="MANAGER"||localStorage.getItem('role')=="MANAGE"){
        return "Manager"
     }
     else{
         return "None"
     }
 }

 isLogin(){
     if(localStorage.getItem('Islogin')){
            return true;
     }
     else
     return false
 }


}