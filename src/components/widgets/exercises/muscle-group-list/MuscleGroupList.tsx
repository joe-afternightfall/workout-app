import React from 'react';
import { muscleGroups } from 'workout-app-common-core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
  })
);

export default function MuscleGroupList(
  props: MuscleGroupListProps
): JSX.Element {
  const classes = useStyles();
  const { selectMuscleHandler } = props;
  return (
    <List className={classes.root}>
      {muscleGroups.map((group, index) => {
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
}

interface MuscleGroupListProps {
  selectMuscleHandler: (id: string) => void;
}
