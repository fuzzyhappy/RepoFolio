const { Octokit } = require("@octokit/rest");
const readline = require("readline");
const util = require('util');

process.on('uncaughtException', function(err) {
    console.log(err.stack);
    throw err;
  });

const octokit = new Octokit();
const rl = readline.createInterface(process.stdin, process.stdout);
const question = util.promisify(rl.question).bind(rl);

const getUsername = async () => { return await question("Enter GitHub username: "); }
const getRepoData = async (uname) => { return await octokit.request("/users/" + uname +  "/repos"); }


(async () => {
    try {
        console.log("checkpoint")
	    const uname = await getUsername();
        console.log("checkpoint2")
        console.log(uname);
        var repoData = await getRepoData(uname); 
        repoData = repoData["data"]; // is a list of dictionaries, e.g. repoData[0]["name"]
        console.log(repoData);
    } catch (err) {
        console.log("FAILED");
    } finally {
        rl.close();
    }
})() 