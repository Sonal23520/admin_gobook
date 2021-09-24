/*
 * Copyright (c)  2021-2021, Sonal Sithara
 */

import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { MenuBook } from '@material-ui/icons';

export const Navbar = () => {
  const navigation = useNavigate();
  return (
    <Box>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              navigation('');
            }}
          >
            <MenuBook/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GoBooks
          </Typography>
          <Button color="inherit">GoBooks Client</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
