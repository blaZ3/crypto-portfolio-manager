import React, {useState, useEffect} from 'react'
import {Pane} from 'evergreen-ui'

import Topbar from '../topbar/Topbar'
import ListCoins from '../coins/ListCoins'
import Portfolio from '../portfolio/Portfolio'
import {Coin, User} from '../../models'

import UserDetails from '../user/UserDetails'
import {getUser} from '../../repositories/UserRepository'

export default function Manager() {

    let [user,
        setUser] = useState < User | undefined > (undefined);

    let [selectedCoin,
        setSelectedCoin] = useState < Coin | undefined > (undefined);

    let [showUserDialog,
        setShowUserDialog] = useState(false);

    useEffect(() => {
        updateUser();
    }, []);

    function updateUser() {
        getUser().then((user) => {
            setUser(user);
        }).catch((err : String) => {});
    }

    return (
        <Pane display="flex" width='100%' height='100%' justifyContent="center">

            <UserDetails
                showUserDialog={showUserDialog}
                userDetailsUpdated={() => {
                setShowUserDialog(false);
                updateUser();
            }}/>

            <Pane display="flex" width='70%' height='100%' flexDirection='column'>
                <Topbar
                    className="test"
                    class="test"
                    user={user}
                    showUserUpdate={() => {
                    setShowUserDialog(true);
                }}/>
                <Pane display="flex" width="100%" height='100%' border='default'>
                    <Pane width="20%" height='100%' border='default'>
                        <ListCoins
                            onCoinSelected={(coin : Coin) => {
                            setSelectedCoin(coin);
                        }}/>
                    </Pane>
                    <Pane width="80%" height='100%' border='default'>
                        {selectedCoin !== undefined && <Portfolio user={user} selectedCoin={selectedCoin}/>}
                    </Pane>
                </Pane>
            </Pane>

        </Pane>
    )

}