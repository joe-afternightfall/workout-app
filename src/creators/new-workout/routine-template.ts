import { WorkoutActionTypes } from '../actions-workout';
import { RoutineTemplateVO, sortEntireRoutine } from 'workout-app-common-core';

export interface LoadRoutineTemplatesAction {
  type: WorkoutActionTypes.LOAD_ROUTINE_TEMPLATES;
  templates: RoutineTemplateVO[];
}

export const loadRoutineTemplates = (
  templates: RoutineTemplateVO[]
): LoadRoutineTemplatesAction => {
  templates.map((template) => {
    template.phases = sortEntireRoutine(template.phases);
  });
  return {
    type: WorkoutActionTypes.LOAD_ROUTINE_TEMPLATES,
    templates: templates,
  };
};
