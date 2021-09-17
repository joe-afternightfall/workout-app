import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, InputAdornment, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputRoot: {
      fontSize: '5vh',
    },
    notchedOutline: {
      border: 0,
    },
    fieldWrapper: {
      borderColor: '#222323',
      backgroundColor: '#222323',
      borderRadius: 8,
    },
  })
);

const RestBetweenOptions = (props: RestBetweenOptionsProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={2} justify={'center'}>
        <Grid item xs={6}>
          <div className={classes.fieldWrapper}>
            <TextField
              variant={'outlined'}
              value={'80'}
              inputProps={{ style: { textAlign: 'center' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position={'start'}>{'Sec'}</InputAdornment>
                ),
                classes: {
                  root: classes.inputRoot,
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.fieldWrapper}>
            <TextField
              variant={'outlined'}
              value={'70'}
              inputProps={{ style: { textAlign: 'center' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position={'start'}>{'Sec'}</InputAdornment>
                ),
                classes: {
                  root: classes.inputRoot,
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={6} container justify={'center'}>
          <Typography color={'textSecondary'} variant={'caption'}>
            {'Rest between sets'}
          </Typography>
        </Grid>
        <Grid item xs={6} container justify={'center'}>
          <Typography color={'textSecondary'} variant={'caption'}>
            {'Rest between exercises'}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export interface RestBetweenOptionsProps {
  DELETE_ME?: undefined;
}

const mapStateToProps = (state: any): RestBetweenOptionsProps => {
  return {} as unknown as RestBetweenOptionsProps;
};

const mapDispatchToProps = (dispatch: Dispatch): RestBetweenOptionsProps =>
  ({} as unknown as RestBetweenOptionsProps);

export default connect(mapStateToProps, mapDispatchToProps)(RestBetweenOptions);
