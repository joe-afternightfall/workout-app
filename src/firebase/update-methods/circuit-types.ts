import { Store } from 'redux';
import { getAllCircuitTypes } from '../../services/workout-configurations/circuit-types-service';
import { loadCircuitTypes } from '../../creators/workout-configurations';
import { CircuitTypeVO } from '../../configs/models/workout-configurations/circuit-type/CircuitTypeVO';

export const updateCircuitTypes = async (store: Store): Promise<void> => {
  const circuits: CircuitTypeVO[] = await getAllCircuitTypes();

  store.dispatch(loadCircuitTypes(circuits));
};
