// Simple home page component with h1 and h5 tags
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



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    //Add more shadow
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  }));

export default function Proje() {
    let { fonId, id } = useParams();
    const project = projeler[id];
    const fonlama = fonlamalar[fonId];
    let fonDurumu;
    if(fonlama.status_code === 2) {
        fonDurumu =<Box> <Item>
            <Stack spacing={2}>
                <TextField id="outlined-basic" label="Bağış miktarı" variant="outlined" />
                <Button variant="outlined">Bağış yap</Button>
            </Stack>
        </Item>
        </Box>
        ;
    }

    return (
        <Box>
            <h1>{project.title}</h1>
            
            <MediaCard title={project.title} description={project.description} image={project.image} link={"/proje/"+project.project_id} status={project.status} />
            {fonDurumu}
            

        </Box>
    )
}