export class EquipmentDAO {
  id: string;
  name: string;
  description: string;
  iconId: string;

  constructor(id: string, name: string, description: string, iconId: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.iconId = iconId;
  }
}
