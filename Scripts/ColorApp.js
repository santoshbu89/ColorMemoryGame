
//Module
var app = angular.module("myApp", []);

//Array contains all the colors
var arr = ['colour1', 'colour2', 'colour3', 'colour4', 'colour5', 'colour6', 'colour7', 'colour8',
                'colour1', 'colour2', 'colour3', 'colour4', 'colour5', 'colour6', 'colour7', 'colour8'];

//Shuffle the cards only first time
arr = shuffleCards(arr);

//Array stores removed cards
var removedCards = [];

//Individual Card object
function cardObj() {
    this.bgShown = true;
    this.colorShown = false;
    this.bgImage = "";

    this.flip = function (card) {
        this.bgShown = false;
        this.colorShown = true;
        this.bgImage = card.bgImage;
    };

    this.flipBack = function (card) {
        this.bgShown = true;
        this.colorShown = false;

    };
};

//Controller
app.controller('myCtrl', function ($scope) {

    $scope.bgShown = true;
    $scope.colorShown = false;
    $scope.score = 0;
    var cardsArr = [];

    //Creating the 4x4 board
    for (var i = 0; i < 16; i++) {
        var card = new cardObj();
        card.bgImage = arr[i];
        card.bgShown = true;
        card.colorShown = false;
        cardsArr.push(card);
    }

    $scope.colorArr = cardsArr;

    //
    var count = 0;
    var selectedCards = [];

    //Click event handler
    $scope.flipCard = function (card) {

        var flag = false;

        for (var i = 0; i < removedCards.length; i++) {
            if (card.bgImage == removedCards[i].bgImage) {
                flag = true;
                break;
            }
        }

        if (selectedCards[0] != card && !flag) {
            selectedCards.push(card);
            card.flip(card);
            count += 1;
        }

        for (var i = 0; i < removedCards.length; i++) {
            if (card.bgImage == removedCards[i].bgImage) {
                selectedCards = [];
                count = 0;
            }
        }

        //If two cards are selected
        if (count == 2) {
            setTimeout(function () {
                if (selectedCards[0].bgImage == selectedCards[1].bgImage) {
                    alert('Cards matched!');
                    $scope.score += 1;
                    removedCards.push(selectedCards[0]);
                    removedCards.push(selectedCards[1]);

                    //If array length reaches 16 then game is over
                    if (removedCards.length == 16) {
                        alert('Game over!');
                        $scope.colorArr = cardsArr;
                    }
                    count = 0;
                    selectedCards = [];
                }
                    //If two cards didn't match
                else {
                    alert('Try once more!');
                    $scope.score -= 1;
                    selectedCards[0].flipBack();
                    selectedCards[1].flipBack();

                    count = 0;
                    selectedCards = [];
                }
            }, 200);
        }
    };
});

//Shuffles the cards
function shuffleCards(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Game restart
$(function () {
    $('#restart').click(function () {
        location.reload();
    });
});
