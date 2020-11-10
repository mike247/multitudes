import React from 'react'
import { connect } from 'react-redux'
import { setOpenPrs } from '../redux/actions'
import { getOpenPrs } from '../api'

// console.log(getOpenPrs)

class OpenPrCount extends React.Component {
  componentDidMount () {
    getOpenPrs()
  }

  render () {
    return (
      <div>
        <h2>{this.props.openPrs}</h2>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { openPrs: state.openPrs }
}

export default connect(
  mapStateToProps,
  { setOpenPrs }
)(OpenPrCount)
