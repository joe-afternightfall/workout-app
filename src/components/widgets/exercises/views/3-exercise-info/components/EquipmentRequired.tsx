import React from 'react';
import { connect } from 'react-redux';
import { WorkoutEquipmentVO } from 'workout-app-common-core';
import { State } from '../../../../../../configs/redux/store';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { findWorkoutEquipment } from '../../../../../../utils/object-finder';

const EquipmentRequired = (
  props: EquipmentRequiredProps & PassedInProps
): JSX.Element => {
  const { workoutEquipmentIds, workoutEquipmentList } = props;

  return (
    <Card>
      <CardContent>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Typography variant={'h6'}>{'Equipment Required'}</Typography>
          </Grid>
          <Grid item xs={12}>
            {workoutEquipmentIds.map((equipmentId: string, index: number) => {
              const foundEquipment = findWorkoutEquipment(
                workoutEquipmentList,
                equipmentId
              );
              return (
                <Grid item xs={12} key={index}>
                  <Typography variant={'body1'}>
                    {foundEquipment && foundEquipment.name}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

interface PassedInProps {
  workoutEquipmentIds: string[];
}

interface EquipmentRequiredProps {
  workoutEquipmentList: WorkoutEquipmentVO[];
}

const mapStateToProps = (state: State): EquipmentRequiredProps => {
  return {
    workoutEquipmentList: state.workoutState.configs.workoutEquipment,
  } as unknown as EquipmentRequiredProps;
};

export default connect(mapStateToProps)(EquipmentRequired);
