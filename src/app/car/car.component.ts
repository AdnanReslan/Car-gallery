import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Car } from '../shared/modules/Car.module';
import { RequestCar } from '../shared/request.service';
import { Token } from '../shared/Token.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  providers: [MessageService]
})
export class CarComponent implements OnInit {
  visibleSidebar1!: any;
  createCar !: FormGroup;
  namefile!: string;
  uploadedFile!: File;
  Gear: any[];
  Brand: any[] = [];
  catogeries: any[] = []
  featureId!: string;
  brandId!: string;
  gearTypeId!: string;
  specifictionId!: string;
  categoryarry: string[] = [];
  categoryarryup: string[] = [];
  showAdd = false;
  Car: Car[] = []
  uploadedFiles!: File;
  uploadedFilesname!:string;
  carId!: string;
  g = new Subscription();
  uploadedimagesingle!:File;
  uploadedimagesinglesname!:string
  carIdforAddimage!:string
  displayPosition!: boolean;
  position!: string;
  displayPositionup!: boolean;
  positionup!: string;
  upCar !: FormGroup;
  upIdfeature!:string
  upIdGear!:string
  upIdBrand!:string
  upIdSepci!:string
  upIdCar!:string
  namefileupcar!: string;
  uploadedFileupcar!: File;
  // old value for update post 
  nameup!: string
  slugup!: string
  descriptionup! : string
  interiorcolorup !: string
  exteriorcolorup!:string
  doorsup!:string
  numberofseteup!:string
  airconup!:boolean
  audioinputup!: boolean
  gpsup!:boolean
  bluetoothup!: boolean
  uspinputup!:boolean
  brandup!: string
  categoryup!:string
  constructor(private http: HttpClient, 
              private req: RequestCar, 
              private token: Token,
              private messageService: MessageService, 
              private primengConfig: PrimeNGConfig) {

    this.Gear = [
      { name: "normal", code: "N" },
      { name: "auto", code: "A" },
    ];

    this.req.ongetCarBrand().subscribe(carBrand => {
      const CarBrand = carBrand.data.rows;
      CarBrand.forEach(
        (element: any) => {
          this.Brand.push({ name: element.name, code: element.id })
        });
    })
    this.req.ongetCarCategories().subscribe(carCat => {
      const CarCategories = carCat.data.rows;
      CarCategories.forEach(
        (element: any) => {
          this.catogeries.push({ name: element.name, code: element.id })
        });
    })

  }


  ngOnInit(): void {

    this.primengConfig.ripple = true;
    this.onGetAllCar()
    this.createCar = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'slug': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'doors': new FormControl(null, Validators.required),
      'interiorcolor': new FormControl(null, Validators.required),
      'exteriorcolor': new FormControl(null, Validators.required),
      'numberofseats': new FormControl(null, Validators.required),
      'gear': new FormControl(null, Validators.required),
      'airconditioner': new FormControl(false, Validators.required),
      'audioinput': new FormControl(false, Validators.required),
      'uspinput': new FormControl(false, Validators.required),
      'gps': new FormControl(false, Validators.required),
      'bluetooth': new FormControl(false, Validators.required),
      'brand': new FormControl(null, Validators.required),
    })

    this.upCar = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'slug': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'doors': new FormControl(null, Validators.required),
      'interiorcolor': new FormControl(null, Validators.required),
      'exteriorcolor': new FormControl(null, Validators.required),
      'numberofseats': new FormControl(null, Validators.required),
      'airconditioner': new FormControl(false, Validators.required),
      'audioinput': new FormControl(false, Validators.required),
      'uspinput': new FormControl(false, Validators.required),
      'gps': new FormControl(false, Validators.required),
      'bluetooth': new FormControl(false, Validators.required),
      'brand': new FormControl(null, Validators.required),
    })

  }

  onclick() {
    this.showAdd = !this.showAdd
  }

  // Get all car to show 
  onGetAllCar() {
    this.req.onGetAllCar().subscribe(
      car => {
        const CAR = car.data.rows;
        CAR.forEach(
          (element: any) => {
            this.Car.push(
              new Car(element.admin_id, element.description, element.id, element.image, element.name, element.slug,
                element.specification.doors, element.specification.exterior_color, element.specification.interior_color, element.specification.number_of_seats,
                element.specification.brand.icon, element.specification.brand.name,
                element.specification.features.air_conditioner, element.specification.features.audio_input, element.specification.features.bluetooth, element.specification.features.gps, element.specification.features.usp_input,
                element.specification.gear_box.type,
                element.images,
                element.admin.email,
                element.specification.id,element.specification.gear_type_id,element.specification.feature_id )
            );
            
            
          });
       
        
         
          
      }
    )
  }

  // main method Submit Form
  onSubmitForm() {
    this.onCreateCarFeature();
    
    
    

  }


  // Creat feature 
  onCreateCarFeature() {
    this.req.onCreateCarFeature(this.convertToString(this.createCar.value.airconditioner), this.convertToString(this.createCar.value.audioinput), this.convertToString(this.createCar.value.uspinput), this.convertToString(this.createCar.value.gps), this.convertToString(this.createCar.value.bluetooth)).subscribe(
      res => {
       
        this.onCreatCarGearbox();
      }
    )
  }


  // Creat Gearbox 
  onCreatCarGearbox() {
    this.req.onCreatCarGearBox(this.createCar.value.gear.name).subscribe(res => {
     
      this.onloadFeatureId();
    }, erorr => {

    })
  }


 // Load Feature Id 
 onloadFeatureId() {
  let c = 0;
  this.req.ongetCarFeature().subscribe(CarFeature => {
    const carFeature = CarFeature.data.rows;
    carFeature.forEach(
      (element: any) => {
        c++;
      });
    this.featureId = CarFeature.data.rows[c - 1].id;
 
    this.onloadGearTypeId()
  })
}

// Load Gear Type Id 
onloadGearTypeId() {
  this.g = this.req.ongetGearBox().subscribe(GearBox => {
    const gear = GearBox.data.count - 1
    this.gearTypeId = GearBox.data.rows[gear].id
  
    
    this.onloadBrandId();
    

  })
}


  // Load Brand Id 
  onloadBrandId() {
    this.brandId = this.createCar.value.brand.code
   
    this.onCreateSpecifiction()
  }

 

  // Creat Specifiction 
  onCreateSpecifiction() {
    this.req.onCreatCarSpecifiction(this.gearTypeId, this.featureId, this.brandId, this.createCar.value.doors, this.createCar.value.interiorcolor, this.createCar.value.exteriorcolor, this.createCar.value.numberofseats)
      .subscribe(res => {
      
        this.onloadSpecificationId();
      }, erorr => {

      })
  }


  // Load Specification 
  onloadSpecificationId() {
    let c = 0;
    this.req.ongetSpecification().subscribe(Specification => {
      const carFeature = Specification.data.rows;
      carFeature.forEach(
        (element: any) => {
          c++;
        });
      this.specifictionId = Specification.data.rows[c - 1].id;

      this.oncreatall();
    })
  }


  // Load Categories
  onloadCategories(category: string) {
    if (this.categoryarry.indexOf(category) != -1) {
      this.categoryarry.splice(this.categoryarry.indexOf(category), 1)

    }
    else if (this.categoryarry.indexOf(category) == -1) {
      this.categoryarry.push(category)
    }
   
  }


  // creat car
  oncreatall() {
    const adminid = localStorage.getItem('iduser')!.toString()
    const data = new FormData();
    data.append('specification_id', this.specifictionId)
    data.append('admin_id', adminid)
    data.append('name', this.createCar.value.name)
    data.append('image', this.uploadedFile,this.uploadedFile.name)
    data.append('slug', this.createCar.value.slug)
    data.append('description', this.createCar.value.description)
    data.append('categories', "[" + this.categoryarry.toString() + "]")
    this.req.onCreateCar(data).subscribe(res => {
     

      this.createCar.reset();
      this.showAdd = false
    
      this.showSuccess()
      this.ongetCarId()

    })
  }


  // Get car Id 
  ongetCarId() {
    let c = 0;
    this.req.onGetAllCar().subscribe(car => {
      const Car = car.data.rows;
      Car.forEach(
        (element: any) => {
          c++;
        });
      this.carId = car.data.rows[c - 1].id;
    

      this.onAddCarImages()
    })
  }


// Create car images
onAddCarImages() {
  const data = new FormData();
  data.append('car_id', this.carId)
  data.append('image', this.uploadedFiles, this.uploadedFiles.name)
  this.req.onCreateCarImages(data).subscribe(
    res => {
      this.uploadedFiles!=null
      this.uploadedFilesname=""

    }
  )
}

  onloadfile(event: any) {
    this.uploadedFile = <File>event.target.files[0]
    this.namefile = this.uploadedFile.name;

  }

  onDeleteCar(id: string) {
    this.req.onDeleteCar(id).subscribe(res => {
      this.Car.forEach((mem) => {
        if (id == mem.id) {
          this.Car.splice(this.Car.indexOf(mem), 1);
        }
      })
    })
  }

  convertToString(bool: boolean) {
    if (bool == true) {
      return "1"
    }
    else {
      return "0"
    }
  }

  onloadImages(event: any) {

    this.uploadedFiles = <File>event.target.files[0]
    this.uploadedFilesname=this.uploadedFiles.name
  
  }
  

  onloadImagesingle(event: any) {

    this.uploadedimagesingle = <File>event.target.files[0]
    this.uploadedimagesinglesname="File selcted"
    
  }
  
 

  onSubmitSigleImage(){
    const data = new FormData();
    data.append('car_id', this.carIdforAddimage)
    data.append('image',this.uploadedimagesingle,this.uploadedimagesingle.name)
    this.req.onCreateCarImages(data).subscribe(res=>{
      this.displayPosition=false
      this.showSuccessAddimage()
      this.uploadedimagesingle!=null
      this.uploadedimagesinglesname="";
    },erorr=>{
      this.showErrorAddimage()
    })
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'You Create Car successfly'});
  }

  showSuccessAddimage() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'You Add image successfly'});
  }

  showErrorAddimage() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'The image didn not add'});
  }
  
  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'The Car didn not Creat'});
  }

  showSuccessupcar() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'You update Car successfly'});
  }

  showErrorupcar() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'The Car didn not update'});
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

  
  showPositionDialogp(positionp: string,id :string) {
    this.position = positionp;
    this.displayPosition = true;
    this.carIdforAddimage=id;
  }

  showPositionDialogpup(positionp: string, idf : string , idGe : string ,idSep : string, idcar : string,
                        nameup  :string ,slugup :string , descriptionup :string ,interiorcolorup : string , exteriorcolorup:string,
                        doorsup:string , numberofseteup :string ,airconup : boolean, audioinputup:boolean,
                        gpsup : boolean,bluetoothup :boolean,uspinputup : boolean,brandup :string
                        ) {
    this.positionup = positionp;
    this.displayPositionup = true;
    this.upIdfeature=idf
    this.upIdGear=idGe;
    this.upIdSepci=idSep
    this.upIdCar=idcar;
    
    this.nameup =nameup
    this.slugup= slugup
    this.descriptionup= descriptionup
    this.interiorcolorup = interiorcolorup
    this.exteriorcolorup=exteriorcolorup
    this.doorsup=doorsup
    this.numberofseteup=numberofseteup
    this.airconup=airconup
    this.audioinputup=audioinputup
    this.gpsup=gpsup
    this.bluetoothup=bluetoothup
    this.uspinputup=uspinputup
    this.brandup=brandup
  }


  onloadCategoriesup(category: string) {
    if (this.categoryarryup.indexOf(category) != -1) {
      this.categoryarryup.splice(this.categoryarryup.indexOf(category), 1)

    }
    else if (this.categoryarryup.indexOf(category) == -1) {
      this.categoryarryup.push(category)
    }
   
  }

  onloadBrandIdup() {
    this.upIdBrand = this.upCar.value.brand.code
   
    
  }

  onUpFeature(){
   this.req.onUpdateFeature(this.upIdfeature,this.convertToString(this.upCar.value.airconditioner), this.convertToString(this.upCar.value.audioinput), this.convertToString(this.upCar.value.uspinput), this.convertToString(this.upCar.value.gps), this.convertToString(this.upCar.value.bluetooth))
   .subscribe(res=>{
     
      this.onloadBrandIdup()
      this.onUpdateSpecification()
      
   })
  }

  onUpdateSpecification(){
    this.req.onUpdateSpecification(this.upIdSepci,this.upIdGear,this.upIdfeature,this.upCar.value.brand.code,this.upCar.value.doors, this.upCar.value.interiorcolor, this.upCar.value.exteriorcolor, this.upCar.value.numberofseats)
    .subscribe(res=>{
      const adminid = localStorage.getItem('iduser')!.toString()
      const data = new FormData()
    data.append('specification_id', this.upIdSepci)
    data.append('admin_id', adminid)
    data.append('name', this.upCar.value.name)
    data.append('image', this.uploadedFileupcar,this.uploadedFileupcar.name)
    data.append('slug', this.upCar.value.slug)
    data.append('description', this.upCar.value.description)
    data.append('categories', "[" + this.categoryarryup.toString() + "]")
     
      
      this.req.onUpdateCar(this.upIdCar,data).subscribe(res=>{
        this.displayPositionup=false
        this.upCar.reset();
        this.showSuccessupcar()
        
        this.uploadedFileupcar!=null
        this.namefileupcar=""
        
      },erorr=>{
        this.showErrorupcar()
      })
    })
  }

  onEditCar(){
    this.onUpFeature()
  }

  onloadfileupcar(event: any) {
    this.uploadedFileupcar = <File>event.target.files[0]
    this.namefileupcar = this.uploadedFileupcar.name;

  }

}
