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
    baseButton: {
      borderRadius: 0,
      height: '5vh',
      width: '5vh',
    },
    deleteButton: {
      zIndex: 1,
      position: 'absolute',
      transform: 'translate(0, 4vh)',
      borderRadius: 0,
      height: '5vh',
      width: '5vh',
      background: theme.palette.primary.main,
      '&:hover': {
        background: theme.palette.primary.dark,
      },
    },
    dragButton: {
      zIndex: 1,
      position: 'absolute',
      transform: 'translate(0, 4vh)',
      right: 0,
      borderRadius: 0,
      height: '5vh',
      width: '5vh',
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
    <>
      <DeleteDrawer open={open} closeHandler={closeDrawer} />
      <Slide mountOnEnter unmountOnExit direction={'right'} in={true}>
        <div>
          <IconButton
            className={clsx(classes.deleteButton)}
            aria-label={'delete'}
            onClick={openDrawer}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </Slide>

      <Slide mountOnEnter unmountOnExit direction={'left'} in={true}>
        <div>
          <IconButton
            className={clsx(classes.dragButton)}
            aria-label={'re-order'}
          >
            <ReorderIcon />
          </IconButton>
        </div>
      </Slide>
    </>
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
