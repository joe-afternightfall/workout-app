import React from 'react';
import { Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import { ExerciseVO } from '../../../../../../configs/models/ExerciseVO';
import BaseDialogContent from '../../../../../app-shell/BaseDialogContent';

export default function ExerciseList(props: ExerciseListProps): JSX.Element {
  return (
    <BaseDialogContent
      title={'Add Exercise'}
      dialogContent={
        <List>
          {props.exercises.map((exercise: ExerciseVO, index: number) => {
            return (
              <ListItem key={index}>
                <Button fullWidth color={'primary'} variant={'contained'}>
                  {exercise.name}
                </Button>
              </ListItem>
            );
          })}
        </List>
      }
      closeClickHandler={props.closeClickHandler}
      dialogActions={
        <Grid container justify={'space-between'}>
          <Grid item>
            <Button
              variant={'outlined'}
              color={'primary'}
              onClick={props.nextClickHandler}
            >
              {'Create New Exercise'}
            </Button>
          </Grid>

          <Grid item>
            <Button onClick={props.closeClickHandler}>{'Cancel'}</Button>
          </Grid>
        </Grid>
      }
    />
  );
}

export interface ExerciseListProps {
  exercises: ExerciseVO[];
  closeClickHandler: () => void;
  nextClickHandler: () => void;
}
