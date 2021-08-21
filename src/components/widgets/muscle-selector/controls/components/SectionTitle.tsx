import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: '1rem 0 0.5rem',
      fontSize: '0.8rem',
      letterSpacing: '-0.03em',
      textTransform: 'uppercase',
    },
  })
);

export default function SectionTitle(props: SectionTitleProps): JSX.Element {
  const classes = useStyles();

  return <Typography className={classes.root}>{props.title}</Typography>;
}

export interface SectionTitleProps {
  title: string;
}
