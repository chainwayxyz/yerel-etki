import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


export const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
          main: '#68d49c',

        },
        warning: {
            main: '#4dbd83',
        },
        background: {
          default: '#68d49c',
        },
      },
      typography: {
        fontFamily: 'Merriweather, serif'
      },
      components: {
        MuiButton: {
          styleOverrides: {
            primary: {
              color: '#68d49c',
            },
          },
        }
      }
  });

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'theme.palette.text.secondary',
    //Add more shadow
  }));