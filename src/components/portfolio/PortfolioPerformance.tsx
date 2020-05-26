import React, {useState, useEffect} from 'react'
import {Pane, Heading, minorScale, Text} from 'evergreen-ui'

import {Purchase, Coin, User} from '../../models'

export default function PortfolioPerformance(props : any) {

    let [amountSpend,
        setAmountSpend] = useState < number > (0.0);
    let [totalCoins,
        setTotalCoins] = useState(0);
    let [performace,
        setPerformance] = useState(0);
    let [performanceColor,
        setPerfColor] = useState("green");

    useEffect(() => {
        let tempAmountSpend = 0
        let tempTotalCoins = 0
        props
            .purchases
            .forEach((purchase : Purchase) => {
                tempAmountSpend = tempAmountSpend + purchase.amount
                tempTotalCoins = tempTotalCoins + purchase.quantity
            });
        setAmountSpend(tempAmountSpend);
        setTotalCoins(tempTotalCoins);
        setPerformance((tempTotalCoins * props.coin.sellPrice) - tempAmountSpend)
        if (performace > 0) {
            setPerfColor("green");
        } else {
            setPerfColor("red");
        }
    }, [props.purchases]);

    return (
        <Pane display="flex" flexDirection='row'>
            <Pane display="flex" flexDirection='column' flex={1} background="tint1">
                <Heading size={300} marginTop="default">Amount spent</Heading>
                <Pane>
                    <Text margin={minorScale(2)}>{props.user.currency}</Text>
                    <Text margin={minorScale(2)}>{amountSpend}</Text>
                </Pane>
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
                <Text color={performanceColor} margin={minorScale(2)}>{performace}</Text>
            </Pane>
        </Pane>
    )
}
