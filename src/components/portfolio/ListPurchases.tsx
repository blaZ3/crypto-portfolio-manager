import React, {useState, FormEvent, useEffect} from 'react'
import {
    Pane,
    Text,
    Table,
    Heading,
    minorScale,
    TextInput,
    Button,
    IconButton
} from 'evergreen-ui'

import {getPurchases} from '../../repositories/PortfolioRepo'
import {Purchase} from '../../models'

export default function ListPurchases(props : any) {

    let [purchases,
        setPurchases] = useState < Purchase[] > ([]);

    useEffect(() => {
        if (props.coin !== undefined) {
            getPurchases(props.coin).then((purchases) => {
                setPurchases(purchases);
            }).catch((err) => {
                alert("Error fetching purchases");
            });
        }
    }, [props.coin]);

    return (
        <Pane>
            <Table>
                <Table.Head>
                    <Table.TextHeaderCell>
                        Date
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>
                        Amount
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>
                        Price
                    </Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                    {purchases.map((purchase, i) => {
                        return <Table.Row key={i} isSelectable onSelect={() => alert(purchase.amount)}>
                            <Table.TextCell>{purchase.date}</Table.TextCell>
                            <Table.TextCell isNumber>{purchase.price}</Table.TextCell>
                            <Table.TextCell isNumber>{purchase.amount}</Table.TextCell>
                        </Table.Row>

                    })}
                </Table.Body>
            </Table>

            {purchases.length < 1 && <Text padding={minorScale(2)}>No purchase yet!</Text>}

        </Pane>
    )
}
