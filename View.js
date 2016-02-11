function View () {
    var settings = Settings();
    var state = StateEnum();
    var field;
    var containerDiv = document.createElement("div");

    this.generate = function(f, cellHandler) {
        field = f;

        var i;
        var j;
        var cell;
        var mainField = document.getElementById("main-field");
        var rowDiv;

        for (j = 0; j < settings.FIELD_HEIGHT; j++) {
            rowDiv = document.createElement("div");
            for (i = 0; i < settings.FIELD_WIDTH; i++) {
                cell = document.createElement("button");
                cell.dataset.i = i;
                cell.dataset.j = j;
                //cell.onclick = cellHandler.bind(this, j, i);
                cell.id = generateId(j,i);
                cell.style.backgroundColor = field[j][i].color;
                rowDiv.appendChild(cell);
            }
            containerDiv.appendChild(rowDiv);
        }
        containerDiv.addEventListener("click", function (event) {
            cellHandler(event.target.dataset.j, event.target.dataset.i);
        });

        mainField.appendChild(containerDiv);
        mainField.style.display = "inline-block";

    };




    this.refresh = function () {
        var i;
        var j;
        var element;

        for (j = 0; j < settings.FIELD_HEIGHT; j++) {
            for (i = 0; i < settings.FIELD_WIDTH; i++) {
                element = document.getElementById(generateId(j,i));
                element.style.backgroundColor = field[j][i].color;

                switch (field[j][i].state) {
                    case state.MATCHED:
                        //element.innerText = "+";
                        element.className = "matched-cell";
                        break;
                    case state.BASE:
                        //element.innerText = "O";
                        element.className = "";
                        break;
                    case state.EMPTY:
                        //element.innerText = " ";
                        element.className = "deleted-cell";
                        break;
                }
            }
        }
    };

    function generateId(j, i){
        return "cell-" + j + "-" + i;
    }

}