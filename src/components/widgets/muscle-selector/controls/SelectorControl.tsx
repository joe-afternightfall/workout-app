import clsx from 'clsx';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { State } from '../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toggleMuscleGroup } from '../../../../creators/muscle-selector';

const useStyles = makeStyles(() =>
  createStyles({
    checkbox: {
      display: 'none',
    },
    label: {
      width: 50,
      display: 'block',
      marginBottom: '0.5rem',
      cursor: 'pointer',
      fontSize: '0.7rem',
      opacity: 0.5,
      position: 'relative',
      zIndex: 200,
      borderLeft: '5px solid transparent',
      paddingLeft: 6,
      marginLeft: -11,
      '&:hover': {
        opacity: 1,
        borderColor: 'rgba(51, 51, 51, .75)',
      },
    },
    checkedLabel: {
      opacity: 1,
      fontWeight: 'bold',
      color: '#00bcd4',
    },
  })
);

const SelectorControl = (
  props: SelectorControlProps & SelectorControlsPassedInProps
): JSX.Element => {
  const classes = useStyles();

  const handleToggle = (inputId: string) => {
    props.selectHandler(inputId);
  };

  const checkboxInputId = `${props.inputId}-checkbox`;
  const foundIndex = props.selectedMuscleGroupIds.indexOf(checkboxInputId);

  return (
    <>
      <input
        type={'checkbox'}
        className={clsx(classes.checkbox, props.inputId)}
        id={checkboxInputId}
        value={' '}
        onChange={() => {
          handleToggle(checkboxInputId);
        }}
      />

      <label
        htmlFor={checkboxInputId}
        className={clsx(classes.label, {
          [classes.checkedLabel]: foundIndex !== -1,
        })}
      >
        <Typography>{props.title}</Typography>
      </label>
    </>
  );
};

export interface SelectorControlProps {
  selectedMuscleGroupIds: string[];
  selectHandler: (muscleGroupId: string) => void;
}

export interface SelectorControlsPassedInProps {
  inputId: string;
  title: string;
}

const mapStateToProps = (state: State): SelectorControlProps => {
  return {
    selectedMuscleGroupIds: state.applicationState.selectedMuscleGroupIds,
  } as unknown as SelectorControlProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SelectorControlProps =>
  ({
    selectHandler: (muscleGroupId: string) => {
      dispatch(toggleMuscleGroup(muscleGroupId));
    },
  } as unknown as SelectorControlProps);

export default connect(mapStateToProps, mapDispatchToProps)(SelectorControl);
