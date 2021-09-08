import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, ListItemIcon, Typography } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import LinkIcon from '@material-ui/icons/Link';

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
      height: '13vh',
    },
    title: {
      fontSize: '1.125rem',
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

export default function SuperSetItem(props: SuperSetItemProps): JSX.Element {
  const classes = useStyles();

  return (
    <div>
      <ListItem className={classes.listItemRoot}>
        <ListItemIcon className={classes.itemIconWrapper}>
          {props.firstExerciseIcon}
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
                <Grid item>{props.firstEquipmentIcon}</Grid>
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
          {props.secondExerciseIcon}
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
                <Grid item>{props.secondEquipmentIcon}</Grid>
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
  firstEquipmentIcon?: JSX.Element;
  firstExerciseIcon?: JSX.Element;
  secondExerciseTitle: string;
  secondExerciseRepsAndSets: string;
  secondEquipmentIcon?: JSX.Element;
  secondExerciseIcon?: JSX.Element;
}
