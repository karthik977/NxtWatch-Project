import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {SiYoutubegaming} from 'react-icons/si'

import ThemeContext from '../../context/ThemeContext'

import NavBar from '../NavBar'

import Header from '../Header'

import GameCard from '../GameCard'

import './index.css'

const gamingApiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  load: 'LOAD',
  initial: 'INITIAL',
}

class Gaming extends Component {
  state = {gamingApi: gamingApiConstants.initial, gamingVideos: []}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({gamingApi: gamingApiConstants.load})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.videos.map(eachData => ({
        id: eachData.id,
        title: eachData.title,
        thumbnailUrl: eachData.thumbnail_url,
        viewCount: eachData.view_count,
      }))
      this.setState({
        gamingVideos: updatedData,
        gamingApi: gamingApiConstants.success,
      })
    } else {
      this.setState({gamingApi: gamingApiConstants.failure})
    }
  }

  renderSuccess = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const bgColor = isDark ? 'back-dark' : 'back-light'
        const textColor = isDark ? 'text-light' : 'text-dark'
        const {gamingVideos} = this.state

        return (
          <div className={`${bgColor}`}>
            <div className="gaming-container">
              <div className="real-game-container">
                <SiYoutubegaming className="real-game-icon" />
              </div>
              <h1 className={`${textColor} heading`}>Gaming</h1>
            </div>
            <ul className="unordered-list">
              {gamingVideos.map(game => (
                <GameCard game={game} key={game.id} />
              ))}
            </ul>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
  renderFailure = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const bgColor = isDark ? 'back-dark' : 'back-light'
        const colors = isDark ? 'text-dark' : 'text-light'
        const imageUrl = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div className={`${bgColor}`}>
            <img src={imageUrl} alt="failure view" />
            <h1 className={`${colors}`}>Oops! Something Went Wrong</h1>
            <p className={`${colors}`}>
              We are having some trouble completing your request
            </p>
            <p className={`${colors}`}>Please try again</p>
            <button className="btn-retry" type="button">
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
  renderLoad = () => {
    return (
      <div data-testid="loader" className="gaming-loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    )
  }

  getGame = () => {
    const {gamingApi} = this.state
    switch (gamingApi) {
      case gamingApiConstants.success:
        return this.renderSuccess()
      case gamingApiConstants.failure:
        return this.renderFailure()
      case gamingApiConstants.load:
        return this.renderLoad()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const bigColor = isDark ? 'back-dark' : 'back-light'

          return (
            <div className={`${bigColor} bg-gaming`}>
              <Header />
              <div className="gaming-content-container">
                <NavBar className="gaming-navbar" />
                <div className="loading-content-gaming">{this.getGame()}</div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
