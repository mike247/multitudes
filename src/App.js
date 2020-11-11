import './App.css'
import OpenPrCount from './components/OpenPrCount'
import ComparativePrCount from './components/ComparativePrCount'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'

const useStyles = makeStyles(theme => ({
  app: {
    backgroundColor: grey[800],
    height: '100%',
    minHeight: '100vh'
  },
  dashboard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  title: {
    fontSize: 24
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  header_title: {
    textAlign: 'center',
    margin: '5px 10px'
  }
}))

function App () {
  const classes = useStyles()
  return (
    <div className={classes.app}>
      <AppBar className={classes.header} position='sticky'>
        <h1 className={classes.header_title}>Facebook/react Dashboard</h1>
      </AppBar>
      <Container className={classes.dashboard}>
        <OpenPrCount />
        <ComparativePrCount />
      </Container>
    </div>
  )
}

export default App
