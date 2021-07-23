import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import WifiIcon from '@material-ui/icons/Wifi';
import { State } from '../../../../configs/redux/store';
import { ExerciseVO } from '../../../../configs/models/ExerciseVO';
import DeleteDialog from '../dialogs/DeleteDialog';
import {
  deleteExercise,
  createNewExercise,
  updateExercise,
} from '../../../../services/exercise-service';
import NewDialog from '../dialogs/NewDialog';
import EditDialog from '../dialogs/EditDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      minHeight: '20vh',
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

const ExerciseCard = (props: ExerciseCardProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{'R'}</Avatar>}
        action={
          <NewDialog
            title={'New Exercise'}
            createNewClickHandler={createNewExercise}
          />
        }
        title={'Exercise List'}
      />
      <CardContent>
        <List
          // subheader={<ListSubheader>Settings</ListSubheader>}
          className={classes.root}
        >
          {props.exercises.length === 0 ? (
            <Typography style={{ textAlign: 'center' }}>
              {'exercise list empty'}
            </Typography>
          ) : (
            props.exercises.map((exercise: ExerciseVO) => {
              return (
                <>
                  <ListItem>
                    <ListItemIcon>
                      <WifiIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={exercise.name}
                      // secondary={'Exercises: 9'}
                    />
                    <ListItemSecondaryAction>
                      <DeleteDialog
                        name={exercise.name}
                        title={'Delete Exercise'}
                        deleteId={exercise.firebaseId}
                        deleteClickHandler={deleteExercise}
                      />

                      <EditDialog
                        title={'Edit Exercise'}
                        value={exercise.name}
                        editId={exercise.firebaseId}
                        updateClickHandler={updateExercise}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider variant={'inset'} component={'li'} />
                </>
              );
            })
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export interface ExerciseCardProps {
  exercises: ExerciseVO[];
}

const mapStateToProps = (state: State): ExerciseCardProps => {
  return {
    exercises: state.applicationState.exercises,
  } as unknown as ExerciseCardProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExerciseCardProps =>
  ({} as unknown as ExerciseCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseCard);
