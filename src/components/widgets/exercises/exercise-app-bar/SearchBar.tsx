import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, IconButton, InputBase } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { filterExercisesForSearchValue } from '../../../../creators/workout/exercises';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      marginTop: '7vh',
    },
    iconWrapper: {
      zIndex: 2,
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
      width: '30ch',
    },
  })
);

const SearchBar = (props: SearchBarProps): JSX.Element => {
  const classes = useStyles();
  const [expand, setExpand] = useState(false);

  const toggleTextField = () => {
    setExpand(!expand);
  };

  return (
    <Grid item xs={12} className={classes.root} container>
      <div className={classes.iconWrapper}>
        <IconButton
          onClick={toggleTextField}
          style={{ backgroundColor: '#505050' }}
        >
          <SearchIcon />
        </IconButton>
      </div>
      <InputBase
        placeholder={'Search…'}
        classes={{
          input: expand ? classes.inputOverride : classes.hide,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.searchHandler(e.target.value);
        }}
      />
    </Grid>
  );
};

interface SearchBarProps {
  searchHandler: (value: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): SearchBarProps =>
  ({
    searchHandler: (value: string) => {
      dispatch(filterExercisesForSearchValue(value));
    },
  } as unknown as SearchBarProps);

export default connect(null, mapDispatchToProps)(SearchBar);
