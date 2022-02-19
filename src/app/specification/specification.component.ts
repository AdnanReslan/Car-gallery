import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarBrand } from '../shared/modules/CarBrand.module';
import { CarFeature } from '../shared/modules/feature.module';
import { RequestCar } from '../shared/request.service';

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css']
})
export class SpecificationComponent implements OnInit {
  lodedBrand:CarBrand[]=[];
  createCarBrand !: FormGroup;
  namefileCreateCarBrand!: string;
  uploadedFileCreateCarBrand!: File;
  displayPositionCreateCarBrand!: boolean;
  positionCreateCarBrand!: string;
  airconditioner = false
  audioinput = false
  uspinput = false
  gps= false
  bluetooth= false
  displayPositionUpdateCarBrand!: boolean;
  positionUpdateCarBrand!: string;
  updateCarBrand !: FormGroup;
  namefileUpdateCarBrand!: string;
  uploadedFileUpdateCarBrand!: File;
   // load old value for Update
   name!: string
   landingPage !: string
   description !: string 
   slug!: string
   id !: number
  constructor(private req : RequestCar) { }

  ngOnInit(): void {
    this.ongetCarBrand();
    
    this.createCarBrand = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'landingpage': new FormControl(null, Validators.required),
      'slug': new FormControl(null, Validators.required)
    })

    this.updateCarBrand = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'landingpage': new FormControl(null, Validators.required),
      'slug': new FormControl(null, Validators.required)
    })
   
  }
  
  ongetCarBrand(){
    this.req.ongetCarBrand().subscribe(
      carBrand=>{
        const carbrand = carBrand.data.rows;
        carbrand.forEach(
          (element: any) => {
            this.lodedBrand.push(
              new CarBrand(element.name, element.id, element.icon, element.slug, element.description,element.landing_page));
         
           
            });
         
          
      },erorr=>{

      }
    )
  }

 

  onDeleteCarBrand(id : number){
    this.req.onDeleteCarBrand(id).subscribe(res=>
      {
        this.lodedBrand.forEach((mem) => {
          if (id === mem.id) {
            this.lodedBrand.splice(this.lodedBrand.indexOf(mem),1);
          }
        })
        
      })
  }

  onCreatBrand(){
    const data = new FormData();
    data.append('name',this.createCarBrand.value.name);
    data.append('icon',this.uploadedFileCreateCarBrand,this.uploadedFileCreateCarBrand.name);
    data.append('description', this.createCarBrand.value.description);
    data.append('landing_page', this.createCarBrand.value.landingpage)
    data.append('slug', this.createCarBrand.value.slug)
    
     this.req.onCreateCarBrand(data).subscribe(res=>{
       this.createCarBrand.reset()
       this.uploadedFileCreateCarBrand!=null
       this.namefileCreateCarBrand=""
       this.displayPositionCreateCarBrand=false
       
     })
  }

  showPositionDialogCreateCarBrand(position: string) {
    this.positionCreateCarBrand = position;
    this.displayPositionCreateCarBrand = true;
  }

  onloadfileCreateCarBrand(event: any) {
    this.uploadedFileCreateCarBrand = <File>event.target.files[0]
    this.namefileCreateCarBrand = this.uploadedFileCreateCarBrand.name;

  }


  showPositionDialogUpdateCarBrand(position: string,id : number , name : string,landingPage : string,description : string, slug: string) {
    this.positionUpdateCarBrand = position;
    this.displayPositionUpdateCarBrand = true;
   
    this.id=id
    this.name=name
    this.landingPage=landingPage
    this.description=description
    this.slug=slug
  }

  onUpdateCarBrand(){
   
    const data = new FormData();
    data.append('name',this.updateCarBrand.value.name);
    data.append('icon',this.uploadedFileUpdateCarBrand,this.uploadedFileUpdateCarBrand.name);
    data.append('description', this.updateCarBrand.value.description);
    data.append('landing_page', this.updateCarBrand.value.landingpage)
    data.append('slug', this.updateCarBrand.value.slug)
       
        
    this.req.onUpdateCarBrand(this.id.toString(),data).subscribe(res=>{
    console.log(res);
    this.updateCarBrand.reset()
    this.displayPositionUpdateCarBrand=false
    this.uploadedFileUpdateCarBrand!=null
    this.namefileUpdateCarBrand =""
    },erorr=>{
   alert("The Car Brand didn not update")
    })
  }

  onloadfileUpdateCarBrand(event: any) {
    this.uploadedFileUpdateCarBrand = <File>event.target.files[0]
    this.namefileUpdateCarBrand = this.uploadedFileUpdateCarBrand.name;

  }

}
