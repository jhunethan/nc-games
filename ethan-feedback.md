# Checklist for NC Games Front End

## General

Well done Ethan! You've clearly worked really hard on this! It's great to see you using custom hooks and other util functions. Additionally, you've really considered the user experience, resulting in a very professional and easy-to-navigate app. Your code is easy to follow and understand.
​

- Display component - better named/extract functions out to separate files
- Error handling of addVote function
- Move Header component to app and put it outside Switch
- Consistent isLoading
- Strange bug when creating comment vote button is disabled for new comment and (create comment! seen before comment)
- Implement UseContext
- Have a look at axios params to handle the queries

## README - write your own and make sure that it:

​

- [ ] has a link to the deployed version
- [ ] provides general info about your app
- [ ] includes links to your back end repo
- [ ] specifies the minimum version of Node required to run locally (check your Node version, `node --version` and use the major version that you are on)
- [ ] has clear instructions on how to run your project locally (`git clone <repo-url>, cd ...`)
      ​

## UX

- [x] Basic styling added
- [x] Responsive design
- [x] Items aligned
- [x] Content legible (not too wide, obstructed, etc)
- [x] Refreshing doesn’t cause an issue on sub-pages
- [x] No errors in the console
- [-] Votes / Posts / Deletions happen instantly _OR_ give user indication of loading
  - Votes are optimistic
  - Post comment has a delay and not optimistic, no isLoading
    ​

## Functionality

### Login

​- [X] Some indication of who is logged in
​

### Reviews

- [x] Serves all reviews / top reviews
- [x] Can vote on reviews
- [-] Can vote a maximum of once in either direction per page load
  - Upvote only
- [x] Votes are persistent when page is refreshed
- [x] Reviews by category pages load only relevant reviews (especially when navigating from one category page to another)
- [x] Can sort reviews by date created / comment_count / votes
      ​

### Individual Review / Comments

- [x] Individual reviews are served with comments
- [x] Can vote on comments
- [-] Can vote a maximum of once in either direction per page load
  - Upvote only
- [x] Votes are persistent when page is refreshed
- [x] Can post new comments, which are persistent
- [ ] Can only delete comments of logged in user
- [ ] Deleted comments don’t re-appear on re-render/refresh
      ​

## Error Handling

- [x] Bad url
- [N/A] Bad category slug in url
- [ ] Bad review_id in url
  - Uncaught error, infinite loading
- [-] Post comment: (No text in comment body / Can you post without logging in?)
  ​- incorrect error message for less than 3 characters, 3 is arbitrary number

## Code

- [x] Well named components
- [x] Components reused where possible (`Reviews` / `Voter`...)
- [x] Minimal state - don't hold derivable data in state
- [x] Set state correctly, using previous state where possible
- [-] Handle asynchronicity clearly (i.e. isLoading pattern)
- [x] Functions are DRY (`handleChange` for controlled components / api calls)
- [x] Use object destructuring where possible
- [x] Tidy? If not: ESLint / Prettier
- [x] `node_modules` git ignored
- [ ] No `console.log`s / comments
  - Rogue console log in addVote, error handle instead
- [ ] remove unnecessary files (e.g. App.test.js)
  - Public files not needed
    ​

## MAKE SURE ALL TESTS ARE STILL PASSING IN BACK END

## Once everything else is complete, here are some extra challenges:

### Additional functionality:

If available on backend:

- [ ] sort comments by date created / votes
- [ ] navigate over pages of reviews (if implemented in back-end)
- [ ] navigate over pages of comments (if implemented in back-end)
- [ ] filter / display reviews by specific user
- [ ] post new article
- [ ] delete logged in user's reviews

### Extra, Extra Challenges

- [ ] Use `aXe` extension to check for a11y issues
- [ ] Make sure any pure functions are extracted and tested with `Jest`
- [ ] Use Context API for sharing logged in user amongst components
- [ ] Create a user page where you can change their profile information if they are "logged in as the right user". This will require having an additional PATCH endpoint on your backend
- [ ] Create a view for all the reviews a user has liked. This will require additional functionality on your backend
- [ ] Make use of [web sockets](https://en.wikipedia.org/wiki/WebSocket) to allow your page to automatically update with a little notification if there have been any recent posts. [socket.io](https://socket.io/) is quite a good one to use and has some good getting started guides. This will require additional functionality on your backend for recent reviews e.g. last 10 minutes
