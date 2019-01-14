import * as request from 'request';
import { User } from './User';

export default class GithubApi {
  //takes 2 parameters username and a callback (cb). the callback takes 1 param user(with type User) and returns type any
  getUserInfo(username: string, cb: (user: User) => any) {
    const options: any = {
      headers: {
        "User-Agent": "request"
      },
      json: true
    }

    request.get(`https://api.github.com/users/${username}`, options, (error:any, response: any, body:any)=>{
      //takes response body and enters info into a new user instance
      let user = new User(body);
      // console.log(user); this logic now moved to index.ts that should handle what to do with logic
      cb(user);
    })
  }
  getRepos() {

  }
}