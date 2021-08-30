import clsx from 'clsx';
import React from 'react';
import { teal } from '@material-ui/core/colors';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Card, CardActionArea, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionArea: {
      color: '#fff',
      backgroundColor: teal[500],
      height: '13vh',
      // backgroundColor: '#404040',
      // backgroundColor: '#635cf4',
      // backgroundColor: '#534d9f',
      // backgroundColor: '#3CBDEDFF',
    },
    titleWrapper: {
      marginLeft: 16,
    },
    topMargin: {
      marginTop: 16,
    },
  })
);

export default function SelectionCard(props: SelectionCardProps): JSX.Element {
  const classes = useStyles();

  return (
    <Card
      raised={true}
      className={clsx({
        [classes.topMargin]: props.addTopMargin,
      })}
    >
      <CardActionArea
        className={classes.actionArea}
        onClick={() => {
          props.clickHandler();
        }}
        style={{ backgroundColor: props.cardColor }}
      >
        <Grid container alignItems={'center'} style={{ height: '100%' }}>
          <Grid item className={classes.titleWrapper}>
            <Typography variant={'h5'}>{props.title}</Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

export interface SelectionCardProps {
  title: string;
  addTopMargin: boolean;
  cardColor: string;
  clickHandler: () => void;
}
