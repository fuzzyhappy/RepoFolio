# RepoFolio

RepoFolio takes in a GitHub username and uses publicly available information to construct a portfolio website for them. Within the webapp, the user may choose which repos to hide and to show, specify their contact information, write detailed summaries about the projects, and edit their "About Me" section. After doing so, they can export their website as a single, portable .html file.

## Installation / User Guide
First, verify that you have `npm` installed with 
```
npm --version
```
(you should see some number; if an error occurs, go install `npm`!).

Also verify that you have Node version v16.13.2 and above with 
```
node --version
```

Once that's complete, simply
```
git clone https://github.com/fuzzyhappy/RepoFolio
cd RepoFolio
npm install
npm start
```
(Note: the install may take a while.) After you run `npm start`, you should eventually be able to navigate to `localhost:3000/repofolio`, where you can access the app!

Alternatively, you can access a hosted version of the app [here](https://fuzzyhappy.github.io/repofolio/), but the export functionality doesn't work particularly well there (mainly if you just want to see it in action and don't want to deal with `npm` messes).