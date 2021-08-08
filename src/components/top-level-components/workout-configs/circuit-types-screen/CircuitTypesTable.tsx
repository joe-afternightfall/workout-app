import React, { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import PageTitle from '../../../shared/PageTitle';
import { State } from '../../../../configs/redux/store';
import { CircuitTypeVO } from '../../../../configs/models/workout-configurations/circuit-type/CircuitTypeVO';
import { TextField } from '@material-ui/core';
import NewCircuitDialog from './NewCircuitDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const editField = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <TextField
      value={props.value}
      data-testid={'edit-circuit-type-field'}
      onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
        props.onChange(e.target.value)
      }
    />
  );
};

const CircuitTypesTable = (props: CircuitTypesTableProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const data = props.circuitTypes.map(
    (circuit: CircuitTypeVO, index: number) => {
      index += 1;

      return {
        number: index,
      };
    }
  );

  return (
    <>
      <NewCircuitDialog open={open} closeClickHandler={closeDialog} />

      <MaterialTable
        data={data}
        data-testid={'circuits-table'}
        title={<PageTitle title={'Workout Circuits'} />}
        options={{
          pageSize: 6,
          draggable: false,
          pageSizeOptions: [6, 12, 18],
          actionsColumnIndex: -1,
        }}
        columns={[
          {
            title: '#',
            field: 'number',
            editable: 'never',
            // cellStyle: {
            //   width: '10%',
            // },
          },
          {
            title: 'Circuit Name',
            field: 'name',
            // cellStyle: {
            //   width: '10%',
            // },
          },
        ]}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add New Exercise',
            isFreeAction: true,
            onClick: () => {
              openDialog();
            },
          },
        ]}
      />
    </>
  );
};

export interface CircuitTypesTableProps {
  circuitTypes: CircuitTypeVO[];
}

const mapStateToProps = (state: State): CircuitTypesTableProps => {
  return {
    circuitTypes: state.applicationState.circuitTypes,
  } as unknown as CircuitTypesTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): CircuitTypesTableProps =>
  ({} as unknown as CircuitTypesTableProps);

export default connect(mapStateToProps, mapDispatchToProps)(CircuitTypesTable);
