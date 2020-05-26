import React, {useState, useEffect} from 'react'
import {Pane, Heading, minorScale} from 'evergreen-ui'

import AddPurchase from './AddPurchase'
import ListPurchases from './ListPurchases'
import PortfolioPerformance from './PortfolioPerformance'
import {getPurchases} from '../../repositories/PortfolioRepo'
import {getUser} from '../../repositories/UserRepository'
import {Purchase, Coin, User} from '../../models'

export default function Portfolio(props : any) {
    let [currency,
        setCurrency] = useState < String | undefined > (undefined);
    let [purchases,
        setPurchases] = useState < Purchase[] > ([]);

    useEffect(() => {
        loadPurchases(props.selectedCoin);
    }, [props.selectedCoin]);

    useEffect(() => {
        getUser().then((user) => {
            if (user !== undefined) {
                setCurrency(user.currency)
            }
        });
    }, [props.selectedCoin]);

    function loadPurchases(coin : Coin) {
        getPurchases(coin.symbol).then((purchases) => {
            setPurchases(purchases);
        }).catch((err) => {
            alert("Error fetching purchases");
        });
    }

    return (
        <Pane display="flex" flexDirection="column">
            <Heading size={500} margin={minorScale(2)}>{props.selectedCoin.symbol}</Heading>
            {purchases.length > 0 && <PortfolioPerformance user={props.user} coin={props.selectedCoin} purchases={purchases}/>}
            {currency !== undefined && <AddPurchase
                coin={props.selectedCoin}
                currency={currency}
                onPurchaseAdded={() => {
                loadPurchases(props.selectedCoin);
            }}/>}
            <ListPurchases
                coin={props.selectedCoin}
                purchases={purchases}
                onPurchasesUpdated={() => {
                loadPurchases(props.selectedCoin);
            }}/>
        </Pane>
    )
}