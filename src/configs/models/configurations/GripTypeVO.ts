import { GripTypeDAO } from './GripTypeDAO';

export class GripTypeVO extends GripTypeDAO {
  firebaseId: string;

  constructor(
    firebaseId: string,
    id: string,
    name: string,
    description: string,
    iconId: string
  ) {
    super(id, name, description, iconId);
    this.firebaseId = firebaseId;
  }
}
