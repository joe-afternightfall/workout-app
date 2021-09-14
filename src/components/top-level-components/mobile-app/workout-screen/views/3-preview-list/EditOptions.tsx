import clsx from 'clsx';
import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import ReorderIcon from '@material-ui/icons/Reorder';
import { IconButton, Slide } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteDrawer from './DeleteDrawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: 1,
      width: '100%',
      position: 'absolute',
      transform: 'translate(0, 4vh)',
    },
    baseButton: {
      borderRadius: 0,
      height: '5vh',
      width: '5vh',
    },
    deleteButton: {
      background: theme.palette.primary.main,
      '&:hover': {
        background: theme.palette.primary.dark,
      },
    },
    dragButton: {
      position: 'absolute',
      right: 0,
    },
    superset: {
      transform: 'translate(0, 10vh)',
    },
  })
);

const EditOptions = (props: EditOptionsProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.superset]: props.superset,
      })}
    >
      <DeleteDrawer open={open} closeHandler={closeDrawer} />
      <Slide mountOnEnter unmountOnExit direction={'right'} in={true}>
        <IconButton
          className={clsx(classes.baseButton, classes.deleteButton)}
          aria-label={'delete'}
          onClick={openDrawer}
        >
          <DeleteIcon />
        </IconButton>
      </Slide>

      <Slide mountOnEnter unmountOnExit direction={'left'} in={true}>
        <IconButton
          className={clsx(classes.baseButton, classes.dragButton)}
          aria-label={'re-order'}
        >
          <ReorderIcon />
        </IconButton>
      </Slide>
    </div>
  );
};

interface PassedInProps {
  superset?: boolean;
}

export interface EditOptionsProps {
  DELETE_ME?: undefined;
}

const mapStateToProps = (state: any): EditOptionsProps => {
  return {} as unknown as EditOptionsProps;
};

const mapDispatchToProps = (dispatch: Dispatch): EditOptionsProps =>
  ({} as unknown as EditOptionsProps);

export default connect(mapStateToProps, mapDispatchToProps)(EditOptions);
