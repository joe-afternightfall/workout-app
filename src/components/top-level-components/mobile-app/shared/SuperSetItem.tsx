import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, ListItemIcon, Typography } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import LinkIcon from '@material-ui/icons/Link';
import barbellIcon from '../../../../configs/icons/barbell.gif';
import dumbBellIcon from '../../../../configs/icons/dumbbell.png';
import inclinePressDumbBells from '../../../../configs/icons/exercises/dumbells/incline-press-dumbells.png';
import preacherCurls from '../../../../configs/icons/exercises/barbells/preacher-curl-barbell.png';

const useStyles = makeStyles(() =>
  createStyles({
    listItemRoot: {
      padding: 0,
    },
    exerciseIcon: {
      height: '13vh',
      margin: 'auto',
    },
    itemIconWrapper: {
      backgroundColor: 'gray',
      padding: 4,
      width: '13vh',
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
      marginTop: -14,
    },
    secondaryTitle: {
      paddingTop: 4,
    },
  })
);

export default function SuperSetItem(props: SuperSetItemProps): JSX.Element {
  const classes = useStyles();

  return (
    <div>
      <ListItem className={classes.listItemRoot}>
        <ListItemIcon className={classes.itemIconWrapper}>
          <img
            src={inclinePressDumbBells}
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
              {props.firstExerciseTitle}
            </Typography>
          }
          secondary={
            <Grid item xs={12} container alignItems={'center'}>
              <Grid item container alignItems={'center'}>
                <Grid item>
                  <img
                    style={{ height: 18 }}
                    src={dumbBellIcon}
                    alt={'barbell'}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  className={classes.secondaryTitle}
                  variant={'body2'}
                  color={'textSecondary'}
                >
                  {props.firstExerciseRepsAndSets}
                </Typography>
              </Grid>
            </Grid>
          }
        />
      </ListItem>

      <ListItem className={classes.listItemRoot}>
        <ListItemIcon
          style={{
            height: 0,
            width: '13.5vh',
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
          secondary={
            <Grid item xs={12} container alignItems={'center'}>
              <Grid item container alignItems={'center'}>
                <Grid item>
                  <img
                    style={{ height: 18 }}
                    src={barbellIcon}
                    alt={'barbell'}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant={'body2'} color={'textSecondary'}>
                  {props.secondExerciseRepsAndSets}
                </Typography>
              </Grid>
            </Grid>
          }
        />
      </ListItem>
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
