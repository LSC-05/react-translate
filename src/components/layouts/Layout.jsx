import { Outlet } from 'react-router-dom';
import { AppTheme } from './AppTheme';
import { MyAppBar } from './../blocks/MyAppBar';
import { MyBottomNavigation } from './../blocks/MyBottomNavigation';

export const Layout = () => (
  <AppTheme>
    <MyAppBar />
    <Outlet />
    <MyBottomNavigation />
  </AppTheme>
);
