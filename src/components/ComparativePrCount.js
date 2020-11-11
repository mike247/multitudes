/* disable multiline-ternary */ // StandardJS seems to have a circular error on this rule, will disable pending further investigation
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getReactCoreTeamPrs, getAllPrs } from '../api'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Chart, PieSeries } from '@devexpress/dx-react-chart-material-ui'
import { Palette } from '@devexpress/dx-react-chart'

import blue from '@material-ui/core/colors/blue'
import orange from '@material-ui/core/colors/orange'

const useStyles = makeStyles(theme => ({
  compPrCount: {
    width: 450,
    margin: 15,
    [theme.breakpoints.down('xs')]: {
      width: '95%'
    }
  },
  compPrCount_layout: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  compPrCount_title: {
    fontSize: 24,
    marginBottom: 0,
    marginTop: 5
  },
  compPrCount_prWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  compPrCount_value: {
    fontSize: 72,
    marginTop: 10,
    marginBottom: 0
  },
  compPrCount_value_first: {
    color: blue[700]
  },
  compPrCount_value_second: {
    color: orange[400]
  }
}))

const ComparativePrCount = ({ teamPrs, allPrs }) => {
  useEffect(() => {
    getReactCoreTeamPrs()
    getAllPrs()
  }, [])
  const classes = useStyles()

  const chartData = [
    {
      team: 'React Team',
      value: teamPrs,
      color: blue[700]
    },
    {
      team: 'All',
      value: allPrs,
      color: orange[400]
    }
  ]

  const colorScheme = chartData.map(field => field.color)

  const chart = (teamPrs && allPrs)
    ? (
      <Chart
        data={chartData}
        height='300'
      >
        <Palette scheme={colorScheme} />
        <PieSeries
          valueField='value'
          argumentField='team'
          outerRadius='0.9'
        />
      </Chart>
      )
    : ''

  return (
    <Card className={classes.compPrCount}>
      <CardContent>
        <div className={classes.compPrCount_layout}>
          <div className={classes.compPrCount_prWrapper}>
            <h1 className={classes.compPrCount_title}>All PR's</h1>
            <h2 className={`${classes.compPrCount_value_second} ${classes.compPrCount_value}`}>{allPrs}</h2>
          </div>
          <div className={classes.compPrCount_prWrapper}>
            <h1 className={classes.compPrCount_title}>React Team PR's</h1>
            <h2 className={`${classes.compPrCount_value_first} ${classes.compPrCount_value}`}>{teamPrs}</h2>
          </div>
        </div>
        {chart}
      </CardContent>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    teamPrs: state.reactTeamPrs,
    allPrs: state.allPrs
  }
}

export default connect(
  mapStateToProps
)(ComparativePrCount)
