import * as request from 'request';
import { User } from './User';
import Repo from './Repo';

export default class GithubApi {
  options: any = {
    headers: {
      "User-Agent": "request"
    },
    json: true
  }
  url: string = 'https://api.github.com/users/';
  //request takes callbacks not promises/async/await. hopefully, no cb hell!!!
  //takes 2 parameters username and a callback (cb). the callback takes 1 param user(with type User) and returns type any
  getUserInfo(username: string, cb: (user: User) => any ) {
    request.get(`${this.url}${username}`, this.options, (error:any, response: any, body:any)=>{
      //takes response body and enters info into a new user instance
      let user = new User(body);
      // console.log(user); this logic now moved to index.ts that should handle what to do with logic
      cb(user);
    })
  }
  getRepos(username: string, cb: (repos: Repo[]) => any ) {
    request.get(`${this.url}${username}/repos`, this.options, (error:any, response: any, body:any)=>{
      // takes response body (array of objects) and creates a new Repo instance for each item in array 
      const repos = body.map((item:any) => new Repo(item));
      // don't want to return from request, want to call callback
      cb(repos);
    })
  }
}