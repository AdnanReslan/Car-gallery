export class CarBrand{
    
    public name   : string;
    public id : number;
    public icon  : string;
    public slug : string;
    public landingPage : string;
    public discription : string;
    constructor(name   : string , id : number , icon  : string, slug : string , discription : string , landingPage : string){
        this.name=name;
        this.id=id;
        this.icon=icon;
        this.slug=slug;
        this.discription=discription;
        this.landingPage=landingPage;
    }
}