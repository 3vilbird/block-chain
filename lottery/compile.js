const path=require('path');
const fs=require('fs');
const solc=require('solc');

const inboxPath=path.resolve(__dirname,'contracts','Inbox.sol');
const source = fs.readFileSync(inboxPath,'utf8'); // path and encoding;
// console.log(solc.compile(source,1));
module.exports=solc.compile(source,1).contracts[':Inbox']; // source and noo of contracts to be complied;



