import React from 'react'
import {Pane, Text, Button} from 'evergreen-ui'

export default function Topbar(props : any) {

    return (
        <Pane
            width="100%"
            height={52}
            border="default"
            display="flex"
            justifyContent="center">
            {props.user !== undefined && <UserDetailView user={props.user} showUserUpdate={props.showUserUpdate}/>}
        </Pane>
    )
}

function UserDetailView(props : any) {
    return (
        <div>
            <Text>Welcome {props.user.name} ! </Text>
            <Text> - {props.user.currency}</Text>
            <Text> - {props.user.defaultCoinSymbol}</Text>
            <Button
                appearance="minimal"
                onClick={() => {
                props.showUserUpdate();
            }}>Update</Button>
        </div>
    )
}
