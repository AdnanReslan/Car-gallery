import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { CarComponent } from './car/car.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { NotFondComponent } from './not-fond/not-fond.component';
import { AuthBlogService } from './shared/auth-blog/auth-blog.service';
import { AuthGuardService } from './shared/auth-guard/auth-guard.service';
import { SpecificationComponent } from './specification/specification.component';

const routes: Routes = [
  {path:'',redirectTo:'/Login', pathMatch:'full'},
  {path:'Login',component:LoginComponent},
  {path:'Pageadmin',canActivate:[AuthBlogService],component:BlogComponent},
  {path:'CarAdmin',canActivate:[AuthGuardService],component:CarComponent},
  {path:'Categories',canActivate:[AuthGuardService],component:CategoriesComponent},
  {path:'Specification',canActivate:[AuthGuardService],component:SpecificationComponent},
  {path: 'not-found' , component:NotFondComponent },
  {path: '**' , redirectTo:'/not-found' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
