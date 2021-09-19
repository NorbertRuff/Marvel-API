export let dataHandler = {
    _data: {}, // it is a "cache for all data received: boards, cards and statuses. It is not accessed from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    response.json()// parse the response as JSON
                        .then(json_response => callback(json_response)) // Call the `callback` with the returned object
                }
            })
            .catch(error =>console.log(error))
    },


    _api_post: function (url, data, callback) {
        // it is not called from outside
        // sends the data to the API, and calls callback function
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                "content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(json_response => callback(json_response));
    },

    getFeaturedCards: function (url) {
        return new Promise ((resolve, reject) => {
            this._api_get(url, (response) => {
            this._data['data'] = response;
            resolve(response)
        });
    })
    },
}