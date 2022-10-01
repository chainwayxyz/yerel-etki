import React, { useEffect } from 'react'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";
import {  useParams
} from "react-router-dom";

import { fonlamalar } from "../data/fonlamalar.js";
import { projeler } from "../data/projeler.js";
import Clock from "./Clock";

import Grid from '@mui/material/Grid';
import MediaCard from './MediaCard';
import { theme, Item } from './Theme';
import {contracts} from '../data/contracts';
import { ethers } from "ethers";
import useMetaMask from '../hooks/metamask';
import { Web3Storage } from 'web3.storage';
import LoadingButton from '@mui/lab/LoadingButton';


const CONTRACT_ADDRESS = contracts.Round.address;
const ABI = contracts.Round.abi;


async function getProjects(setProjects){
    const ethereum = window.ethereum;
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });

    const provider = new ethers.providers.Web3Provider(ethereum)
    const walletAddress = accounts[0]    // first account in MetaMask
    const signer = provider.getSigner(walletAddress)

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    const projects = await contract.getAllGrants();
    console.log(projects);
    const storage = new Web3Storage({ token: process.env.REACT_APP_STORAGE_KEY });
    // For each project in projects get content from ipfs cid at ipfsURL
    // and store it in the database
    let allProjects = [];
    for (let i = 0; i < projects.length; i++) {
        try{
            const project = projects[i];
            const res = await storage.get(project.ipfsURL);
            const files = await res.files()
    
            for (const file of files) {
                console.log(`${file.cid}: ${file.name} (${file.size} bytes)`)
                let content = JSON.parse(await file.text())
                console.log(content)
                content.project_id = i;
                const IPFS_IMG_LINK = content.image;
                // split IPFS_IMG_LINK from /
                const STARTING_URL = 'https://gateway.pinata.cloud/ipfs/';
                const IPFS_CID =STARTING_URL + IPFS_IMG_LINK.substring(7);
                content.image = IPFS_CID;
                // alert(IPFS_CID);

                // const imgRes = await storage.get(IPFS_CID);
                // console.log("ImgRes: ", imgRes);
                // const imgFiles = await imgRes.files()
                // console.log("imgFiles", imgFiles)
                // for (const imgFile of imgFiles) {
                //     console.log(`${imgFile.cid}: ${imgFile.name} (${imgFile.size} bytes)`)
                //     content.image = await imgFile.text()

                //     console.log(content.image)
                // }
                // console.log("imgRes", imgRes)
                allProjects.push(content);

            }
        } catch (e) {
            console.log("Error issssss");
            console.log(e);
        }
    }

    // const res = await client.get(cid)
    // alert(allProjects);

    setProjects(allProjects);
    // return projects;
}

async function arrangeFunds(setMatchFunds, setTotalFunds){
    const ethereum = window.ethereum;
    const provider = new ethers.providers.Web3Provider(ethereum)
    // Get balance of contracts.Round.address
    const balance = await provider.getBalance(contracts.Round.address);
    console.log("Balance: ", balance);
    setTotalFunds(ethers.utils.formatEther(balance).toString());
    // Get balance of contracts.Match.address
    const matchBalance = await provider.getBalance(contracts.Match.address);
    console.log("Match Balance: ", matchBalance);
    setMatchFunds(ethers.utils.formatEther(matchBalance).toString());
}


export default function Fonlama() {
    const { account, isActive } = useMetaMask();

    let { id } = useParams();

    const fonlama = fonlamalar[id];
    const mockProjects = fonlama.projects.map(function (project_id){projeler[project_id].project_id = project_id; return projeler[project_id]});
    const [projects, setProjects] = React.useState(mockProjects);
    const [matchFunds, setMatchFunds] = React.useState(0);
    const [totalFunds, setTotalFunds] = React.useState(0);

    const [loading, setLoading] = React.useState(false);
    const [bagis, setBagis] = React.useState("0");


    const CONTRACT_ADDRESS = contracts.Round.address;
    const ABI = contracts.Round.abi;
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI);

    useEffect(() => {
        if(fonlama.status_code == 2){
            getProjects(setProjects);
            arrangeFunds(setMatchFunds, setTotalFunds);
        }
    }, []);





    const donate = async () => {
        setLoading(true);  
        // alert(bagis);
        // alert(typeof(bagis));
        // alert(account);
        // alert(typeof(account));
        const CONTRACT_ADDRESS = contracts.Match.address;
        const ABI = contracts.Match.abi;
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI);
    
        let valueStr = ethers.utils.parseEther(bagis.toString()).toString();
        const tx = await contract.populateTransaction.donate();

        console.log(tx);

        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: account,
                    value: ethers.utils.parseEther(bagis.toString()).toHexString(),
                    ...tx
                }
            ]
        })

        console.log(txHash);
        setBagis(0);
        setLoading(false);
    }




    let deadline =fonlama.deadline;

    let fonDurumu;
    if(fonlama.status_code === 1) {
        fonDurumu = <Box><Item>
            <h1>Eşleme fonu: 1234 ATRY</h1>
            <h1>Bağışlanan fon: 5432 ATRY</h1>
        </Item>
        <h1>Projeler</h1>
            <Grid container spacing={2}>
                {projects.map((project) => (
                    <Grid item xs={4}>
                        <MediaCard title={project.title} description={project.description} image={project.image} link={"/fon/" + id +"/proje/"+project.project_id} status={project.status} />
                    </Grid>
                ))}
            </Grid>
        </Box>;
    } else if(fonlama.status_code === 2) {
        fonDurumu =<Box> <Item>
            <h1>Eşleme fonu: {matchFunds} ATRY</h1>
            <h1>Bağışlanan fon: {totalFunds} ATRY</h1>
            <h2>Eşleme fonuna bağış yap (Minimum 5000₺):</h2>
            <Stack spacing={2}>
                <TextField id="outlined-basic" label="Bağış miktarı" variant="outlined" value={bagis} onChange={(e) => setBagis(e.target.value)} />
                <LoadingButton variant="outlined" onClick={donate} loading={loading}>Bağış yap</LoadingButton>
            </Stack>
        </Item>
        <h1>Projeler</h1>
            <Grid container spacing={2}>
                {projects.map((project) => (
                    <Grid item xs={4}>
                        <MediaCard title={project.title} description={project.description} image={project.image} link={"/projeler/"+project.project_id} status={project.status} />
                    </Grid>
                ))}
            </Grid>
        </Box>
        ;
    } else {
        fonDurumu = <Item>
            <h1>Fonlama daha başlamadı</h1>
            <Clock deadline={deadline} />
        </Item>;
    }

    return (
        <Box>
            <h1>{fonlama.title}</h1>
            {fonDurumu}
            

        </Box>
    )
}