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
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
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
import { WorkoutCategoryVO } from '../../../../configs/models/WorkoutCategoryVO';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      minHeight: '20vh',
    },
    avatar: {
      backgroundColor: red[500],
    },
    formControl: {
      width: '100%',
    },
  })
);

const ExerciseCard = (props: ExerciseCardProps): JSX.Element => {
  const classes = useStyles();
  const [workoutCategoryId, setWorkoutCategoryId] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setWorkoutCategoryId(event.target.value as string);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={'Exercise List'}
        avatar={<Avatar className={classes.avatar}>{'R'}</Avatar>}
        action={
          <NewDialog
            title={'New Exercise'}
            extraId={workoutCategoryId}
            createNewClickHandler={createNewExercise}
            extraContent={
              <FormControl className={classes.formControl}>
                <InputLabel id={'category-select-label'}>
                  {'Workout Category'}
                </InputLabel>
                <Select
                  labelId={'category-select-label'}
                  id={'category-simple-menu'}
                  value={workoutCategoryId}
                  onChange={handleChange}
                >
                  {props.workoutCategories.map(
                    (category: WorkoutCategoryVO, index: number) => {
                      return (
                        <MenuItem key={index} value={category.id}>
                          {category.name}
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
              </FormControl>
            }
          />
        }
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
              const foundCategory = props.workoutCategories.find(
                (category: WorkoutCategoryVO) =>
                  category.id === exercise.workoutCategoryId
              );
              return (
                <>
                  <ListItem>
                    <ListItemIcon>
                      <WifiIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={exercise.name}
                      secondary={
                        foundCategory && `Category: ${foundCategory.name}`
                      }
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
  workoutCategories: WorkoutCategoryVO[];
}

const mapStateToProps = (state: State): ExerciseCardProps => {
  return {
    exercises: state.applicationState.exercises,
    workoutCategories: state.applicationState.workoutCategories,
  } as unknown as ExerciseCardProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExerciseCardProps =>
  ({} as unknown as ExerciseCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseCard);
