import React from 'react';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      height: '8vh',
    },
    toolbar: {
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  })
);

const TopAppBar = (props: TopAppBarProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  const {
    title,
    disableGutters,
    position,
    color,
    hideToolbarMixin,
    leftButton,
    rightButton,
  } = props;

  return (
    <>
      <AppBar
        elevation={0}
        position={position ? position : 'fixed'}
        color={color ? color : 'inherit'}
        className={classes.appBar}
      >
        <Toolbar disableGutters={disableGutters}>
          <Grid container alignItems={'center'}>
            <Grid
              item
              xs={2}
              container
              justify={'center'}
              alignItems={'center'}
            >
              {leftButton}
            </Grid>

            <Grid
              item
              xs={8}
              container
              justify={'center'}
              alignItems={'center'}
            >
              {React.isValidElement(title) ? (
                title
              ) : (
                <Typography>{title}</Typography>
              )}
            </Grid>

            <Grid
              item
              xs={2}
              container
              justify={'center'}
              alignItems={'center'}
            >
              {rightButton}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {hideToolbarMixin ? undefined : <div className={classes.toolbar} />}
    </>
  );
};

interface PassedInProps {
  title: string | JSX.Element;
  hideToolbarMixin?: boolean;
  disableGutters?: boolean;
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | 'transparent';
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
}

interface TopAppBarProps {
  blah?: string;
}

const mapStateToProps = () => {
  return {} as unknown as TopAppBarProps;
};

export default connect(mapStateToProps)(TopAppBar);
