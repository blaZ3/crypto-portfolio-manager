import {Coin} from "../models";

const KEY_PORTFOLIO = "PORTFOLIO";

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
        localStorage.setItem(KEY_PORTFOLIO, portfolioJson);
    })
}
