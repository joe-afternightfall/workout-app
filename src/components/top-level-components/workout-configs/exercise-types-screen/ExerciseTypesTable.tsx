import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import NewExerciseDialog from './NewExerciseDialog';
import { State } from '../../../../configs/redux/store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CategoryTypeVO } from '../../../../configs/models/workout-configurations/category-type/CategoryTypeVO';
import { ExerciseTypeVO } from '../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import PageTitle from '../../../shared/PageTitle';
import {
  deleteExerciseType,
  updateExerciseType,
} from '../../../../services/workout-configurations/exercise-types-service';

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

const ExerciseTypesTable = (props: ExerciseTableProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const data = props.exerciseTypes.map(
    (exercise: ExerciseTypeVO, index: number) => {
      index += 1;

      const foundCategory = props.categoryTypes.find(
        (category: CategoryTypeVO) => category.id === exercise.workoutCategoryId
      );

      return {
        number: index,
        exercise: exercise.name,
        firebaseId: exercise.firebaseId,
        categoryId: foundCategory && foundCategory.id,
      };
    }
  );

  const exercises = props.categoryTypes.reduce(
    (obj: any, category: CategoryTypeVO) => {
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
        categoryTypes={props.categoryTypes}
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
          onRowUpdate: (rowData): Promise<void> =>
            new Promise((resolve) => {
              if (rowData.categoryId) {
                updateExerciseType(
                  rowData.firebaseId,
                  rowData.exercise,
                  rowData.categoryId
                ).then(() => {
                  setTimeout(() => {
                    resolve();
                  }, 1500);
                });
              }
            }),
          onRowDelete: (rowData): Promise<void> =>
            new Promise((resolve) => {
              deleteExerciseType(rowData.firebaseId).then(() => {
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
  exerciseTypes: ExerciseTypeVO[];
  categoryTypes: CategoryTypeVO[];
}

const mapStateToProps = (state: State): ExerciseTableProps => {
  return {
    exerciseTypes: state.applicationState.exerciseTypes,
    categoryTypes: state.applicationState.categoryTypes,
  } as unknown as ExerciseTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExerciseTableProps =>
  ({} as unknown as ExerciseTableProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseTypesTable);
