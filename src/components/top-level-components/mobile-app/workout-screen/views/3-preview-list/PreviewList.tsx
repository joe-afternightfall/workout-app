import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import SelectionCard from '../components/SelectionCard';
import TabPanel from '../../../../../shared/SwipeableViewTabPanel';
import FolderList from './TossPreview';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const PreviewList = (props: PreviewListProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  return (
    <TabPanel value={props.activeTab} index={2}>
      <FolderList />
    </TabPanel>
  );
};

interface PassedInProps {
  pageIndex: number;
  activeTab: number;
  goForwardHandler: () => void;
}

export interface PreviewListProps {
  DELETE_ME?: undefined;
}

const mapStateToProps = (state: any): PreviewListProps => {
  return {} as unknown as PreviewListProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PreviewListProps =>
  ({} as unknown as PreviewListProps);

export default connect(mapStateToProps, mapDispatchToProps)(PreviewList);
