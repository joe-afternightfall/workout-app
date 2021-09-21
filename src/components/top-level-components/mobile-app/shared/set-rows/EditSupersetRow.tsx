import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import BaseSet from '../set-fields/BaseSet';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Segment,
  ActiveSetInfo,
} from '../../../../../configs/models/AppInterfaces';
import { buildSetInfo } from '../../../../../utils/active-workout';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ActionButton from '../../workout-screen/views/3-preview-list/components/edit-set/components/ActionButton';
import { deleteSetFromRoutineCopy } from '../../../../../creators/new-workout/preview-workout';
import { ExerciseVO } from '../../../../../configs/models/configurations/ExerciseVO';
import { State } from '../../../../../configs/redux/store';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '25vh',
      marginBottom: 16,
    },
    topRow: {
      marginBottom: '.6vh',
      borderRadius: '4px 0 0 0',
    },
    bottomRow: {
      borderRadius: '0 0 0 4px',
    },
  })
);

const EditSupersetRow = (
  props: EditSupersetRowProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();
  const { segment, deleteClickHandler, allExercises } = props;

  const builtSets = buildSetInfo(segment, allExercises);
  let shouldDisable = false;
  const supersets: JSX.Element[] = [];

  segment.exercises.map(
    (exercise) => (shouldDisable = exercise.sets.length === 1)
  );

  Object.values(builtSets).map((setInfo: ActiveSetInfo[]) => {
    supersets.push(
      <Grid container alignItems={'flex-start'} className={classes.root}>
        <Grid item xs={8} style={{ paddingRight: 4 }}>
          {setInfo.map((info) => {
            if (info.exercise) {
              return (
                <BaseSet
                  superset={true}
                  activeSet={false}
                  markedDone={false}
                  scrollToSetNumber={info.setNumber}
                  extraStyles={
                    info.exerciseOrder === 1
                      ? classes.topRow
                      : classes.bottomRow
                  }
                  info={{
                    setId: info.setId,
                    reps: info.reps,
                    weight: info.weight,
                    parameterTypeId: info.exercise.parameterTypeId,
                  }}
                />
              );
            }
          })}
        </Grid>
        <Grid item xs={4} style={{ height: '100%' }}>
          <ActionButton
            disabled={shouldDisable}
            clickHandler={() => {
              deleteClickHandler(setInfo);
            }}
            icon={<DeleteIcon fontSize={'large'} />}
          />
        </Grid>
      </Grid>
    );
  });

  return <div>{supersets.map((element) => element)}</div>;
};

interface PassedInProps {
  segment: Segment;
}

export interface EditSupersetRowProps {
  allExercises: ExerciseVO[];
  deleteClickHandler: (setInfo: ActiveSetInfo[]) => void;
}

const mapStateToProps = (state: State): EditSupersetRowProps => {
  return {
    allExercises: state.workoutState.configs.exercises,
  } as unknown as EditSupersetRowProps;
};

const mapDispatchToProps = (dispatch: Dispatch): EditSupersetRowProps =>
  ({
    deleteClickHandler: (setInfo: ActiveSetInfo[]) => {
      setInfo.map((info) => {
        dispatch(deleteSetFromRoutineCopy(info.setId));
      });
    },
  } as unknown as EditSupersetRowProps);

export default connect(mapStateToProps, mapDispatchToProps)(EditSupersetRow);
