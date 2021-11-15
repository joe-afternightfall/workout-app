import clsx from 'clsx';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import ReorderIcon from '@material-ui/icons/Reorder';
import { IconButton, Slide } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { toggleDeleteExerciseDrawer } from '../../../../../../../creators/workout/delete-exercise-drawer';
import { PhaseTypeEditingSegment } from '../../../../../../../configs/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    baseButton: {
      zIndex: 1,
      borderRadius: '0 4px 4px 0',
      height: '6vh',
      width: '6vh',
      position: 'absolute',
      transform: 'translate(0, 3vh)',
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
      transform: 'translate(0, 9.5vh)',
    },
  })
);

const EditOptions = (props: EditOptionsProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  const { superset, onlyDisplayDelete } = props;

  return (
    <>
      <Slide mountOnEnter unmountOnExit direction={'right'} in={true}>
        <div>
          <IconButton
            className={clsx(classes.baseButton, classes.deleteButton, {
              [classes.superset]: superset,
            })}
            aria-label={'delete'}
            onClick={props.openDrawerHandler}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </Slide>

      {!onlyDisplayDelete && (
        <Slide mountOnEnter unmountOnExit direction={'left'} in={true}>
          <div>
            <IconButton
              className={clsx(
                'drag-handle',
                classes.baseButton,
                classes.dragButton,
                {
                  [classes.superset]: superset,
                }
              )}
              aria-label={'re-order'}
            >
              <ReorderIcon />
            </IconButton>
          </div>
        </Slide>
      )}
    </>
  );
};

interface PassedInProps {
  superset?: boolean;
  segmentId: string;
  phaseType: PhaseTypeEditingSegment;
  onlyDisplayDelete: boolean;
}

interface EditOptionsProps {
  openDrawerHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): EditOptionsProps =>
  ({
    openDrawerHandler: () => {
      dispatch(
        toggleDeleteExerciseDrawer({
          open: true,
          segmentId: ownProps.segmentId,
          phaseType: ownProps.phaseType,
        })
      );
    },
  } as unknown as EditOptionsProps);

export default connect(null, mapDispatchToProps)(EditOptions);
