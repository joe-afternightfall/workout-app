import React from 'react';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
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

export default function EditDialog(props: NewDialogProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(props.value);

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
    <>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
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

        <DialogContent style={{ textAlign: 'center', padding: '32px 8px' }}>
          <TextField
            style={{ padding: '16px 0', width: '85%' }}
            placeholder={'Enter Name'}
            onChange={handleChange}
            value={value}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>{'Cancel'}</Button>
          <Button
            disabled={value === ''}
            onClick={() => {
              props.updateClickHandler(props.editId, value);
              handleClose();
            }}
          >
            {'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export interface NewDialogProps {
  title: string;
  value: string;
  editId: string;
  updateClickHandler: (id: string, value: string) => Promise<void>;
}
