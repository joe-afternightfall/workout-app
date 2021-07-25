import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { Draggable } from 'react-smooth-dnd';

const useStyles = makeStyles(() =>
  createStyles({
    confirmButton: {
      background: '#C9F0DE',
      color: '#008E62',
      '&:hover': {
        background: '#A2EAC9',
      },
    },
    completedRow: {
      background: '#E4F3EC',
    },
    deleteButton: {
      background: '#F5DADB',
      color: '#D41417',
      '&:hover': {
        background: '#F4C3C3',
      },
    },
  })
);

export default function ExerciseSet(props: RepRowProps): JSX.Element {
  const classes = useStyles();

  return (
    <Draggable>
      <ListItem style={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={10} container alignItems={'center'} spacing={2}>
            <Grid item xs={2}>
              <Typography>{'1'}</Typography>
            </Grid>

            <Grid item xs={3}>
              <TextField style={{ width: '100%' }} variant={'outlined'} />
            </Grid>

            <Grid item xs={3}>
              <TextField style={{ width: '100%' }} variant={'outlined'} />
            </Grid>

            <Grid item xs={4}>
              <Grid
                container
                alignItems={'center'}
                justify={'center'}
                spacing={2}
              >
                <Grid item>
                  <Button className={classes.deleteButton}>
                    <RemoveIcon />
                  </Button>
                </Grid>

                <Grid item>
                  <Button className={classes.confirmButton}>
                    <CheckIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2} container alignItems={'center'} justify={'center'}>
            <Grid item xs={6}>
              <ListItemIcon className={'drag-handle'}>
                <IconButton>
                  <DragHandleIcon />
                </IconButton>
              </ListItemIcon>
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
    </Draggable>
  );
}

export interface RepRowProps {
  setNumber: number;
}
