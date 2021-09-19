import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { motion, AnimatePresence } from 'framer-motion';
import PreviewWorkoutList from './views/3-preview-list/PreviewWorkoutList';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function FramerMotionTab(
  props: FramerMotionTabProps
): JSX.Element {
  const classes = useStyles();

  return (
    <AnimatePresence>
      <Grid
        item
        xs={12}
        key={props.key}
        component={motion.div}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{
          // type: 'spring',
          // delay: 0.5,
          duration: 1,
        }}
      >
        {props.component}
      </Grid>
    </AnimatePresence>
  );
}

export interface FramerMotionTabProps {
  key: number;
  component: JSX.Element;
}
