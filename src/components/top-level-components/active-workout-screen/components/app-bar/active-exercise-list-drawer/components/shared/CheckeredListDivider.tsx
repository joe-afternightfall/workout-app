import React from 'react';
import { ListItem } from '@material-ui/core';

export default function CheckeredListDivider(): JSX.Element {
  return (
    <ListItem
      style={{
        height: '2vh',
        padding: 0,
        color: 'white',
        background:
          'repeating-linear-gradient(-55deg, #222, #222 5px, #333 5px, #333 10px)',
      }}
    />
  );
}
