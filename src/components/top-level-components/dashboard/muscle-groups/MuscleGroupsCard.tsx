import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import WifiIcon from '@material-ui/icons/Wifi';
import EditIcon from '@material-ui/icons/Edit';
import { Card, CardContent, Divider, IconButton } from '@material-ui/core';
import NewDialog from './NewDialog';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import DeleteDialog from './DeleteDialog';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import { MuscleGroupVO } from '../../../../configs/models/MuscleGroupVO';
import { State } from '../../../../configs/redux/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

const MuscleGroupsCard = (props: MuscleGroupsCardProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {'R'}
          </Avatar>
        }
        action={<NewDialog />}
        title={'Muscle Groups'}
      />

      <CardContent>
        <List
          // subheader={<ListSubheader>Settings</ListSubheader>}
          className={classes.root}
        >
          {props.muscleGroups.map((group: MuscleGroupVO) => {
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
                    <DeleteDialog group={group} />

                    <IconButton aria-label="delete">
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export interface MuscleGroupsCardProps {
  muscleGroups: MuscleGroupVO[];
}

const mapStateToProps = (state: State): MuscleGroupsCardProps => {
  return {
    muscleGroups: state.applicationState.muscleGroups,
  } as unknown as MuscleGroupsCardProps;
};

const mapDispatchToProps = (dispatch: Dispatch): MuscleGroupsCardProps =>
  ({} as unknown as MuscleGroupsCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(MuscleGroupsCard);
