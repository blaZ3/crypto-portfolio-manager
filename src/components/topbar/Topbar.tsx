import React, {useState, useEffect} from 'react'
import {Pane, Text, Button} from 'evergreen-ui'
import {User} from '../../models'
import {getUser} from '../../repositories/UserRepository'

export default function Topbar(props: any) {

    let [user,
        setUser] = useState < User | undefined > (undefined);

    useEffect(() => {
        getUser().then((user) => {
            setUser(user);
        }).catch((err : String) => {});
    }, []);

    return (
        <Pane
            width="100%"
            height={52}
            border="default"
            display="flex"
            justifyContent="center">
            {user !== undefined && <UserDetailView user={user} showUserUpdate={props.showUserUpdate}/>}
        </Pane>
    )
}

function UserDetailView(props : any) {
    return (
        <div>
            <Text>Welcome {props.user.name}!</Text>
            <Text> - {props.user.currency}</Text>
            <Text> - {props.user.defaultCoinSymbol}</Text>
            <Button appearance="minimal" onClick={() => {
                props.showUserUpdate();
            }}>Update</Button>
        </div>
    )
}
