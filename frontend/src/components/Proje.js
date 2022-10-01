// Simple home page component with h1 and h5 tags
import React, { useEffect } from 'react'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { Box } from "@mui/material";
import {  useParams
} from "react-router-dom";

import { fonlamalar } from "../data/fonlamalar.js";
import { projeler } from "../data/projeler.js";
import Clock from "./Clock";

import Grid from '@mui/material/Grid';
import MediaCard from './MediaCard';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import {contracts} from '../data/contracts';
import { ethers } from "ethers";
import useMetaMask from '../hooks/metamask';
import LoadingButton from '@mui/lab/LoadingButton';
import { theme , Item } from './Theme';






export default function Proje() {
    const [loading, setLoading] = React.useState(false);
    const [bagis, setBagis] = React.useState(0);
    const { account, isActive } = useMetaMask();

    const CONTRACT_ADDRESS = contracts.Round.address;
    const ABI = contracts.Round.abi;
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI);


    let { fonId, id } = useParams();
    const project = projeler[id];
    const fonlama = fonlamalar[fonId];
    let fonDurumu;

    const donate = async () => {
        setLoading(true);

        const tx = await contract.populateTransaction.donate(id);

        console.log(tx);

        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: account,
                    ...tx
                }
            ]
        })

        console.log(txHash);
        setBagis(0);

        // alert("Bağış yapıldı " + id);
        setLoading(false);
    }

    if(fonlama.status_code === 2) {
        fonDurumu =<Box> <Item>
            <Stack spacing={2}>
                <TextField id="outlined-basic" label="Bağış miktarı" variant="outlined" value={bagis} onChange={(e) => setBagis(e.target.files)} />
                <LoadingButton loading={loading} variant="outlined" onClick={donate}>Bağış yap</LoadingButton>
            </Stack>
        </Item>
        </Box>
        ;
    }

    return (
        <Card>

          <CardMedia
            component="img"
            image={project.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {project.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {project.description}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{padding:3}}>
                {fonDurumu}
            </Typography>
          </CardContent>

      </Card>
  

        // <Box>
        //     <Paper
        //     sx={{
        //         position: 'relative',
        //         backgroundColor: 'grey.800',
        //         color: '#fff',
        //         mb: 4,
        //         width: '100%',
        //     }}
        //     >
        //     <img  src={project.image}/>
        //     </Paper>
        //     <h1>{project.title}</h1>
            
        //     <MediaCard title={project.title} description={project.description} image={project.image} link={"/proje/"+project.project_id} status={project.status} />
        //     {fonDurumu}
            

        // </Box>
    )
}