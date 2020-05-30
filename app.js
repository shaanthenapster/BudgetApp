
// Budget Controller
var budgetcontroller = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var transactions = {
        balanceArray: {
            exp: [], inc: []
        },
        balance: {
            exp: 0, inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {

            var newItem, Id;

            // This if condition checks the at the statrting if the array is empty or not
            if (transactions.balanceArray[type].length > 0) {
                //create new id
                Id = transactions.balanceArray[type][transactions.balanceArray[type].length - 1].id + 1;
            }
            else {
                Id = 0
            }


            if (type === 'exp') {
                newItem = new Expense(Id, des, val)
            } else if (type === 'inc') {
                newItem = new Income(Id, des, val)
            }

            transactions.balanceArray[type].push(newItem);
            return newItem;
        },


        // test function to visulize the object formed in the array of the elemets
        testing: function () {
            console.log(transactions)

        }
    }

})();


// UI Controller
var UIController = (function () {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputvalue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    }

    return {

        getinput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputvalue).value
            }
        },

        getDOMStrings: function () {
            return DOMStrings;
        },

        viewResolver: function (obj, type) {
            console.log({ type })
            var html, newHtml, element;

            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else if (type === 'exp') {
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            console.log(html)
            newHtml = html.replace('%id%', obj.Id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        }
    }

})();


// Global Controller
var AppController = (function (budgetCtrl, UICtrl) {

    var setupEvcentListners = function () {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', addItemsTolist);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                addItemsTolist();
            }
        });
    }


    var DOM = UICtrl.getDOMStrings();
    var input, newItem;
    var addItemsTolist = function () {

        // 1. Get the field input data

        var input = UICtrl.getinput();
        console.log(input);
        // 2. Add the item to the budget Controller

        var newItem = budgetcontroller.addItem(input.type, input.description, input.value)

        // 3. Add the item to the UI

        UIController.viewResolver(newItem, input.type);
        //4 . Calculate the budget
        // 5. Display the budget on the UI
    };

    return {
        init: function () {
            console.log('Application has started.');
            setupEvcentListners();
        }
    }
})(budgetcontroller, UIController);

AppController.init();

