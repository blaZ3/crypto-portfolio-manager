export interface Coin {
    name : String,
    symbol : String,
    currency : String,
    buyPrice : number,
    sellPrice : number,
    spotPrice : number
}

export interface User {
    name : String,
    currency : String,
    defaultCoinSymbol : String
}

export interface Purchase {
    uuid : String,
    amount : number,
    price : number,
    quantity : number,
    date : String,
    currency : String
}