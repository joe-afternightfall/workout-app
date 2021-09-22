import clsx from 'clsx';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { State } from '../../../../../configs/redux/store';
import { Grid, ListItemIcon, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { openEditSet } from '../../../../../creators/new-workout/workout-selections';
import { AppTheme } from '../../../../../configs/theme/app-theme';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      padding: 0,
    },
    bottomRoot: {
      padding: 0,
      marginTop: -16,
    },
    title: {
      fontSize: '1.125rem',
      paddingBottom: '1vh',
    },
    upNextTitle: {
      fontSize: '1rem',
    },
    itemIconWrapper: {
      // todo: come back and assign palette color
      backgroundColor: 'gray',
      padding: 4,
      width: '13vh',
      height: '13vh',
    },
    textWrapper: {
      paddingLeft: 12,
    },
    secondaryTitle: {
      paddingTop: 4,
    },
    upNextHighlight: {
      color: theme.palette.custom.colors.active,
    },
  })
);

const SingleSetItem = (
  props: SingleSetItemProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();

  const openEditSet = () => {
    if (props.segmentId) {
      props.editSetHandler(props.segmentId);
    }
  };

  const display = (
    <>
      <ListItemIcon className={classes.itemIconWrapper}>
        {props.exerciseIcon}
      </ListItemIcon>
      <ListItemText
        className={classes.textWrapper}
        disableTypography
        primary={
          props.displayUpNextTitle ? (
            <Grid item xs={12} container alignItems={'center'}>
              <Grid item xs={12}>
                <Typography
                  variant={'body1'}
                  color={'textPrimary'}
                  className={classes.upNextHighlight}
                >
                  {'Up Next'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant={'body1'}
                  color={'textPrimary'}
                  className={classes.upNextTitle}
                >
                  {props.exerciseTitle}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Typography
              variant={'body1'}
              color={'textPrimary'}
              className={
                props.bottomListItem && props.upNextCard
                  ? classes.upNextTitle
                  : classes.title
              }
            >
              {props.exerciseTitle}
            </Typography>
          )
        }
        secondary={
          <Grid item xs={12} container alignItems={'center'}>
            <Grid item container alignItems={'center'}>
              <Grid item>{props.equipmentIcon}</Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant={'body2'}
                color={'textSecondary'}
                className={clsx({
                  [classes.secondaryTitle]: !props.equipmentIcon,
                })}
              >
                {props.repsAndSets}
              </Typography>
            </Grid>
          </Grid>
        }
      />
    </>
  );

  return props.displayEditOptions ? (
    <ListItem
      button
      className={props.bottomListItem ? classes.bottomRoot : classes.root}
      onClick={openEditSet}
    >
      {display}
    </ListItem>
  ) : (
    <ListItem
      className={props.bottomListItem ? classes.bottomRoot : classes.root}
    >
      {display}
    </ListItem>
  );
};

interface PassedInProps {
  displayUpNextTitle?: boolean;
  bottomListItem?: boolean;
  upNextCard?: boolean;
  exerciseTitle: string;
  repsAndSets: string;
  equipmentIcon?: JSX.Element;
  exerciseIcon?: JSX.Element;
  segmentId?: string;
}

export interface SingleSetItemProps {
  displayEditOptions: boolean;
  editSetHandler: (segmentId: string) => void;
}

const mapStateToProps = (state: State): SingleSetItemProps => {
  return {
    displayEditOptions: state.workoutState.displayEditPreviewList,
  } as unknown as SingleSetItemProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SingleSetItemProps =>
  ({
    editSetHandler: (segmentId: string) => {
      dispatch(openEditSet(segmentId));
    },
  } as unknown as SingleSetItemProps);

export default connect(mapStateToProps, mapDispatchToProps)(SingleSetItem);
