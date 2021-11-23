import React from 'react';
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

export default function TopAppBar(props: TopAppBarProps): JSX.Element {
  const classes = useStyles();
  const {
    title,
    color,
    position,
    leftButton,
    rightButton,
    disableGutters,
    hideToolbarMixin,
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
                <Typography data-testid={'top-app-bar-title'}>
                  {title}
                </Typography>
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
}

interface TopAppBarProps {
  title: string | JSX.Element;
  hideToolbarMixin?: boolean;
  disableGutters?: boolean;
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | 'transparent';
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
}
