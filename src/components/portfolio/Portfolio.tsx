import React, {useState, useEffect} from 'react'
import {Pane, Heading, minorScale} from 'evergreen-ui'

import AddPurchase from './AddPurchase'
import ListPurchases from './ListPurchases'
import {getPurchases} from '../../repositories/PortfolioRepo'
import {Purchase, Coin} from '../../models'

export default function Portfolio(props : any) {

    let [purchases,
        setPurchases] = useState < Purchase[] > ([]);

    useEffect(() => {
        loadPurchases(props.selectedCoin);
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
            <AddPurchase
                coin={props.selectedCoin}
                onPurchaseAdded={() => {
                loadPurchases(props.selectedCoin);
            }}/>
            <hr/>
            <ListPurchases coin={props.selectedCoin} purchases={purchases}/>
        </Pane>
    )
}