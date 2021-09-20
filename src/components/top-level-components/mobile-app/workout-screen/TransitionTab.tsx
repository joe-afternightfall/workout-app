import React from 'react';
import { Grid } from '@material-ui/core';
import { motion } from 'framer-motion';

export default function TransitionTab(
  props: FramerMotionTabProps
): JSX.Element {
  const { key, component, isVisible, direction } = props;

  return isVisible ? (
    <motion.div
      key={key}
      initial={{ x: direction > 0 ? '100vw' : '-100vw' }}
      animate={{
        x: 0,
        transition: {
          delay: 0.15,
          duration: 0.75,
          when: 'beforeChildren',
          staggerChildren: 0.5,
        },
      }}
      exit={{
        x: props.direction > 0 ? '-100vw' : '100vw',
        transition: {
          duration: 0.5,
        },
      }}
    >
      <Grid item xs={12}>
        {component}
      </Grid>
    </motion.div>
  ) : (
    <React.Fragment />
  );
}

export interface FramerMotionTabProps {
  key: number;
  direction: 1 | -1;
  isVisible: boolean;
  component: JSX.Element;
}
