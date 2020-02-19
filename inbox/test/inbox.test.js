const assert = require('assert');
const ganache = require('ganache-cli');
// make sence "Web3" upper case 'W' it is a constractor function;
const Web3 = require('web3');
// importing byte code
const {interface,bytecode}=require('../compile');

// creating an instance of web3
const web3 = new Web3(ganache.provider());
/* this is just a test

class Car {

park(){
    return 'stopped';
}
drive(){
    return 'fuckedup';
}
}
let car;//global declaration of car ;=>scope `let` beacuse it is a variable
// common set of statements can be excuted before each  `it` in hte describe block
beforeEach(()=>{
 car = new Car();
});

// desrcibe will group a common set of tests ie `it`
describe ('testing Car class',()=>{
    it('testing park',()=>{
        assert.equal(car.park(),'stopped');
    });
    it('testing drive',()=>{
        assert.equal(car.drive(),'fuckedup');
    });

}); ==========================================> */
let accounts;
let inbox;
beforeEach (async()=>{
    // get a list of accounts
    accounts= await web3.eth.getAccounts();
    inbox= await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode,arguments:['hi there']})
    .send({from:accounts[0],gas:'1000000'})

    // use one of those account to deploy contract
});

describe('testing inbox',()=>{
    it('deploys contract',()=>{
        assert.ok(inbox.options.address);        
    });
    // test case to check initial message
    it('it has an initial message',async ()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message,'hi there');
    });
    // test to  modify the contract
    it('modifying the contract',async ()=>{
        await inbox.methods.setMessage('bye').send({from:accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message,'bye');
    })

});