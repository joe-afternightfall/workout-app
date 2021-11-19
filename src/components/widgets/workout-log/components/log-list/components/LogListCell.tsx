import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { GridJustification } from '@material-ui/core/Grid/Grid';

export default function LogListCell(props: LogListCellProps): JSX.Element {
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
