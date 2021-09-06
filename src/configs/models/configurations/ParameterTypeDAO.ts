export class ParameterTypeDAO {
  id: string;
  name: string; // ex: (weight & reps | repetitions | duration)
  description: string;

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
