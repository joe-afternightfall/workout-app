import React from 'react';
import {
  Card,
  List,
  Divider,
  ListItem,
  IconButton,
  Typography,
  CardContent,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@material-ui/core';
import NewDialog from './NewDialog';
import { connect } from 'react-redux';
import DeleteDialog from './DeleteDialog';
import Avatar from '@material-ui/core/Avatar';
import WifiIcon from '@material-ui/icons/Wifi';
import EditIcon from '@material-ui/icons/Edit';
import { red } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import { State } from '../../../../configs/redux/store';
import { MuscleGroupVO } from '../../../../configs/models/MuscleGroupVO';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // maxWidth: 360,
      minHeight: '20vh',
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
          {props.muscleGroups.length === 0 ? (
            <Typography style={{ textAlign: 'center' }}>
              {'groups list is empty'}
            </Typography>
          ) : (
            props.muscleGroups.map((group: MuscleGroupVO) => {
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

                      <IconButton aria-label={'delete'}>
                        <EditIcon />
                      </IconButton>
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

export interface MuscleGroupsCardProps {
  muscleGroups: MuscleGroupVO[];
}

const mapStateToProps = (state: State): MuscleGroupsCardProps => {
  return {
    muscleGroups: state.applicationState.muscleGroups,
  } as unknown as MuscleGroupsCardProps;
};

const mapDispatchToProps = (): MuscleGroupsCardProps =>
  ({} as unknown as MuscleGroupsCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(MuscleGroupsCard);
