export class Page{
    
    public title   : string;
    public adminId : number;
    public id      : number;
    public image  : string;
   
    constructor(title   : string , adminId : number , id : number , image  : string ){
        this.title=title;
        this.adminId=adminId;
        this.id=id;
        this.image=image;
       
    }
}