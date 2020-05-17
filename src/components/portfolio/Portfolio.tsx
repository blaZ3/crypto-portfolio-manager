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

export default function Portfolio(props : any) {

    let [purchaseDate,
        setPurchaseDate] = useState("");

    let [purchaseAmount,
        setPurchaseAmount] = useState(0.0);

    let [purchasePrice,
        setPurchasePrice] = useState(props.selectedCoin.buyPrice);

    let [purchaseQuantity,
        setPurchaseQuantity] = useState(0.0);

    useEffect(() => {
        setPurchasePrice(props.selectedCoin.buyPrice);
    }, [props.selectedCoin.buyPrice]);

    useEffect(() => {
        // alert("Koi");
    }, [purchaseAmount, purchasePrice]);

    return (
        <Pane display="flex" flexDirection="column">
            <Heading size={500} margin={minorScale(2)}>{props.selectedCoin.symbol}</Heading>
            <Pane
                display="flex"
                flex={1}
                flexDirection="row"
                alignItems="center"
                justifyContent="left"
                background="tint2"
                padding={minorScale(2)}>
                <TextInput placeholder="Date" width={220} margin={minorScale(1)} type="date"/>
                <TextInput
                    placeholder="Amount including fees"
                    width={220}
                    margin={minorScale(1)}
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
                <TextInput placeholder="Quantity" width={220} margin={minorScale(1)}/>
                <IconButton icon="plus"/>
            </Pane>

        </Pane>
    )
}