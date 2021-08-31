import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  Button,
  Divider,
  Grid,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import barbellIcon from '../../../../../../configs/icons/barbell.gif';
import dumbBellIcon from '../../../../../../configs/icons/dumbbell.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface Props {
  goForwardHandler: () => void;
}

export default function FolderList(props: Props): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <List className={classes.root}>
        <ListItem style={{ paddingLeft: 0 }}>
          <ListItemIcon
            style={{ backgroundColor: 'orange', height: 56, marginRight: 8 }}
          />
          <ListItemText
            primary={'Downward Dog'}
            secondary={'5 reps | 5 reps | 5 reps'}
          />
        </ListItem>
        <ListItem
          style={{ width: '100%', padding: 4, backgroundColor: 'black' }}
        />
        <ListItem style={{ padding: 0 }}>
          <Grid container>
            <Grid item>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
                style={{ height: '100%', width: 56 }}
              >
                <Grid item>
                  <div
                    style={{
                      backgroundColor: 'blue',
                      height: 81,
                      width: '100%',
                    }}
                  />
                </Grid>
                <Grid item>
                  <div
                    style={{
                      backgroundColor: 'red',
                      height: 75,
                      width: '100%',
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10} style={{ paddingLeft: 16 }}>
              <Grid container>
                <Grid item xs={12} container>
                  <Grid item xs={12}>
                    <Typography color={'textPrimary'} variant={'body1'}>
                      {'Burpee'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color={'textSecondary'} variant={'body2'}>
                      {'10 reps | 8 reps | 6 reps | 4 reps'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} container alignItems={'center'}>
                    <img
                      style={{ height: 18, marginTop: 6 }}
                      src={barbellIcon}
                      alt={'barbell'}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    alignItems={'center'}
                    style={{ marginTop: -4 }}
                  >
                    <Grid item xs={10}>
                      <Divider variant={'fullWidth'} />
                    </Grid>
                    <Grid item xs={2} container alignItems={'center'}>
                      <LinkIcon style={{ marginLeft: 8 }} />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText
                      primary={'Mountain Climbers'}
                      secondary={'20 reps | 18 reps | 16 reps | 14 reps'}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem
          style={{ width: '100%', padding: 4, backgroundColor: 'black' }}
        />
        <ListItem style={{ paddingLeft: 0 }}>
          <ListItemIcon
            style={{ backgroundColor: 'gray', height: 56, marginRight: 8 }}
          />
          <ListItemText
            primary={'Crunch'}
            secondary={
              <Grid item xs={12} container alignItems={'center'}>
                <Grid item xs={12}>
                  <img
                    style={{ height: 18, marginTop: 6 }}
                    src={dumbBellIcon}
                    alt={'dumbBellIcon'}
                  />
                </Grid>
                <Grid item xs={12}>
                  {'20 reps | 20 reps | 20 reps'}
                </Grid>
              </Grid>
            }
          />
        </ListItem>
      </List>

      <Button onClick={props.goForwardHandler}>{'Start Workout'}</Button>
    </>
  );
}
