import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Drawer, Grid } from '@material-ui/core';

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
            <Button variant={'contained'} className={classes.removeButton}>
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
  closeHandler: () => void;
}

export interface DeleteDrawerProps {
  delete_me?: undefined;
}

const mapStateToProps = (state: any): DeleteDrawerProps => {
  return {} as unknown as DeleteDrawerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): DeleteDrawerProps =>
  ({} as unknown as DeleteDrawerProps);

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDrawer);
