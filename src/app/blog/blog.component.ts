import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Blog } from '../shared/modules/blog.module';
import { Page } from '../shared/modules/page.module';
import { Token } from '../shared/Token.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [MessageService]
})
export class BlogComponent implements OnInit {
  displayPosition!: boolean;
  position!: string;
  displayPositionp!: boolean;
  positionp!: string;
  creatBlog !: FormGroup;
  creatPage !: FormGroup;
  namefileBlog!: string;
  uploadedFileBlog!: File;
  namefilePage!: string;
  uploadedFilePage!: File;
  lodedBlog: Blog[] = [];
  lodedPage: Page[] = [];
  updateBlog !: FormGroup;
  updatePage !: FormGroup;
  displayPositionupb!: boolean;
  positionupb!: string;
  namefileBlogup!: string;
  uploadedFileBlogup!: File;
  displayPositionupp!: boolean;
  positionupp!: string;
  namefilePageupp!: string;
  uploadedFilePageupp!: File;
  load = false;
  loadIdUpBlog!:number;
  loadIdUpPage!:number;
  // load old value in update form
  titleblogup!:string
  descriptionup!:string
  titlepage!:string
  constructor(private http: HttpClient,
    private token: Token,private messageService: MessageService, 
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.creatBlog = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    })

    this.creatPage = new FormGroup({
      'title': new FormControl(null, Validators.required),
    })

    this.updateBlog = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    })

    this.updatePage = new FormGroup({
      'title': new FormControl(null, Validators.required),
    })

    this.onGetblog();
    this.onGetpage();
  }


  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  showPositionDialogp(positionp: string) {
    this.positionp = positionp;
    this.displayPositionp = true;
  }
  onCreatBlog() {
    const adminid = localStorage.getItem('iduser')!.toString()
    const httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        Authorization: 'Bearer '+this.token.get_token()!.toString()
      })
    };
    
    const data = new FormData();
    data.append('admin_id',adminid);
    data.append('title',this.creatBlog.value.title);
    data.append('description',this.creatBlog.value.description);
    data.append('slug', 'speed');
    data.append('image', this.uploadedFileBlog,this.uploadedFileBlog.name)
    
    this.http.post<any>('http://car-gallery684456.herokuapp.com/admin/blog', data, httpOptions).subscribe(
      res => {
    
        this.creatBlog.reset()
        this.uploadedFileBlog!=null
        this.displayPosition=false
        this.namefileBlog=""
        this.showSuccessCreatBlog()
      },erorr=>{
        this.showErrorCreatBolg();
      }
    )
  }

  onCreatpage() {
    const adminid = localStorage.getItem('iduser')!.toString()
    const httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        Authorization: 'Bearer '+this.token.get_token()!.toString()
      })
    };
    
    const data = new FormData();
    data.append('admin_id',adminid);
    data.append('title',this.creatPage.value.title);
    data.append('slug', 'speed');
    data.append('image', this.uploadedFilePage,this.uploadedFilePage.name)
    this.http.post<any>('http://car-gallery684456.herokuapp.com/admin/page', data , httpOptions ).subscribe(
      res => {
       
        this.creatPage.reset()
        this.uploadedFilePage!=null
        this.namefilePage=""
        this.displayPositionp=false
        this.showSuccessCreatPage()
      },erorr=>{
        this.showErrorCreatPage()
      }
    )
  }


  onloadfile(event: any) {
    this.uploadedFileBlog = <File>event.target.files[0]
    this.namefileBlog = this.uploadedFileBlog.name;

  }


  onloadfilePage(event: any) {
    this.uploadedFilePage = <File>event.target.files[0]
    this.namefilePage = this.uploadedFilePage.name;
  }


  onDeleteBlog(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        Authorization: 'Bearer '+this.token.get_token()!.toString()
      })
    };
    const url ='http://car-gallery684456.herokuapp.com/admin/blog/'+(id.toString());
    this.http.delete(url,httpOptions).subscribe(
      res => {
        this.lodedBlog.forEach((mem) => {
          if (id === mem.id) {
            this.lodedBlog.splice(this.lodedBlog.indexOf(mem),1);
          }
        })
      }
    )
  }


  onDeletePage(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        Authorization: 'Bearer '+this.token.get_token()!.toString()
      })
    };
    const url='http://car-gallery684456.herokuapp.com/admin/page/'+(id.toString());
    this.http.delete(url,httpOptions).subscribe(
      res => {
        this.lodedPage.forEach((mem) => {
          if (id === mem.id) {
            this.lodedPage.splice(this.lodedPage.indexOf(mem),1);
          }
        })

      }
    )
  }

  onGetblog() {
    this.load=true;
    this.http.get<any>('http://car-gallery684456.herokuapp.com/admin/blogs?limit=10&offset=0').subscribe(
      blog => {
        this.load=false;
        const BlogArray = blog.data.rows;
        BlogArray.forEach(
          (element: any) => {
            this.lodedBlog.push(
              new Blog(element.title, element.description, element.admin_id, element.id, element.image));

          });
      },erorr=>{
        this.load=false;
      }
    )


  }

  onGetpage() {
    this.http.get<any>('http://car-gallery684456.herokuapp.com/admin/pages?limit=10&offset=0').subscribe(
      page => {

        const PageArray = page.data.rows;
        PageArray.forEach(
          (element: any) => {
            this.lodedPage.push(
              new Page(element.title, element.admin_id, element.id, element.image));

          });
      }
    )


  }

  onupdateBlog(){
    const adminid = localStorage.getItem('iduser')!.toString()
    const httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        Authorization: 'Bearer '+this.token.get_token()!.toString()
      })
    };
    const data = new FormData();
    data.append('title',this.updateBlog.value.title);
    data.append('description',this.updateBlog.value.description);
    data.append('slug', 'speed');
    data.append('image', this.uploadedFileBlogup,this.uploadedFileBlogup.name)
    const url='http://car-gallery684456.herokuapp.com/admin/blog/'+(this.loadIdUpBlog.toString())
    this.http.put(url,data,httpOptions).subscribe(
      res=>{
        this.updateBlog.reset();
        this.uploadedFileBlogup!=null
        this.namefileBlogup=""
        this.displayPositionupb=false
        this.showSuccessUpdateBlog()
      },erorr=>{
        this.showErrorUpdateBlog()
      }
    )
  }

  
  onloadfileupb(event: any) {
    this.uploadedFileBlogup = <File>event.target.files[0]
    this.namefileBlogup = this.uploadedFileBlogup.name;

  }

  showPositionDialogupb(position: string,id :number,titlePageup :string,description:string) {
    this.positionupb = position;
    this.displayPositionupb = true;
    this.loadIdUpBlog=id;

    this.titleblogup=titlePageup
    this.descriptionup=description




  }


  onupdatePage(){
    const adminid = localStorage.getItem('iduser')!.toString()
    const httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        Authorization: 'Bearer '+this.token.get_token()!.toString()
      })
    };
    const data = new FormData();
    data.append('admin_id',adminid);
    data.append('title',this.updatePage.value.title);
    data.append('slug', 'speed');
    data.append('image',this.uploadedFilePageupp,this.uploadedFilePageupp.name)
    const url='http://car-gallery684456.herokuapp.com/admin/page/'+(this.loadIdUpPage.toString())
    this.http.put(url,data,httpOptions).subscribe(
      res=>{
        this.updatePage.reset();
        this.uploadedFilePageupp!=null
        this.namefilePageupp=""
        this.displayPositionupp=false
        this.showSuccessUpdatePage()
      },erorr=>{
        this.showErrorUpdatePage()
      }
    )
  }

  
  onloadfileupp(event: any) {
    this.uploadedFilePageupp = <File>event.target.files[0]
    this.namefilePageupp = this.uploadedFilePageupp.name;

  }

  showPositionDialogupp(position: string,id : number , title : string) {
    this.positionupp = position;
    this.displayPositionupp = true;
    this.loadIdUpPage=id;

    this.titlepage=title
  }


  showSuccessCreatBlog() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'You Create blog successfly'});
  }
  
  showErrorCreatBolg() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'The blog didn not Creat'});
  }

  showSuccessCreatPage() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'You Create page successfly'});
  }
  
  showErrorCreatPage() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'The page didn not Creat'});
  }

  showSuccessUpdateBlog() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'You update blog successfly'});
  }
  
  showErrorUpdateBlog() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'The blog didn not update'});
  }

  showSuccessUpdatePage() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'You update Page successfly'});
  }
  
  showErrorUpdatePage() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'The page didn not update'});
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
