import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getOpenPrs } from '../api'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import pink from '@material-ui/core/colors/pink'

const useStyles = makeStyles({
  prCount_root: {
    width: 275,
    margin: 15,
    maxHeight: '180px',
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
  }
})

const OpenPrCount = ({ openPrs }) => {
  useEffect(() => {
    getOpenPrs()
  }, [])
  const classes = useStyles()
  return (
    <Card className={classes.prCount_root}>
      <CardContent>
        <h1 className={classes.prCount_title}>Open PR's</h1>
        <h2 className={classes.prCount_value}>{openPrs}</h2>
      </CardContent>
    </Card>
  )
}

const mapStateToProps = state => {
  return { openPrs: state.openPrs }
}

export default connect(
  mapStateToProps
)(OpenPrCount)
