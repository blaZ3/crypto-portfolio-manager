import React, {useState, FormEvent, useEffect} from 'react'
import {
    Pane,
    minorScale,
    Button,
    majorScale,
    TextInput,
    Text,
    IconButton,
    Tooltip
} from 'evergreen-ui'

import {getCoinBuyPrice, getCoinSellPrice, getCoinSpotPrice} from '../../services/CoinbaseService'
import {saveCoins, getCoins} from '../../repositories/PortfolioRepo'

import {Coin} from '../../models'

export default function ListCoins(props : any) {

    let [currency] = useState("EUR");

    let defaultCoinMaps = new Map < String,
        Coin > ();

    useEffect(() => {
        let portfolios = getCoins();
        portfolios.forEach((value, key) => {
            fetchCoinDetails(key);
        });
        props.onCoinSelected(portfolios.values().next().value);
    }, [])

    let [coins,
            setCoins] = useState < Map < String,
        Coin > > (defaultCoinMaps);

    let [currCoinInput,
        setCurrCoinInput] = useState < String > ("");

    let [addCoinError,
        setAddCoinError] = useState(undefined);

    let fetchCoinDetails = (coin : String) => {
        getCoinBuyPrice(coin, currency).then((json) => {
            let coinData : Coin | undefined = coins
                ?.get(json.base);
            if (coinData !== undefined) {
                coinData.buyPrice = json.amount;
            } else {
                coinData = {
                    name: json.base,
                    symbol: json.base,
                    currency: json.currency,
                    buyPrice: json.amount,
                    sellPrice: 0,
                    spotPrice: 0
                }
            }

            setCoins(new Map(coins
                ?.set(json.base, coinData)));
            saveCoins(coins);

            getCoinSellPrice(coin, currency).then((json) => {
                coinData !!.sellPrice = json.amount;
                setCoins(new Map(coins
                    ?.set(json.base, coinData !!)));
                saveCoins(coins);
            });

            getCoinSpotPrice(coin, currency).then((json) => {
                coinData !!.spotPrice = json.amount;
                setCoins(new Map(coins
                    ?.set(json.base, coinData !!)));
                saveCoins(coins);
            });
        }).catch((err) => {
            console.log(err);
            setAddCoinError(err);
            setCurrCoinInput("");
        });
    }

    let removeCoin = (coin : Coin) => {
        if (window.confirm("Are you sure you want to remove " + coin.symbol)) {

            

            let newCoins = new Map(coins);
            newCoins.delete(coin.symbol);
            setCoins(newCoins);
        }
    }

    return (
        <div>
            <Pane alignItems="center" justifyContent="center" display="flex">
                <Text margin={minorScale(2)}>Coins</Text>
                <Tooltip content="Refresh coin values">
                    <IconButton
                        icon="refresh"
                        onClick={() => {
                        coins.forEach((value, key) => {
                            fetchCoinDetails(key)
                        })
                    }}/>
                </Tooltip>
            </Pane>
            <hr/>
            <Pane>
                <Pane display="flex" flex={1} padding={minorScale(2)}>
                    <TextInput
                        name="text-input-coin"
                        placeholder="Coin"
                        value={currCoinInput}
                        onChange={(e : FormEvent) => setCurrCoinInput((e.target as HTMLInputElement).value.toUpperCase())}/>
                    <Button
                        marginLeft={majorScale(1)}
                        onClick={() => {
                        setAddCoinError(undefined);
                        fetchCoinDetails(currCoinInput);
                        setCurrCoinInput("");
                    }}>Add</Button>
                </Pane>
                <Text color="danger">{addCoinError !== undefined && addCoinError}</Text>
            </Pane>
            <hr/> {coins !== undefined && getCoinsList(coins).map((coin) => {
                return CoinView(coin, props.onCoinSelected, (coin : Coin) => {
                    removeCoin(coin);
                })
            })}
        </div>
    )
}

function getCoinsList(coins : Map < String, Coin >) : Coin[] {
    let coinArr : Coin[] = [];
    coins.forEach((value : Coin, key : String) => {
        coinArr.push(value)
    });
    return coinArr;
}

function CoinView(coin : Coin, onSelected : (coin : Coin) => void, onRemove : (coin : Coin) => void) {
    return (
        <Pane
            display="flex"
            flexDirection="column"
            margin={minorScale(2)}
            padding={minorScale(1)}
            background="greenTint"
            borderRadis={4}
            border="default"
            style={{
            'cursor': 'pointer'
        }}
            onClick={() => {
            onSelected(coin)
        }}>
            {coin.symbol}
            <Pane display="flex" justifyContent="left" flexDirection="column">
                <Text>Buy: {coin.buyPrice}
                    {coin.currency}
                </Text>
                <Text>Sell: {coin.sellPrice}
                    {coin.currency}
                </Text>
                <Pane flex={1} height={2} borderTop="default"/>
                <Pane flex={1}>
                    <Button
                        appearance="minimal"
                        onClick={() => {
                        onRemove(coin);
                    }}>Remove</Button>
                </Pane>
            </Pane>
        </Pane>
    )
}