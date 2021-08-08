import { Store } from 'redux';
import { getAllCircuitTypes } from '../../services/workout-configurations/circuit-types-service';
import { loadCircuitTypes } from '../../creators/workout-configurations';
import { CircuitTypeVO } from '../../configs/models/workout-configurations/circuit-type/CircuitTypeVO';

export const updateCircuitTypes = async (store: Store): Promise<void> => {
  const circuits = await getAllCircuitTypes();

  if (circuits) {
    store.dispatch(loadCircuitTypes(buildVO(circuits)));
  }
};

// todo: make strict typing for any
function buildVO(circuits: any): CircuitTypeVO[] {
  return Object.keys(circuits).map((key: string) => {
    return {
      firebaseId: key,
      id: circuits[key].id,
      name: circuits[key].name,
    };
  });
}
