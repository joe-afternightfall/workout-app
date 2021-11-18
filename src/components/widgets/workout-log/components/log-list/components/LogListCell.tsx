import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { GridJustification } from '@material-ui/core/Grid/Grid';

const useStyles = makeStyles(() => createStyles({}));

export default function LogListCell(props: LogListCellProps): JSX.Element {
  const classes = useStyles();
  const { icon, title, justify } = props;

  return (
    <Grid item xs={4} container alignItems={'center'} justify={justify}>
      <Grid item>{icon}</Grid>
      <Grid item>
        <Typography variant={'overline'}>{title}</Typography>
      </Grid>
    </Grid>
  );
}

interface LogListCellProps {
  title: string;
  icon: JSX.Element;
  justify: GridJustification;
}
