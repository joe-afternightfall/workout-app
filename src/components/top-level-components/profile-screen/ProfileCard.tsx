import React from 'react';
import {
  Card,
  Grid,
  Menu,
  Avatar,
  MenuItem,
  IconButton,
  Typography,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { red } from '@material-ui/core/colors';
import { State } from '../../../configs/redux/store';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toggleUserProfileDialog } from '../../../creators/user-info';
import { UserProfileVO } from 'workout-app-common-core/core/src';
import icon from '../../../configs/icons/blue-monster-brute.svg';
import { findLatestWeight } from '../../../utils/find-latest';

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      backgroundColor: red[500],
    },
  })
);

function buildTitle(title: string, value: string) {
  return (
    <Grid container spacing={2} item xs={12}>
      <Grid item xs={6} container justify={'flex-end'}>
        <Grid item>
          <Typography>{title}</Typography>
        </Grid>
      </Grid>

      <Grid item xs={6} container>
        <Grid item>
          <Typography>{value}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

const ProfileCard = (props: ProfileCardProps): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    props.openDialogHandler(props.userProfile);
  };

  const latestWeight = findLatestWeight(props.userProfile.weights);
  const userHeight = `${props.userProfile.height.feet} ft ${props.userProfile.height.inches} in`;

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img src={icon} alt={'app-logo'} />
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
              keepMounted
              id={'simple-menu'}
              anchorEl={anchorEl}
              onClose={handleClose}
              open={Boolean(anchorEl)}
            >
              <MenuItem onClick={handleEdit}>{'Edit Profile'}</MenuItem>
            </Menu>
          </>
        }
        title={'Profile Info'}
        subheader={`Last Updated: ${new Date(
          props.userProfile.lastUpdatedOn
        ).toLocaleDateString()}`}
      />

      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {buildTitle('Email: ', props.email)}
          </Grid>

          <Grid item xs={12}>
            {buildTitle('Display Name: ', props.userProfile.displayName)}
          </Grid>

          <Grid item xs={12}>
            {latestWeight && buildTitle('Weight: ', latestWeight.weight)}
          </Grid>

          <Grid item xs={12}>
            {buildTitle('Height: ', userHeight)}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export interface ProfileCardProps {
  email: string;
  userProfile: UserProfileVO;
  openDialogHandler: (userProfile: UserProfileVO) => void;
}

const mapStateToProps = (state: State): ProfileCardProps => {
  return {
    email: state.applicationState.userEmail,
    userProfile: state.applicationState.userProfile,
  } as unknown as ProfileCardProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ProfileCardProps =>
  ({
    openDialogHandler: () => {
      dispatch(toggleUserProfileDialog(true));
    },
  } as unknown as ProfileCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
