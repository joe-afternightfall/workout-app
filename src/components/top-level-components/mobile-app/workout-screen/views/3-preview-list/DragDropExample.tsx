import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { ClassNameMap, Styles } from '@material-ui/styles';
import { Container, Draggable } from 'react-smooth-dnd';
import {
  List,
  Card,
  ListItem,
  Grid,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@material-ui/core';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { arrayMoveImmutable as arrayMove } from 'array-move';

function buildCard(
  classes: ClassNameMap,
  item: { index: number; key: string }
): JSX.Element {
  return (
    <Draggable key={item.index}>
      <Card className={classes.cardRoot}>
        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <ListItemText primary={`Card #${item.key}`} />
            </Grid>

            <Grid
              item
              xs={2}
              container
              alignItems={'center'}
              justify={'center'}
            >
              <ListItemIcon className={'drag-handle'}>
                <IconButton>
                  <DragHandleIcon />
                </IconButton>
              </ListItemIcon>
            </Grid>
          </Grid>
        </ListItem>
      </Card>
    </Draggable>
  );
}

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  selectedRow: {
    zIndex: 1000,
    marginBottom: theme.spacing(1),
    border: `solid 1px ${theme.palette.primary.main}`,
  },
  cardRoot: {
    border: 'solid 1px #333333',
    margin: '0 8px 8px 8px',
  },
});

class DragDropExample extends Component<DragDropExampleProps> {
  state = {
    items: [
      { index: 1, key: '1' },
      { index: 2, key: '2' },
      { index: 3, key: '3' },
      { index: 4, key: '4' },
      { index: 5, key: '5' },
      { index: 6, key: '6' },
      { index: 7, key: '7' },
      { index: 8, key: '8' },
      { index: 9, key: '9' },
      { index: 10, key: '10' },
    ],
  };

  render(): JSX.Element {
    const { classes } = this.props;

    const orderAndUpdate = (props: {
      removedIndex: number | null;
      addedIndex: number | null;
    }) => {
      if (props.removedIndex !== null && props.addedIndex !== null) {
        console.log(
          'props.removedIndex: ' + JSON.stringify(props.removedIndex)
        );
        console.log('props.addedIndex: ' + JSON.stringify(props.addedIndex));
        this.setState({
          items: arrayMove(
            this.state.items,
            props.removedIndex,
            props.addedIndex
          ),
        });
      }
    };

    return (
      <List>
        <Container
          dragClass={classes.selectedRow}
          dragHandleSelector={'.drag-handle'}
          onDrop={orderAndUpdate}
        >
          {this.state.items.map((item) => buildCard(classes, item))}
        </Container>
      </List>
    );
  }
}

export interface DragDropExampleProps extends WithStyles<typeof styles> {
  DELETE_ME?: undefined;
}

export default withStyles(styles, { withTheme: true })(DragDropExample);
