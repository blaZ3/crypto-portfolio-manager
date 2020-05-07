let API_ROOT = "https://api.coinbase.com/v2"

export function getCoinValue(coin : String, currency : String) : Promise < Response > {
    let url = API_ROOT + `/prices/${coin}-${currency}/buy`;
    return fetch(url);
}