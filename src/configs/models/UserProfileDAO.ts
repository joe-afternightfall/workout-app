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
  height: string;
  weight: UserWeight[];
  dateOfBirth: string;
  lastUpdatedOn: string;

  constructor(
    id: string,
    email: string,
    profileIcon: string,
    displayName: string,
    height: string,
    weight: UserWeight[],
    dateOfBirth: string,
    lastUpdatedOn: string
  ) {
    this.id = id;
    this.email = email;
    this.profileIcon = profileIcon;
    this.displayName = displayName;
    this.weight = weight;
    this.height = height;
    this.dateOfBirth = dateOfBirth;
    this.lastUpdatedOn = lastUpdatedOn;
  }
}
