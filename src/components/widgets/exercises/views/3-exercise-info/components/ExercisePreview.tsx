import React from 'react';
import { Card, CardMedia } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    exercisePreview: {
      width: '100%',
    },
  })
);

export default function ExercisePreview(
  props: ExercisePreviewProps
): JSX.Element {
  const classes = useStyles();
  const { iconId } = props;

  return (
    <Card>
      <CardMedia>
        <img
          alt={`${iconId}-exercise`}
          className={classes.exercisePreview}
          src={`images/exercises/${iconId}/${iconId}-exercise.gif`}
        />
      </CardMedia>
    </Card>
  );
}

interface ExercisePreviewProps {
  iconId: string;
}
