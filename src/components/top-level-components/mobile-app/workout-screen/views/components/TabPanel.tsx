import React from 'react';
import Box from '@material-ui/core/Box';

export default function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;

  return (
    <div role={'tab-panel'} hidden={value !== index} {...other}>
      {value === index && <Box component={'div'}>{children}</Box>}
    </div>
  );
}

interface TabPanelProps {
  children: React.ReactNode;
  dir: string;
  index: number;
  value: number;
}
