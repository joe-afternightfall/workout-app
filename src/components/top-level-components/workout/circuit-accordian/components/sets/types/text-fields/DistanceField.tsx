import React, { ChangeEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { CircuitExerciseSet } from '../../../../../WorkoutScreen';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

export default function DistanceField(props: DistanceFieldProps): JSX.Element {
  const classes = useStyles();

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    props.changeHandler('unit', e.target.value as string);
  };

  const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeHandler(e.target.name, e.target.value);
  };

  return (
    <Grid container>
      <Grid item xs={3}>
        <TextField
          fullWidth
          name={'value'}
          variant={'outlined'}
          value={props.set.distance.value}
          onChange={handleTextFieldChange}
        />
      </Grid>

      <Grid item xs={3}>
        <FormControl className={classes.formControl}>
          <InputLabel id={'unit-select-label'}>{'Unit'}</InputLabel>
          <Select
            value={props.set.distance.unit}
            onChange={handleSelectChange}
            labelId={'unit-select-label'}
          >
            <MenuItem value={'miles'}>{'Miles'}</MenuItem>
            <MenuItem value={'meters'}>{'Meters'}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Typography variant={'caption'}>{'measurement'}</Typography>
      </Grid>
    </Grid>
  );
}

export interface DistanceFieldProps {
  set: CircuitExerciseSet;
  changeHandler: (name: string, value: string) => void;
}
