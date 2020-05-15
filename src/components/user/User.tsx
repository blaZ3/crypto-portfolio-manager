import React, {useState, useEffect, FormEvent} from 'react'
import {
    Pane,
    Dialog,
    TextInputField,
    TextInput,
    Button,
    Text
} from 'evergreen-ui'
import {Coin, User} from '../../models'
import {getUser, saveUser} from '../../repositories/UserRepository'

export default function UserDetails() {

    let [showUserDialog,
        setShowUserDialog] = useState(false);

    let [name,
        setName] = useState < String > ("");

    let [currency,
        setCurrency] = useState < String > ("");

    let [coin,
        setCoin] = useState < String > ("");

    let [errorMsg,
        setErrorMsg] = useState < String | undefined > (undefined);

    useEffect(() => {
        getUser().then((user : User | undefined) => {
            if (user !== undefined) {
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
                onChange={(e : FormEvent) => setName((e.target as HTMLInputElement).value.toUpperCase())}/>
            <TextInputField
                placeholder="Currency: EUR, USD etc."
                onChange={(e : FormEvent) => setCurrency((e.target as HTMLInputElement).value.toUpperCase())}/>
            <TextInputField
                placeholder="Default coin: BTC, ETH etc."
                onChange={(e : FormEvent) => setCoin((e.target as HTMLInputElement).value.toUpperCase())}/>

            <Button
                appearance="primary"
                onClick={() => {
                saveUserDetail();
            }}>Save</Button>

        </Dialog>
    )
}