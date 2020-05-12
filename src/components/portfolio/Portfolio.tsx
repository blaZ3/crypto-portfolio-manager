import React, {useState} from 'react'
import {Pane, Text, Heading, minorScale, TextInput, Button, IconButton} from 'evergreen-ui'

export default function Portfolio(props : any) {

    if (props.selectedCoin == undefined) {
        return (
            <div></div>
        )
    }

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
                <TextInput placeholder="Date" width={120} margin={minorScale(1)}/>
                <TextInput placeholder="Amount incl fees" width={220} margin={minorScale(1)}/>
                <TextInput placeholder="Rate of purchase" width={220} margin={minorScale(1)}/>
                <TextInput placeholder="Amount purchased" width={220} margin={minorScale(1)}/>
                <IconButton icon="plus" />
            </Pane>

        </Pane>
    )
}