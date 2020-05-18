import React, {useState, FormEvent, useEffect} from 'react'
import {Pane, Text, Table, minorScale, IconButton} from 'evergreen-ui'

import {getPurchases} from '../../repositories/PortfolioRepo'
import {Purchase} from '../../models'

export default function ListPurchases(props : any) {

    let [purchases,
        setPurchases] = useState < Purchase[] > ([]);

    useEffect(() => {
        setPurchases(props.purchases);
    }, [props.purchases]);

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
                    <Table.TextHeaderCell>
                        Actions
                    </Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                    {purchases.map((purchase, i) => {
                        return <Table.Row key={i} isSelectable onSelect={() => alert(purchase.amount)}>
                            <Table.TextCell>{purchase.date}</Table.TextCell>
                            <Table.TextCell isNumber>{purchase.price}</Table.TextCell>
                            <Table.TextCell isNumber>{purchase.amount}</Table.TextCell>
                            <Table.TextCell>
                                <Pane display="flex" flexDirection="row" justifyContent="center">
                                    <IconButton margin={minorScale(2)} icon="trash" intent="none"/>
                                    <IconButton margin={minorScale(2)} icon="edit" intent="none"/>
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
