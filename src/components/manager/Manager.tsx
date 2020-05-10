import React, {useState} from 'react'
import {Pane} from 'evergreen-ui'

import Topbar from '../topbar/Topbar'
import PortfolioCoins from '../coins/Coins'
import Portfolio from '../portfolio/Portfolio'

export default function Manager() {

    return (
        <Pane display="flex" width='100%' height='100%' justifyContent="center">

            <Pane display="flex" width='70%' height='100%' flexDirection='column'>
                <Topbar/>
                <Pane
                    display="flex"
                    width="100%"
                    height='100%'
                    border='default'>
                    <Pane width="20%" height='100%' border='default'>
                        <PortfolioCoins />
                    </Pane>
                    <Pane width="80%" height='100%' border='default'>
                        <Portfolio/>
                    </Pane>
                </Pane>
            </Pane>

        </Pane>
    )

}