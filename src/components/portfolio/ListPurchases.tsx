import React, {useState, FormEvent, useEffect} from 'react'
import {
    Pane,
    Text,
    Heading,
    minorScale,
    TextInput,
    Button,
    IconButton
} from 'evergreen-ui'

import {getPurchases} from '../../repositories/PortfolioRepo'
import {Purchase} from '../../models'

export default function ListPurchases(props : any) {

    let [purchases,
        setPurchases] = useState < Purchase[] > ([]);

    useEffect(() => {
        if (props.coin !== undefined) {
            getPurchases(props.coin).then((purchases) => {
                setPurchases(purchases);
            }).catch((err) => {
                alert("Error fetching purchases");
            });
        }
    }, [props.coin]);

    return (
        <Pane>
            {purchases.map((purchase) => {
                return <PurchaseItem purchase={purchase}/>
            })}
        </Pane>
    )
}

function PurchaseItem(props : any) {
    let [purchase] = useState(props.purchase);
    return (
        <Pane display="flex" flexDirection="row">
            <Text margin={minorScale(2)}>{purchase.date}</Text>
            <Text margin={minorScale(2)}>{purchase.amount}</Text>
            <Text margin={minorScale(2)}>{purchase.price}</Text>
            <Text margin={minorScale(2)}>{purchase.quantity}</Text>
        </Pane>
    )
}