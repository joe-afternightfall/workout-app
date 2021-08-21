import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import CircuitSelector from './components/CircuitSelector';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from '@material-ui/core';
import BuilderViews from './components/BuilderViews';

const styles: Styles<Theme, StyledComponentProps> = () => ({
  root: {
    height: '100vh',
    width: '100%',
  },
  viewRoot: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
  },
});

class ToolBuilderCard extends Component<ToolBuilderCardProps> {
  state = {
    circuitId: '',
    viewIndex: 0,
    circuitNickname: '',
  };

  render(): JSX.Element {
    const { classes } = this.props;

    const selectCircuit = (circuitId: string) => {
      this.setState({
        circuitId: circuitId,
      });
    };

    const handleViewChange = (index: number) => {
      this.setState({
        viewIndex: index,
      });
    };

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        circuitNickname: e.target.value,
      });
    };

    const handleChange = (
      e: React.ChangeEvent<Record<string, never>>,
      newValue: number
    ) => {
      this.setState({
        viewIndex: newValue,
      });
    };

    // const handleViewChangeIndex = (index: number) => {
    //   this.setState({
    //     viewIndex: index
    //   })
    // }

    return (
      <Card className={classes.root}>
        <CardHeader title={'Tool Builder'} />
        <CardContent style={{ height: '100vh' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CircuitSelector
                selectedCircuitId={this.state.circuitId}
                onChangeHandler={selectCircuit}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                value={this.state.circuitNickname}
                label={'Circuit Nickname'}
                onChange={handleTextFieldChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Card raised={false}>
                <CardHeader
                  style={{ padding: 0 }}
                  title={
                    <AppBar position="static" color="default">
                      <Tabs
                        value={this.state.viewIndex}
                        onChange={handleChange}
                        indicatorColor={'primary'}
                        textColor={'primary'}
                        variant={'fullWidth'}
                        aria-label="full width tabs example"
                      >
                        <Tab label={'Muscle Groups'} value={0} />
                        <Tab label={'Exercise List'} value={1} />
                      </Tabs>
                    </AppBar>
                  }
                />
                <CardContent style={{ padding: 0 }}>
                  <BuilderViews
                    selectedIndex={this.state.viewIndex}
                    viewChangeHandler={handleViewChange}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export interface ToolBuilderCardProps extends WithStyles<typeof styles> {
  DELETE_ME?: undefined;
}

export default withStyles(styles, { withTheme: true })(ToolBuilderCard);
