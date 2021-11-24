import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import BaseSet from '../set-fields/base-sets/BaseSet';
import DeleteIcon from '@material-ui/icons/Delete';
import { ActiveSetInfo, BuiltSets } from 'workout-app-common-core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { buildSetTextFieldInfo } from '../../../utils/set-info-builder';
import { deleteSetFromRoutineCopy } from '../../../creators/workout/preview-workout';
import ActionButton from '../../top-level-components/workout-screens/3-preview-workout/components/edit-set/components/ActionButton';

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
    fieldWrapper: {
      paddingRight: 4,
    },
    actionWrapper: {
      height: '100%',
    },
  })
);

const EditSupersetRow = (
  props: EditSupersetRowProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();
  const { builtSets, deleteClickHandler } = props;
  const supersets: JSX.Element[] = [];

  Object.values(builtSets).map((setInfo: ActiveSetInfo[], index: number) => {
    const shouldDisable = setInfo.length === 1;
    supersets.push(
      <Grid
        container
        alignItems={'flex-start'}
        className={classes.root}
        key={index}
      >
        <Grid item xs={8} className={classes.fieldWrapper}>
          {setInfo.map((info: ActiveSetInfo) => {
            if (info.exercise) {
              return (
                <BaseSet
                  key={info.setId}
                  superset={true}
                  activeSet={false}
                  markedDone={false}
                  scrollToSetNumber={info.setNumber}
                  extraStyles={
                    info.exerciseOrder === 1
                      ? classes.topRow
                      : classes.bottomRow
                  }
                  info={buildSetTextFieldInfo(
                    info,
                    info.exercise.parameterTypeId,
                    info.exercise.alternateSides,
                    false
                  )}
                />
              );
            }
          })}
        </Grid>
        <Grid item xs={4} className={classes.actionWrapper}>
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
  builtSets: BuiltSets;
}

interface EditSupersetRowProps {
  deleteClickHandler: (setInfo: ActiveSetInfo[]) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): EditSupersetRowProps =>
  ({
    deleteClickHandler: (setInfo: ActiveSetInfo[]) => {
      setInfo.map((info) => {
        dispatch(deleteSetFromRoutineCopy(info.setId));
      });
    },
  } as unknown as EditSupersetRowProps);

export default connect(null, mapDispatchToProps)(EditSupersetRow);
