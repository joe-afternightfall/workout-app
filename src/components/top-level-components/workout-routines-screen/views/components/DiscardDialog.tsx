import React from 'react';
import {
  Grid,
  Link,
  Zoom,
  Button,
  Dialog,
  Typography,
  DialogContent,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TransitionProps } from '@material-ui/core/transitions';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toggleEditOptionButtons } from '../../../../../creators/workout/workout-selections';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Zoom in={true} ref={ref} {...props} />;
});

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    discardButton: {
      background: '#C90A3C',
      padding: '16px 52px',
    },
    link: {
      color: '#FFF',
      textDecoration: 'underline',
      fontWeight: 600,
    },
    title: {
      color: '#C90A3C',
      fontWeight: 600,
    },
  })
);

const DiscardDialog = (props: DiscardDialogProps): JSX.Element => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const discardChanges = () => {
    props.discardClickHandler();
    closeDialog();
  };

  return (
    <div>
      <Button variant={'text'} color={'primary'} onClick={openDialog}>
        {'Discard'}
      </Button>
      <Dialog open={open} keepMounted TransitionComponent={Transition}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} container justify={'center'}>
              <Typography variant={'h5'} className={classes.title}>
                {'Discard Changes?'}
              </Typography>
            </Grid>
            <Grid item xs={12} container justify={'center'}>
              <Typography variant={'body1'}>
                {'Your changes will not be saved'}
              </Typography>
            </Grid>
            <Grid item xs={12} container justify={'center'}>
              <Button
                variant={'text'}
                className={classes.discardButton}
                onClick={discardChanges}
              >
                {'Discard'}
              </Button>
            </Grid>
            <Grid item xs={12} container justify={'center'}>
              <Typography className={classes.root}>
                <Link className={classes.link} onClick={closeDialog}>
                  {'Continue Editing'}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface DiscardDialogProps {
  discardClickHandler: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DiscardDialogProps =>
  ({
    discardClickHandler: () => {
      dispatch(
        toggleEditOptionButtons({
          open: false,
          onlyDisplayDelete: false,
        })
      );
    },
  } as unknown as DiscardDialogProps);

export default connect(null, mapDispatchToProps)(DiscardDialog);
