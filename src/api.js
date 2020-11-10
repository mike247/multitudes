import { Octokit } from '@octokit/rest'
import { retry } from '@octokit/plugin-retry'
import { throttling } from '@octokit/plugin-throttling'

import store from './redux/store'
import { setOpenPrs } from './redux/actions'

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

      if (options.request.retryCount === 0) {
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

const getOpenPrs = () => {
  myOctokit.search.issuesAndPullRequests({
    q: 'repo:facebook/react+is:pr+state:open'
  }).then(({ data }) => {
    store.dispatch(setOpenPrs(data.total_count))
  })
}

const getReactCoreTeamPrs = () => {
  return ''
}
export {
  getOpenPrs,
  getReactCoreTeamPrs
}
