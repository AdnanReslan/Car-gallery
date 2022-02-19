export class CarFeature{
    
    public airconditioner   : string;
    public audioinput : string;
    public uspinput  : string;
    public gps : string;
    public bluetooth : string;
    public id : number;
    constructor(airconditioner   : string , audioinput : string , uspinput  : string, gps : string , bluetooth : string,id : number){
        this.airconditioner=airconditioner;
        this.audioinput=audioinput;
        this.uspinput=uspinput;
        this.gps=gps;
        this.bluetooth=bluetooth;
        this.id=id;
    }
}

