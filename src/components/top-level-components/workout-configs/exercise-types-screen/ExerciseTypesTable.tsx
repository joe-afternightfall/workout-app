import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import PageTitle from '../../../shared/PageTitle';
import NewExerciseDialog from './NewExerciseDialog';
import { State } from '../../../../configs/redux/store';
import {
  deleteExerciseType,
  updateExerciseType,
} from '../../../../services/workout-configurations/exercise-types-service';
import { CategoryTypeVO } from '../../../../configs/models/workout-configurations/category-type/CategoryTypeVO';
import { ExerciseTypeVO } from '../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';

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

interface CategoryTypesObject {
  [key: string]: string;
}

const ExerciseTypesTable = (props: ExerciseTableProps): JSX.Element => {
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
        setType: exercise.setType && exercise.setType,
      };
    }
  );

  const categoryTypes = props.categoryTypes.reduce(
    (obj: CategoryTypesObject, category: CategoryTypeVO) => {
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
                  rowData.categoryId,
                  rowData.setType
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
              width: '30%',
            },
            editComponent: editField,
          },
          {
            title: 'Workout Category',
            field: 'categoryId',
            cellStyle: {
              width: '30%',
            },
            lookup: categoryTypes,
          },
          {
            title: 'Set Type',
            field: 'setType',
            cellStyle: {
              width: '30%',
            },
            // todo: make this object dynamic using SetType
            lookup: {
              time: 'time',
              weights: 'weights',
              ['time-and-distance']: 'time-and-distance',
              ['time-and-reps']: 'time-and-reps',
              reps: 'reps',
            },
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
    exerciseTypes: state.applicationState.workoutConfigurations.exerciseTypes,
    categoryTypes: state.applicationState.workoutConfigurations.categoryTypes,
  } as unknown as ExerciseTableProps;
};

const mapDispatchToProps = (): ExerciseTableProps =>
  ({} as unknown as ExerciseTableProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseTypesTable);
