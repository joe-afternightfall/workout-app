import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../../../../configs/redux/store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { CategoryTypeVO } from '../../../../../../configs/models/workout-configurations/category-type/CategoryTypeVO';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
    },
    listItem: {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    selected: {
      color: '#FFF',
      backgroundColor: theme.palette.primary.dark,
      '&$selected': {
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
  })
);

const CategoryList = (
  props: CategoryListProps & PassedInCategoryListProps
): JSX.Element => {
  const classes = useStyles();

  return (
    <List
      className={classes.root}
      subheader={
        <ListSubheader component={'div'}>{'Exercise Categories'}</ListSubheader>
      }
    >
      {props.categoryTypes.map((category: CategoryTypeVO, index: number) => {
        return (
          <ListItem
            key={index}
            button
            onClick={() => {
              props.clickHandler(index);
            }}
            className={clsx(classes.listItem, {
              [classes.selected]: props.activeTab === index,
            })}
            classes={{
              selected: classes.selected,
            }}
          >
            <ListItemText primary={category.name} />
          </ListItem>
        );
      })}
    </List>
  );
};

export interface CategoryListProps {
  categoryTypes: CategoryTypeVO[];
}

export interface PassedInCategoryListProps {
  clickHandler: (index: number) => void;
  activeTab: number;
}

const mapStateToProps = (state: State): CategoryListProps => {
  return {
    categoryTypes: state.applicationState.workoutConfigurations.categoryTypes,
  } as unknown as CategoryListProps;
};

export default connect(mapStateToProps)(CategoryList);
