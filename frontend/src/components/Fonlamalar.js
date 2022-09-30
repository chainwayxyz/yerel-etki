import MediaCard from './MediaCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function Fonlamalar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <h1>Fonlamalar</h1>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <MediaCard title="AKBANK Tur 1" description="Akbank'ın karbon salınımını azaltmak için yapılan projeler için açtığı fonlama" image="https://i.ibb.co/85n71pL/image-2.png" link="1" status="Tur Bitti"/>
                </Grid>
                <Grid item xs={4}>
                    <MediaCard title="AKBANK Tur 2" description="Akbank'ın karbon salınımını azaltmak için yapılan projeler için açtığı fonlama" image="https://i.ibb.co/85n71pL/image-2.png" link="2" status="Kalan süre 1 gün"/>
                </Grid>
            </Grid>
        </Box>
    )
}