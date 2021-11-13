import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Close } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import { State } from '../../../../configs/redux/store';
import {
  AppBar,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { filterExercisesForSearchValue } from '../../../../creators/workout/exercises';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      top: '8vh',
      paddingTop: 8,
    },
    searchButton: {
      zIndex: 1,
      position: 'absolute',
    },
    closedButton: {
      backgroundColor: '#505050',
      '&:hover': {
        backgroundColor: '#646464',
      },
    },
    expandedButton: {
      color: 'inherit',
    },
    hide: {
      width: '0ch',
      padding: theme.spacing(2, 1, 2, 0),
    },
    inputOverride: {
      backgroundColor: '#505050',
      '&:hover': {
        backgroundColor: '#646464',
        cursor: 'text',
      },
      borderRadius: 26,
      padding: theme.spacing(2, 1, 2, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
    },
    closeButton: {
      position: 'absolute',
      right: 16,
    },
    displayNone: {
      display: 'none',
    },
  })
);

const SearchBar = (props: SearchBarProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  const { expanded, clickHandler, searchValue, color } = props;
  return (
    <AppBar
      elevation={0}
      className={classes.root}
      style={{ background: color }}
    >
      <Toolbar>
        <Grid item xs={12}>
          <IconButton
            onClick={clickHandler}
            className={clsx(classes.searchButton, {
              [classes.expandedButton]: expanded,
              [classes.closedButton]: !expanded,
            })}
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            fullWidth
            placeholder={'Search…'}
            value={searchValue}
            classes={{
              input: expanded ? classes.inputOverride : classes.hide,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              props.searchHandler(e.target.value);
            }}
          />
          {expanded ? (
            <IconButton
              onClick={() => {
                props.searchHandler('');
              }}
              disabled={searchValue === ''}
              className={classes.closeButton}
            >
              <Close />
            </IconButton>
          ) : (
            <React.Fragment />
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

interface PassedInProps {
  clickHandler: () => void;
  expanded: boolean;
  color: '#313131' | 'transparent';
}

interface SearchBarProps {
  searchValue: string;
  searchHandler: (value: string) => void;
}

const mapStateToProps = (state: State): SearchBarProps => {
  return {
    searchValue: state.applicationState.exerciseSearchValue,
  } as unknown as SearchBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SearchBarProps =>
  ({
    searchHandler: (value: string) => {
      dispatch(filterExercisesForSearchValue(value));
    },
  } as unknown as SearchBarProps);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
