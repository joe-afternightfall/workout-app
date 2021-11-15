import React from 'react';
import { IconButton, Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import TopAppBar from '../../../../../../app-shell/TopAppBar';

export default function ActiveExerciseListAppBar(
  props: ActiveExerciseListAppBarProps
): JSX.Element {
  const {
    isEditing,
    selectedSegment,
    closeClickHandler,
    toggleEditHandler,
    goBackClickHandler,
  } = props;

  return (
    <TopAppBar
      title={'Exercise List'}
      position={'absolute'}
      hideToolbarMixin
      leftButton={
        selectedSegment ? (
          <IconButton onClick={goBackClickHandler}>
            <ArrowBack />
          </IconButton>
        ) : isEditing ? undefined : (
          <Button color={'primary'} onClick={toggleEditHandler}>
            {'Edit'}
          </Button>
        )
      }
      rightButton={
        isEditing ? (
          <Button color={'primary'} onClick={toggleEditHandler}>
            {'Save'}
          </Button>
        ) : (
          <Button color={'primary'} onClick={closeClickHandler}>
            {'Close'}
          </Button>
        )
      }
    />
  );
}

interface ActiveExerciseListAppBarProps {
  isEditing: boolean;
  selectedSegment: boolean;
  toggleEditHandler: () => void;
  closeClickHandler: () => void;
  goBackClickHandler: () => void;
}
