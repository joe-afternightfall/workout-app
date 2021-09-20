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
      zIndex: 1,
      borderRadius: 0,
      height: '5vh',
      width: '5vh',
      position: 'absolute',
      transform: 'translate(0, 4vh)',
    },
    deleteButton: {
      background: theme.palette.primary.main,
      '&:hover': {
        background: theme.palette.primary.dark,
      },
    },
    dragButton: {
      right: 0,
    },
    superset: {
      transform: 'translate(0, 10vh)',
    },
    firstSuperset: {
      transform: 'translate(0, 12vh)',
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
      <DeleteDrawer
        open={open}
        segmentId={props.segmentId}
        closeHandler={closeDrawer}
      />
      <Slide mountOnEnter unmountOnExit direction={'right'} in={true}>
        <div>
          <IconButton
            className={clsx(classes.baseButton, classes.deleteButton, {
              [classes.superset]: props.superset && props.orderNumber !== 1,
              [classes.firstSuperset]:
                props.superset && props.orderNumber === 1,
            })}
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
            className={clsx(
              'drag-handle',
              classes.baseButton,
              classes.dragButton,
              {
                [classes.superset]: props.superset && props.orderNumber !== 1,
                [classes.firstSuperset]:
                  props.superset && props.orderNumber === 1,
              }
            )}
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
  segmentId: string;
  orderNumber: number;
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
