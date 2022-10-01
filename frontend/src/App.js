import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';



import useMetaMask from './hooks/metamask';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import Fonlamalar from './components/Fonlamalar';
import Fonlama from './components/Fonlama';
import Proje from './components/Proje';
import Projeler from './components/Projeler';
import Anasayfa from './components/Anasayfa';
import Fonlan from './components/Fonlan';
import Faucet from './components/Faucet';

import {theme} from './components/Theme';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';


// const pages = ['Turlar', 'Komünite', 'Organizasyon'];

const pages = {
  'Fonlamalar': '/fonlamalar',
  'Fonlan': '/fonlamalar/basvur',
  'Test Tokeni': '/faucet',
}





const App = () => {
  const { connect, disconnect, account, isActive } = useMetaMask();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const settings = ['Metamaskını bağla'];


  const employSettings = (setting) => {
    // if settings starts with "Metamask" then connect to metamask
    if (setting.startsWith("Metamaskını")) {
      connect();
    } else if(setting.startsWith("Metamask")) {
      disconnect();
    }
  };

  const generateSettings = () => {
    let settings = [];
    if(isActive){
      settings.push('Metamask bağlantısını kes')
    } else{
      settings.push('Metamaskını bağla')
    }
    return settings;
  };

  return (
    <Box>
      <AppBar position="static" theme={theme}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: 40, height: 20}}  ><img src={require('./static/logo.png')}/></Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                color: 'white',
              }}
            >
              QF
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {Object.keys(pages).map((page) => (
                  <MenuItem component={Link} to={pages[page]} key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Subnet-QF
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {Object.keys(pages).map((page) => (
                <Button
                component={Link} to={pages[page]}
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', fontSize: '16px' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountBalanceWalletOutlinedIcon color="inherit" fontSize="large" sx={{color:"white"}}/>
                  {/* <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/512/3360/3360459.png" /> */}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {generateSettings().map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography onClick={function(){employSettings(setting)}} textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="md" sx={{padding:4}}>
        <Routes>
          <Route path="/faucet" element={<Faucet />} />
          <Route path="/fonlamalar/basvur" element={<Fonlan />} />
          <Route path="/fonlamalar" element={<Fonlamalar />}/>
          <Route path="/fonlamalar/:id" element={<Fonlama />}/>
          <Route path="/projeler/:id" element={<Projeler />}/>
          <Route path="/fon/:fonId/proje/:id" element={<Proje />}/>
          <Route path="/" element={<Anasayfa />}/>
        </Routes>
      </Container>
    </Box>
  );
};
export default App;
