import React from 'react';
import { ListItem } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    dashed: {
      width: '100%',
      height: 4,
      opacity: 0.4,
      backgroundSize: '4px 4px',
      backgroundImage: `linear-gradient(-45deg, #ED440B 25%, transparent 25%, transparent 50%, #ED440B 50%, #ED440B 75%, transparent 0%)`,
    },
  })
);

export default function SlantedOrangeDivider(): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem>
      <div className={classes.dashed} />
    </ListItem>
  );
}
