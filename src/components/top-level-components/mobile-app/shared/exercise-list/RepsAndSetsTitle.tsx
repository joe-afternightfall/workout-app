import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { AppTheme } from '../../../../../configs/theme/app-theme';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { buildRepsAndSets, Set } from 'workout-app-common-core';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    title: {
      fontSize: '1.125rem',
      paddingBottom: '1vh',
    },
    upNextTitle: {
      fontSize: '1rem',
    },
    upNextHighlight: {
      color: theme.palette.custom.colors.active,
    },
  })
);

export default function RepsAndSetsTitle(
  props: RepsAndSetsTitleProps
): JSX.Element {
  const classes = useStyles();
  const { sets } = props;

  const repsAndSets = buildRepsAndSets(sets);

  return (
    <Grid item xs={12} container alignItems={'center'}>
      <Grid item xs={12}>
        <Typography variant={'body2'} color={'textSecondary'}>
          {repsAndSets}
        </Typography>
      </Grid>
    </Grid>
  );
}

interface RepsAndSetsTitleProps {
  // repsAndSets: string | undefined;
  sets: Set[];
}
