import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                  //api
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { PasswordModule } from "primeng/password";
import { NotFondComponent } from './not-fond/not-fond.component';
import { Token } from './shared/Token.service';
import { CarComponent } from './car/car.component';
import { BlogComponent } from './blog/blog.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { HeaderComponent } from './header/header.component';
import {DialogModule} from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {CardModule} from 'primeng/card';
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputNumberModule } from "primeng/inputnumber";
import {DropdownModule} from 'primeng/dropdown';
import { CategoriesComponent } from './categories/categories.component';
import { SpecificationComponent } from './specification/specification.component';
import {SidebarModule} from 'primeng/sidebar';
import { RequestCar } from './shared/request.service';
import {InputSwitchModule} from 'primeng/inputswitch';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFondComponent,
    CarComponent,
    BlogComponent,
    HeaderComponent,
    CategoriesComponent,
    SpecificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CalendarModule,
    ChipsModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    ProgressSpinnerModule,
    CardModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    SidebarModule,
    InputSwitchModule,
    CheckboxModule,
    ToastModule
  ],
  providers: [Token],
  bootstrap: [AppComponent]
})
export class AppModule { }
