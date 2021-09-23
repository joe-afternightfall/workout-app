import clsx from 'clsx';
import React from 'react';
import SetDivider from './SetDivider';
import { Grid } from '@material-ui/core';
import SetTextField, { SetFieldInfoProps } from './SetTextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { isWeightsAndReps } from '../../../../../utils/active-workout';
import { AppTheme } from '../../../../../configs/theme/app-theme';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    supersetRowWrapper: {
      height: '12.2vh',
      border: '1px solid',
      borderColor: theme.palette.custom.colors.componentBackground,
    },
    straightSetRowWrapper: {
      height: '100%',
      paddingRight: 4,
      borderRadius: '4px 0 0 4px',
    },
    active: theme.palette.custom.styles.active,
    baseColor: theme.palette.custom.styles.base,
    done: theme.palette.custom.styles.done,
  })
);

// todo: need to handle isDuration param type

export default function BaseSet(props: BaseSetProps): JSX.Element {
  const classes = useStyles();
  const { info, activeSet, markedDone, superset } = props;
  let baseClass = '';

  if (superset) {
    baseClass = classes.supersetRowWrapper;
  } else {
    baseClass = classes.straightSetRowWrapper;
  }

  return (
    <Grid
      item
      xs={superset ? 12 : 8}
      container
      alignItems={'center'}
      id={`active-set-${props.scrollToSetNumber}`}
      className={clsx(
        baseClass,
        props.extraStyles,
        activeSet ? classes.active : classes.baseColor,
        markedDone ? classes.done : undefined
      )}
    >
      {isWeightsAndReps(info.parameterTypeId) ? (
        <>
          <SetTextField
            value={info.weight ? info.weight : 0}
            fullLength={false}
            setType={'weight'}
            setId={info.setId}
            alternateSides={info.alternateSides}
            activeSet={activeSet}
            markedDone={markedDone}
          />

          <SetDivider />

          <SetTextField
            value={info.reps ? info.reps : 0}
            fullLength={false}
            setType={'reps'}
            setId={info.setId}
            alternateSides={info.alternateSides}
            activeSet={activeSet}
            markedDone={markedDone}
          />
        </>
      ) : (
        <SetTextField
          value={info.reps ? info.reps : 0}
          fullLength={true}
          setType={'reps'}
          setId={info.setId}
          alternateSides={info.alternateSides}
          activeSet={activeSet}
          markedDone={markedDone}
        />
      )}
    </Grid>
  );
}

export interface BaseSetProps {
  superset: boolean;
  markedDone: boolean;
  activeSet: boolean;
  info: SetFieldInfoProps;
  extraStyles?: string;
  scrollToSetNumber: number;
}
