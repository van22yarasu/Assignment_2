(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingListController', ToBuyShoppingListController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingListController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingListController(ShoppingListCheckOffService) {
var list2Buy = this;
console.log("toBuy: ",ShoppingListCheckOffService.toBuy);
  list2Buy.items = ShoppingListCheckOffService.toBuy.getItems();

	list2Buy.checkItem = function (itemIndex) {
		console.log("Index: ", itemIndex);
		try {
  ShoppingListCheckOffService.checkItem(itemIndex);
		} catch (error) {
			list2Buy.errorMessage = error.message;
		console.log("errorMessage: ", error.message);
		}
	};
}


AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var listBought = this;


    listBought.bought = ShoppingListCheckOffService.bought.getItems();
    listBought.itemName = "";
    listBought.itemQuantity = "";
    listBought.addItem = function () {
      try {
        ShoppingListCheckOffService.addItem(listBought.itemName, listBought.itemQuantity);
      }
      catch (error) {
        listBought.errorMessage = "Nothing bought yet!";
      }
    }


}


function ShoppingListCheckOffService() {
  var service = this;
	var bought = [];
  service.toBuy = [
    {name: "cookies", quantity: '10 bags'},
    {name: "soda", quantity: '5 bottles'},
    {name: "chips", quantity: '10 bags'},
    {name: "water", quantity: '20 bottles'},
    {name: "fruits", quantity: '15 pounds'}
  ];

  // List of shopping items
   service.addItem = function(itemName, quantity) {
     var item = {
       name: itemName,
       quantity: quantity
     };
     bought.push(item);
   }


  service.checkItem = function (itemIndex) {

	   bought.push(service.toBuy[itemIndex]);
     service.toBuy.splice(itemIndex, 1);
  //items
     console.log("2Buy length = " + service.toBuy.length);
		   if (service.toBuy.length === 0) {
			      throw new Error("Everything is bought!");
		}
};

  service.toBuy.getItems = function () {
    return service.toBuy;//items;
  };
	bought.getItems = function() {
    return service.bought;

	}
}

})();
