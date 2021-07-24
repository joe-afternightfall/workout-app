import { ComponentType } from 'react';
import { SvgIconTypeMap } from '@material-ui/core';
import { StyledComponentProps } from '@material-ui/core/styles';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { DashboardRounded as DashboardIcon } from '@material-ui/icons';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import WorkoutScreen from '../components/top-level-components/workout/WorkoutScreen';
import DashboardScreen from '../components/top-level-components/dashboard/DashboardScreen';

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
  WORKOUT_SCREEN: {
    path: '/workout',
    drawerTitle: 'Workout',
    headerTitle: 'Workout',
    icon: FitnessCenterIcon,
    testId: 'workout-nav',
    routerComponent: WorkoutScreen,
  },
};
