import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid, SvgIconTypeMap, Typography } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      borderRadius: 0,
      background: theme.palette.primary.main,
      height: '100%',
      '&:hover': {
        background: theme.palette.primary.dark,
      },
      color: '#303030',
    },
    icon: {
      height: '2.75vh',
      marginTop: -12,
    },
    text: {
      fontSize: '1.5vh',
      lineHeight: '0.75vh',
    },
  })
);

export default function BaseActionButton(
  props: BaseActionButtonProps
): JSX.Element {
  const classes = useStyles();
  const { icon, buttonTitle, clickHandler } = props;

  const iconElement = React.createElement(icon, {
    style: { height: '2.75vh', marginTop: -12 },
  });

  return (
    <Button fullWidth className={classes.button} onClick={clickHandler}>
      <Grid container>
        <Grid item xs={12}>
          {iconElement}
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.text}>{buttonTitle}</Typography>
        </Grid>
      </Grid>
    </Button>
  );
}

interface BaseActionButtonProps {
  icon: OverridableComponent<SvgIconTypeMap>;
  buttonTitle: string;
  clickHandler: () => void;
}
