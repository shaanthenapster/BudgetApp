
// Budget Controller
var budgetcontroller = (function() {


})();



// UI Controller
var UIController = (function(){

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputvalue: '.add__value',
        inputBtn: '.add__btn'
    }

    return{

        getinput: function(){
            return{
            type :document.querySelector(DOMStrings.inputType).value,
            description: document.querySelector(DOMStrings.inputDescription).value,
            value: document.querySelector(DOMStrings.inputvalue).value
        }},

        getDOMStrings: function(){
            return DOMStrings;
        }
    }

})();


// Global Controller
var AppController = (function(budgetCtrl , UICtrl){

var setupEvcentListners = function(){
    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener('click' , addItemsTolist);

    document.addEventListener('keypress' , function(event){
        if(event.keyCode === 13 || event.which === 13){
          addItemsTolist();
        }
    });
}


var DOM = UICtrl.getDOMStrings();

    var addItemsTolist = function(){
      // 1. Get the field input data

      var input = UICtrl.getinput();
      console.log(input);
      // 2. Add the item to the budget Controller
      // 3. Add the item to the UI
       //4 . Calculate the budget
      // 5. Display the budget on the UI
  };

  return{
        init : function(){
            console.log('Application has started.');
            setupEvcentListners();
        }
}
})(budgetcontroller , UIController);

AppController.init();

