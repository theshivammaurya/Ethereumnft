pragma solidity 0.5.1;

contract gor{
    
    uint256 public price1 = 0.00065 ether;
    uint256 public price2 = 0.00053 ether;
    uint256 public price3 = 0.00044 ether;
    uint256 public price4 = 0.00034 ether;

    
    address payable own;
    
    constructor () public{
          own = msg.sender;
    }
    
    struct payment_details{
        string name;
        uint pno;
        uint quantity;
        uint amount;
        uint purchase_time;
        
    }
    
    
    mapping(address => payment_details) public dt;
    
    
    
    function mul(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }


    
       function Purchase(string memory _name, uint _productno, uint _pq) public payable{

        dt[msg.sender].name = _name;
        dt[msg.sender].quantity = _pq;
        dt[msg.sender].pno = _productno;
        dt[msg.sender].amount = msg.value ;//mul( _pq, price1) ;
        dt[msg.sender].purchase_time = now;
        
        if(_productno ==1){
        require(msg.value == mul( _pq, price1)); 
  
        own.transfer(msg.value);

        }
        else if(_productno ==2){
            require(msg.value == mul( _pq, price2)); 
        
        own.transfer(msg.value);
            
        }
        else if(_productno ==3){
            require(msg.value == mul( _pq, price3)); 
        
        own.transfer(msg.value);
            
        }
        else{
            require(msg.value == mul( _pq, price4)); 
            own.transfer(msg.value);
            
        }
       
        
            
        }
        
    }
    
    
    
    
