export class Car {
    public adminId: string;
    public description: string;
    public id: string;
    public image: string;
    public name: string;
    public slug: string;
    public doors: string;
    public exterior_color: string
    public interior_color: string;
    public number_of_setes: string;
    public iconBrand: string;
    public nameBrand: string
    public airCond: boolean;
    public audioInput: boolean
    public bluetooth: boolean;
    public gps: boolean;
    public uspInput: boolean;
    public gear_box : string
    public images : string[]
    public email : string
    public sepId : string
    public gearId : string
    public featuId : string

    constructor(adminId: string, description: string,  id: string,image: string, name: string,slug: string,
                doors: string, exterior_color: string, interior_color: string, number_of_setes: string,
                iconBrand: string, nameBrand: string,
                airCond: boolean, audioInput: boolean, bluetooth: boolean, gps: boolean,uspInput: boolean,
                gear_box : string,
                images : string[],
                email : string,
                sepId : string, gearId : string, featuId : string
    ) 
    {
     this.sepId=sepId
     this.gearId=gearId
     this.featuId=featuId
     this.adminId=adminId;
     this.description=description;
     this.id=id
     this.image=image;
     this.name=name;
     this.slug=slug
     this.doors=doors;
     this.exterior_color=exterior_color;
     this.interior_color=interior_color
     this.number_of_setes=number_of_setes;
     this.iconBrand=iconBrand;
     this.nameBrand=nameBrand
     this.airCond=airCond
     this.audioInput=audioInput
     this.bluetooth=bluetooth
     this.gps=gps
     this.uspInput=uspInput
     this.gear_box=gear_box
     this.images=images
     this.email=email
    }
}