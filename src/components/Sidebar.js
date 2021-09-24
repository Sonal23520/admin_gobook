/*
 * Copyright (c)  2021-2021, Sonal Sithara
 */

import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Book, Category, Home } from '@material-ui/icons';

const items = [
  {
    href: '/dashboard',
    icon: Home,
    label: 'Home'
  },
  {
    href: '/dashboard/book',
    icon: Book,
    label: 'Book'
  },
  {
    href: '/dashboard/category',
    icon: Category,
    label: 'Category'
  }

];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      open
      sx={{ zIndex: 1000 }}
      variant="permanent"
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 64px)',
          p: 1,
          top: 64,
          width: 73
        }
      }}
    >
      <List sx={{ width: '100%' }}>
        {items.map(({ href, icon: Icon, label }) => {
          const active = matchPath(
            { path: href, end: true },
            location.pathname
          );

          return (
            <ListItem
              disablePadding
              component={RouterLink}
              key={href}
              to={href}
              sx={{
                flexDirection: 'column',
                color: active ? 'primary.main' : 'text.secondary',
                px: 2,
                py: 1.5,
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 'auto',
                  color: 'inherit'
                }}
              >
                <Icon/>
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  sx: {
                    pb: 0,
                    pt: 1.25
                  },
                  variant: 'caption'
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
