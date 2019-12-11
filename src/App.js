import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import LockOpen from '@material-ui/icons/LockOpen'
import classnames from 'classnames'
import logo from './logo.svg'
import './App.css'

const styles = theme => ({
  footer: {
    margin: '0 auto 20vmax',
    maxWidth: 370,
    padding: '0 10px',
    textAlign: 'right',
    width: '100%'
  },
  btn: {
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  main: {
    flex: 1
  },
  status: {
    background: '#ffffff3b',
    border: '1px solid white',
    borderRadius: '50%',
    display: 'inline-block',
    height: 10,
    width: 10
  },
  statusOk: {
    background: 'rgb(0,161,75)'
  },
  statusError: {
    background: 'rgb(237,28,36)'
  }
})

const API_URL = 'https://private-anon-d4f3e03923-blynkapi.apiary-proxy.com/9d0d723f0863442798ddd53f522654e7'

class App extends Component {
  state = {
    status: ''
  }

  componentDidMount = () => {
    fetch(`${API_URL}/isHardwareConnected`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          response.json()
            .then(data => {
              if (data) {
                this.setState({
                  status: 'ok'
                })
              } else {
                this.setState({
                  status: 'error'
                })
              }
            })
        } else {
          this.setState({
            status: 'error'
          })
        }
      })
      .catch(() => {
        this.setState({
          status: 'error'
        })
      })
  }

  handleBtnClick = () => {
    fetch(`${API_URL}/update/D0?value=1`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          this.setState({
            status: 'ok'
          }, () => {
            setTimeout(() => {
              this.handleBtnRelease()
            }, 500);
          })
        } else {
          this.setState({
            status: 'error'
          })
        }
      })
      .catch(() => {
        this.setState({
          status: 'error'
        })
      })
  }

  handleBtnRelease = () => {
    fetch(`${API_URL}/update/D0?value=0`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          this.setState({
            status: 'ok'
          })
        } else {
          this.setState({
            status: 'error'
          })
        }
      })
      .catch(() => {
        this.setState({
          status: 'error'
        })
      })
  }

  render() {
    const { classes } = this.props
    const { status } = this.state
    let statusClasses = classnames({
      [classes.status]: true,
      [classes.statusOk]: status === 'ok',
      [classes.statusError]: status === 'error'
    })
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main className={classes.main}>
        </main>
        <footer className={classes.footer}>
          <div className={statusClasses} />
          <Fab
            variant="extended"
            color="primary"
            aria-label="Add"
            className={classes.btn}
            onClick={this.handleBtnClick}>
            <LockOpen className={classes.extendedIcon} />
            Unlock Door
          </Fab>
        </footer>
      </div>
    )
  }
}

export default withStyles(styles)(App)
