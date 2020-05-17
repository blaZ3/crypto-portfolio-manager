import {Coin, Purchase} from "../models";

const KEY_PORTFOLIO = "PORTFOLIO";
const KEY_PURCHASES = "PURCHASES";

/**
 * load current porfolio form local storage
 */
export function getCurrentPortfolio() : Map < String,
Coin > {
    let portfolio = new Map < String,
        Coin > ();

    let portfolioData = localStorage.getItem(KEY_PORTFOLIO);
    if (portfolioData != null) {
        let portfolioJson = JSON.parse(portfolioData);
        portfolioJson.forEach((item : any) => {
            portfolio.set(item.symbol, item);
        })
    }

    return portfolio;
}

/**
 * saves the given map of potofilio as a list to local storage
 */
export function saveCurrentPortfolio(portfolio : Map < String, Coin >) : Promise < boolean > {
    return new Promise < boolean > ((resolve, reject) => {
        let portfolioData : any[] = [];
        portfolio.forEach((value, key) => {
            portfolioData.push(value);
        });
        let portfolioJson = JSON.stringify(portfolioData);

        try {
            localStorage.setItem(KEY_PORTFOLIO, portfolioJson);
            resolve(true);
        } catch (e) {
            reject();
        }
    })
}

/**
 * Purchases are a map of coin to list of indvl purchases
 */

export function addCoinPurchase(coin : Coin, purchase : Purchase) : Promise < boolean > {
    return new Promise < boolean > ((resolve, reject) => {
        try {            
            let purchasesData = localStorage.getItem(KEY_PURCHASES);
            var purchasesMap = new Map < Coin,
                any > ();
            if (purchasesData != null) {
                purchasesMap = new Map(JSON.parse(purchasesData));
            }
            var purchaseList = purchasesMap.get(coin);
            if (purchaseList == null) {
                purchaseList = [];
            }
            purchaseList.push(purchase);
            purchasesMap.set(coin, purchaseList);
            let purchaseStr = JSON.stringify(Array.from(purchasesMap.entries()));
            localStorage.setItem(KEY_PURCHASES, purchaseStr);
            resolve(true);
        } catch (e) {
            resolve(false);
        }
    });
}

export function getPurchases(coin : Coin) : Promise < Purchase[] > {
    return new Promise < Purchase[] > ((resolve, reject) => {        
        let purchaseMapData = localStorage.getItem(KEY_PURCHASES);
        var purchases : Purchase[] = [];
        if (purchaseMapData != null) {
            let purchaseMap = new Map(JSON.parse(purchaseMapData));        
            purchaseMap.forEach((value : any, key : any) => {                
                if (key.symbol === coin.symbol) {
                    value.forEach((item : any) => {
                        purchases.push(item);
                    });
                }
            });
        }
        resolve(purchases);
    });
}