import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  PropsWithChildren,
} from 'react';
import { motion } from 'framer-motion';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function DraggableListItem(
  props: PropsWithChildren<DraggableListItemProps>
): JSX.Element {
  const classes = useStyles();
  const { index, height, color, children, handleChange, handleMeasure } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'animating' | 'dragging'>('idle');

  useEffect(() => {
    if (ref.current) {
      handleMeasure(index, ref.current.offsetHeight);
    }
  }, [ref, handleMeasure, index]);

  const onDragStart = useCallback(() => {
    setState('dragging');
  }, []);

  const onDragEnd = useCallback(() => {
    setState('animating');
  }, []);

  const onAnimationComplete = useCallback(() => {
    if (state === 'animating') setState('idle');
  }, [state]);

  const onViewportBoxUpdate = useCallback(
    (_viewportBox, delta) => {
      if (state === 'dragging') handleChange(index, delta.y.translate);
    },
    [index, state, handleChange]
  );

  return (
    <motion.li
      style={{
        padding: 0,
        height,
        zIndex: state === 'dragging' ? 3 : state === 'animating' ? 2 : 1,
      }}
    >
      <motion.div
        layout
        initial={false}
        drag
        ref={ref}
        style={{
          background: color,
          height,
          borderRadius: 5,
        }}
        whileHover={{
          scale: 1.03,
          boxShadow: '0px 3px 3px rgba(0,0,0,0.15)',
        }}
        whileTap={{
          scale: 1.12,
          boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
        }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onAnimationComplete={onAnimationComplete}
        onViewportBoxUpdate={onViewportBoxUpdate}
      >
        {children}
      </motion.div>
    </motion.li>
  );
}

export interface DraggableListItemProps {
  index: number;
  height: number;
  color: string;
  handleChange: (i: number, dragOffset: number) => void;
  handleMeasure: (index: number, size: number) => void;
}
