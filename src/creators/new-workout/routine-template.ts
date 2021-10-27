import { WorkoutActionTypes } from '../actions-workout';
import { RoutineTemplateVO } from 'workout-app-common-core';

export interface LoadRoutineTemplatesAction {
  type: WorkoutActionTypes.LOAD_ROUTINE_TEMPLATES;
  templates: RoutineTemplateVO[];
}

export const loadRoutineTemplates = (
  templates: RoutineTemplateVO[]
): LoadRoutineTemplatesAction => {
  console.log('CREATOR_TEMPLATES: ' + JSON.stringify(templates));
  return {
    type: WorkoutActionTypes.LOAD_ROUTINE_TEMPLATES,
    templates: templates,
  };
};
