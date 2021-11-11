import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Close } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import { State } from '../../../../configs/redux/store';
import { Grid, IconButton, InputBase } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { filterExercisesForSearchValue } from '../../../../creators/workout/exercises';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      zIndex: 1,
    },
    closedButton: {
      backgroundColor: '#505050',
      '&:hover': {
        backgroundColor: '#646464',
      },
    },
    expandedButton: {
      color: 'inherit',
      zIndex: 1,
    },
    iconWrapper: {
      position: 'absolute',
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
      width: '37ch',
    },
  })
);

const SearchBar = (props: SearchBarProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  const { expanded, clickHandler, searchValue } = props;
  return (
    <Grid item xs={12} className={classes.root}>
      <Grid container>
        <Grid item xs={10}>
          <div className={classes.iconWrapper}>
            <IconButton
              onClick={clickHandler}
              className={
                expanded ? classes.expandedButton : classes.closedButton
              }
            >
              <SearchIcon />
            </IconButton>
          </div>
          <InputBase
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
        </Grid>
        <Grid item xs={2}>
          {expanded && (
            <IconButton
              onClick={() => {
                props.searchHandler('');
              }}
              disabled={searchValue === ''}
            >
              <Close />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

interface PassedInProps {
  clickHandler: () => void;
  expanded: boolean;
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
