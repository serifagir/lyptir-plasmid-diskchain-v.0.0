import SHA256 from 'crypto-js/sha256';

export class Iteron{
        constructor(index, timestamp, data, previousHash, currentHash, nextHash = ''){
                this.index = index;
                this.timestamp = timestamp;
                this.data = data;
                this.previousHash = previousHash;
                this.currentHash = this.createHash();
        }

        
}