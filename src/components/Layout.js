/*
 * Copyright (c)  2021-2021, Sonal Sithara
 */

import { Outlet } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%'
}));

const DashboardLayoutContentWrapper = styled('div')(() => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingLeft: 73,
  paddingTop: '64px'
}));

const DashboardLayoutContent = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  overflow: 'auto'
});

export const Layout = () => (
  <DashboardLayoutRoot>
    <Navbar/>
    <Sidebar/>
    <DashboardLayoutContentWrapper>
      <DashboardLayoutContent>
        <Outlet/>
        {/* <Footer /> */}
      </DashboardLayoutContent>
    </DashboardLayoutContentWrapper>
  </DashboardLayoutRoot>
);
