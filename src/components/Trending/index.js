import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {FaFire} from 'react-icons/fa'

import Header from '../Header'
import NavBar from '../NavBar'
import TrendVideo from '../TrendVideo'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const apisConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Trending extends Component {
  state = {tApiStatus: apisConstant.initial, trendingVideos: []}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({tApiStatus: apisConstant.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const trendingVideos = data.videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
        },
        viewCount: video.view_count,
        publishedAt: video.published_at,
      }))
      this.setState({
        trendingVideos,
        tApiStatus: apisConstant.success,
      })
    } else {
      this.setState({tApiStatus: apisConstant.failure})
    }
  }

  renderSuccess = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const bgColor = isDark ? 'bg-dark' : 'bg-light'
        const hBgColor = isDark ? 'bg-dark' : 'h-bg-light'
        const color = isDark ? 'txt-light' : 'txt-dark'
        const {trendingVideos} = this.state
        return (
          <div className={`${bgColor}`}>
            <div className={`${hBgColor} fire-heading-logo`}>
              <div className="fire-container-t">
                {' '}
                <FaFire className="trending-fire-icon" />
              </div>
              <h1 className={`${color} trending-name`}>Trending</h1>
            </div>
            <ul>
              {trendingVideos.map(trendVideo => (
                <TrendVideo trendingVideo={trendVideo} key={trendVideo.id} />
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
        const bgColor = isDark ? 'bg-dark' : 'bg-light'
        const colors = isDark ? 'txt-dark' : 'txt-light'
        const imageUrl = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div className={`${bgColor}`}>
            <img src={imageUrl} alt="" />
            <h1 className={`${colors}`}>Oops! Something Went Wrong</h1>
            <p className={`${colors}`}>
              We are having some trouble completing your request
            </p>
            <p className={`${colors}`}>Please try again</p>
            <button type="button" className="btn-retry">
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderLoading = () => {
    return (
      <div data-testid="loader" className="loading-trending-view">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    )
  }

  getView = () => {
    const {tApiStatus} = this.state
    switch (tApiStatus) {
      case apisConstant.success:
        return this.renderSuccess()
      case apisConstant.failure:
        return this.renderFailure()
      case apisConstant.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const bgicolor = isDark ? 'bg-dark' : 'bg-light'

          return (
            <div className={`${bgicolor} trending-container`}>
              <Header />
              <div className="trending-el">
                <NavBar className="trending-navbar" />
                <div className="get-trending-details">{this.getView()}</div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Trending
