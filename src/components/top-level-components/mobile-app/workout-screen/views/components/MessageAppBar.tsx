import React from 'react';
import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      paddingTop: 8,
      paddingBottom: 8,
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function MessageAppBar(props: MessageAppBarProps): JSX.Element {
  const classes = useStyles();
  let appBarMessage = '';

  switch (props.activeTab) {
    case 0:
      appBarMessage = 'Workouts';
      break;
    case 1:
      appBarMessage = 'Routines';
      break;
    default:
      break;
  }

  return (
    <AppBar position={'absolute'} style={{ minHeight: 48 }}>
      <Toolbar>
        <Grid container>
          <Grid item xs={2}>
            <IconButton
              edge={'start'}
              color={'inherit'}
              onClick={props.clickHandler}
              className={classes.menuButton}
              disabled={props.activeTab === 0}
            >
              <ArrowBackIcon fontSize={'small'} />
            </IconButton>
          </Grid>

          <Grid item xs={8} container justify={'center'} alignItems={'center'}>
            <Grid item>
              <Typography variant={'overline'} className={classes.title}>
                {appBarMessage}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={2} />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

interface MessageAppBarProps {
  activeTab: number;
  clickHandler: () => void;
}
