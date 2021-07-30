import { UserProfileDAO, UserWeight } from './UserProfileDAO';

export class UserProfileVO extends UserProfileDAO {
  firebaseId: string;
  [key: string]: string | UserWeight[];

  constructor(
    firebaseId: string,
    id: string,
    email: string,
    profileIcon: string,
    displayName: string,
    weight: UserWeight[]
  ) {
    super(id, email, profileIcon, displayName, weight);
    this.firebaseId = firebaseId;
  }
}
