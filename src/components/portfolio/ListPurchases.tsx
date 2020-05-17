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

import {getPurchases} from '../../repositories/PortfolioRepo'

export default function ListPurchases(props : any) {

    useEffect(() => {
        if(props.coin !== undefined){
            getPurchases(props.coin).then((purchases) => {
                console.log(purchases);
            }).catch((err) => {
                alert("Error fetching purchases");
            });
        }        
    }, [props.coin]);

    return (
        <Pane></Pane>
    )
}