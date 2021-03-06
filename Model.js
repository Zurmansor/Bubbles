function Model() {
    var settings = Settings();
    var state = StateEnum();
    var field = [];
    var countDeletedCells = 0;
    var score = 0;

    this.generate = function () {
        //field = [];
        var i;
        var j;
        for (j = 0; j < settings.FIELD_HEIGHT; j++) {
            field[j] = [];
            for (i = 0; i < settings.FIELD_WIDTH; i++) {
                field[j][i] = {
                    color: generateColor(),
                    state: state.BASE
                };
            }
        }
    };

    var generateColor = function () {
        var color = ColorEnum();
        var keys = Object.keys(color);
        return color[keys[parseInt(Math.random() * (keys.length - 1) + 1, 10)]];
    };

    this.getField = function() {
        return field;
    };

    this.deleteCells = function () {
        var i;
        var j;

        for (j = 0; j < settings.FIELD_HEIGHT; j++) {
            for (i = 0; i < settings.FIELD_WIDTH; i++) {
                if (field[j][i].state == state.MATCHED) {
                    countDeletedCells++;
                    field[j][i].state = state.EMPTY;
                    field[j][i].color = null;
                }
            }
        }
        score += countDeletedCells * countDeletedCells;
        spanScore.innerText = score;
        countDeletedCells = 0;
    };

    this.getScore = function () {
        return score;
    };

    this.verticalShift = function () {
        var i;
        var j;

        for (j = settings.FIELD_HEIGHT-1; j > 0; j--) {
            for (i = settings.FIELD_WIDTH-1; i >= 0; i--) {
                if (field[j][i].state == state.EMPTY) {
                    var z = getVerticalBase(j, i);
                    if (z != null) {
                        field[j][i].state = field[z][i].state;
                        field[j][i].color = field[z][i].color;
                        field[z][i].state = state.EMPTY;
                        field[z][i].color = null;
                    }
                }
            }
        }
    };

    this.horizontalShift = function () {
        var j = settings.FIELD_HEIGHT-1;
        var i;

        for (i = settings.FIELD_WIDTH-1; i >= 0; i--) {
            if (field[settings.FIELD_HEIGHT-1][i].state == state.EMPTY) {
                var z = getHorizontalBase(i);
                if (z != null) {
                    for (j = settings.FIELD_HEIGHT-1; j >= 0; j--) {
                        field[j][i].state = field[j][z].state;
                        field[j][i].color = field[j][z].color;
                        field[j][z].state = state.EMPTY;
                        field[j][z].color = null;
                    }
                }
            }
        }
    };

    function getVerticalBase(j, i) {
        for (j; j >= 0; j--) {
            if (field[j][i].state == state.BASE) {
                return j;
            }
        }
        return null;
    }

    function getHorizontalBase(i) {
        for (i; i >= 0; i--) {
            if (field[settings.FIELD_HEIGHT-1][i].state == state.BASE) {
                return i;
            }
        }
        return null;
    }

    this.refresh = function () {
        var i;
        var j;

        for (j = 0; j < settings.FIELD_HEIGHT; j++) {
            for (i = 0; i < settings.FIELD_WIDTH; i++) {
                if (field[j][i].state == state.MATCHED) {
                    field[j][i].state = state.BASE;
                }
            }
        }
    };

    function borderCheck(j, i){
        return j >= 0 && i >= 0 && j < settings.FIELD_HEIGHT && i < settings.FIELD_WIDTH;
    }


     this.finishCheck = function () {
         var i;
         var j;

         for (j = settings.FIELD_HEIGHT-1; j >= 0; j--) {
             for (i = settings.FIELD_WIDTH-1; i >= 0; i--) {
                 if (this.colorMatch(j, i, field[j][i].color) >= settings.MIN_SELECTED_CELLS){
                     //alert( "Game Over" );
                     return false;
                 }
             }
         }
         return true;
     };

    this.colorMatch = function (j, i, color) {
        var count = 0;
        if (borderCheck(j,i) && field[j][i].color === color && field[j][i].state == state.BASE) {
            count = 1;
            //console.log(count);
            field[j][i].state = state.MATCHED;
            count += this.colorMatch(j+1, i, color);
            count += this.colorMatch(j-1, i, color);
            count += this.colorMatch(j, i+1, color);
            count += this.colorMatch(j, i-1, color);
        }
        return count;
    };
}
