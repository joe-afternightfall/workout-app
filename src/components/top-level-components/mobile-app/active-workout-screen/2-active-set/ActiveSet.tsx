import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import clsx from 'clsx';
import SetTextField from './components/SetTextField';
import SetDivider from './components/SetDivider';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '25vh',
      marginBottom: 16,
    },
    didItButton: {
      width: '100%',
      height: '100%',
      borderRadius: '0 8px 8px 0',
      backgroundColor: '#222323',
    },
    activeOrange: {
      backgroundColor: '#ed440b',
    },
    inputRowWrapper: {
      border: '1px solid',
      borderColor: 'rgba(255, 255, 255, 0.23)',
      borderRadius: 'inherit',
      height: '12.2vh',
    },
    topRow: {
      marginBottom: '.6vh',
      borderRadius: '4px 0 0 0',
    },
    bottomRow: {
      borderRadius: '0 0 0 4px',
    },
    activeColor: {
      backgroundColor: '#ed440b',
    },
  })
);

// interface LocalState {
//   amount: string;
//   password: string;
//   weight: string;
//   weightRange: string;
//   showPassword: boolean;
// }

export default function ActiveSet(props: ActiveSetProps): JSX.Element {
  const classes = useStyles();
  // const [values, setValues] = React.useState<LocalState>({
  //   amount: '',
  //   password: '',
  //   weight: '',
  //   weightRange: '',
  //   showPassword: false,
  // });
  //
  // const handleChange =
  //   (prop: keyof LocalState) =>
  //     (event: React.ChangeEvent<HTMLInputElement>) => {
  //       setValues({ ...values, [prop]: event.target.value });
  //     };

  return (
    <Grid container alignItems={'center'} className={classes.root}>
      <Grid item xs={8} style={{ paddingRight: 4 }}>
        <Grid
          item
          xs={12}
          container
          className={clsx(
            classes.inputRowWrapper,
            classes.topRow,
            classes.activeColor
          )}
        >
          <SetTextField value={'44'} inputAdornment={'lb'} fullLength={false} />

          <SetDivider />

          <SetTextField
            value={'22'}
            inputAdornment={'reps'}
            fullLength={false}
          />
        </Grid>

        <Grid
          item
          xs={12}
          container
          className={clsx(
            classes.inputRowWrapper,
            classes.bottomRow,
            classes.activeColor
          )}
        >
          <SetTextField value={'77'} inputAdornment={'lb'} fullLength={false} />

          <SetDivider />

          <SetTextField
            value={'44'}
            inputAdornment={'reps'}
            fullLength={false}
          />
        </Grid>
      </Grid>
      <Grid item xs={4} style={{ height: '100%' }}>
        <Button
          className={clsx(classes.didItButton, {
            [classes.activeOrange]: props.currentSet,
          })}
          onClick={props.didItClickHandler}
        >
          {'Did It'}
        </Button>
      </Grid>
    </Grid>
  );
}

export interface ActiveSetProps {
  didItClickHandler: () => void;
  currentSet: boolean;
}
