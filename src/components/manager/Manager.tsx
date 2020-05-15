import React, {useState, useEffect} from 'react'
import {Pane, Dialog, TextInputField, Button} from 'evergreen-ui'

import Topbar from '../topbar/Topbar'
import PortfolioCoins from '../coins/Coins'
import Portfolio from '../portfolio/Portfolio'
import {Coin, User} from '../../models'

import {getUser, saveUser} from '../../repositories/UserRepository'

export default function Manager() {

    let [selectedCoin,
        setSelectedCoin] = useState < Coin | undefined > (undefined);

    let [showUserDialog,
        setShowUserDialog] = useState(false);

    useEffect(() => {
        getUser().then((user : User | undefined) => {
            if (user !== undefined) {
                setShowUserDialog(false);
            } else {
                setShowUserDialog(true);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <Pane display="flex" width='100%' height='100%' justifyContent="center">

            <Dialog
                isShown={showUserDialog}
                title="Add user info!"
                hasFooter={false}
                hasClose={false}
                shouldCloseOnEscapePress={false}
                shouldCloseOnOverlayClick={false}>

                <TextInputField placeholder="Name"/>
                <TextInputField placeholder="Currency: EUR, USD etc."/>
                <TextInputField placeholder="Default coin: BTC, ETH etc."/>

                <Button
                    appearance="primary"
                    onClick={() => {
                    setShowUserDialog(false)
                }}>Save</Button>

            </Dialog>

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