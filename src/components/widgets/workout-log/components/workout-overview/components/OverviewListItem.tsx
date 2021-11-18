import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Segment } from 'workout-app-common-core';
import {
  Card,
  CardContent,
  Grid,
  ListItem,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(() =>
  createStyles({
    firstCard: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    lastCard: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    middleCard: {
      borderRadius: 0,
      borderLeft: '2px solid black',
      borderRight: '2px solid black',
    },
  })
);

export default function OverviewListItem(
  props: OverviewListItemProps
): JSX.Element {
  const classes = useStyles();
  const { segment } = props;

  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12}>
          <Typography>{segment.exercises[0].exerciseId}</Typography>
        </Grid>
        <Grid item xs={12} container>
          {segment.exercises[0].sets.map((set, index) => {
            let widthSize = '100%';
            switch (segment.exercises[0].sets.length) {
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
            const firstCard = index === 0;
            const lastCard = index === segment.exercises[0].sets.length - 1;
            return (
              <Card
                key={index}
                elevation={0}
                style={{ width: widthSize }}
                className={clsx({
                  [classes.firstCard]: firstCard,
                  [classes.lastCard]: lastCard,
                  [classes.middleCard]: !firstCard && !lastCard,
                })}
              >
                <CardContent>
                  <Grid container>
                    <Grid item xs={12}>
                      {'top set info'}
                    </Grid>
                    <Grid item xs={12}>
                      {'bottom set info'}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      </Grid>
    </ListItem>
  );
}

interface OverviewListItemProps {
  segment: Segment;
}
