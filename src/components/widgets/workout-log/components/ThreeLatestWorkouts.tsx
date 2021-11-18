import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { State } from '../../../../configs/redux/store';

const useStyles = makeStyles(() => createStyles({}));

const ThreeLatestWorkouts = (props: ThreeLatestWorkoutsProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <p>Functional Connected Component</p>
    </div>
  );
};

interface ThreeLatestWorkoutsProps {
  DELETE_ME?: string;
}

const mapStateToProps = (state: State): ThreeLatestWorkoutsProps => {
  return {} as unknown as ThreeLatestWorkoutsProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ThreeLatestWorkoutsProps =>
  ({} as unknown as ThreeLatestWorkoutsProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreeLatestWorkouts);
