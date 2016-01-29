function Model() {
    var settings = Settings();
    var state = StateEnum();
    var field = [];

    this.generate = function () {
        var i;
        var j;
        var color;
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
    }

}
