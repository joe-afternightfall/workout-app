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
import AllWorkoutsScreen from '../../components/top-level-components/workout-screens/1-all-workouts/AllWorkoutsScreen';
import RoutinesScreen from '../../components/top-level-components/workout-screens/2-routines/RoutinesScreen';
import PreviewWorkoutScreen from '../../components/top-level-components/workout-screens/3-preview-workout/PreviewWorkoutScreen';
import ActiveWorkout from '../../components/top-level-components/active-workout-screen/ActiveWorkoutConnector';
import WorkoutDone from '../../components/top-level-components/active-workout-screen/4-workout-done/WorkoutDone';

export const DASHBOARD_SCREEN_PATH = '/dashboard';
export const EXERCISES_SCREEN_PATH = '/exercises';
export const ALL_WORKOUTS_SCREEN_PATH = '/all-workouts';
export const PROFILE_PATH = '/profile';

export const ROUTINES_SCREEN_PATH = '/routines';
export const PREVIEW_WORKOUT_SCREEN_PATH = '/preview-workout';
export const ACTIVE_WORKOUT_SCREEN_PATH = '/active-workout';
export const WORKOUT_DONE_PATH = '/workout-done';

export const NUMBERS_ONLY_REGEX = new RegExp('^[0-9]*$');
export const DISPLAY_NAME_REGEX = new RegExp(/^$|[A-Za-z0-9\-\\_]$/);

export interface ApplicationRouteProp {
  id: string;
  path: string;
  title: string;
  icon?: OverridableComponent<SvgIconTypeMap>;
  routerComponent: ComponentType<
    Pick<{ classes: Record<string, string> }, never> & StyledComponentProps
  >;
  bottomNav: boolean;
}

export type AppRoutesMap = {
  [key: string]: ApplicationRouteProp;
};

export const appRoutes: AppRoutesMap = {
  DASHBOARD: {
    path: DASHBOARD_SCREEN_PATH,
    title: 'Dashboard',
    icon: DashboardIcon,
    id: 'dashboard-nav',
    routerComponent: DashboardScreen,
    bottomNav: true,
  },
  EXERCISES: {
    path: EXERCISES_SCREEN_PATH,
    title: 'Exercises',
    icon: AccessibilityIcon,
    id: 'exercises-nav',
    routerComponent: ExercisesScreen,
    bottomNav: true,
  },
  ALL_WORKOUTS: {
    path: ALL_WORKOUTS_SCREEN_PATH,
    title: 'Workout',
    icon: FitnessCenterIcon,
    id: 'all-workouts-nav',
    routerComponent: AllWorkoutsScreen,
    bottomNav: true,
  },
  ROUTINES: {
    path: ROUTINES_SCREEN_PATH,
    title: 'Routines',
    id: 'routines',
    routerComponent: RoutinesScreen,
    bottomNav: false,
  },
  PREVIEW_WORKOUT: {
    path: PREVIEW_WORKOUT_SCREEN_PATH,
    title: 'Preview Workout',
    id: 'preview-routine',
    routerComponent: PreviewWorkoutScreen,
    bottomNav: false,
  },
  ACTIVE_WORKOUT: {
    path: ACTIVE_WORKOUT_SCREEN_PATH,
    title: 'Active Workout',
    id: 'active-workout',
    routerComponent: ActiveWorkout,
    bottomNav: false,
  },
  WORKOUT_DONE: {
    path: WORKOUT_DONE_PATH,
    title: 'Workout Done',
    id: 'workout-done',
    routerComponent: WorkoutDone,
    bottomNav: false,
  },
  PROFILE: {
    path: PROFILE_PATH,
    title: 'Profile',
    icon: PersonIcon,
    id: 'profile-nav',
    routerComponent: ProfileScreen,
    bottomNav: true,
  },
};
