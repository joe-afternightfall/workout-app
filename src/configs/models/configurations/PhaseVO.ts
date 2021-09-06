import { PhaseDAO } from './PhaseDAO';

export class PhaseVO extends PhaseDAO {
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
