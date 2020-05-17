import React from 'react'
import {Pane, Heading, minorScale} from 'evergreen-ui'

import AddPurchase from './AddPurchase'
import ListPurchases from './ListPurchases'

export default function Portfolio(props : any) {

    return (
        <Pane display="flex" flexDirection="column">
            <Heading size={500} margin={minorScale(2)}>{props.selectedCoin.symbol}</Heading>
            <AddPurchase coin={props.selectedCoin}/>
            <hr/>
            <ListPurchases coin={props.selectedCoin}/>
        </Pane>
    )
}