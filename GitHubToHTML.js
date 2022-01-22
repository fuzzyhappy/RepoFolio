const { Octokit } = require("@octokit/rest");
const readline = require("readline");
const util = require('util');

const octokit = new Octokit();
const rl = readline.createInterface(process.stdin, process.stdout);
const question = util.promisify(rl.question).bind(rl);

const getUsername = async () => { return await question("Enter GitHub username: "); }
const getRepoData = async (uname) => { return await octokit.request("/users/" + uname +  "/repos"); }

(async () => {
    try {
	    const uname = await getUsername();
        var repoData = await getRepoData(uname); 
        repoData = repoData["data"]; // is a list of dictionaries, e.g. repoData[0]["name"]
        console.log(repoData);
        rl.close();
    } catch (err) {
        console.log(err);
    }
})() 