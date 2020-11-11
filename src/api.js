import { Octokit } from '@octokit/rest'
import { retry } from '@octokit/plugin-retry'
import { throttling } from '@octokit/plugin-throttling'

import store from './redux/store'
import { setOpenPrs, setReactCorePrs, setAllPrs } from './redux/actions'

const MyOctokit = Octokit.plugin(retry, throttling)

const myOctokit = new MyOctokit({
  userAgent: process.env.REACT_APP_USER_AGENT,
  baseUrl: process.env.REACT_APP_GITHUB_API,
  // log: console,
  log: {
    debug: () => {},
    info: () => {},
    warn: console.warn,
    error: console.error
  },
  throttle: {
    onRateLimit: (retryAfter, options) => {
      myOctokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      )

      if (options.request.retryCount !== 0) {
        // only retries once
        myOctokit.log.info(`Retrying after ${retryAfter} seconds!`)
        return true
      }
    },
    onAbuseLimit: (retryAfter, options) => {
      // does not retry, only logs a warning
      myOctokit.log.warn(
        `Abuse detected for request ${options.method} ${options.url}`
      )
    }
  },
  retry: {
    doNotRetry: ['429']
  }
})

const getAllOpenPrs = async () => {
  let page = 1
  let fetchedPrs = store.getState().prs
  let openPrs = store.getState().openPrs
  while (fetchedPrs.length < openPrs || openPrs === null) {
    const { data } = await myOctokit.search.issuesAndPullRequests({
      q: 'repo:facebook/react+is:pr+state:open',
      page
    })
    store.dispatch(setOpenPrs({ value: data.total_count, prs: data.items }))
    fetchedPrs = store.getState().prs
    openPrs = store.getState().openPrs
    page += 1
  }
}

const getReactCoreTeamPrs = () => {
  myOctokit.search.issuesAndPullRequests({
    q: 'repo:facebook/react+is:pr+label:"React Core Team"'
  }).then(({ data }) => {
    store.dispatch(setReactCorePrs(data.total_count))
  })
}

const getAllPrs = () => {
  myOctokit.search.issuesAndPullRequests({
    q: 'repo:facebook/react+is:pr+-label:"React Core Team"'
  }).then(({ data }) => {
    store.dispatch(setAllPrs(data.total_count))
  })
}
export {
  getAllOpenPrs,
  getReactCoreTeamPrs,
  getAllPrs
}
