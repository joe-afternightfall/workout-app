import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  PropsWithChildren,
} from 'react';
import { motion } from 'framer-motion';
import './styles.css';

/**
 * This is an example of drag-to-reorder in Framer Motion 4.
 *
 * Original version: https://codesandbox.io/s/framer-motion-2-drag-to-reorder-dynamic-size-illop
 */

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

type DraggableListItemProps = {
  index: number;
  height: number;
  color: string;
  handleChange: (i: number, dragOffset: number) => void;
  handleMeasure: (index: number, size: number) => void;
};

function DraggableListItem({
  index,
  height,
  color,
  children,
  handleChange,
  handleMeasure,
}: PropsWithChildren<DraggableListItemProps>) {
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

export type ItemType = {
  id: number;
  color: string;
  height: number;
};

type DraggableListProps = {
  initialItems: ItemType[];
};

function DraggableList({ initialItems }: DraggableListProps) {
  const [items, setItems] = useState<ItemType[]>(() => initialItems);

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

const initialItems = [
  { id: 1, color: '#A30006', height: 60 },
  { id: 2, color: '#2A6E78', height: 70 },
  { id: 3, color: '#6E1E62', height: 80 },
  { id: 4, color: '#DE4126', height: 90 },
];

export default function HandRolledDrag() {
  return <DraggableList initialItems={initialItems} />;
}
