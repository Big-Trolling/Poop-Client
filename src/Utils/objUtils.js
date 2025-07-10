export default {
    keys(obj) {
        var keys = [];
        var index = 0;

        for (var prop in obj) {
            if (obj !== null && obj !== undefined) {
                keys[index] = prop;
                index++;
            }
        }

        return keys;
    },

    values(obj) {
        var keys = this.keys(obj);
        var result = [];
        var keyIndex = 0;
        var valueIndex = 0;

        while (keyIndex < keys.length) {
            var key = keys[keyIndex];
            var value = obj[key];

            result[valueIndex] = value;
            valueIndex++;
            keyIndex++;
        }

        return result;
    }
}