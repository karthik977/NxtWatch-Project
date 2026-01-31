import {Component} from 'react'
import {Link} from 'react-router-dom'
import {IoIosSearch} from 'react-icons/io'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

import NavBar from '../NavBar'
import Premium from '../Premium'
import ThemeContext from '../../context/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosList: [],
    isPremiumShown: true,
    searchInputValue: '',
  }

  componentDidMount() {
    this.getVideos()
  }

  timeAgo = publishedAt => {
    const publishedDate = new Date(publishedAt)
    const now = new Date()

    const diffInSeconds = Math.floor((now - publishedDate) / 1000)

    const minutes = Math.floor(diffInSeconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(days / 365)

    if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    }

    if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    }

    if (days < 30) {
      return `${days} day${days > 1 ? 's' : ''} ago`
    }

    if (days < 365) {
      return `${months} month${months > 1 ? 's' : ''} ago`
    }

    return `${years} year${years > 1 ? 's' : ''} ago`
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/all?search='
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const videos = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        channel: {
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        },
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        videosList: videos,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  showPremiumAd = () => {
    this.setState({isPremiumShown: false})
  }

  changeSearchInput = event => {
    this.setState({searchInputValue: event.target.value})
  }

  clickSearch = () => {
    const {videosList, searchInputValue} = this.state
    const updatedList = videosList.filter(eachElement =>
      eachElement.title.toLowerCase().includes(searchInputValue.toLowerCase()),
    )
    this.setState({videosList: updatedList})
  }

  renderSuccessView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const {videosList, isPremiumShown} = this.state

        const bgContainerClassName = isDark ? 'bg-dark' : 'bg-light'

        return (
          <div
            className={`${bgContainerClassName} home-bg-container`}
            data-testid="home"
          >
            {isPremiumShown && <Premium showPremiumAd={this.showPremiumAd} />}
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="home-search-bar"
                onChange={this.changeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.clickSearch}
              >
                <IoIosSearch />
              </button>
            </div>
            <ul className="unordered-list">
              {videosList.map(eachVideo => (
                <li className="each-video-item" key={eachVideo.id}>
                  <Link
                    to={`/videos/${eachVideo.id}`}
                    className={`${bgContainerClassName} home-video-item`}
                  >
                    <img
                      src={eachVideo.thumbnailUrl}
                      alt="video thumbnail"
                      className="home-thumbnail-image"
                    />
                    <div className="home-video-details-container">
                      <img
                        src={eachVideo.channel.profileImageUrl}
                        alt={eachVideo.channel.name}
                        className="channel-image"
                      />
                      <div className={`${bgContainerClassName}`}>
                        <p className="home-video-title">{eachVideo.title}</p>
                        <p className="home-video-channel-name">
                          {eachVideo.channel.name}
                        </p>
                        <div
                          className={`${bgContainerClassName} channel-details`}
                        >
                          <p className="channel-view-count">
                            {eachVideo.viewCount} views .
                          </p>
                          <p className="channel-view-count">
                            {this.timeAgo(eachVideo.publishedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const bgColorClassName = isDark ? 'bg-dark' : 'bg-light'
        const failureImageUrl = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div className={`${bgColorClassName}`}>
            <img src={failureImageUrl} alt="failure view" />
            <h1>Oopd! Something Went Wrong</h1>
            <p>We are having some trouble</p>
            <button type="button">Retry</button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loading-view">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="total-container">
          <Header />
          <div className="abc">
            <NavBar className="nav-element" />
            <div className="loading-home">{this.getView()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
