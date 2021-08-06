import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import PageTitle from '../PageTitle';
import { WorkoutCategoryVO } from '../../../../configs/models/WorkoutCategoryVO';
import { State } from '../../../../configs/redux/store';
import { ExerciseVO } from '../../../../configs/models/ExerciseVO';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const CategoryTable = (props: CategoryTableProps): JSX.Element => {
  const classes = useStyles();

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
        // editable={{
        //   onRowUpdate: (rowData): Promise<void> =>
        //     new Promise((resolve) => {
        //       if (rowData.categoryId) {
        //         updateExercise(
        //           rowData.firebaseId,
        //           rowData.exercise,
        //           rowData.categoryId
        //         ).then(() => {
        //           setTimeout(() => {
        //             resolve();
        //           }, 1500);
        //         });
        //       }
        //     }),
        //   onRowDelete: (rowData): Promise<void> =>
        //     new Promise((resolve) => {
        //       deleteExercise(rowData.firebaseId).then(() => {
        //         setTimeout(() => {
        //           resolve();
        //         }, 1500);
        //       });
        //     }),
        // }}
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
            // editComponent: editField,
          },
          {
            title: 'Workouts',
            field: 'exercises',
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
              alert('hi');
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
