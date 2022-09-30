import MediaCard from './MediaCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { fonlamalar } from '../data/fonlamalar.js';

export default function Fonlamalar() {
    console.log(fonlamalar);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <h1>Fonlamalar</h1>
            <Grid container spacing={2}>
                {Object.keys(fonlamalar).map((key) => (
                    <Grid item xs={4}>
                        <MediaCard title={fonlamalar[key].title} description={fonlamalar[key].description} image={fonlamalar[key].image} link={fonlamalar[key].link} status={fonlamalar[key].status} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}