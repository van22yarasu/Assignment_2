(function (){
  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyShoppingListController',ToBuyShoppingListController)
  .controller('AlreadyBoughtShoppingController',AlreadyBoughtShoppingController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyShoppingListController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyShoppingListController(ShoppingListCheckOffService){
    var toBuyCtrl = this;
    toBuyCtrl.toBuyList = ShoppingListCheckOffService.getToBuyList();
    console.log("To buy List: ", toBuyCtrl);
    toBuyCtrl.checkOff = function(itemIndex){
      ShoppingListCheckOffService.checkOff(itemIndex);
    };
  }
// to add items to already bought list

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var boughtCtrl = this;
    boughtCtrl.boughtList = ShoppingListCheckOffService.getBoughtList();
  };

  //creat shopping list check off service function

  function ShoppingListCheckOffService () {
    var service = this;
    // list of items to buy
    var toBuyList = [
      {name: "cookies", quantity: '10 bags'},
      {name: "soda", quantity: '5 bottles'},
      {name: "chips", quantity: '10 bags'},
      {name: "water", quantity: '20 bottles'},
      {name: "fruits", quantity: '15 pounds'}
    ];
    var boughtList = [];
    service.getToBuyList = function () {
      return toBuyList;
    };

    service.getBoughtList = function () {
      return boughtList;
    };

    service.checkOff = function (itemIndex){
      var boughtItem = toBuyList.splice(itemIndex, 1);
      boughtList.push({boughtItem.name, boughtItem.quantity});
      console.log(boughtList);
    };



  }
})();
