import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider, Grid, ListItemIcon } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function FolderList() {
  const classes = useStyles();

  return (
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
                    height: 56,
                    width: '100%',
                  }}
                />
              </Grid>
              <Grid item>
                <div
                  style={{ backgroundColor: 'red', height: 56, width: '100%' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10} style={{ paddingLeft: 16 }}>
            <Grid container>
              <Grid item xs={12}>
                <ListItemText
                  primary={'Burpee'}
                  secondary={'10 reps | 8 reps | 6 reps | 4 reps'}
                />
              </Grid>
              <Grid
                item
                xs={12}
                container
                alignItems={'center'}
                style={{ height: 40 }}
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
          secondary={'20 reps | 20 reps | 20 reps'}
        />
      </ListItem>
    </List>
  );
}
