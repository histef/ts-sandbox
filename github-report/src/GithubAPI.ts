import * as request from 'request';

export default class GithubApi {
  getUserInfo(username: string) {
    const options: any = {
      headers: {
        "User-Agent": "request"
      }
    }

    request.get(`https://api.github.com/users/${username}`, options, (error:any, response: any, body:any)=>{
      console.log(body);
      
    })
  }
  getRepos() {

  }
}