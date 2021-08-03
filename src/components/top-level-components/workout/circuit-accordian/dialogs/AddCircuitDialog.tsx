import React from 'react';
import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import { WorkoutCircuitProps } from '../../WorkoutScreen';
import AppTooltip from '../../../../app-shell/AppTooltip';
import { addCircuit } from '../../../../../creators/workout';
import { Button, Dialog, IconButton, List } from '@material-ui/core';
import BaseDialogContent from '../../../../app-shell/BaseDialogContent';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      color: '#fff',
      borderRadius: 6,
      background: theme.palette.primary.main,
      '&:hover': {
        background: theme.palette.primary.light,
      },
    },
  })
);

const AddCircuitDialog = (props: AddCircuitDialogProps): JSX.Element => {
  const classes = useStyles();
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
      <AppTooltip
        element={
          <IconButton
            color={'primary'}
            className={classes.addButton}
            onClick={handleClickOpen}
          >
            <AddIcon />
          </IconButton>
        }
        title={'Add Circuit'}
        placement={'bottom'}
      />

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
  addCircuitHandler: (props: WorkoutCircuitProps) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): AddCircuitDialogProps =>
  ({
    addCircuitHandler: (props: WorkoutCircuitProps) => {
      dispatch(addCircuit(props));
    },
  } as unknown as AddCircuitDialogProps);

export default connect(null, mapDispatchToProps)(AddCircuitDialog);
