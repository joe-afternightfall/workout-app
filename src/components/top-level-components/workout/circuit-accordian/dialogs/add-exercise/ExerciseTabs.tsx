import React from 'react';
import { Dispatch } from 'redux';
import TabPanel from './TabPanel';
import {
  Theme,
  useTheme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { State } from '../../../../../../configs/redux/store';
import { addExerciseToCircuit } from '../../../../../../creators/workout';
import { Tab, Tabs, AppBar, List, ListItem, Button } from '@material-ui/core';
import { ExerciseTypeVO } from '../../../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import { CategoryTypeVO } from '../../../../../../configs/models/workout-configurations/category-type/CategoryTypeVO';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const ExerciseTabs = (
  props: ExerciseTabsProps & PassedInExerciseTabsProps
): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position={'static'} color={'default'}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor={'primary'}
          textColor={'primary'}
          variant={'fullWidth'}
          aria-label={'full width tabs example'}
        >
          {props.categoryTypes.map(
            (category: CategoryTypeVO, index: number) => {
              return (
                <Tab key={index} label={category.name} id={index.toString()} />
              );
            }
          )}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {props.categoryTypes.map((category: CategoryTypeVO, index: number) => {
          const categoryTypeId = props.categoryTypes[index].id;

          const foundExercise = props.exerciseTypes.find(
            (exercise: ExerciseTypeVO) =>
              exercise.workoutCategoryId === categoryTypeId
          );
          return (
            <TabPanel
              key={index}
              value={value}
              index={index}
              dir={theme.direction}
            >
              <List>
                {foundExercise ? (
                  <ListItem key={index}>
                    <Button
                      fullWidth
                      color={'primary'}
                      variant={'contained'}
                      onClick={() => {
                        props.addExerciseHandler(
                          props.workoutCircuitId,
                          foundExercise.id
                        );
                        props.closeClickHandler();
                      }}
                    >
                      {foundExercise.name}
                    </Button>
                  </ListItem>
                ) : undefined}
              </List>
            </TabPanel>
          );
        })}
      </SwipeableViews>
    </div>
  );
};

export interface ExerciseTabsProps {
  categoryTypes: CategoryTypeVO[];
  exerciseTypes: ExerciseTypeVO[];
  addExerciseHandler: (circuitId: string, exerciseId: string) => void;
}

export interface PassedInExerciseTabsProps {
  closeClickHandler: () => void;
  workoutCircuitId: string;
}

const mapStateToProps = (state: State): ExerciseTabsProps => {
  return {
    categoryTypes: state.applicationState.workoutConfigurations.categoryTypes,
    exerciseTypes: state.applicationState.workoutConfigurations.exerciseTypes,
  } as unknown as ExerciseTabsProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExerciseTabsProps =>
  ({
    addExerciseHandler: (circuitId: string, exerciseId: string) => {
      dispatch(addExerciseToCircuit(circuitId, exerciseId));
    },
  } as unknown as ExerciseTabsProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseTabs);
