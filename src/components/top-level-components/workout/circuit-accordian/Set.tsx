import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';

const useStyles = makeStyles(() =>
  createStyles({
    confirmButton: {
      background: '#C9F0DE',
      color: '#008E62',
      '&:hover': {
        background: '#A2EAC9',
      },
    },
    completedRow: {
      background: '#E4F3EC',
    },
    deleteButton: {
      background: '#F5DADB',
      color: '#D41417',
      '&:hover': {
        background: '#F4C3C3',
      },
    },
  })
);

export default function Set(props: SetProps): JSX.Element {
  const classes = useStyles();

  return (
    <Grid item xs={12} container alignItems={'center'} spacing={2}>
      <Grid item xs={2}>
        <Typography>{props.setNumber + 1}</Typography>
      </Grid>

      <Grid item xs={3}>
        <TextField style={{ width: '100%' }} variant={'outlined'} />
      </Grid>

      <Grid item xs={3}>
        <TextField style={{ width: '100%' }} variant={'outlined'} />
      </Grid>

      <Grid item xs={4}>
        <Grid container alignItems={'center'} justify={'center'} spacing={2}>
          <Grid item>
            <Button className={classes.deleteButton}>
              <RemoveIcon />
            </Button>
          </Grid>

          <Grid item>
            <Button className={classes.confirmButton}>
              <CheckIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export interface SetProps {
  setNumber: number;
}
