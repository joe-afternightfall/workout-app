import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { State } from '../../../../configs/redux/store';
import { WorkoutEquipmentVO } from 'workout-app-common-core';
import TuneIcon from '@material-ui/icons/Tune';
import {
  Badge,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
} from '@material-ui/core';
import { filterExercisesForEquipmentId } from '../../../../creators/workout/exercises';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    equipmentList: {
      minWidth: '30ch',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      // justifyContent: 'flex-end',
    },
  })
);

const FilterDrawer = (props: FilterDrawerProps): JSX.Element => {
  const classes = useStyles();
  const { workoutEquipment, equipmentFilterList } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event.target.name: ' + event.target.name);
    console.log('event.target.checked: ' + event.target.checked);
    props.filterEquipmentHandler(event.target.name, event.target.checked);
  };

  return (
    <div>
      <IconButton
        aria-controls={'fade-menu'}
        aria-haspopup={'true'}
        onClick={handleClick}
      >
        <Badge badgeContent={equipmentFilterList.length} color={'primary'}>
          <TuneIcon />
        </Badge>
      </IconButton>
      <Drawer open={open} anchor={'right'} onClose={handleClose}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleClose}>
            <ChevronRightIcon />
          </IconButton>
          <Typography>{'Equipment Type'}</Typography>
        </div>
        <Divider />
        <List className={classes.equipmentList}>
          {workoutEquipment.map((equipment, index) => {
            return (
              <ListItem button key={index} role={undefined}>
                <ListItemIcon>
                  <Switch
                    onChange={handleToggle}
                    color={'primary'}
                    checked={equipmentFilterList.indexOf(equipment.id) !== -1}
                    name={equipment.id}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </ListItemIcon>
                <ListItemText primary={equipment.name} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

interface FilterDrawerProps {
  equipmentFilterList: string[];
  workoutEquipment: WorkoutEquipmentVO[];
  filterEquipmentHandler: (id: string, checked: boolean) => void;
}

const mapStateToProps = (state: State): FilterDrawerProps => {
  return {
    workoutEquipment:
      state.applicationState.workoutConfigurations.workoutEquipment,
    equipmentFilterList: state.applicationState.equipmentIdFilterList,
  } as unknown as FilterDrawerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): FilterDrawerProps =>
  ({
    filterEquipmentHandler: (id: string, checked: boolean) => {
      const actionType = checked ? 'add' : 'remove';
      dispatch(filterExercisesForEquipmentId(id, actionType));
    },
  } as unknown as FilterDrawerProps);

export default connect(mapStateToProps, mapDispatchToProps)(FilterDrawer);
