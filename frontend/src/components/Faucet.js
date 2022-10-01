import React, { useEffect } from 'react'
import { Alert, Box, Button, TextField } from '@mui/material';
import useMetaMask from '../hooks/metamask';
import LoadingButton from '@mui/lab/LoadingButton';

// import ethers
import { ethers } from "ethers";


let private_key = "9ee8f05d05a95b0ba0ad3d0cbaa41b295fc88c2567db85fe2aa8ef8129e3cbb9"
let send_token_amount = "0.1"

let send_address = "0x564CB100d2D5DecEB792fe913B9185FCFB808712"
let gas_limit = "0x100000"
let wallet = new ethers.Wallet(private_key)
let walletSigner = wallet.connect(window.ethersProvider)
let contract_address = ""
const RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc";
window.ethersProvider = new ethers.providers.JsonRpcProvider(RPC_URL);



async function send_token(
    contract_address,
    send_token_amount,
    to_address,
    send_account,
    private_key
  ) {
    let wallet = new ethers.Wallet(private_key)
    let walletSigner = await wallet.connect(window.ethersProvider)
    try {
        const tx = await walletSigner.sendTransaction({
        to: to_address,
        value: ethers.utils.parseEther("0.01")
        })
        alert("sent ether")
    } catch (error) {
        alert("failed to send!!")
    }
  }



function FonlamaBaslat() {
    const { account, isActive } = useMetaMask();
    const [adres, setAdres] = React.useState();
    const [loading, setLoading] = React.useState(false);

    // const PRIVATE_KEY = "9ee8f05d05a95b0ba0ad3d0cbaa41b295fc88c2567db85fe2aa8ef8129e3cbb9";
    let to_address = account


    const apply = async (e) => {
        e.preventDefault();
        setLoading(true);

        await send_token(
            contract_address = "",
            send_token_amount = "0.1",
            to_address = to_address,
            send_address = send_address,
            private_key = private_key
        )
        setLoading(false)
    }



    return (
        <Box sx={{ 
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            mx: 'auto',
        }}>
            <LoadingButton loading={loading} variant='outlined' onClick={apply}>1 Lira Al</LoadingButton>
        </Box>
    )
}

export default FonlamaBaslat