export class CarCategories{
    
    public name   : string;
    public id : number;
    public icon  : string;
    public slug : string;
    public discription : string;
    constructor(name   : string , id : number , icon  : string, slug : string , discription : string){
        this.name=name;
        this.id=id;
        this.icon=icon;
        this.slug=slug;
        this.discription=discription;
    }
}