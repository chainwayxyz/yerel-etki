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

export default function Fonlama() {
    let { id } = useParams();

    const fonlama = fonlamalar[id];
    const projects = fonlama.projects;
    let deadline =fonlama.deadline;

    let fonDurumu;
    if(fonlama.status_code === 1) {
        fonDurumu = <Box><Item>
            <h1>Toplam fon miktarı: 10000TL</h1>
            <h1>Toplam katkı miktarı: 10000TL</h1>
        </Item>
        <h1>Projeler</h1>
            <Grid container spacing={2}>
                {projects.map((project) => (
                    <Grid item xs={4}>
                        <MediaCard title={project.title} description={project.description} image={project.image} link={project.link} status={project.status} />
                    </Grid>
                ))}
            </Grid>
        </Box>;
    } else if(fonlama.status_code === 2) {
        fonDurumu =<Box> <Item>
            <h1>Toplam fon miktarı: 10000TL</h1>
            <h1>Toplam katkı miktarı: 10000TL</h1>
            <h3>Eşleme fonuna bağış yap:</h3>
            <Stack spacing={2}>
                <TextField id="outlined-basic" label="Bağış miktarı" variant="outlined" />
                <Button variant="outlined">Bağış yap</Button>
            </Stack>
        </Item>
        <h1>Projeler</h1>
            <Grid container spacing={2}>
                {projects.map((project) => (
                    <Grid item xs={4}>
                        <MediaCard title={project.title} description={project.description} image={project.image} link={project.link} status={project.status} />
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