const SHA256 = require('crypto-js/sha256');

class Iteron{
        constructor(index, timestamp, data, previousHash = ''){
                this.index = index;
                this.timestamp = timestamp;
                this.data = data;
                this.previousHash = previousHash;
                this.hash = this.createCurrentIteronHash();
                this.nonce = 0;
        }

        createCurrentIteronHash(){
                return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();
        }

        helicateIteron(difficulty){
                while(this.hash.substring(0, difficulty) !== Array(difficulty + 1 ).join("0")){
                        this.nonce++;
                        this.hash = this.createCurrentIteronHash();
                }

                console.log("Iteron helicated: " + this.hash);
        }
}

class Plasmid{
        constructor(){
                this.replicon = [this.createFirstIteron()];
                this.difficulty = 5;
        }

        createFirstIteron(){
                return new Iteron(0, "00/00/0000", "this is the first iteron", "0");
        }

        getLastIteron(){
                return this.replicon[this.replicon.length - 1];
        }

        createNewIteron(newIteron){
                newIteron.previousHash = this.getLastIteron().hash;
                newIteron.helicateIteron(this.difficulty);
                this.replicon.push(newIteron);
        }

        isRepliconMutated(){
                for(let i = 1; i < this.replicon.length; i++){
                        const currentReplicon = this.replicon[i];
                        const previousReplicon = this.replicon[i - 1];

                        if(currentReplicon.hash !== currentReplicon.createCurrentIteronHash()){
                                return true;
                        }

                        if(currentReplicon.previousHash !== previousReplicon.createCurrentIteronHash()){
                                return true;
                        } 
                }

                return false;
        }
}

const lyptirCoin = new Plasmid();

console.log("Helicating block: 1..." );
lyptirCoin.createNewIteron(new Iteron(1, "04/26/2023", {amount:4}));

console.log("Helicating block: 2..." );
lyptirCoin.createNewIteron(new Iteron(2, "04/27/2023", {amount:10}));

