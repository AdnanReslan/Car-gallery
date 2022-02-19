import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Token } from '../Token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthBlogService implements CanActivate {

  constructor(private token : Token , private router : Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (localStorage.getItem('Islogin')&&localStorage.getItem('token')&&(this.token.getRole()=="Pageadmin"||this.token.getRole()=="Manager")){
      return true;
    }
     else{
      this.router.navigate(['/']);
      return false;
     }
  }
}
