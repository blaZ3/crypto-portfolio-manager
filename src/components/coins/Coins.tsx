import React, {useState, FormEvent} from 'react'
import {Pane, minorScale, Button, majorScale, TextInput} from 'evergreen-ui'

export default function Coins() {

    let [coins,
        setCoins] = useState < String[] > ([])

    let [currCoinInput,
        setCurrCoinInput] = useState("")

    return (
        <div>
            <h3>Coins</h3>
            <hr/>
            <Pane display="flex" flex={1} padding={minorScale(2)}>
                <TextInput
                    name="text-input-coin"
                    placeholder="Coin"
                    value={currCoinInput}
                    onChange={(e : FormEvent) => setCurrCoinInput((e.target as HTMLInputElement).value.toUpperCase())}/>
                <Button
                    marginLeft={majorScale(1)}
                    onClick={() => {
                    setCoins(coins.concat(currCoinInput));
                    setCurrCoinInput("")
                }}>Add</Button>
            </Pane>
            <hr/> {coins.map((coin) => (
                <p>{Coin(coin)}</p>
            ))}
        </div>
    )
}

function Coin(coin : String) {
    return (
        <p>{coin}</p>
    )
}