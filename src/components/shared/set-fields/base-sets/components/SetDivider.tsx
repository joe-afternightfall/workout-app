import clsx from 'clsx';
import React from 'react';
import { Divider, Grid } from '@material-ui/core';
import { AppTheme } from '../../../../../configs/theme/app-theme';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      width: '0%',
      height: '100%',
    },
    divider: {
      width: 2,
      height: '75%',
    },
    activeText: {
      background: theme.palette.custom.colors.activeText,
    },
  })
);

export default function SetDivider(props: SetDividerProps): JSX.Element {
  const classes = useStyles();
  const { activeSet, markedDone } = props;

  return (
    <Grid
      item
      container
      alignItems={'center'}
      justify={'center'}
      className={classes.root}
    >
      <Divider
        orientation={'vertical'}
        className={clsx(classes.divider, {
          [classes.activeText]: activeSet || markedDone,
        })}
      />
    </Grid>
  );
}

interface SetDividerProps {
  activeSet: boolean;
  markedDone: boolean;
}
