import React, {useState, useEffect, FormEvent} from 'react'
import {
    Pane,
    Dialog,
    TextInputField,
    TextInput,
    Button,
    Text
} from 'evergreen-ui'
import {User} from '../../models'
import {getUser, saveUser} from '../../repositories/UserRepository'

export default function UserDetails(props : any) {

    let [showUserDialog,
        setShowUserDialog] = useState(props.showUserDialog);

    let [name,
        setName] = useState < String > ("");

    let [currency,
        setCurrency] = useState < String > ("");

    let [coin,
        setCoin] = useState < String > ("");

    let [errorMsg,
        setErrorMsg] = useState < String | undefined > (undefined);

    useEffect(() => {
        setShowUserDialog(props.showUserDialog);
    }, [props.showUserDialog])

    useEffect(() => {
        getUser().then((user : User | undefined) => {
            if (user !== undefined) {
                setName(user.name);
                setCurrency(user.currency);
                setCoin(user.defaultCoinSymbol);
                setShowUserDialog(false);
            } else {
                setShowUserDialog(true);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    let saveUserDetail = () => {
        if (name !== "" && currency !== "" && coin !== "") {
            setErrorMsg(undefined);
            let user : User = {
                name: name,
                currency: currency,
                defaultCoinSymbol: coin
            };
            saveUser(user).then(() => {
                setShowUserDialog(false);
                props.userDetailsUpdated();
            }).catch((err : String) => {
                setErrorMsg(err);
            });
        } else {
            setErrorMsg("Please enter valid values for all fields");
        }
    }

    return (
        <Dialog
            isShown={showUserDialog}
            title="Add user info!"
            hasFooter={false}
            hasClose={false}
            shouldCloseOnEscapePress={false}
            shouldCloseOnOverlayClick={false}>

            {errorMsg !== undefined && <Text color="danger">{errorMsg}</Text>}

            <TextInputField
                placeholder="Name"
                value={name}
                onChange={(e : FormEvent) => setName((e.target as HTMLInputElement).value.toUpperCase())}/>
            <TextInputField
                placeholder="Currency: EUR, USD etc."
                value={currency}
                onChange={(e : FormEvent) => setCurrency((e.target as HTMLInputElement).value.toUpperCase())}/>
            <TextInputField
                placeholder="Default coin: BTC, ETH etc."
                value={coin}
                onChange={(e : FormEvent) => setCoin((e.target as HTMLInputElement).value.toUpperCase())}/>

            <Button
                appearance="primary"
                onClick={() => {
                saveUserDetail();
            }}>Save</Button>

        </Dialog>
    )
}