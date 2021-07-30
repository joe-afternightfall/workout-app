export interface UserWeight {
  id: string;
  date: Date;
  weight: string;
}

export class UserProfileDAO {
  id: string;
  email: string;
  displayName: string;
  profileIcon: string;
  weight: UserWeight[];

  constructor(
    id: string,
    email: string,
    profileIcon: string,
    displayName: string,
    weight: UserWeight[]
  ) {
    this.id = id;
    this.email = email;
    this.profileIcon = profileIcon;
    this.displayName = displayName;
    this.weight = weight;
  }
}
