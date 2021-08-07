import { CategoryTypeDAO } from './CategoryTypeDAO';

export class CategoryTypeVO extends CategoryTypeDAO {
  firebaseId: string;

  constructor(firebaseId: string, id: string, name: string) {
    super(id, name);
    this.firebaseId = firebaseId;
  }
}
