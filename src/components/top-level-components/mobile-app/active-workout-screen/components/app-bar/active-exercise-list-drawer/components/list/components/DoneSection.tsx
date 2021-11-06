import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import { Segment } from 'workout-app-common-core';
import CategoryHeader from '../../shared/CategoryHeader';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CheckeredListDivider from '../../shared/CheckeredListDivider';
import PreviewListItem from '../../../../../../../shared/exercise-list/PreviewListItem';

const useStyles = makeStyles(() =>
  createStyles({
    checkedIcon: {
      zIndex: 1,
      position: 'absolute',
      width: '13vh',
      height: '7vh',
      top: '50%',
      transform: 'translateY(-50%)',
    },
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
            <CheckIcon className={classes.checkedIcon} />
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
