import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ListItem from '@material-ui/core/ListItem';
import { NewCircuitProps } from '../../WorkoutScreen';
import { Button, Dialog, List } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import BaseDialogContent from '../../../../app-shell/BaseDialogContent';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function NewCircuitDialog(
  props: NewCircuitDialogProps
): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (type: string) => {
    props.addCircuitHandler({
      id: uuidv4(),
      type: type,
    });
    handleClose();
  };

  return (
    <>
      <Button variant={'outlined'} onClick={handleClickOpen}>
        {'Click to add circuit'}
      </Button>

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'xs'}>
        <BaseDialogContent
          title={'New Circuit'}
          closeClickHandler={handleClose}
          dialogContent={
            <List>
              <ListItem>
                <Button
                  fullWidth
                  color={'primary'}
                  variant={'contained'}
                  onClick={() => {
                    handleClick('Warm Ups');
                  }}
                >
                  {'Warm Ups'}
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  color={'primary'}
                  variant={'contained'}
                  onClick={() => {
                    handleClick('Main Workout');
                  }}
                >
                  {'Main Workout'}
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  color={'primary'}
                  variant={'contained'}
                  onClick={() => {
                    handleClick('Cool Down');
                  }}
                >
                  {'Cool Down'}
                </Button>
              </ListItem>
            </List>
          }
          dialogActions={<Button onClick={handleClose}>{'Cancel'}</Button>}
        />
      </Dialog>
    </>
  );
}

export interface NewCircuitDialogProps {
  addCircuitHandler: (props: NewCircuitProps) => void;
}
