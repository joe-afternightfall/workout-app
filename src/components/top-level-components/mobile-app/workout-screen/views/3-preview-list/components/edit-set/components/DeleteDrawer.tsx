import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Drawer, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { deleteSegmentFromRoutineCopy } from '../../../../../../../../../creators/new-workout/preview-workout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0 12px',
      height: '21.75vh',
      background: 'transparent',
    },
    button: {
      borderRadius: '8px 8px 0 0',
      width: '100%',
    },
    cancelButton: {
      width: '100%',
      height: '6vh',
      fontWeight: 'bold',
      color: theme.palette.info.dark,
    },
    removeButton: {
      width: '100%',
      color: '#CC0000',
      borderRadius: '0 0 8px 8px',
    },
    replaceButton: {
      width: '100%',
      borderRadius: '8px 8px 0 0',
      color: theme.palette.info.dark,
    },
  })
);

const DeleteDrawer = (
  props: DeleteDrawerProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();

  return (
    <Drawer
      anchor={'bottom'}
      open={props.open}
      onClose={props.closeHandler}
      classes={{ paper: classes.root }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} container>
          <Grid item xs={12}>
            <Button variant={'contained'} className={classes.replaceButton}>
              {'Replace Exercise'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant={'contained'}
              className={classes.removeButton}
              onClick={() => {
                props.deleteSegmentHandler();
                props.closeHandler();
              }}
            >
              {'Remove Exercise'}
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={12}>
            <Button
              variant={'contained'}
              onClick={props.closeHandler}
              className={classes.cancelButton}
            >
              {'Cancel'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
};

interface PassedInProps {
  open: boolean;
  segmentId: string;
  closeHandler: () => void;
}

export interface DeleteDrawerProps {
  deleteSegmentHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): DeleteDrawerProps =>
  ({
    deleteSegmentHandler: () => {
      dispatch(deleteSegmentFromRoutineCopy(ownProps.segmentId));
    },
  } as unknown as DeleteDrawerProps);

export default connect(null, mapDispatchToProps)(DeleteDrawer);
