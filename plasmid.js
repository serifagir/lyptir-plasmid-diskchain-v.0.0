import { Iteron } from "./iteron";

export class Plasmid{
        constructor(){
                this.replicon = [this.createOriginIteron()]
        }

        createOriginIteron(){
                originIteron = new Iteron(0, "00/00/0000", "this is replication origin", "0" , "previous hash");
                return originIteron;
        }

        getOrigin(){
                
        }
}