import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      margin: 'auto',
    },
  })
);

export default function ExerciseImage({
  folder,
  image,
}: CategoryHeaderProps): JSX.Element {
  const classes = useStyles();

  return (
    <img
      alt={image}
      className={classes.root}
      src={`images/exercises/${folder}/${image}`}
    />
  );
}

interface CategoryHeaderProps {
  folder: string;
  image: string;
}
