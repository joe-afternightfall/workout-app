import React from 'react';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { Dialog, Grid } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import BaseDialogContent from '../../../../app-shell/BaseDialogContent';
import { ExerciseTypeVO } from '../../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';

export default function AddExerciseDialog(
  props: AddExerciseDialogProps
): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>{'Add Exercise'}</Button>

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'xs'}>
        <BaseDialogContent
          title={'Add Exercise'}
          dialogContent={
            <List>
              {props.exerciseTypes.map(
                (exercise: ExerciseTypeVO, index: number) => {
                  return (
                    <ListItem key={index}>
                      <Button
                        fullWidth
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => {
                          props.addClickHandler(props.circuitId, exercise.id);
                          handleClose();
                        }}
                      >
                        {exercise.name}
                      </Button>
                    </ListItem>
                  );
                }
              )}
            </List>
          }
          closeClickHandler={handleClose}
          dialogActions={
            <Grid container justifyContent={'flex-end'}>
              <Grid item>
                <Button onClick={handleClose}>{'Cancel'}</Button>
              </Grid>
            </Grid>
          }
        />
      </Dialog>
    </>
  );
}

export interface AddExerciseDialogProps {
  circuitId: string;
  exerciseTypes: ExerciseTypeVO[];
  addClickHandler: (circuitId: string, exerciseId: string) => void;
}
