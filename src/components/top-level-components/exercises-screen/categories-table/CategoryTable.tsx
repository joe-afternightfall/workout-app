import React, { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import PageTitle from '../PageTitle';
import { State } from '../../../../configs/redux/store';
import NewCategoryDialog from './NewCategoryDialog';
import { TextField } from '@material-ui/core';
import { CategoryTypeVO } from '../../../../configs/models/workout-configurations/category-type/CategoryTypeVO';
import { ExerciseTypeVO } from '../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import {
  deleteCategoryType,
  updateCategoryType,
} from '../../../../services/workout-configurations/category-types-service';

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

  const data = props.categoryTypes.map(
    (category: CategoryTypeVO, index: number) => {
      index += 1;
      const exercises = props.exerciseTypes.filter(
        (exercise: ExerciseTypeVO) => exercise.workoutCategoryId === category.id
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
              updateCategoryType(
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
              deleteCategoryType(rowData.category.firebaseId).then(() => {
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
  exerciseTypes: ExerciseTypeVO[];
  categoryTypes: CategoryTypeVO[];
}

const mapStateToProps = (state: State): CategoryTableProps => {
  return {
    exerciseTypes: state.applicationState.exerciseTypes,
    categoryTypes: state.applicationState.categoryTypes,
  } as unknown as CategoryTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): CategoryTableProps =>
  ({} as unknown as CategoryTableProps);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTable);
