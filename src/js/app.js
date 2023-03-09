App = {
    web3Provider:null,
    contracts:{},
    account: '0x0',
	price1: 650000000000000,
    price2: 530000000000000,
    price3: 440000000000000,
    price4: 340000000000000,


    init: function(){
     console.log("master caution- check");
     return App.initweb3();
    },
   
    initweb3: function(){
        /*const ethEnabled = () => {
            if (window.ethereum) {
              window.web3 = new Web3(window.ethereum);
              window.ethereum.enable();
              return true;
            }
            return false;
          }
        },*/
        if (typeof web3 !== 'undefined') {
            // If a web3 instance is already provided by Meta Mask.
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
          } else {
            // Specify default instance if no web3 instance provided
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
          }

          return App.initcontracts();

    },

    initcontracts: function(){
        $.getJSON("gor.json", function(ctoken){
            App.contracts.gor= TruffleContract(ctoken);
            App.contracts.gor.setProvider(App.web3Provider);
            App.contracts.gor.deployed().then(function(ctoken){
                console.log("gor add: ", ctoken.address );
            });

            
            return App.render();
    })
        
    

},

    render: function(){


        web3.eth.getCoinbase(function(err, account) {
            if(err === null) {
                console.log(account);
              App.account = account;
              $('#accountAddress').html("Your Account: " +account);
            }
            
            
        })

        App.contracts.gor.deployed().then(function(instance) {
            tokensaleInstance = instance;
            return tokensaleInstance.price1();

          }).then(function(price1) {
           App.price1 = price1.toNumber();
            console.log((web3.fromWei(App.price1, "ether")));
            
            $('#price1').html(web3.fromWei(App.price1, "ether")+" ETH");
              return tokensaleInstance.price2();

          }).then(function(price2){
              App.price2 = price2.toNumber();
              console.log((web3.fromWei(App.price2, "ether")));
              $(".price2").html(web3.fromWei(App.price2, "ether")+" ETH");
              return tokensaleInstance.price3();
            }).then(function(price3){
                App.price2 = price3.toNumber();
                console.log((web3.fromWei(App.price3, "ether")));
                $(".price3").html(web3.fromWei(App.price3, "ether")+" ETH");
                return tokensaleInstance.price4();
            }).then(function(price4){
                App.price2 = price4.toNumber();
                console.log((web3.fromWei(App.price4, "ether")));
                $(".price4").html(web3.fromWei(App.price4, "ether")+" ETH");
                return tokensaleInstance.price4();


        });
        
        
        
    }, 

     getp1: function(){
    let name =$("#name").val();
    let qty =$("#qty").val();
    let p1 = 1;
    App.contracts.gor.deployed().then(function(ins){
        tokes = ins;
        return tokes.Purchase(name, p1, qty, {from: App.account,
            value: qty * App.price1 ,
            gas: 500000 });
    })
     },

     getp2: function(){
         
        let name =$("#name").val();
        let qty =$("#qty").val();
        let p2 = 2;
        App.contracts.gor.deployed().then(function(ins){
            tokes = ins;
            return tokes.Purchase(name, p2, qty, {from: App.account,
                value: qty * App.price2 , 
                gas: 500000 
    });
        })
         },

         getp3: function(){
            let name =$("#name").val();
            let qty =$("#qty").val();
            let p3 = 3;
            App.contracts.gor.deployed().then(function(ins){
                tokes = ins;
                return tokes.Purchase(name, p3, qty, {from: App.account,
                    value: qty * App.price3,
                    gas: 500000 
        });
            })
             },

             getp4: function(){
                let name =$("#name").val();
                let qty =$("#qty").val();
                let p4 = 4;
                App.contracts.gor.deployed().then(function(ins){
                    tokes = ins;
                    return tokes.Purchase(name, p4, qty, {from: App.account,
                        value: qty * App.price4,
                        gas: 500000 
            });
                })
                 },

}

$(function(){
    $(window).load(function(){
        App.init();
    })
});