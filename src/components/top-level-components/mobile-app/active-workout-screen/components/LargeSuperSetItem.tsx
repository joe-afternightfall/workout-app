import React from 'react';
import LinkIcon from '@material-ui/icons/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import barbellIcon from '../../../../../configs/icons/barbell.gif';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import dumbBellIcon from '../../../../../configs/icons/dumbbell.png';
import { Divider, Grid, ListItemIcon, Typography } from '@material-ui/core';
import preacherCurls from '../../../../../configs/icons/exercises/barbells/preacher-curl-barbell.png';
import inclinePressDumbBells from '../../../../../configs/icons/exercises/dumbells/incline-press-dumbells.png';

const useStyles = makeStyles(() =>
  createStyles({
    listItemRoot: {
      padding: 0,
    },
    exerciseIcon: {
      height: '15vh',
      margin: 'auto',
    },
    itemIconWrapper: {
      backgroundColor: 'gray',
      padding: 4,
      width: '15vh',
    },
    title: {
      fontSize: '1.225rem',
      paddingBottom: '1vh',
    },
    textWrapper: {
      paddingLeft: 12,
    },
    dividerWrapper: {
      marginTop: -12,
    },
    bottomListItemRoot: {
      padding: 0,
      color: '#fff',
      marginTop: -16,
    },
    secondaryTitle: {
      paddingTop: 4,
    },
  })
);

export default function LargeSuperSetItem(
  props: LargeSuperSetItemProps
): JSX.Element {
  const classes = useStyles();

  return (
    <div>
      <ListItem className={classes.listItemRoot}>
        <ListItemIcon className={classes.itemIconWrapper}>
          <img
            alt={'app-logo'}
            src={inclinePressDumbBells}
            className={classes.exerciseIcon}
          />
        </ListItemIcon>
        <ListItemText
          className={classes.textWrapper}
          disableTypography
          primary={
            <Typography
              variant={'body1'}
              color={'textPrimary'}
              className={classes.title}
            >
              {props.firstExerciseTitle}
            </Typography>
          }
        />
      </ListItem>

      <ListItem className={classes.listItemRoot}>
        <ListItemIcon
          style={{
            height: 0,
            width: '15.5vh',
            marginRight: 12,
          }}
        />
        <ListItemText
          disableTypography
          className={classes.dividerWrapper}
          primary={
            <Grid item xs={12} container alignItems={'center'}>
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

      <ListItem className={classes.bottomListItemRoot}>
        <ListItemIcon className={classes.itemIconWrapper}>
          <img
            src={preacherCurls}
            alt={'app-logo'}
            className={classes.exerciseIcon}
          />
        </ListItemIcon>
        <ListItemText
          className={classes.textWrapper}
          disableTypography
          primary={
            <Typography
              variant={'body1'}
              color={'textPrimary'}
              className={classes.title}
            >
              {props.secondExerciseTitle}
            </Typography>
          }
        />
      </ListItem>
    </div>
  );
}

export interface LargeSuperSetItemProps {
  firstExerciseTitle: string;
  firstExerciseRepsAndSets: string;
  // firstExerciseIcon: string;
  secondExerciseTitle: string;
  secondExerciseRepsAndSets: string;
  // secondExerciseIcon: string;
}
