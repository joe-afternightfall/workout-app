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
  const { title, hideToolbarMixin, leftButton, rightButton } = props;

  return (
    <>
      <AppBar
        elevation={0}
        position={'fixed'}
        color={'inherit'}
        className={classes.appBar}
      >
        <Toolbar>
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
              <Typography>{title}</Typography>
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
  title: string;
  hideToolbarMixin?: boolean;
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
}

interface TopAppBarProps {
  blah?: string;
}

const mapStateToProps = () => {
  return {} as unknown as TopAppBarProps;
};

export default connect(mapStateToProps)(TopAppBar);
