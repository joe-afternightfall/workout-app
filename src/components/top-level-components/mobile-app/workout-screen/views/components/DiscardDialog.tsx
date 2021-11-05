import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { TransitionProps } from '@material-ui/core/transitions';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Divider, Grid, Link, Typography } from '@material-ui/core';
import { toggleEditPreviewOptions } from '../../../../../../creators/new-workout/workout-selections';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Zoom in={true} ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    discardButton: {
      background: '#CC0000',
      borderRadius: 0,
      padding: '16px 52px',
    },
    link: {
      color: theme.palette.info.light,
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
        <DialogTitle style={{ fontWeight: 'bold', textAlign: 'center' }}>
          {'Discard Changes?'}
          <Grid item xs={12}>
            <Divider variant={'fullWidth'} />
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} container justify={'center'}>
              <Typography color={'textSecondary'} variant={'body1'}>
                {'Your changes will be lost'}
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
      dispatch(toggleEditPreviewOptions(false));
    },
  } as unknown as DiscardDialogProps);

export default connect(null, mapDispatchToProps)(DiscardDialog);
