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
import MobileExercisesScreen from '../../components/top-level-components/mobile-app/exercises-screen/MobileExercisesScreen';
import MobileWorkoutScreen from '../../components/top-level-components/mobile-app/workout-screen/MobileWorkoutScreen';

export const DASHBOARD_SCREEN_PATH = '/dashboard';
export const MOBILE_EXERCISES_SCREEN_PATH = '/mobile/exercises';
export const MOBILE_WORKOUT_SCREEN_PATH = '/mobile/workout';
export const MOBILE_ACTIVE_WORKOUT_SCREEN_PATH = '/mobile/active-workout';
export const MOBILE_WORKOUT_DONE_PATH = '/mobile/workout-done';
export const MOBILE_PROFILE_PATH = '/mobile/profile';

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

export type MobileRoutesMap = {
  [key: string]: ApplicationRouteProp;
};

export const appRoutes: MobileRoutesMap = {
  DASHBOARD: {
    path: DASHBOARD_SCREEN_PATH,
    drawerTitle: 'Dashboard',
    headerTitle: 'Dashboard',
    icon: DashboardIcon,
    testId: 'mobile-dashboard-nav',
    routerComponent: DashboardScreen,
  },
  MOBILE_EXERCISES: {
    path: MOBILE_EXERCISES_SCREEN_PATH,
    drawerTitle: 'Exercises',
    headerTitle: 'Exercises',
    icon: AccessibilityIcon,
    testId: 'mobile-exercises-nav',
    routerComponent: MobileExercisesScreen,
  },
  MOBILE_WORKOUT: {
    path: MOBILE_WORKOUT_SCREEN_PATH,
    drawerTitle: 'Workout',
    headerTitle: 'Workout',
    icon: FitnessCenterIcon,
    testId: 'mobile-workout-nav',
    routerComponent: MobileWorkoutScreen,
  },
  MOBILE_PROFILE: {
    path: MOBILE_PROFILE_PATH,
    drawerTitle: 'Profile',
    headerTitle: 'Profile',
    icon: PersonIcon,
    testId: 'profile-nav',
    routerComponent: ProfileScreen,
  },
};
