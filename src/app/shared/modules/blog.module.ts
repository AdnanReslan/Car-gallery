export class Blog{
    
    public title   : string;
    public description :string;
    public adminId : number;
    public id      : number;
    public image  : string;
   
    constructor(title   : string , description :string, adminId : number , id : number , image  : string ){
        this.title=title;
        this.description=description;
        this.adminId=adminId;
        this.id=id;
        this.image=image;
       
    }
}