export interface Coin {
    name : String,
    symbol : String,
    currency : String,
    buyPrice : Number,
    sellPrice : Number,
    spotPrice : Number
}

export interface User {
    name : String,
    currency : String,
    defaultCoinSymbol : String
}