import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TabPanel from '../../../../../shared/SwipeableViewTabPanel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import SelectionCard from '../components/SelectionCard';
import {
  deepOrange,
  deepPurple,
  lightBlue,
  teal,
} from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const RoutineSelectionList = (
  props: RoutineSelectionListProps & PassedInProps
): JSX.Element => {
  const routineList = [
    {
      id: '111',
      name: 'Month 1',
      color: deepOrange[500],
    },
    {
      id: '222',
      name: 'Month 2',
      color: deepPurple[500],
    },
    {
      id: '333',
      name: 'Month 3',
      color: teal[500],
    },
    {
      id: '444',
      name: 'Month 4',
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

const mapStateToProps = (state: any): RoutineSelectionListProps => {
  return {} as unknown as RoutineSelectionListProps;
};

const mapDispatchToProps = (dispatch: Dispatch): RoutineSelectionListProps =>
  ({} as unknown as RoutineSelectionListProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutineSelectionList);
