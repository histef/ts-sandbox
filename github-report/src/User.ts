import Repo from './Repo';

export class User {
  login: string;
  fullName: string;
  repoCount: number;
  followerCount: number;
  repos?: Repo[];

  constructor(UserResponse: any){
    this.login = UserResponse.login;
    this.fullName = UserResponse.name;
    this.repoCount = UserResponse.public_repos;
    this.followerCount = UserResponse.followers;
    // this.repos = UserResponse.;
  }
}