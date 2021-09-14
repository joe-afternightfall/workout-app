export class PhaseDAO {
  id: string;
  name: string; // ex(warm ups | HIIT | strength training | cardio | interval training)
  description: string;

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
