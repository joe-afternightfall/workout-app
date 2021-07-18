import { ComponentType } from 'react';
import { SvgIconTypeMap } from '@material-ui/core';
import { StyledComponentProps } from '@material-ui/core/styles';
import { DashboardRounded as DashboardIcon } from '@material-ui/icons';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import DashboardScreen from '../components/top-level-components/DashboardScreen';

export interface RouteProp {
  path: string;
  drawerTitle: string;
  headerTitle: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  testId: string;
  routerComponent: ComponentType<
    Pick<{ classes: Record<string, string> }, never> & StyledComponentProps
  >;
}

export type RoutesMap = {
  [key: string]: RouteProp;
  DASHBOARD: RouteProp;
};

export const routes: RoutesMap = {
  DASHBOARD: {
    path: '/',
    drawerTitle: 'Dashboard',
    headerTitle: 'Dashboard',
    icon: DashboardIcon,
    testId: 'dashboard-nav',
    routerComponent: DashboardScreen,
  },
};
