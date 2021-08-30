import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import SelectionCard from '../components/SelectionCard';
import {
  deepOrange,
  deepPurple,
  lightBlue,
  teal,
} from '@material-ui/core/colors';

const RoutineSelectionList = (
  props: RoutineSelectionListProps & PassedInProps
): JSX.Element => {
  const routineList = [
    {
      id: '111',
      name: 'Routine 1',
      color: deepOrange[500],
    },
    {
      id: '222',
      name: 'Routine 2',
      color: deepPurple[500],
    },
    {
      id: '333',
      name: 'Routine 3',
      color: teal[500],
    },
    {
      id: '444',
      name: 'Routine 4',
      color: lightBlue[500],
    },
  ];

  return (
    <>
      {routineList.map((item, index: number) => {
        return (
          <Grid key={item.id} item xs={12}>
            <SelectionCard
              title={item.name}
              addTopMargin={index > 0}
              cardColor={item.color}
              clickHandler={() => {
                props.goForwardHandler();
              }}
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

export interface RoutineSelectionListProps {
  DELETE_ME?: undefined;
}

const mapStateToProps = (): RoutineSelectionListProps => {
  return {} as unknown as RoutineSelectionListProps;
};

const mapDispatchToProps = (): RoutineSelectionListProps =>
  ({} as unknown as RoutineSelectionListProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutineSelectionList);
