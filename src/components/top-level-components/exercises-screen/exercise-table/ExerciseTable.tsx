import React, { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import PageTitle from '../PageTitle';
import { State } from '../../../../configs/redux/store';
import { ExerciseVO } from '../../../../configs/models/ExerciseVO';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { WorkoutCategoryVO } from '../../../../configs/models/WorkoutCategoryVO';
import { TextField } from '@material-ui/core';
import NewExerciseDialog from './NewExerciseDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // formControl: {
    //   width: '100%',
    // },
  })
);

const editField = (props: any) => {
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

const ExerciseTable = (props: ExerciseTableProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  // const [workoutCategoryId, setWorkoutCategoryId] = React.useState<string>('');

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const data = props.exercises.map((exercise: ExerciseVO, index: number) => {
    index += 1;

    const foundCategory = props.workoutCategories.find(
      (category: WorkoutCategoryVO) =>
        category.id === exercise.workoutCategoryId
    );

    return {
      number: index,
      exercise: exercise.name,
      categoryId: foundCategory && foundCategory.id,
    };
  });

  const exercises = props.workoutCategories.reduce(
    (obj: any, category: WorkoutCategoryVO) => {
      obj[category.id] = category.name;
      return obj;
    },
    {}
  );

  return (
    <>
      <NewExerciseDialog
        open={open}
        closeClickHandler={closeDialog}
        workoutCategories={props.workoutCategories}
      />

      <MaterialTable
        data={data}
        data-testid={'exercise-table'}
        title={<PageTitle title={'Exercise List'} />}
        options={{
          pageSize: 6,
          draggable: false,
          pageSizeOptions: [6, 12, 18],
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowUpdate: (newData): Promise<void> =>
            new Promise((resolve) => {
              // props.updateClickHandler(newData.bookmark);
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
          onRowDelete: (newData): Promise<void> =>
            new Promise((resolve) => {
              // props.deleteClickHandler(newData.bookmark.firebaseId);
              setTimeout(() => {
                resolve();
              }, 1500);
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
            title: 'Exercise',
            field: 'exercise',
            cellStyle: {
              width: '40%',
            },
            editComponent: editField,
          },
          {
            title: 'Workout Category',
            field: 'categoryId',
            cellStyle: {
              width: '30%',
            },
            lookup: exercises,
          },
        ]}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add New Exercise',
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

export interface ExerciseTableProps {
  exercises: ExerciseVO[];
  workoutCategories: WorkoutCategoryVO[];
}

const mapStateToProps = (state: State): ExerciseTableProps => {
  return {
    exercises: state.applicationState.exercises,
    workoutCategories: state.applicationState.workoutCategories,
  } as unknown as ExerciseTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExerciseTableProps =>
  ({} as unknown as ExerciseTableProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseTable);
