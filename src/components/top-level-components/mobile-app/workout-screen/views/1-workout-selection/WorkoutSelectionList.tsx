import React from 'react';
import {
  teal,
  lightBlue,
  deepPurple,
  deepOrange,
  indigo,
} from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import SelectionCard from '../components/SelectionCard';
import { isOdd } from '../../../../../../utils/number-util';

const WorkoutSelectionList = (
  props: WorkoutSelectionListProps & PassedInProps
): JSX.Element => {
  const selectionList: { name: string; color: string }[] = [
    {
      name: 'Back & Biceps',
      color: lightBlue[500],
    },
    {
      name: 'Chest & Triceps',
      color: teal[500],
    },
    {
      name: 'Legs',
      color: deepPurple[500],
    },
    {
      name: 'Cardio',
      color: deepOrange[500],
    },
    {
      name: 'Boxing',
      color: indigo[500],
    },
  ];

  return (
    <>
      {selectionList.map((item, index: number) => {
        return (
          <Grid key={item.name} item xs={12}>
            <SelectionCard
              addTopMargin={index > 0}
              title={item.name}
              clickHandler={() => {
                props.goForwardHandler();
              }}
              justify={isOdd(index) ? 'flex-end' : 'flex-start'}
            />
          </Grid>
        );
      })}
    </>
  );
};

interface PassedInProps {
  goForwardHandler: () => void;
}

export interface WorkoutSelectionListProps {
  DELETE_ME?: undefined;
}

const mapStateToProps = (): WorkoutSelectionListProps => {
  return {} as unknown as WorkoutSelectionListProps;
};

const mapDispatchToProps = (): WorkoutSelectionListProps =>
  ({} as unknown as WorkoutSelectionListProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutSelectionList);
