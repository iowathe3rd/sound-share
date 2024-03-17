import React from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';


interface HeaderProps {
  handleDrawerToggle: ()=>void
}
const Header: React.FC<HeaderProps> = ({handleDrawerToggle}) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          open
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Responsive drawer
        </Typography>
        <Box sx={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Button variant={'outlined'} color={'primary'}>Log in</Button>
          <Button variant={'outlined'} color={'secondary'}>Sign up</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
