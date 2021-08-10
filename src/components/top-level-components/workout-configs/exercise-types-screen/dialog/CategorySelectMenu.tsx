import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { CategoryTypeVO } from '../../../../../configs/models/workout-configurations/category-type/CategoryTypeVO';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      width: '100%',
    },
  })
);

export default function CategorySelectMenu(
  props: CategorySelectMenuProps
): JSX.Element {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={'category-select-label'}>{'Workout Category'}</InputLabel>
      <Select
        labelId={'category-select-label'}
        id={'category-select-menu'}
        value={props.selectedCategoryId}
        onChange={props.onChangeHandler}
      >
        {props.categoryTypes.map((category: CategoryTypeVO, index: number) => {
          return (
            <MenuItem key={index} value={category.id}>
              {category.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export interface CategorySelectMenuProps {
  selectedCategoryId: string;
  categoryTypes: CategoryTypeVO[];
  onChangeHandler: (e: React.ChangeEvent<{ value: unknown }>) => void;
}
