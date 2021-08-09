import {
  Settings,
  AccountCircle as AccountIcon,
  DashboardRounded as DashboardIcon,
  FitnessCenter as FitnessCenterIcon,
} from '@material-ui/icons';
import { ComponentType } from 'react';
import { SvgIconTypeMap } from '@material-ui/core';
import { StyledComponentProps } from '@material-ui/core/styles';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import DashboardScreen from '../components/top-level-components/dashboard/DashboardScreen';
import ProfileScreen from '../components/top-level-components/profile-screen/ProfileScreen';
import WorkoutScreen from '../components/top-level-components/workout/WorkoutScreenConnector';
import CircuitTypesTable from '../components/top-level-components/workout-configs/circuit-types-screen/CircuitTypesTable';
import CategoryTypesTable from '../components/top-level-components/workout-configs/category-types-screen/CategoryTypesTable';
import ExerciseTypesTable from '../components/top-level-components/workout-configs/exercise-types-screen/ExerciseTypesTable';

export interface PageProps {
  path: string;
  drawerTitle: string;
  headerTitle: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  testId: string;
  routerComponent: ComponentType<
    Pick<{ classes: Record<string, string> }, never> & StyledComponentProps
  >;
}

export interface RouteProp {
  nested: boolean;
  mainTitle: string;
  mainIcon: OverridableComponent<SvgIconTypeMap>;
  pageProps: PageProps[];
}

export type RoutesMap = {
  [key: string]: RouteProp;
  DASHBOARD: RouteProp;
};

export const routes: RoutesMap = {
  DASHBOARD: {
    nested: false,
    mainTitle: '',
    mainIcon: DashboardIcon,
    pageProps: [
      {
        path: '/',
        drawerTitle: 'Dashboard',
        headerTitle: 'Dashboard',
        icon: DashboardIcon,
        testId: 'dashboard-nav',
        routerComponent: DashboardScreen,
      },
    ],
  },
  WORKOUT_SCREEN: {
    nested: false,
    mainTitle: '',
    mainIcon: FitnessCenterIcon,
    pageProps: [
      {
        path: '/workout',
        drawerTitle: 'Workout',
        headerTitle: 'Workout',
        icon: FitnessCenterIcon,
        testId: 'workout-nav',
        routerComponent: WorkoutScreen,
      },
    ],
  },
  PROFILE_SCREEN: {
    nested: false,
    mainTitle: '',
    mainIcon: AccountIcon,
    pageProps: [
      {
        path: '/user-profile',
        drawerTitle: 'User Profile',
        headerTitle: 'User Profile',
        icon: AccountIcon,
        testId: 'profile-nav',
        routerComponent: ProfileScreen,
      },
    ],
  },
  CONFIGURATIONS_SCREEN: {
    nested: true,
    mainTitle: 'Configurations',
    mainIcon: Settings,
    pageProps: [
      {
        path: '/exercise-types',
        drawerTitle: 'Exercise Types',
        headerTitle: 'Exercise Types',
        icon: Settings,
        testId: 'exercise-types-nav',
        routerComponent: ExerciseTypesTable,
      },
      {
        path: '/category-types',
        drawerTitle: 'Category Types',
        headerTitle: 'Category Types',
        icon: Settings,
        testId: 'category-types-nav',
        routerComponent: CategoryTypesTable,
      },
      {
        path: '/circuit-types',
        drawerTitle: 'Circuit Types',
        headerTitle: 'Circuit Types',
        icon: Settings,
        testId: 'circuit-types-nav',
        routerComponent: CircuitTypesTable,
      },
    ],
  },
};
