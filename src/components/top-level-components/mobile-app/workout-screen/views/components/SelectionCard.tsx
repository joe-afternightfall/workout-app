import clsx from 'clsx';
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    actionArea: {
      color: '#fff',
      height: '13vh',
      // backgroundColor: '#404040',
      // backgroundColor: '#635cf4',
      // backgroundColor: '#534d9f',
      // backgroundColor: '#3CBDEDFF',
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
      className={clsx({
        [classes.topMargin]: props.addTopMargin,
      })}
    >
      <CardActionArea
        className={classes.actionArea}
        onClick={() => {
          props.clickHandler();
        }}
      >
        <Grid
          container
          justify={props.justify}
          alignItems={'center'}
          style={{ height: '100%' }}
        >
          <Grid item>
            <Typography variant={'h5'} style={{ margin: '0 16px' }}>
              {props.title}
            </Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

interface SelectionCardProps {
  title: string;
  addTopMargin: boolean;
  clickHandler: () => void;
  justify: 'flex-start' | 'flex-end';
}
