import * as _ from 'lodash';
import GithubApi from './GithubAPI';


//create a instance of the GithubAPI
const callGithub = new GithubApi();
callGithub.getUserInfo('histef', (user) => {
  callGithub.getRepos('histef', (repo) => {
    let top5Repos = _.take(repo, 5)
    user.repos = top5Repos;
    console.log(user);
  })
});