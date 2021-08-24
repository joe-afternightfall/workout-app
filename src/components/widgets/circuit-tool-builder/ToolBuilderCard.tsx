import {
  Tab,
  Tabs,
  Card,
  Grid,
  AppBar,
  TextField,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import BuilderViews from './components/BuilderViews';
import CircuitSelector from './components/CircuitSelector';

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

    const handleViewChange = (index: number) => {
      this.setState({
        viewIndex: index,
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
    );
  }
}

export interface ToolBuilderCardProps extends WithStyles<typeof styles> {
  DELETE_ME?: undefined;
}

export default withStyles(styles, { withTheme: true })(ToolBuilderCard);
