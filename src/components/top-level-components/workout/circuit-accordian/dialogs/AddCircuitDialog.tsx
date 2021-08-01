import React from 'react';
import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import { NewCircuitProps } from '../../WorkoutScreen';
import { Button, Dialog, List } from '@material-ui/core';
import BaseDialogContent from '../../../../app-shell/BaseDialogContent';
import { addCircuit } from '../../../../../creators/workout';

const AddCircuitDialog = (props: AddCircuitDialogProps): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (name: string) => {
    props.addCircuitHandler({
      id: uuidv4(),
      name: name,
      exercises: [],
    });
    handleClose();
  };

  return (
    <>
      <Button variant={'outlined'} onClick={handleClickOpen}>
        {'Add Circuit'}
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
};

export interface AddCircuitDialogProps {
  addCircuitHandler: (props: NewCircuitProps) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): AddCircuitDialogProps =>
  ({
    addCircuitHandler: (props: NewCircuitProps) => {
      dispatch(addCircuit(props));
    },
  } as unknown as AddCircuitDialogProps);

export default connect(null, mapDispatchToProps)(AddCircuitDialog);
