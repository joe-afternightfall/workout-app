import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { State } from '../../../../../../configs/redux/store';
import { MusclesWorked, MuscleVO } from 'workout-app-common-core';
import { findMuscle } from '../../../../../../utils/object-finder';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    musclesWorkedImage: {
      width: '75%',
      margin: 'auto',
    },
    primaryChip: {
      background: '#A59AFB',
      marginBottom: 8,
    },
    secondaryChip: {
      // background: '#D95BD8',
      // background: '#beb8fa',
      background: '#E08BE0',
      marginBottom: 8,
    },
    cardMedia: {
      textAlign: 'center',
    },
  })
);

const MusclesWorkedCard = (
  props: MusclesWorkedCardProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();
  const { iconId, musclesWorked, muscles } = props;

  return (
    <Card>
      <CardContent>
        <Typography variant={'h6'}>{'Muscles Worked'}</Typography>
      </CardContent>
      <CardMedia className={classes.cardMedia}>
        <img
          className={classes.musclesWorkedImage}
          alt={`${iconId}-muscles-worked`}
          src={`images/exercises/${iconId}/${iconId}-muscles-worked.png`}
        />
      </CardMedia>
      <CardContent>
        <Grid container>
          <Grid item xs={6} style={{ textAlign: 'center' }}>
            <Grid item xs={12}>
              <Typography variant={'body1'}>{'Primary'}</Typography>
            </Grid>
            <Grid item xs={12}>
              {musclesWorked.primary.map((primary, index) => {
                const foundMuscle = findMuscle(muscles, primary.muscleId);
                return (
                  foundMuscle && (
                    <Chip
                      key={index}
                      label={foundMuscle.name}
                      className={classes.primaryChip}
                    />
                  )
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'center' }}>
            <Grid item xs={12}>
              <Typography variant={'body1'}>{'Secondary'}</Typography>
            </Grid>
            <Grid item xs={12}>
              {musclesWorked.secondary.map((secondary, index) => {
                const foundMuscle = findMuscle(muscles, secondary.muscleId);
                return (
                  foundMuscle && (
                    <Chip
                      key={index}
                      label={foundMuscle.name}
                      className={classes.secondaryChip}
                    />
                  )
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

interface PassedInProps {
  iconId: string;
  musclesWorked: MusclesWorked;
}

interface MusclesWorkedCardProps {
  muscles: MuscleVO[];
}

const mapStateToProps = (state: State): MusclesWorkedCardProps => {
  return {
    muscles: state.workoutState.configs.muscles,
  } as unknown as MusclesWorkedCardProps;
};

export default connect(mapStateToProps)(MusclesWorkedCard);
