import React from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import ToolBuilderCard from './ToolBuilderCard';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { TransitionProps } from '@material-ui/core/transitions';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction={'up'} ref={ref} {...props} />;
});

export default function FullScreenDialog(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Grid container>
          <Grid item xs={7}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  {'Preconfigure Circuit'}
                </Typography>
                <IconButton
                  edge={'start'}
                  color={'inherit'}
                  onClick={handleClose}
                  aria-label={'close'}
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={5}>
            <ToolBuilderCard />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}