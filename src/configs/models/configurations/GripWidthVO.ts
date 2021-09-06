import { GripWidthDAO } from './GripWidthDAO';

export class GripWidthVO extends GripWidthDAO {
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
