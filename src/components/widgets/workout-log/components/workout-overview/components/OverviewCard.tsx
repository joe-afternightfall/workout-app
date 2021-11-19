import clsx from 'clsx';
import React from 'react';
import { Set } from 'workout-app-common-core';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    firstCard: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRight: '1px solid black',
    },
    lastCard: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderLeft: '1px solid black',
    },
    middleCard: {
      borderRadius: 0,
      borderLeft: '1px solid black',
      borderRight: '1px solid black',
    },
    onlyOneCard: {
      width: '100%',
    },
  })
);

export default function OverviewCard(props: OverviewCardProps): JSX.Element {
  const classes = useStyles();
  const { set, totalSets } = props;

  let onlyCard = false;
  let firstCard = false;
  let lastCard = false;
  let widthSize = '100%';

  if (totalSets === 1) {
    onlyCard = true;
  } else if (set.setNumber === 1) {
    firstCard = true;
  } else if (set.setNumber === totalSets) {
    lastCard = true;
  }

  switch (totalSets) {
    case 1:
      widthSize = '100%';
      break;
    case 2:
      widthSize = '50%';
      break;
    case 3:
      widthSize = '33.33%';
      break;
    case 4:
      widthSize = '25%';
      break;
    case 5:
      widthSize = '20%';
      break;
  }

  return (
    <Card
      elevation={0}
      style={{ width: widthSize }}
      className={clsx({
        [classes.onlyOneCard]: onlyCard,
        [classes.firstCard]: firstCard,
        [classes.lastCard]: lastCard,
        [classes.middleCard]: !firstCard && !lastCard,
      })}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant={'subtitle1'}>{`${set.weight} lbs`}</Typography>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant={'subtitle1'}>{`${set.reps} reps`}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

interface OverviewCardProps {
  set: Set;
  totalSets: number;
}
