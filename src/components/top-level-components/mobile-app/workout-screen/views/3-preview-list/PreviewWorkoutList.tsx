import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { routerActions } from 'connected-react-router';
import { Button, ListSubheader, Paper } from '@material-ui/core';
import { State } from '../../../../../../configs/redux/store';
import WorkoutListDivider from '../../../shared/WorkoutListDivider';
import { Phase, Segment } from '../../../../../../configs/models/AppInterfaces';
import { MOBILE_ACTIVE_WORKOUT_SCREEN_PATH } from '../../../../../../configs/constants/app';
import {
  getPhaseName,
  sortPhaseSegments,
} from '../../../../../../utils/workout-configs';
import { PhaseVO } from '../../../../../../configs/models/configurations/PhaseVO';
import PreviewListItem from './PreviewListItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '87vh',
    },
    listWrapper: {
      width: '100%',
      paddingTop: 0,
      paddingBottom: '6vh',
      backgroundColor: theme.palette.background.paper,
    },
    startButton: {
      borderRadius: 0,
      height: '6vh',
      width: '100%',
      background: '#ed440b',
      position: 'fixed',
      bottom: 0,
    },
  })
);

const PreviewWorkoutList = (props: PreviewWorkoutListProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={5} square>
        {props.routinePhases.map((phase: Phase, index: number) => {
          return (
            <List
              key={index}
              className={classes.listWrapper}
              subheader={
                <ListSubheader component={'div'}>
                  {getPhaseName(props.configPhases, phase.phaseId)}
                </ListSubheader>
              }
            >
              {sortPhaseSegments(phase.segments).map((segment: Segment) => {
                return (
                  <>
                    <PreviewListItem key={segment.id} segment={segment} />
                    <WorkoutListDivider />
                  </>
                );
              })}
            </List>
          );
        })}

        <Button
          className={classes.startButton}
          onClick={props.routeClickHandler}
        >
          {'Start Workout'}
        </Button>
      </Paper>
    </div>
  );
};

export interface PreviewWorkoutListProps {
  routeClickHandler: () => void;
  routinePhases: Phase[];
  configPhases: PhaseVO[];
}

const mapStateToProps = (state: State): PreviewWorkoutListProps => {
  const selectedRoutine = state.workoutState.selectedRoutineTemplate;
  const sortedPhases = selectedRoutine.phases.sort(
    (a: Phase, b: Phase) => a.order - b.order
  );
  return {
    routinePhases: sortedPhases,
    configPhases: state.workoutState.configs.phases,
  } as unknown as PreviewWorkoutListProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PreviewWorkoutListProps =>
  ({
    routeClickHandler: () => {
      dispatch(routerActions.push(MOBILE_ACTIVE_WORKOUT_SCREEN_PATH));
    },
  } as unknown as PreviewWorkoutListProps);

export default connect(mapStateToProps, mapDispatchToProps)(PreviewWorkoutList);
