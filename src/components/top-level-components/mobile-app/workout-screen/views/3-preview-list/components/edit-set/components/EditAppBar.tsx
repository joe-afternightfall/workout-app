import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { closeEditSet } from '../../../../../../../../../creators/workout/workout-selections';

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      position: 'fixed',
      top: -24,
      padding: '0 12px',
      height: '8vh',
      width: '100%',
    },
    gridWrapper: {
      height: '100%',
    },
    menuButton: {
      paddingTop: 8,
      paddingBottom: 8,
    },
    toolbarMixin: {
      height: '7vh',
    },
  })
);

const EditAppBar = (props: EditAppBarProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <AppBar color={'transparent'} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Grid
            container
            className={classes.gridWrapper}
            alignItems={'flex-end'}
          >
            <Grid item xs={2}>
              <IconButton
                color={'primary'}
                className={classes.menuButton}
                onClick={props.closeClickHandler}
              >
                <ArrowBackIcon fontSize={'small'} />
              </IconButton>
            </Grid>

            <Grid
              item
              xs={8}
              container
              justify={'center'}
              alignItems={'center'}
            >
              <Grid item>
                <Typography variant={'overline'}>{'Edit'}</Typography>
              </Grid>
            </Grid>

            <Grid item xs={2} />
          </Grid>
        </Toolbar>
      </AppBar>

      <div className={classes.toolbarMixin} />
    </>
  );
};

interface EditAppBarProps {
  closeClickHandler: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): EditAppBarProps =>
  ({
    closeClickHandler: () => {
      dispatch(closeEditSet());
    },
  } as unknown as EditAppBarProps);

export default connect(null, mapDispatchToProps)(EditAppBar);
