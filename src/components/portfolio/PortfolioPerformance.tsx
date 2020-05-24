import React, {useState, useEffect} from 'react'
import {Pane, Heading, minorScale} from 'evergreen-ui'

import {Purchase, Coin, User} from '../../models'

export default function PortfolioPerformance(props : any) {

    let [amountSpend,
            setAmountSpend] = useState < Map < String,
        number >> (new Map());

    useEffect(() => {
        let tempSpendMap = new Map < String,
            number > ();
        props
            .purchases
            .forEach((purchase : Purchase) => {
                console.log(purchase);
                let sum = tempSpendMap.get(purchase.currency);
                if (sum === undefined) {
                    tempSpendMap.set(purchase.currency, purchase.amount);
                } else {
                    tempSpendMap.set(purchase.currency, (sum + purchase.amount));
                }
            });
        setAmountSpend(tempSpendMap);
    }, [props.purchases]);

    return (
        <Pane></Pane>
    )
}