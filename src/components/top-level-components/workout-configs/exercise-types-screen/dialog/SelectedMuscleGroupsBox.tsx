import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Chip, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { State } from '../../../../../configs/redux/store';
import { toggleMuscleGroup } from '../../../../../creators/muscle-selector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const SelectedMuscleGroupsBox = (
  props: SelectedMuscleGroupsBoxProps
): JSX.Element => {
  const classes = useStyles();
  console.log(
    'props.selectedMuscleGroupIds: ' +
      JSON.stringify(props.selectedMuscleGroupIds)
  );
  return (
    <Grid item xs={12} container>
      <Grid item xs={12}>
        <Typography>{'Selected Muscle Groups'}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box style={{ background: '#f6f6f6' }} component={'div'} m={1}>
          <Grid container spacing={2}>
            {props.selectedMuscleGroupIds.map(
              (muscle: string, index: number) => {
                return (
                  <Grid item xs={4} key={index}>
                    <Chip
                      size={'small'}
                      label={muscle}
                      onDelete={() => {
                        alert(muscle + 'delete clicked');
                      }}
                      color={'primary'}
                    />
                  </Grid>
                );
              }
            )}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export interface SelectedMuscleGroupsBoxProps {
  selectedMuscleGroupIds: string[];
  deleteHandler: (muscleGroupCheckboxId: string) => void;
}

const mapStateToProps = (state: State): SelectedMuscleGroupsBoxProps => {
  return {
    selectedMuscleGroupIds: state.applicationState.selectedMuscleGroupIds,
  } as unknown as SelectedMuscleGroupsBoxProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SelectedMuscleGroupsBoxProps =>
  ({
    deleteHandler: (muscleGroupCheckboxId: string) => {
      dispatch(toggleMuscleGroup(muscleGroupCheckboxId));
    },
  } as unknown as SelectedMuscleGroupsBoxProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedMuscleGroupsBox);
