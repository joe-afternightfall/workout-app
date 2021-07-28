import React from 'react';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { Dialog, Grid } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { ExerciseVO } from '../../../../../configs/models/ExerciseVO';
import BaseDialogContent from '../../../../app-shell/BaseDialogContent';

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
              {props.exercises.map((exercise: ExerciseVO, index: number) => {
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
              })}
            </List>
          }
          closeClickHandler={handleClose}
          dialogActions={
            <Grid container justify={'flex-end'}>
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
  exercises: ExerciseVO[];
  addClickHandler: (circuitId: string, exerciseId: string) => void;
}
