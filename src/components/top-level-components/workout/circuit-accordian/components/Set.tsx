import {
  Button,
  Fade,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';

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

export default function Set(props: SetProps): JSX.Element {
  const classes = useStyles();
  const [weight, setWeight] = React.useState<number>(0);
  const [reps, setReps] = React.useState<number>(0);
  const [done, markDone] = React.useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const regExp = new RegExp('^[0-9]*$');

    if (regExp.test(event.target.value)) {
      event.target.name === 'weight'
        ? setWeight(Number(event.target.value))
        : setReps(Number(event.target.value));
    }
  };

  const markAsDone = () => {
    markDone(!done);
  };

  return (
    <Grid
      item
      xs={12}
      container
      alignItems={'center'}
      spacing={2}
      className={done ? classes.completedRow : ''}
    >
      <Grid item xs={2}>
        <Typography>{props.setNumber + 1}</Typography>
      </Grid>

      <Grid item xs={3}>
        <TextField
          value={weight}
          name={'weight'}
          style={{ width: '100%' }}
          variant={'outlined'}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={3}>
        <TextField
          value={reps}
          name={'reps'}
          style={{ width: '100%' }}
          variant={'outlined'}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={4}>
        <Grid container alignItems={'center'} justify={'center'} spacing={2}>
          <Grid item>
            <Tooltip
              arrow
              interactive
              enterDelay={500}
              leaveDelay={200}
              placement={'left'}
              title={'Delete Set'}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <Button
                className={classes.deleteButton}
                onClick={() => {
                  props.deleteClickHandler(props.setNumber);
                }}
              >
                <RemoveIcon />
              </Button>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip
              arrow
              interactive
              enterDelay={500}
              leaveDelay={200}
              placement={'right'}
              title={'Mark Done'}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <Button className={classes.confirmButton} onClick={markAsDone}>
                <CheckIcon />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export interface SetProps {
  setNumber: number;
  deleteClickHandler: (set: number) => void;
}
