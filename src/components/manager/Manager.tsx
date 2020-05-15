import React, {useState, useEffect} from 'react'
import {Pane, Dialog, TextInputField, Button} from 'evergreen-ui'

import Topbar from '../topbar/Topbar'
import PortfolioCoins from '../coins/Coins'
import Portfolio from '../portfolio/Portfolio'
import {Coin} from '../../models'

import UserDetails from '../user/User'

export default function Manager() {

    let [selectedCoin,
        setSelectedCoin] = useState < Coin | undefined > (undefined);

    return (
        <Pane display="flex" width='100%' height='100%' justifyContent="center">

            <UserDetails />

            <Pane display="flex" width='70%' height='100%' flexDirection='column'>
                <Topbar/>
                <Pane display="flex" width="100%" height='100%' border='default'>
                    <Pane width="20%" height='100%' border='default'>
                        <PortfolioCoins
                            onCoinSelected={(coin : Coin) => {
                            setSelectedCoin(coin);
                        }}/>
                    </Pane>
                    <Pane width="80%" height='100%' border='default'>
                        <Portfolio selectedCoin={selectedCoin}/>
                    </Pane>
                </Pane>
            </Pane>

        </Pane>
    )

}