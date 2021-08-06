import React, { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import PageTitle from '../PageTitle';
import { WorkoutCategoryVO } from '../../../../configs/models/WorkoutCategoryVO';
import { State } from '../../../../configs/redux/store';
import { ExerciseVO } from '../../../../configs/models/ExerciseVO';
import NewCategoryDialog from './NewCategoryDialog';
import { TextField } from '@material-ui/core';
import {
  deleteWorkoutCategory,
  updateWorkoutCategory,
} from '../../../../services/workout-categories-service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const editField = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <TextField
      value={props.value}
      data-testid={'edit-url-text-field'}
      onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
        props.onChange(e.target.value)
      }
    />
  );
};

const CategoryTable = (props: CategoryTableProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const data = props.workoutCategories.map(
    (category: WorkoutCategoryVO, index: number) => {
      index += 1;
      const exercises = props.exercises.filter(
        (exercise: ExerciseVO) => exercise.workoutCategoryId === category.id
      );

      return {
        number: index,
        category: category,
        exercises: exercises.length,
      };
    }
  );

  return (
    <>
      <NewCategoryDialog open={open} closeClickHandler={closeDialog} />

      <MaterialTable
        data={data}
        data-testid={'category-table'}
        title={<PageTitle title={'Workout Categories'} />}
        options={{
          pageSize: 6,
          draggable: false,
          pageSizeOptions: [6, 12, 18],
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowUpdate: (rowData): Promise<void> =>
            new Promise((resolve) => {
              updateWorkoutCategory(
                rowData.category.firebaseId,
                rowData.category.name
              ).then(() => {
                setTimeout(() => {
                  resolve();
                }, 1500);
              });
            }),
          onRowDelete: (rowData): Promise<void> =>
            new Promise((resolve) => {
              deleteWorkoutCategory(rowData.category.firebaseId).then(() => {
                setTimeout(() => {
                  resolve();
                }, 1500);
              });
            }),
        }}
        columns={[
          {
            title: '#',
            field: 'number',
            editable: 'never',
            cellStyle: {
              width: '10%',
            },
          },
          {
            title: 'Category',
            field: 'category.name',
            cellStyle: {
              width: '40%',
            },
            editComponent: editField,
          },
          {
            title: 'Workouts',
            field: 'exercises',
            editable: 'never',
            cellStyle: {
              width: '30%',
            },
          },
        ]}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add New Category',
            isFreeAction: true,
            onClick: () => {
              openDialog();
            },
          },
        ]}
      />
    </>
  );
};

export interface CategoryTableProps {
  exercises: ExerciseVO[];
  workoutCategories: WorkoutCategoryVO[];
}

const mapStateToProps = (state: State): CategoryTableProps => {
  return {
    exercises: state.applicationState.exercises,
    workoutCategories: state.applicationState.workoutCategories,
  } as unknown as CategoryTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): CategoryTableProps =>
  ({} as unknown as CategoryTableProps);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTable);
