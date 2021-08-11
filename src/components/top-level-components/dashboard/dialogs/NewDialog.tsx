import React from 'react';
import {
  Grid,
  TextField,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })
);

export default function NewDialog(props: NewDialogProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} aria-label="delete">
        <AddIcon />
      </IconButton>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth={'xs'}
      >
        <DialogTitle disableTypography className={classes.root}>
          <Typography variant={'h6'}>{props.title}</Typography>

          <IconButton
            aria-label={'close'}
            onClick={handleClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                style={{ width: '100%' }}
                placeholder={'Enter Name'}
                onChange={handleChange}
              />
            </Grid>

            {props.extraContent && (
              <Grid item xs={12}>
                {props.extraContent}
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>{'Cancel'}</Button>
          <Button
            disabled={value === ''}
            onClick={() => {
              if (props.extraId) {
                props.createNewClickHandler(value, props.extraId);
              } else {
                props.createNewClickHandler(value);
              }
              handleClose();
            }}
          >
            {'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export interface NewDialogProps {
  title: string;
  extraContent?: JSX.Element;
  extraId?: string;
  createNewClickHandler: (value: string, extraId?: string) => Promise<void>;
}
