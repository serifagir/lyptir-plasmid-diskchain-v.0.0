const SHA256 = require('crypto-js/sha256');

class Block{
        constructor(index, timestamp, data, previousHash = ''){
                this.index = index;
                this.timestamp = timestamp;
                this.data = data;
                this.previousHash = previousHash;
                this.hash = this.createHash();
        }

        createHash(createdHash) {
                createdHash = SHA256(this.index + this.timestamp + JSON.stringify(this.data).toString() + this.previousHash);
                return createdHash;

        }
}



class Blockchain{
        constructor(){
                this.chain = [this.createGenesisBlock()];
        }

        createGenesisBlock(genesisBlock){
                genesisBlock = new Block(0, "00/00/0000", "Genesis Block", "0");
                return genesisBlock;
        }

        getLastBlock(lastBlock){
                lastBlock = this.chain[this.chain.length - 1];
        }

        createNewBlock(newBlock){
                newBlock.previousHash = this.getLastBlock().hash;
                newBlock.hash = newBlock.createHash();
                this.chain.push(newBlock);
        }
}




let lyptirCoin = new Blockchain();

lyptirCoin.createNewBlock(new Block(1, "04/25/2023", {amount: 4}));
lyptirCoin.createNewBlock(new Block(2, "04/26/2023", {amount: 10}));

console.log(JSON.stringify(lyptirCoin, null, 4));
