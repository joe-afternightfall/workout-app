import React from 'react';
import {
  Card,
  Grid,
  Avatar,
  TextField,
  CardHeader,
  IconButton,
  CardContent,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { red } from '@material-ui/core/colors';
import { State } from '../../../configs/redux/store';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    avatar: {
      backgroundColor: red[500],
    },
  })
);

const ProfileCard = (props: ProfileCardProps): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {'R'}
          </Avatar>
        }
        action={
          <>
            <IconButton
              onClick={handleClick}
              aria-controls={'simple-menu'}
              aria-haspopup={'true'}
              aria-label="settings"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </>
        }
        title={'Profile Info'}
        subheader={'Last Updated on: '}
      />

      <CardContent>
        <Grid container>
          <form className={classes.root} noValidate autoComplete={'off'}>
            <Grid item xs={12} sm={6}>
              <TextField id={'email'} label={'Email'} value={props.email} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id={'display-name'} label={'Display Name'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id={'weight'} label={'Weight'} />
            </Grid>
          </form>
        </Grid>
      </CardContent>
    </Card>
  );
};

export interface ProfileCardProps {
  email: string;
}

const mapStateToProps = (state: State): ProfileCardProps => {
  return {
    email: state.applicationState.username,
  } as unknown as ProfileCardProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ProfileCardProps =>
  ({} as unknown as ProfileCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
