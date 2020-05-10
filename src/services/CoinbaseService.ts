let API_ROOT = "https://api.coinbase.com/v2"

export function getCoinBuyPrice(coin : String, currency : String) : Promise < any > {
    let url = API_ROOT + `/prices/${coin}-${currency}/buy`;
    return new Promise < any > ((resolve, reject) => {
        fetch(url).then((response) => {
            if (response.ok) {
                response
                    .json()
                    .then((json) => {
                        resolve(json.data);
                    })
            } else {
                reject(`Error fetching coin details for ${coin}`);
            }
        });
    })
}

export function getCoinSellPrice(coin : String, currency : String) : Promise < any > {
    let url = API_ROOT + `/prices/${coin}-${currency}/sell`;
    return new Promise < any > ((resolve, reject) => {
        fetch(url).then((response) => {
            if (response.ok) {
                response
                    .json()
                    .then((json) => {
                        resolve(json.data);
                    })
            } else {
                reject(`Error fetching coin details for ${coin}`);
            }
        });
    })
}

export function getCoinSpotPrice(coin : String, currency : String) : Promise < any > {
    let url = API_ROOT + `/prices/${coin}-${currency}/spot`;
    return new Promise < any > ((resolve, reject) => {
        fetch(url).then((response) => {
            if (response.ok) {
                response
                    .json()
                    .then((json) => {
                        resolve(json.data);
                    })
            } else {
                reject(`Error fetching coin details for ${coin}`);
            }
        });
    })
}