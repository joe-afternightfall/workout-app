import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, ListItemIcon } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import LinkIcon from '@material-ui/icons/Link';
import SingleListItem from './SingleListItem';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 0,
    },
    listItemText: {
      margin: 0,
    },
    topListItemText: {
      margin: '4px 0 0 0',
    },
  })
);

export default function SuperSetItem(props: SuperSetItemProps): JSX.Element {
  const classes = useStyles();

  return (
    <div>
      <SingleListItem
        exerciseTitle={props.firstExerciseTitle}
        repsAndSets={props.firstExerciseRepsAndSets}
      />

      <ListItem className={classes.root}>
        <ListItemIcon
          style={{ backgroundColor: 'gray', height: 0, marginRight: 8 }}
        />
        <ListItemText
          className={classes.listItemText}
          disableTypography
          primary={
            <Grid
              item
              xs={12}
              container
              alignItems={'center'}
              // style={{ marginTop: -4 }}
            >
              <Grid item xs={10}>
                <Divider variant={'fullWidth'} />
              </Grid>
              <Grid item xs={2} container alignItems={'center'}>
                <LinkIcon style={{ marginLeft: 8, height: 22 }} />
              </Grid>
            </Grid>
          }
        />
      </ListItem>

      <SingleListItem
        exerciseTitle={props.secondExerciseTitle}
        repsAndSets={props.secondExerciseRepsAndSets}
      />
    </div>
  );
}

export interface SuperSetItemProps {
  firstExerciseTitle: string;
  firstExerciseRepsAndSets: string;
  // firstExerciseIcon: string;
  secondExerciseTitle: string;
  secondExerciseRepsAndSets: string;
  // secondExerciseIcon: string;
}
