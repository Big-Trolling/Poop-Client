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
    },

    assign(target, ...sources) {
        const to = Object(target);

        for (let i = 0; i < sources.length; i++) {
            const source = sources[i];
            if (source != null) {
                for (const key in source) {
                    to[key] = source[key];
                }
            }
        }

        return to;
    }
}