import './styles.css';
import { motion } from 'framer-motion';
import React, { useCallback, useRef, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import DraggableListItem from './DraggableListItem';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

function findIndex(index: number, offsetY: number, sizes: number[]) {
  let target = index;

  // If moving down
  if (offsetY > 0) {
    const nextHeight = sizes[index + 1];
    if (nextHeight === undefined) return index;

    const swapOffset = nextHeight;
    if (offsetY > swapOffset) target = index + 1;

    // If moving up
  } else if (offsetY < 0) {
    const prevHeight = sizes[index - 1];
    if (prevHeight === undefined) return index;

    const swapOffset = prevHeight;
    if (offsetY < -swapOffset) target = index - 1;
  }

  return Math.min(Math.max(target, 0), sizes.length);
}

function moveArray<T>(items: T[], startIndex: number, endIndex: number) {
  const clone = items.slice();
  clone[endIndex] = items[startIndex];
  clone[startIndex] = items[endIndex];
  return clone;
}

export default function DraggableList(props: DraggableListProps): JSX.Element {
  const [items, setItems] = useState<ItemType[]>(() => props.initialItems);

  const sizes = useRef(new Array(items.length).fill(0)).current;

  const onPositionUpdate = useCallback(
    (startIndex: number, endIndex: number) => {
      setItems(moveArray(items, startIndex, endIndex));
    },
    [items, setItems]
  );

  const handleChange = useCallback(
    (i: number, dragOffset: number) => {
      const targetIndex = findIndex(i, dragOffset, sizes);
      if (targetIndex !== i) {
        const swapSize = sizes[targetIndex];
        sizes[targetIndex] = sizes[i];
        sizes[i] = swapSize;

        onPositionUpdate(i, targetIndex);
      }
    },
    [sizes, onPositionUpdate]
  );

  const handleMeasure = useCallback(
    (index: number, size: number) => {
      sizes[index] = size;
    },
    [sizes]
  );

  return (
    <motion.ul>
      {items.map((item, i) => (
        <DraggableListItem
          key={item.id}
          height={item.height}
          color={item.color}
          index={i}
          handleChange={handleChange}
          handleMeasure={handleMeasure}
        />
      ))}
    </motion.ul>
  );
}

export type ItemType = {
  id: number;
  color: string;
  height: number;
};

export interface DraggableListProps {
  initialItems: ItemType[];
}
