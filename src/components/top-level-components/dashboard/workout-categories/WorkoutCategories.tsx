import React from 'react';
import {
  Card,
  List,
  Divider,
  ListItem,
  Typography,
  CardContent,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { connect } from 'react-redux';
import NewDialog from '../dialogs/NewDialog';
import Avatar from '@material-ui/core/Avatar';
import WifiIcon from '@material-ui/icons/Wifi';
import { red } from '@material-ui/core/colors';
import {
  deleteWorkoutCategory,
  createNewWorkoutCategory,
  updateWorkoutCategory,
} from '../../../../services/workout-categories-service';
import DeleteDialog from '../dialogs/DeleteDialog';
import CardHeader from '@material-ui/core/CardHeader';
import { State } from '../../../../configs/redux/store';
import { WorkoutCategoryVO } from '../../../../configs/models/WorkoutCategoryVO';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import EditDialog from '../dialogs/EditDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      minHeight: '20vh',
      backgroundColor: theme.palette.background.paper,
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

const WorkoutCategories = (props: WorkoutCategoriesProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {'R'}
          </Avatar>
        }
        action={
          <NewDialog
            title={'New Workout Type'}
            createNewClickHandler={createNewWorkoutCategory}
          />
        }
        title={'Workout Categories'}
      />

      <CardContent>
        <List
          // subheader={<ListSubheader>Settings</ListSubheader>}
          className={classes.root}
        >
          {props.workoutCategories.length === 0 ? (
            <Typography style={{ textAlign: 'center' }}>
              {'groups list is empty'}
            </Typography>
          ) : (
            props.workoutCategories.map((group: WorkoutCategoryVO) => {
              return (
                <>
                  <ListItem>
                    <ListItemIcon>
                      <WifiIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={group.name}
                      // secondary={'Exercises: 9'}
                    />
                    <ListItemSecondaryAction>
                      <DeleteDialog
                        title={'Delete Muscle Group'}
                        deleteClickHandler={deleteWorkoutCategory}
                        name={group.name}
                        deleteId={group.firebaseId}
                      />

                      <EditDialog
                        title={'Edit Exercise'}
                        value={group.name}
                        editId={group.firebaseId}
                        updateClickHandler={updateWorkoutCategory}
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

export interface WorkoutCategoriesProps {
  workoutCategories: WorkoutCategoryVO[];
}

const mapStateToProps = (state: State): WorkoutCategoriesProps => {
  return {
    workoutCategories: state.applicationState.workoutCategories,
  } as unknown as WorkoutCategoriesProps;
};

const mapDispatchToProps = (): WorkoutCategoriesProps =>
  ({} as unknown as WorkoutCategoriesProps);

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutCategories);
