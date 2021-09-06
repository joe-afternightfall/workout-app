import { ParameterTypeDAO } from './ParameterTypeDAO';

export class ParameterTypeVO extends ParameterTypeDAO {
  firebaseId: string;

  constructor(
    firebaseId: string,
    id: string,
    name: string,
    description: string
  ) {
    super(id, name, description);
    this.firebaseId = firebaseId;
  }
}
