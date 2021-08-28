import {
  MOBILE_PROFILE_PATH,
  MOBILE_WORKOUT_SCREEN_PATH,
  MOBILE_EXERCISES_SCREEN_PATH,
} from './app';
import { ComponentType } from 'react';
import { SvgIconTypeMap } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { StyledComponentProps } from '@material-ui/core/styles';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import MobileWorkoutScreen from '../../components/top-level-components/mobile-app/workout-screen/MobileWorkoutScreen';
import MobileExercisesScreen from '../../components/top-level-components/mobile-app/exercises-screen/MobileExercisesScreen';
import MobileProfileScreen from '../../components/top-level-components/mobile-app/profile-screen/MobileProfileScreen';

export interface MobileRouteProp {
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
  [key: string]: MobileRouteProp;
};

export const mobileRoutes: MobileRoutesMap = {
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
    testId: 'mobile-profile-nav',
    routerComponent: MobileProfileScreen,
  },
};
