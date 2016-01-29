function View () {
    var settings = Settings();
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



    function deleteCells() {
        var i;
        var j;

        for (j = 0; j < FIELD_HEIGHT; j++) {
            for (i = 0; i < FIELD_WIDTH; i++) {
                if (field[j][i].state == STATE.SELECTED) {
                    countDeletedCells++;
                    field[j][i].state = STATE.EMPTY;
                    field[j][i].color = null;
                }
            }
        }
        score += countDeletedCells * countDeletedCells;
        spanScore.innerText = score;
        countDeletedCells = 0;
    }

    function verticalShift() {
        var i;
        var j;

        for (j = FIELD_HEIGHT-1; j > 0; j--) {
            for (i = FIELD_WIDTH-1; i >= 0; i--) {
                if (field[j][i].state == STATE.EMPTY) {
                    var z = getVerticalBase(j, i);
                    if (z != null) {
                        field[j][i].state = field[z][i].state;
                        field[j][i].color = field[z][i].color;
                        field[z][i].state = STATE.EMPTY;
                        field[z][i].color = null;
                    }
                }
            }
        }
    }

    function horizontalShift () {
        var j = FIELD_HEIGHT-1;
        var i;

        for (i = FIELD_WIDTH-1; i >= 0; i--) {
            if (field[FIELD_HEIGHT-1][i].state == STATE.EMPTY) {
                var z = getHorizontalBase(i);
                if (z != null) {
                    for (j = FIELD_HEIGHT-1; j >= 0; j--) {
                        field[j][i].state = field[j][z].state;
                        field[j][i].color = field[j][z].color;
                        field[j][z].state = STATE.EMPTY;
                        field[j][z].color = null;
                    }
                }
            }
        }
    }


    function getVerticalBase(j, i) {
        for (j; j >= 0; j--) {
            if (field[j][i].state == STATE.BASE) {
                return j;
            }
        }
        return null;
    }

    function getHorizontalBase(i) {
        for (i; i >= 0; i--) {
            if (field[FIELD_HEIGHT-1][i].state == STATE.BASE) {
                return i;
            }
        }
        return null;
    }

    function finishCheck() {
        var i;
        var j;

        for (j = FIELD_HEIGHT-1; j >= 0; j--) {
            for (i = FIELD_WIDTH-1; i >= 0; i--) {
                if (colorMatch(j, i, field[j][i].color) >= MIN_SELECTED_CELLS){
                    //alert( "Game Over" );
                    return false;
                }
            }
        }
        return true;
    }

    function colorMatch (j, i, color) {
        var count = 0;
        if (borderCheck(j,i) && field[j][i].color === color && field[j][i].state == STATE.BASE) {
            count = 1;
            //console.log(count);
            count += colorMatch(j+1, i, color);
            count += colorMatch(j-1, i, color);
            count += colorMatch(j, i+1, color);
            count += colorMatch(j, i-1, color);
        }
        return count;
    }

    function refreshArray() {
        var i;
        var j;

        for (j = 0; j < FIELD_HEIGHT; j++) {
            for (i = 0; i < FIELD_WIDTH; i++) {
                if (field[j][i].state == STATE.SELECTED) {
                    field[j][i].state = STATE.BASE;
                }
            }
        }
    }

    function colorSelector(j, i, color) {
        var count = 0;
        if (borderCheck(j,i) && field[j][i].color === color && field[j][i].state == STATE.BASE) {
            count = 1;
            field[j][i].state = STATE.SELECTED;
            count += colorSelector(j+1, i, color);
            count += colorSelector(j-1, i, color);
            count += colorSelector(j, i+1, color);
            count += colorSelector(j, i-1, color);
        }
        return count;
    }

    function refreshField() {
        var i;
        var j;
        var element;

        for (j = 0; j < FIELD_HEIGHT; j++) {
            for (i = 0; i < FIELD_WIDTH; i++) {
                element = document.getElementById(generateId(j,i));
                element.style.backgroundColor = field[j][i].color;

                switch (field[j][i].state) {
                    case STATE.SELECTED:
                        element.innerText = "+";
                        break;
                    case STATE.BASE:
                        element.innerText = "O";
                        element.className = "";
                        break;
                    case STATE.EMPTY:
                        element.innerText = "X";
                        element.className = "deleted-cell";
                        break;
                }
            }
        }
    }

    function borderCheck(j, i){
        return j >= 0 && i >= 0 && j < FIELD_HEIGHT && i < FIELD_WIDTH;
    }

    /*    function generateColor() {
     return COLOR[KEYS[parseInt(Math.random() * (KEYS.length - 1) + 1, 10)]];
     }*/

    function generateId(j, i){
        return "cell-" + j + "-" + i;
    }

    function factorial(number) {
        if (number == 1 || number == 0) {
            return 1;
        }
        return number * factorial(number-1);
    }

}