const SHA256 = require('crypto-js/sha256');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction{
        constructor(fromAddress, toAddress, amount){
                this.fromAddress = fromAddress;
                this.toAddress = toAddress;
                this.amount = amount;
        }

        createCurrentIteronHash(){
                return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
        }

        signTransaction(signingKey){
                if(signingKey.getPublic('hex') !== this.fromAddress){
                        throw new Error('You sign only one wallet')
                }

                const hashTx = this.createCurrentIteronHash();
                const tempSignature = signingKey.sign(hashTx, 'base64');
                this.signature = tempSignature.toDer('hex');
        }

        isRepliconMutated(){
                if(this.fromAddress === null) return false;

                if(!this.signature || this.signature.length === 0){
                        throw new Error('No signature in this transaction');
                }

                const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
                return publicKey.verify(this.createCurrentIteronHash(), this.signature);
        }
}

class Iteron{
        constructor(timestamp, transactions, previousHash = ''){
                this.timestamp = timestamp;
                this.transactions = transactions;
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
                this.difficulty = 4;
                this.pendingTransactions = [];
                this.helicateReward = 100;
        }

        createFirstIteron(){
                return new Iteron("00/00/0000", "this is the first iteron", "0");
        }

        getLastIteron(){
                return this.replicon[this.replicon.length - 1];
        }

        helicatePendingTransactions(helicateRewardAddress){
                let iteron = new Iteron(Date.now(), this.pendingTransactions);
                iteron.helicateIteron(this.difficulty);
                console.log('Iteron succesfully helicated!');
                this.replicon.push(iteron);

                this.pendingTransactions = [
                        new Transaction(null, helicateRewardAddress, this.helicateReward)
                ]
        }

        createTransaction(transaction){
                this.pendingTransactions.push(transaction);
        }

        getBalanceOfAddress(address){
                let balance = 0;

                for(const iteron of this.replicon){
                        for(const trans of iteron.transactions){
                                if(trans.fromAddress === address){
                                        balance -= trans.amount;
                                }

                                if(trans.toAddress === address){
                                        balance += trans.amount;
                                }
                        }
                }
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

module.exports.Plasmid = Plasmid;
module.exports.Transaction = Transaction;