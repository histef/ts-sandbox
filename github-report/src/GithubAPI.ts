import * as request from 'request';
import { User } from './User';

export default class GithubApi {
  getUserInfo(username: string) {
    const options: any = {
      headers: {
        "User-Agent": "request"
      }
    }

    request.get(`https://api.github.com/users/${username}`, options, (error:any, response: any, body:any)=>{
      //takes response body and enters info into a new user instance
      let user = new User(JSON.parse(body));
      console.log(user);
    })
  }
  getRepos() {

  }
}