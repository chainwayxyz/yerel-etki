import React, { useEffect } from 'react'
import { Box, Button, TextField } from '@mui/material';
import useMetaMask from '../hooks/metamask';
import { Web3Storage } from 'web3.storage'
import { v4 as uuidv4 } from 'uuid';
import LoadingButton from '@mui/lab/LoadingButton';

function FonlamaBaslat() {
    const { account, isActive } = useMetaMask();
    const [title, setTitle] = React.useState();
    const [description, setDescription] = React.useState();
    const [image, setImage] = React.useState();
    const [loading, setLoading] = React.useState(false);

    const [cid, setCID] = React.useState();

    const apply = async (e) => {
        e.preventDefault();
        setLoading(true);

        const id = uuidv4();

        const newFile = new File([image[0]], `${id}-img`, {type: image[0].type});

        console.log(process.env)
        
        const storage = new Web3Storage({ token: process.env.REACT_APP_STORAGE_KEY })
        
        const imageCID = await storage.put([newFile]);

        const toUpload = {
            title,
            description,
            image: `ipfs://${imageCID}/${id}-img`,
            owner: account
        }

        const blob = new Blob([JSON.stringify(toUpload)], { type: 'application/json' })
        const metadataFile = new File([blob], `${id}-metadata.json`)

        const metadataCID = await storage.put([metadataFile], {
            name: `${id}-metadata.json`
        })
        
        console.log(`Metadata CID: ${metadataCID}`)

        setCID(metadataCID)

        // call apply contract
    }

    const applyContract = async () => {
        
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
            { isActive ? (
                <>
                    <h1>Fonlama Başvur</h1>
                    <TextField fullWidth size='medium' margin="normal" type="text" label="Başlık" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <TextField fullWidth size='medium' margin="normal" type="text" multiline rows={4} label="Açıklama" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <TextField fullWidth size='small' margin="normal" type="file" label="Resim" onChange={(e) => setImage(e.target.files)} focused />
                    <LoadingButton loading={loading} variant='outlined' onClick={apply}>Başvur</LoadingButton>
                </>
            ) : (
                <>
                    <h1>Lütfen önce metamask cüzdanınızı bağlayın.</h1>
                </>
            )}

        </Box>
    )
}

export default FonlamaBaslat