pragma solidity >=0.4.0 <0.7.0;

contract lottery{
    address public manager;
    address[] public players;
    constructor() public {
        manager = msg.sender;
    }
    //if the require fails to there will not be a proper indiacation theat why it is been failed
    
    function enter() public payable{
require(msg.value > 0.01 ether); 
      players.push(msg.sender);

    }
}