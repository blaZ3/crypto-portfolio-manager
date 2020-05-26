import React, {useState, useEffect} from 'react'
import {Pane, Text, Table, minorScale, IconButton} from 'evergreen-ui'

import {Purchase} from '../../models'
import {removePurchase} from '../../repositories/PortfolioRepo'

export default function ListPurchases(props : any) {

    let [purchases,
        setPurchases] = useState < Purchase[] > ([]);

    useEffect(() => {
        setPurchases(props.purchases);
    }, [props.purchases]);

    let deletePurchase = (purchase : Purchase) => {
        if (window.confirm("Are you sure you want to delete purchase of " + purchase.amount)) {
            removePurchase(props.coin.symbol, purchase).then((success : boolean) => {
                if (success) {
                    props.onPurchasesUpdated();
                }
            }).catch((err) => {
                alert(err);
            });
        }
    }

    let editPurchase = (purchase : Purchase) => {
        alert(purchase.uuid);
    }

    return (
        <Pane>
            <Table>
                <Table.Head>
                    <Table.TextHeaderCell>
                        Date
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>
                        Price
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>
                        Amount
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>
                        Quantity
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>
                        Actions
                    </Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                    {purchases.map((purchase, i) => {
                        return <Table.Row key={i}>
                            <Table.TextCell>{purchase.date}</Table.TextCell>
                            <Table.TextCell isNumber>{purchase.price}</Table.TextCell>
                            <Table.TextCell isNumber>{purchase.amount}</Table.TextCell>
                            <Table.TextCell isNumber>{purchase.quantity}</Table.TextCell>
                            <Table.TextCell>
                                <Pane display="flex" flexDirection="row" justifyContent="center">
                                    <IconButton
                                        margin={minorScale(2)}
                                        icon="trash"
                                        intent="none"
                                        onClick={() => {
                                        deletePurchase(purchase);
                                    }}/>
                                </Pane>
                            </Table.TextCell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>

            {purchases.length < 1 && <Text padding={minorScale(2)}>No purchase yet!</Text>}

        </Pane>
    )
}
