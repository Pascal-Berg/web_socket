module.exports = {
    validateEntry: function (data) {
        return new Promise((resolve, reject) => {
            let json;
            try {
                json = JSON.parse(data);
            } catch (e) {
                reject('Not a Valid JSON object.');
                return;
            }

            if (!json.username) {
                reject("JSON doesn't have a Field username");
                return;
            }
            if (json.username.length > 15) {
                reject("Field username can't be more than 15 Characters long");
                return;
            }
            if (!json.entry) {
                reject("JSON doesn't have a Field entry");
                return;
            }
            if (json.entry.length > 510) {
                reject("Field entry can't be more than 510 Characters long");
                return;
            }
            resolve(json);
        });
    },
};
