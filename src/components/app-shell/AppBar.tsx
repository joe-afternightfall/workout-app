import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import { State } from '../../configs/redux/store';
import icon from '../../configs/icons/rainbow-shades.svg';
import { openSideDrawer } from '../../creators/side-drawer';
import { AppBar, Grid, IconButton, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const drawerSize = (props: { size: string }) => props.size;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      background: '#fff',
      [theme.breakpoints.up('sm')]: {
        width: drawerSize,
      },
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    menuButton: {
      color: theme.palette.text.primary,
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    icon: {
      height: '40px',
    },
  })
);

const TopAppBar = (props: AppBarProps): JSX.Element => {
  const width = `calc(100% - ${props.drawerSize})`;
  const classes = useStyles({
    size: width,
  });

  return (
    <AppBar position={'fixed'} className={classes.appBar}>
      <Toolbar>
        <Grid container alignItems={'center'} justify={'space-between'}>
          <Grid item>
            <IconButton
              edge={'start'}
              color={'inherit'}
              className={classes.menuButton}
              data-testid={'toggle-app-drawer-button'}
              onClick={props.openSideDrawerHandler}
            >
              <MenuIcon />
            </IconButton>
          </Grid>

          <Grid item>
            <img alt={'cool-shades-icon'} className={classes.icon} src={icon} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export interface AppBarProps {
  drawerSize: string;
  openSideDrawerHandler: () => void;
}

const mapStateToProps = (state: State): AppBarProps => {
  return {
    drawerSize: state.applicationState.drawerSize,
  } as unknown as AppBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): AppBarProps =>
  ({
    openSideDrawerHandler: (): void => {
      dispatch(openSideDrawer());
    },
  } as unknown as AppBarProps);

export default connect(mapStateToProps, mapDispatchToProps)(TopAppBar);
