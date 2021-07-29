import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { State } from '../../../../configs/redux/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      paddingLeft: 10,
      background: theme.palette.primary.main,
    },
  })
);

const SideDrawerAppBar = (props: SideDrawerAppBarProps): JSX.Element => {
  const classes = useStyles();

  return (
    <AppBar position={'relative'}>
      <Toolbar className={classes.toolbar}>
        <Grid container alignItems={'center'} justifyContent={'center'}>
          <Grid item>
            <Typography>{'Username: ' + props.username}</Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export interface SideDrawerAppBarProps {
  username: string;
}

const mapStateToProps = (state: State): SideDrawerAppBarProps => {
  return {
    username: state.applicationState.username,
  } as unknown as SideDrawerAppBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SideDrawerAppBarProps =>
  ({} as unknown as SideDrawerAppBarProps);

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawerAppBar);
