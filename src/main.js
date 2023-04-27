const { Plasmid, Transaction } = require('../src/plasmid');

const lyptirCoin = new Plasmid();


for(let i = 1; i<99; i++){
        lyptirCoin.createTransaction(new Transaction('address1' , 'address2', 100));
        console.log("\n Helication initiating...");
        lyptirCoin.helicatePendingTransactions("serifagir-address");

        console.log('\n Balance of serifagir is', lyptirCoin.getBalanceOfAddress("serifagir-address"));
}

