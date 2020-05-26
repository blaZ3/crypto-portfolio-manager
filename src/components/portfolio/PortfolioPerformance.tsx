import React, {useState, useEffect} from 'react'
import {Pane, Heading, minorScale, Text} from 'evergreen-ui'

import {Purchase, Coin, User} from '../../models'

export default function PortfolioPerformance(props : any) {

    let [amountSpend,
            setAmountSpend] = useState < Map < String,
        number >> (new Map());
    let [totalCoins,
        setTotalCoins] = useState(0);
    let [performace,
        setPerformance] = useState(0);

    useEffect(() => {
        let tempSpendMap = new Map < String,
            number > ();
        let tempTotalCoins = 0;
        props
            .purchases
            .forEach((purchase : Purchase) => {
                let sum = tempSpendMap.get(purchase.currency);
                if (sum === undefined) {
                    tempSpendMap.set(purchase.currency, purchase.amount);
                } else {
                    tempSpendMap.set(purchase.currency, (sum + purchase.amount));
                }

                tempTotalCoins += purchase.quantity
            });
        setAmountSpend(tempSpendMap);
        setTotalCoins(tempTotalCoins);
        // setPerformance(tempSpendMap)

    }, [props.purchases]);

    return (
        <Pane display="flex" flexDirection='row'>
            <Pane display="flex" flexDirection='column' flex={1} background="tint1">
                <Heading size={300} marginTop="default">Amount spent</Heading>
                {Array
                    .from(amountSpend.keys())
                    .map((key) => {
                        return <Pane>
                            <Text margin={minorScale(2)}>{key}</Text>
                            <Text margin={minorScale(2)}>{amountSpend.get(key)}</Text>
                        </Pane>
                    })}
            </Pane>
            <Pane
                marginLeft={minorScale(1)}
                display="flex"
                flexDirection='column'
                flex={1}
                background="tint1">
                <Heading size={300} marginTop="default">Coin value</Heading>
                <Text margin={minorScale(2)}>Quantity: {totalCoins}
                    {props.coin.symbol}</Text>
                <Text margin={minorScale(2)}>Current value: {totalCoins * props.coin.sellPrice}
                    {props.coin.currency}</Text>
            </Pane>
        </Pane>
    )
}
