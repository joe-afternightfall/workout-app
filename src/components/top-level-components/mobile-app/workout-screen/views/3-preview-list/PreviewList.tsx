import React from 'react';
import { connect } from 'react-redux';
import TabPanel from '../../../../../shared/SwipeableViewTabPanel';
import FolderList from './TossPreview';

const PreviewList = (props: PreviewListProps & PassedInProps): JSX.Element => {
  return (
    <TabPanel value={props.activeTab} index={2}>
      {/*<FolderList />*/}
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

const mapStateToProps = (): PreviewListProps => {
  return {} as unknown as PreviewListProps;
};

const mapDispatchToProps = (): PreviewListProps =>
  ({} as unknown as PreviewListProps);

export default connect(mapStateToProps, mapDispatchToProps)(PreviewList);
