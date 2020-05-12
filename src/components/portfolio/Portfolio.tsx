import React, {useState} from 'react'
import {Pane, Text, Heading, minorScale} from 'evergreen-ui'

export default function Portfolio(props : any) {
    return (
        <div>
            <Heading size={500} margin={minorScale(2)}>
                {props.selectedCoin != undefined && props.selectedCoin.symbol}
            </Heading>
        </div>
    )
}