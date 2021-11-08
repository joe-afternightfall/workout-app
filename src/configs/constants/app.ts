import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import { ComponentType } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { StyledComponentProps } from '@material-ui/core/styles';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import ProfileScreen from '../../components/top-level-components/profile-screen/ProfileScreen';
import DashboardScreen from '../../components/top-level-components/dashboard-screen/DashboardScreen';
import ExercisesScreen from '../../components/top-level-components/exercises-screen/ExercisesScreen';
import WorkoutScreen from '../../components/top-level-components/workout-screen/WorkoutScreen';

export const DASHBOARD_SCREEN_PATH = '/dashboard';
export const EXERCISES_SCREEN_PATH = '/exercises';
export const WORKOUT_SCREEN_PATH = '/workout';
export const ACTIVE_WORKOUT_SCREEN_PATH = '/active-workout';
export const WORKOUT_DONE_PATH = '/workout-done';
export const PROFILE_PATH = '/profile';

export const NUMBERS_ONLY_REGEX = new RegExp('^[0-9]*$');
export const DISPLAY_NAME_REGEX = new RegExp(/^$|[A-Za-z0-9\-\\_]$/);

export interface ApplicationRouteProp {
  path: string;
  drawerTitle: string;
  headerTitle: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  testId: string;
  routerComponent: ComponentType<
    Pick<{ classes: Record<string, string> }, never> & StyledComponentProps
  >;
}

export type AppRoutesMap = {
  [key: string]: ApplicationRouteProp;
};

export const appRoutes: AppRoutesMap = {
  DASHBOARD: {
    path: DASHBOARD_SCREEN_PATH,
    drawerTitle: 'Dashboard',
    headerTitle: 'Dashboard',
    icon: DashboardIcon,
    testId: 'dashboard-nav',
    routerComponent: DashboardScreen,
  },
  EXERCISES: {
    path: EXERCISES_SCREEN_PATH,
    drawerTitle: 'Exercises',
    headerTitle: 'Exercises',
    icon: AccessibilityIcon,
    testId: 'exercises-nav',
    routerComponent: ExercisesScreen,
  },
  WORKOUT: {
    path: WORKOUT_SCREEN_PATH,
    drawerTitle: 'Workout',
    headerTitle: 'Workout',
    icon: FitnessCenterIcon,
    testId: 'workout-nav',
    routerComponent: WorkoutScreen,
  },
  PROFILE: {
    path: PROFILE_PATH,
    drawerTitle: 'Profile',
    headerTitle: 'Profile',
    icon: PersonIcon,
    testId: 'profile-nav',
    routerComponent: ProfileScreen,
  },
};
