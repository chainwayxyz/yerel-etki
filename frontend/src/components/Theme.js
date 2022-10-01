import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


export const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
          main: '#0f0',
        },
        background: {
          default: '#111111',
          paper: '#212121',
        },
      },
      typography: {
        fontFamily: 'Open Sans',
        h1: {
          fontFamily: 'Ubuntu Mono',
        },
        h2: {
          fontFamily: 'Ubuntu Mono',
        },
        h3: {
          fontFamily: 'Ubuntu Mono',
        },
        h4: {
          fontFamily: 'Ubuntu Mono',
        },
        h6: {
          fontFamily: 'Ubuntu Mono',
        },
        h5: {
          fontFamily: 'Ubuntu Mono',
        },
        subtitle1: {
          fontFamily: 'Ubuntu Mono',
        },
        subtitle2: {
          fontFamily: 'Ubuntu Mono',
        },
        button: {
          fontFamily: 'Ubuntu Mono',
          fontWeight: 900,
        },
        overline: {
          fontFamily: 'Ubuntu Mono',
        },
      },
  });

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    //Add more shadow
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  }));