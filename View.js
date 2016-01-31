function View () {
    var settings = Settings();
    var state = StateEnum();
    var field;

    this.generate = function(f, cellHandler) {
        field = f;

        var i;
        var j;
        var element;
        var mainField = document.getElementById("main-field");
        var rowDiv;

        for (j = 0; j < settings.FIELD_HEIGHT; j++) {
            rowDiv = document.createElement("div");
            for (i = 0; i < settings.FIELD_WIDTH; i++) {
                element = document.createElement("button");
                element.onclick = cellHandler.bind(this, j, i);
                element.innerText = "O";
                element.id = generateId(j,i);

                element.style.backgroundColor = field[j][i].color;

                rowDiv.appendChild(element);
            }
            mainField.appendChild(rowDiv);
        }
    };


    this.refreshField = function () {
        var i;
        var j;
        var element;

        for (j = 0; j < settings.FIELD_HEIGHT; j++) {
            for (i = 0; i < settings.FIELD_WIDTH; i++) {
                element = document.getElementById(generateId(j,i));
                element.style.backgroundColor = field[j][i].color;

                switch (field[j][i].state) {
                    case state.SELECTED:
                        element.innerText = "+";
                        break;
                    case state.BASE:
                        element.innerText = "O";
                        element.className = "";
                        break;
                    case state.EMPTY:
                        element.innerText = "X";
                        element.className = "deleted-cell";
                        break;
                }
            }
        }
    };


    function generateId(j, i){
        return "cell-" + j + "-" + i;
    }

/*    function factorial(number) {
        if (number == 1 || number == 0) {
            return 1;
        }
        return number * factorial(number-1);
    }*/

}