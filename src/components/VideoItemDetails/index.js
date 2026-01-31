import {Component} from 'react'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
// import {AiOutlineDislike} from 'react-icons/ai'
import {FaRegSave} from 'react-icons/fa'
import ReactPlayer from 'react-player'

import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import NavBar from '../NavBar'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const apistatusconstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    channelDetails: {},
    apiStatus: apistatusconstant.loading,
    isLike: false,
    isDisLike: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apistatusconstant.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const videoDetailsUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(videoDetailsUrl, options)
    const data = await response.json()
    if (response.ok) {
      const videoDetail = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }
      const channelDetail = {
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
      }

      this.setState({
        videoDetails: videoDetail,
        channelDetails: channelDetail,
        apiStatus: apistatusconstant.success,
      })
    } else {
      this.setState({apiStatus: apistatusconstant.failure})
    }
  }

  getViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apistatusconstant.success:
        return this.renderSuccessView()
      case apistatusconstant.failure:
        return this.renderFailureView()
      case apistatusconstant.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  isLiked = () => {
    this.setState(prevState => ({
      isLike: !prevState.isLike,
      isDisLike: false,
    }))
  }

  isNotLiked = () => {
    this.setState(prevState => ({
      isDisLike: !prevState.isDisLike,
      isLike: false,
    }))
  }

  renderSuccessView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {savedVideos, saveVideo, isDark} = value
        const {videoDetails} = this.state

        const isSaved = savedVideos.some(each => each.id === videoDetails.id)

        const saveVideoBtn = () => {
          saveVideo(videoDetails)
        }

        const videoSavedClassName = isSaved
          ? 'video-item-reaction-save'
          : 'video-item-like'

        const videoSavedContent = isSaved ? 'Saved' : 'Save'

        const bgColor = isDark ? 'bg-dark' : 'bg-light'
        const colors = isDark ? 'txt-dark' : 'txt-light'
        const {channelDetails, isLike, isDisLike} = this.state
        const {
          description,

          title,
          videoUrl,

          viewCount,
          publishedAt,
        } = videoDetails
        const {name, profileImageUrl, subscriberCount} = channelDetails

        const isLikedBtn = isLike
          ? 'video-item-reaction-liked'
          : 'video-item-like'
        const isNotLikedBtn = isDisLike
          ? 'video-item-reaction-disliked'
          : 'video-item-like'

        return (
          <div
            className={`${bgColor} video-item-details-containerr`}
            data-testid="videoItemDetails"
          >
            <Header />
            <div className={`${bgColor} video-item`}>
              <NavBar />
              <div className={`${bgColor} video-main`}>
                <div className="react-player">
                  <ReactPlayer url={videoUrl} className="frame-adjustment" />
                </div>
                <p className={`${bgColor} title`}>{title}</p>
                <div className={`${bgColor} main-con`}>
                  <div className={`${bgColor} con`}>
                    <div className={`${bgColor} time`}>
                      <p className={`${bgColor} video-item-sub`}>
                        {viewCount} views .{' '}
                      </p>
                      <p className={`${bgColor} video-item-sub`}>
                        {publishedAt}
                      </p>
                    </div>
                    <div className="{bgColor} likes">
                      <button
                        type="button"
                        className={`${isLikedBtn}`}
                        onClick={this.isLiked}
                      >
                        <AiOutlineLike className="like-reaction" /> Like
                      </button>
                      <button
                        type="button"
                        className={`${isNotLikedBtn}`}
                        onClick={this.isNotLiked}
                      >
                        <AiOutlineDislike className="like-reaction" /> Dislike
                      </button>
                      <button
                        type="button"
                        onClick={saveVideoBtn}
                        className={
                          isSaved
                            ? 'video-item-reaction-save'
                            : 'video-item-like'
                        }
                      >
                        <FaRegSave className="like-reaction" />
                        {isSaved ? 'Saved' : 'Save'}
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="channel-Details">
                  <img
                    src={profileImageUrl}
                    className="channel-logo"
                    alt="channel logo"
                  />
                  <div>
                    <p className={`name ${colors} ${bgColor}`}>{name}</p>
                    <p className={`s-count-vi ${colors} ${bgColor}`}>
                      {subscriberCount} subscribers
                    </p>
                  </div>
                </div>
                <p className={`${bgColor} descc`}>{description}</p>
              </div>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderFailureView = () => (
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
            <>
              <img src={imageUrl} alt="" />
              <h1 className={`${colors}`}>Oops! Something Went Wrong</h1>
              <p className={`${colors}`}>
                We are having some trouble completing your request
              </p>
              <p className={`${colors}`}>Please try again</p>
              <button type="button" className="btn-retry">
                Retry
              </button>
            </>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="video-item-details-loading-view">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    return (
      <>
        <div className="getviews-video-details">{this.getViews()}</div>
      </>
    )
  }
}

export default withRouter(VideoItemDetails)
