import React from 'react';
import { Segment } from 'workout-app-common-core';
import CategoryHeader from '../../shared/CategoryHeader';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CheckeredListDivider from '../../shared/CheckeredListDivider';
import PreviewListItem from '../../../../../../../../shared/exercise-list/PreviewListItem';

const useStyles = makeStyles(() =>
  createStyles({
    doneWrapper: {
      opacity: '0.4',
      position: 'relative',
    },
  })
);

export default function DoneSection(props: DoneSectionProps): JSX.Element {
  const classes = useStyles();
  const { doneSegments } = props;

  return (
    <>
      <CategoryHeader title={'Done'} />
      {doneSegments.map((segment, index) => {
        const displayDivider = doneSegments.length !== index + 1;
        return (
          <div key={index} className={classes.doneWrapper}>
            <PreviewListItem segment={segment} />
            {displayDivider && <CheckeredListDivider />}
          </div>
        );
      })}
    </>
  );
}

interface DoneSectionProps {
  doneSegments: Segment[];
}
