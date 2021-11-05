import React from 'react';
import { Card, CardMedia } from '@material-ui/core';
import ExerciseImage from '../../../../../top-level-components/mobile-app/shared/exercise-list/ExerciseImage';

export default function ExercisePreview(
  props: ExercisePreviewProps
): JSX.Element {
  const { iconId } = props;

  return (
    <Card>
      <CardMedia>
        <ExerciseImage folder={iconId} image={`${iconId}-exercise.gif`} />
      </CardMedia>
    </Card>
  );
}

interface ExercisePreviewProps {
  iconId: string;
}
