export default class Repo {
  name: string;
  url: string;
  description: string;
  size?: number;
  forkCount?: number;

  constructor(repo: any){
    this.name = repo.name;
    this.url = repo.html_url;
    this.description = repo.description;
    this.size = repo.size;
    this.forkCount = repo.forks;
  }
}

