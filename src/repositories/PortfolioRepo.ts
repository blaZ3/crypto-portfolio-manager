import {Coin, Purchase} from "../models";

const KEY_PORTFOLIO = "PORTFOLIO";
const KEY_PURCHASES = "PURCHASES";

/**
 * load current porfolio form local storage
 */
export function getCoins() : Map < String,
Coin > {
    let portfolio = new Map < String,
        Coin > ();

    let portfolioData = localStorage.getItem(KEY_PORTFOLIO);
    if (portfolioData != null) {
        let portfolioJson = JSON.parse(portfolioData);
        portfolioJson
            .sort()
            .forEach((item : any) => {
                portfolio.set(item.symbol, item);
            })
    }

    return portfolio;
}

/**
 * saves the given map of potofilio as a list to local storage
 */
export function saveCoins(portfolio : Map < String, Coin >) : Promise < boolean > {
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

export function addCoinPurchase(coin : String, purchase : Purchase) : Promise < boolean > {
    return new Promise < boolean > ((resolve, reject) => {
        try {
            let purchasesData = localStorage.getItem(KEY_PURCHASES);
            var purchasesMap = new Map < String,
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
            reject();
        }
    });
}

export function getPurchases(coin : String) : Promise < Purchase[] > {
    return new Promise < Purchase[] > ((resolve, reject) => {
        let purchaseMapData = localStorage.getItem(KEY_PURCHASES);
        var purchases : Purchase[] = [];
        if (purchaseMapData != null) {
            let purchaseMap = new Map(JSON.parse(purchaseMapData));
            purchaseMap.forEach((value : any, key : any) => {
                if (key === coin) {
                    value.forEach((item : any) => {
                        purchases.push(item);
                    });
                }
            });
        }
        resolve(purchases);
    });
}

function updatePurchases(coin : String, purchases : Purchase[]) : Promise < boolean > {
    return new Promise < boolean > ((resolve, reject) => {
        try {
            let purchasesData = localStorage.getItem(KEY_PURCHASES);
            var purchasesMap = new Map < String,
                any > ();
            if (purchasesData != null) {
                purchasesMap = new Map(JSON.parse(purchasesData));
            }
            purchasesMap.set(coin, purchases);
            localStorage.setItem(KEY_PURCHASES, JSON.stringify(Array.from(purchasesMap.entries())));
            resolve(true);
        } catch (e) {
            reject();
        }
    });
}

export function removePurchase(coin : String, purchase : Purchase) : Promise < boolean > {
    return new Promise < boolean > ((resolve, reject) => {
        let newPurchases : Purchase[] = [];
        getPurchases(coin).then((purchases) => {
            purchases.forEach((item) => {
                if (item.uuid !== purchase.uuid) {
                    newPurchases.push(item);
                }
                updatePurchases(coin, newPurchases).then((success : boolean) => {
                    resolve(success);
                }).catch((e) => {
                    reject();
                });
            });
        }).catch((err) => {
            reject();
        });
    });
}