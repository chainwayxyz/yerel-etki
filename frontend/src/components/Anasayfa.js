import React, { useEffect } from 'react'
import { ethers } from "ethers";
import {contracts} from '../data/contracts';

const CONTRACT_ADDRESS = contracts.Round.address;
const ABI = contracts.Round.abi;

// window.ethersProvider = new ethers.providers.Web3Provider(window.ethereum);

async function getProjects(){
    const ethereum = window.ethereum;
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });

    const provider = new ethers.providers.Web3Provider(ethereum)
    const walletAddress = accounts[0]    // first account in MetaMask
    const signer = provider.getSigner(walletAddress)

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    const projects = await contract.getAllGrants();
    return projects;
}


export default function Anasayfa() {
    return (
        <div>
            <h1>Home</h1>
            <h5>Home page</h5>
            <button onClick={getProjects}>Get Projects</button>
        </div>
    )
}