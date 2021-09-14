import { EquipmentDAO } from './EquipmentDAO';

export class EquipmentVO extends EquipmentDAO {
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
