import GithubApi from './GithubAPI';
import { User } from './User';

//create a instance of the GithubAPI
const callGithub = new GithubApi();
callGithub.getUserInfo('histef', (user) => {
  console.log(user)
});

callGithub.getRepos('histef', (repo) => {
  console.log(repo)
})