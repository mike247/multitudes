import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllOpenPrs } from '../api'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import pink from '@material-ui/core/colors/pink'

const useStyles = makeStyles({
  prCount_root: {
    margin: 15,
  },
  prCount_layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  prCount_title: {
    fontSize: 24,
    marginBottom: 0,
    marginTop: 5
  },
  prCount_value: {
    fontSize: 72,
    marginTop: 10,
    marginBottom: 0,
    color: pink[700]
  },
  prCount_date: {
    fontSize: '22px',
    color: pink[700]
  },
  prCount_spacer: {
    marginTop: '15px'
  }
})

function secondsToString (seconds) {
  const numdays = Math.floor(seconds / 86400)
  const numhours = Math.floor((seconds % 86400) / 3600)
  return numdays + ' days, ' + numhours + ' hours'
}

const OpenPrCount = ({ openPrs, prs }) => {
  useEffect(() => {
    getAllOpenPrs()
  }, [])
  const classes = useStyles()
  let averageSecondsFromNow = null
  if (prs.length) {
    averageSecondsFromNow = prs.reduce((accumulator, pr) => {
      return accumulator + Date.now() - new Date(pr.createdAt)
    }, 0)
    averageSecondsFromNow = parseInt((averageSecondsFromNow / 1000) / prs.length)
  }

  console.log(averageSecondsFromNow)

  return (
    <Card className={classes.prCount_root}>
      <CardContent className={classes.prCount_layout}>
        <h1 className={classes.prCount_title}>Open PR's</h1>
        <h2 className={classes.prCount_value}>{openPrs}</h2>
        <h1 className={`${classes.prCount_title} ${classes.prCount_spacer}`}>Average open time</h1>
        <h2 className={classes.prCount_date}>{secondsToString(averageSecondsFromNow)}</h2>
      </CardContent>
    </Card>
  )
}

const mapStateToProps = state => {
  return { openPrs: state.openPrs, prs: state.prs }
}

export default connect(
  mapStateToProps
)(OpenPrCount)
