const gor = artifacts.require("./gor.sol");

contract('gor', function(accounts){

    var price=530000000000000;
   // var inv = 14730;

    it("checks the deployment", function(){
        return gor.deployed().then(function(ins){insurancet = ins;

    });
}

    )

    it("checks the purchase", function(){
        return gor.deployed().then(function(ins){ pol = ins;

            return pol.Purchase("cal", 2, 1, {from: accounts[1], value: 1 * price}) ;
        })
            
        .then(function(result){
            return pol.dt(accounts[1]);
        }).then(function(tem) {
            assert.equal(tem.pno, 2);
        });
    })

    
    


        
}) 