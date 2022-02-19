import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { CarCategories } from '../shared/modules/CarCategories.module';
import { RequestCar } from '../shared/request.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [MessageService]
})
export class CategoriesComponent implements OnInit {
  lodedCarCategories:CarCategories[]=[]
  createCategory !: FormGroup;
  displayPosition!: boolean;
  position!: string;
  uploadedFile!: File;
  namefile!: string;
  load = false;
  msgs1!: Message[];
  errormessage="";
  constructor(private req : RequestCar, private messageService: MessageService, 
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.ongetCarCategories()
    this.createCategory = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'description': new FormControl(null,Validators.required),
      'slug': new FormControl(null,Validators.required)
    })
  }

  ongetCarCategories() {
     this.load=true;
    this.req.ongetCarCategories().subscribe(
      CarCategoriese=>{
        this.load=false;
        const carCategories = CarCategoriese.data.rows;
        carCategories.forEach(
          (element: any) => {
            this.lodedCarCategories.push(
              new CarCategories(element.name, element.id, element.icon,element.slug,element.description));

          });
     
        
    },erorr=>{
      this.load=false;
      this.errormessage=erorr.message;
      this.msgs1 = [
       {severity:'error', summary:'error : ', detail:this.errormessage},
      ];
    })
    }


  onDeleteCarCategories(id : number){
    this.req.onDeleteCarCategories(id).subscribe(
      res=>{
        this.lodedCarCategories.forEach((mem) => {
          if (id === mem.id) {
            this.lodedCarCategories.splice(this.lodedCarCategories.indexOf(mem),1);
          }
        })
        
      }
    )
  }



  onCreateCarCategory(){
    
    const data = new FormData();
    data.append('name',this.createCategory.value.name);
    data.append('icon',this.uploadedFile,this.uploadedFile.name);
    data.append('description', this.createCategory.value.description);
    data.append('slug', this.createCategory.value.slug)
    this.req.onCreatCarCategories(data).subscribe(res=>{
 
   this.createCategory.reset();
   this.uploadedFile!=null;
   this.namefile=""
   this.displayPosition=false
   this.showSuccess()
    },erorr=>{
   this.showError()
    })
  }

  showPositionDialogp(positionp: string) {
    this.position = positionp;
    this.displayPosition = true;

  }

  onloadfile(event: any) {
    this.uploadedFile = <File>event.target.files[0]
    this.namefile = this.uploadedFile.name;

  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'You Create category successfly'});
  }
  
  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'The category didn not Creat'});
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
