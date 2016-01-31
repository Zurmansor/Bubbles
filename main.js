(function () {

    var MIN_SELECTED_CELLS = 2;
    //var field = [];
    var state = StateEnum();

/*    var countDeletedCells = 0;
    var score = 0;*/
    var model;
    var view;

    function newGame(event) {
        if (model.getField().length > 0) {
            return;
        }

        model.generate();
        view.generate(model.getField(), cellHandler);
    }

    function cellHandler (j, i) {
        var field = model.getField();
        //var number = 0;
        //alert(factorial(number));
        if (field[j][i].state == state.EMPTY) {
            return;
        }
        if (field[j][i].state == state.SELECTED){
            model.deleteCells();
            model.verticalShift();
            model.horizontalShift();
        } else {
            model.refreshArray();
            if (model.colorSelector(j, i, field[j][i].color) < MIN_SELECTED_CELLS){
                field[j][i].state = state.BASE;
            }
        }
        view.refreshField();
    }

    function init() {
        var btnNewGame;

        model = new Model();
        view = new View();

        btnNewGame = document.getElementById("new-game");
        btnNewGame.addEventListener("click", newGame);

        spanScore = document.getElementById("span-score");
        spanScore.innerText = "0";
    }

    window.addEventListener("load", init);
})();
