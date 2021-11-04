import React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../../../configs/redux/store';
import { ManikinMuscleGroupVO } from 'workout-app-common-core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
  })
);

const MuscleGroupList = (
  props: MuscleGroupListProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();
  const { selectMuscleHandler, manikinMuscleGroups } = props;
  return (
    <List className={classes.root}>
      {manikinMuscleGroups.map((group, index) => {
        return (
          <ListItem
            key={index}
            button
            onClick={() => {
              selectMuscleHandler(group.id);
            }}
          >
            <ListItemText primary={group.name} />
          </ListItem>
        );
      })}
    </List>
  );
};

interface PassedInProps {
  selectMuscleHandler: (id: string) => void;
}

interface MuscleGroupListProps {
  manikinMuscleGroups: ManikinMuscleGroupVO[];
}

const mapStateToProps = (state: State): MuscleGroupListProps => {
  return {
    manikinMuscleGroups: state.workoutState.configs.manikinMuscleGroups,
  } as unknown as MuscleGroupListProps;
};

export default connect(mapStateToProps)(MuscleGroupList);
