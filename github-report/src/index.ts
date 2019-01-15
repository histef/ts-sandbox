import * as _ from 'lodash';
import GithubApi from './GithubAPI';

//create a instance of the GithubAPI
const callGithub = new GithubApi();
const username = process.argv[2];

process.argv.length < 3 ? console.log("Please enter a username") :
callGithub.getUserInfo(username, (user) => {
  callGithub.getRepos(username, (repo) => {
    let top5Repos = _.take(repo, 5)
    user.repos = top5Repos;
    console.log(user);
  })
});