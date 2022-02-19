import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Token } from "./Token.service";
@Injectable({ providedIn: 'root' })
export class RequestCar {
    constructor(private http: HttpClient,private token : Token) { }

    onGetAllCar() {
        return this.http.get<any>('http://car-gallery684456.herokuapp.com/car')
    }

    ongetCarBrand() {
        return this.http.get<any>('http://car-gallery684456.herokuapp.com/car/brands')
    }

    ongetCarCategories() {
         return this.http.get<any>('http://car-gallery684456.herokuapp.com/car/categories')
    }

    ongetGearBox(){
        return this.http.get<any>('http://car-gallery684456.herokuapp.com/car/gear-boxes')
    }

    ongetCarFeature(){
        return this.http.get<any>('http://car-gallery684456.herokuapp.com/car/features')
    }

    ongetSpecification(){
      return this.http.get<any>('http://car-gallery684456.herokuapp.com/car/specifications');
    }


    onCreatCarCategories(data : FormData){
        const httpOptions = {
            headers: new HttpHeaders({
              'enctype': 'multipart/form-data',
              Authorization: 'Bearer '+this.token.get_token()!.toString()
            })
          };
      return  this.http.post('http://car-gallery684456.herokuapp.com/car/category',data, httpOptions)
    }


    onCreateCarBrand(data : FormData){
        const httpOptions = {
            headers: new HttpHeaders({
              'enctype': 'multipart/form-data',
              Authorization: 'Bearer '+this.token.get_token()!.toString()
            })
          };
     return  this.http.post('http://car-gallery684456.herokuapp.com/car/brand',data,httpOptions)
    }

    onCreateCarFeature(airconditioner : string,audioinput :string,uspinput :string,gps:string,bluetooth:string){
        const httpOptions = {
            headers: new HttpHeaders({
              'enctype': 'multipart/form-data',
              Authorization: 'Bearer '+this.token.get_token()!.toString()
            })
          };
      return  this.http.post('http://car-gallery684456.herokuapp.com/car/features',{
        air_conditioner : airconditioner ,
        audio_input : audioinput ,
        usp_input : uspinput,
        gps:gps,
        bluetooth:bluetooth,
      },httpOptions)
    }

    onCreatCarGearBox(type : string){
        const httpOptions = {
            headers: new HttpHeaders({
              'enctype': 'multipart/form-data',
              Authorization: 'Bearer '+this.token.get_token()!.toString()
            })
          };
          return this.http.post('http://car-gallery684456.herokuapp.com/car/gear-box',{type:type},httpOptions)
    }
   
    
    
   
    onCreatCarSpecifiction(geartypeid:string,featureid:string,carbrandid:string,doors:string,interiorcolor:string,exteriorcolor:string,numberofseats:string,){
        const httpOptions = {
            headers: new HttpHeaders({
              'enctype': 'multipart/form-data',
              Authorization: 'Bearer '+this.token.get_token()!.toString()
            })
          };
        return this,this.http.post('http://car-gallery684456.herokuapp.com/car/specifications',{
            gear_type_id:geartypeid,
            feature_id:featureid,
            car_brand_id:carbrandid,
            doors:doors,
            interior_color:interiorcolor,
            exterior_color:exteriorcolor,
            number_of_seats:numberofseats

        },httpOptions)
    }

    onCreateCar(data:FormData){
        const httpOptions = {
            headers: new HttpHeaders({
              'enctype': 'multipart/form-data',
              Authorization: 'Bearer '+this.token.get_token()!.toString()
            })
          };
      return  this.http.post('http://car-gallery684456.herokuapp.com/car',data,httpOptions)
    }
   
    onCreateCarImages(data:FormData){
      const httpOptions = {
        headers: new HttpHeaders({
          'enctype': 'multipart/form-data',
          Authorization: 'Bearer '+this.token.get_token()!.toString()
        })
      };
     
      
      return this.http.post('http://car-gallery684456.herokuapp.com/car/images',data,httpOptions);
    }

    onDeleteCarCategories(id : number){
        const httpOptions = {
            headers: new HttpHeaders({
              'enctype': 'multipart/form-data',
              Authorization: 'Bearer '+this.token.get_token()!.toString()
            })
          };
          const url='http://car-gallery684456.herokuapp.com/car/category/'+(id.toString())
        return this.http.delete(url,httpOptions)
    }

   
    onDeleteCarBrand(id : number){
        const httpOptions = {
            headers: new HttpHeaders({
              'enctype': 'multipart/form-data',
              Authorization: 'Bearer '+this.token.get_token()!.toString()
            })
          };
          const url='http://car-gallery684456.herokuapp.com/car/brand/'+(id.toString())
        return this.http.delete(url,httpOptions)
    }

    onDeleteCarFeature(id : number){
        const httpOptions = {
            headers: new HttpHeaders({
              'enctype': 'multipart/form-data',
              Authorization: 'Bearer '+this.token.get_token()!.toString()
            })
          };
          const url='http://car-gallery684456.herokuapp.com/car/feature/'+(id.toString())
        return this.http.delete(url,httpOptions)
    }

    onDeleteCar(id : string){
      const httpOptions = {
        headers: new HttpHeaders({
          'enctype': 'multipart/form-data',
          Authorization: 'Bearer '+this.token.get_token()!.toString()
        })
      };
      const url='http://car-gallery684456.herokuapp.com/car/'+id
         return this.http.delete(url,httpOptions)
    }


    onUpdateFeature(id : string, air : string , aud : string , usp : string, gps : string, bluetooth : string){
      const httpOptions = {
        headers: new HttpHeaders({
          'enctype': 'multipart/form-data',
          Authorization: 'Bearer '+this.token.get_token()!.toString()
        })
      };
      const url='http://car-gallery684456.herokuapp.com/car/features/'+id
         return this.http.put(url,{
           air_conditioner:air,
           audio_input:aud,
           usp_input: usp,
           gps:gps,
           bluetooth: bluetooth
         },httpOptions)
    }

    onUpdateSpecification(id : string , gearid : string , featureid : string , carbrandId : string , doors : string, intco : string , exter : string, numberse : string){
      const httpOptions = {
        headers: new HttpHeaders({
          'enctype': 'multipart/form-data',
          Authorization: 'Bearer '+this.token.get_token()!.toString()
        })
      };
      const url='http://car-gallery684456.herokuapp.com/car/specification/'+id
         return this.http.put(url,{
              gear_type_id:gearid,
              feature_id:featureid,
              car_brand_id:carbrandId,
              doors:doors,
              interior_color:intco,
              exterior_color:exter,
              number_of_seats:numberse
         },httpOptions)
    }

   onUpdateCar(id : string ,data : FormData){
    const httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        Authorization: 'Bearer '+this.token.get_token()!.toString()
      })
    };
    const url='http://car-gallery684456.herokuapp.com/car/'+id
    return this.http.put(url,data,httpOptions)
   }


   onUpdateCarBrand(id : string ,data : FormData){
    const httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        Authorization: 'Bearer '+this.token.get_token()!.toString()
      })
    };
    const url='http://car-gallery684456.herokuapp.com/car/brand/'+id
    return this.http.put(url,data,httpOptions)
   }

}