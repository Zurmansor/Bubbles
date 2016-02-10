(function () {

    var settings = Settings();
    var state = StateEnum();

    var model;
    var view;

    function newGame(event) {
        if (model.getField().length > 0) {
            if (confirm("Are you sure?")) {
                model.generate();
                view.refresh();
            }
        } else {
            model.generate();
            view.generate(model.getField(), cellHandler);
        }
    }

    function cellHandler (j, i) {
        var field = model.getField();

        if (field[j][i].state == state.EMPTY) {
            return;
        }
        if (field[j][i].state == state.MATCHED){
            model.deleteCells();
            model.verticalShift();
            model.horizontalShift();
            if (model.finishCheck()) {
                model.refresh();
                view.refresh();
                //TODO: add a message about game over
                console.log('GAME OVER');
                return;
            } else {
                model.refresh();
            }
        } else {
            model.refresh();
            if (model.colorMatch(j, i, field[j][i].color) < settings.MIN_SELECTED_CELLS){
                field[j][i].state = state.BASE;
            }
        }
        view.refresh();
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
