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

import {addCoinPurchase} from '../../repositories/PortfolioRepo'
import {Purchase} from '../../models'

export default function AddPurchase(props : any) {
    let [purchaseDate,
        setPurchaseDate] = useState("");

    let [purchaseAmount,
        setPurchaseAmount] = useState(0.0);

    let [purchasePrice,
        setPurchasePrice] = useState(props.coin.buyPrice);

    let [purchaseQuantity,
        setPurchaseQuantity] = useState(0.0);

    useEffect(() => {
        setPurchasePrice(props.coin.buyPrice);
    }, [props.coin.buyPrice]);

    useEffect(() => {
        if (purchaseAmount > 0.0 && purchasePrice > 0.0) {
            setPurchaseQuantity(purchaseAmount / purchasePrice);
        } else {
            setPurchaseQuantity(0.0);
        }
    }, [purchaseAmount, purchasePrice]);

    let addPurchase = () => {
        if (purchaseDate === "" || purchaseDate === undefined) {
            alert("Please enter a valid purchase date");
            return;
        }

        if (purchaseAmount <= 0.0) {
            alert("Please enter a valid purchase amount");
            return;
        }

        if (purchasePrice <= 0.0) {
            alert("Please enter a valid purchase price");
            return;
        }

        if (purchaseQuantity <= 0.0) {
            alert("Please enter a valid purchase quantity");
            return;
        }

        let purchase : Purchase = {
            amount: purchaseAmount,
            price: purchasePrice,
            quantity: purchaseQuantity,
            date: purchaseDate
        };
        addCoinPurchase(props.coin, purchase).then((success) => {
            if (success) {
                props.onPurchaseAdded();
                setPurchaseAmount(0.0);
            } else {
                alert("Failed to add purchase!");
            }
        }).catch((err) => {
            alert(err);
        });

    }

    return (
        <Pane
            display="flex"
            flex={1}
            flexDirection="row"
            alignItems="center"
            justifyContent="left"
            background="tint2"
            padding={minorScale(2)}>
            <TextInput
                placeholder="Date"
                width={220}
                margin={minorScale(1)}
                type="date"
                onChange={(e : FormEvent) => {
                setPurchaseDate((e.target as HTMLInputElement).value)
            }}/>
            <TextInput
                placeholder="Amount including fees"
                width={220}
                margin={minorScale(1)}
                value={purchaseAmount}
                onChange={(e : FormEvent) => {
                setPurchaseAmount(Number((e.target as HTMLInputElement).value))
            }}/>
            <TextInput
                placeholder="Purchase price"
                width={220}
                margin={minorScale(1)}
                value={purchasePrice}
                onChange={(e : FormEvent) => {
                setPurchasePrice(Number((e.target as HTMLInputElement).value))
            }}/>
            <TextInput
                value={purchaseQuantity}
                placeholder="Quantity"
                width={220}
                margin={minorScale(1)}
                onChange={(e : FormEvent) => {
                setPurchaseQuantity(Number((e.target as HTMLInputElement).value))
            }}/>
            <IconButton
                icon="plus"
                onClick={() => {
                addPurchase()
            }}/>
        </Pane>
    )
}