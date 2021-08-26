import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { State } from '../../../configs/redux/store';
import { CircuitTemplateVO } from '../../../configs/models/CircuitTemplateVO';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const Templates = (props: TemplatesProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <p>{JSON.stringify(props.templates)}</p>
    </div>
  );
};

export interface TemplatesProps {
  templates: CircuitTemplateVO;
}

const mapStateToProps = (state: State): TemplatesProps => {
  return {
    templates: state.applicationState.circuitTemplates,
  } as unknown as TemplatesProps;
};

const mapDispatchToProps = (dispatch: Dispatch): TemplatesProps =>
  ({} as unknown as TemplatesProps);

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
