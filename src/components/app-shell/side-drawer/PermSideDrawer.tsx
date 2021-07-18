import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Navigation from './components/Navigation';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { FULL_DRAWER_WIDTH } from '../../../configs/constants/app';

const drawerWidth = FULL_DRAWER_WIDTH;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  })
);

export default function PermSideDrawer(): JSX.Element {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant={'permanent'}
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor={'left'}
    >
      <div className={classes.toolbar} />
      <Divider />

      <Navigation />
    </Drawer>
  );
}
