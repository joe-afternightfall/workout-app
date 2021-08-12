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
    height: string,
    weight: UserWeight[],
    dateOfBirth: string,
    lastUpdatedOn: string
  ) {
    super(
      id,
      email,
      profileIcon,
      displayName,
      height,
      weight,
      dateOfBirth,
      lastUpdatedOn
    );
    this.firebaseId = firebaseId;
  }
}
