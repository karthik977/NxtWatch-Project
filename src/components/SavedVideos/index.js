import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import NavBar from '../NavBar'
import './index.css'

const SavedVideos = () => {
  const getVideoSuccessView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark, savedVideos} = value

        const savedVideoview = savedVideos.length !== 0
        const bgThemeColor = isDark ? 'video-bg-dark' : 'video-bg-light'
        return (
          <div className={`${bgThemeColor} bg-svc-1`}>
            {savedVideoview && (
              <div className={`${bgThemeColor}`}>
                <h1 className="saved-videos-123">Saved Vidoes</h1>
                <ul className="saved-unordered">
                  {savedVideos.map(eachVideo => (
                    <li className="saved-video-sub" key={eachVideo.id}>
                      <Link
                        to={`/videos/${eachVideo.id}`}
                        className="saved-video-link"
                      >
                        <img
                          src={eachVideo.thumbnailUrl}
                          alt="thumbnail"
                          className="saved-thumbnail-image"
                        />

                        <div className={`${bgThemeColor}`}>
                          <p className="saved-title">{eachVideo.title}</p>

                          <div className={`${bgThemeColor} viewers-video`}>
                            <p className="viewer-video-count">
                              {eachVideo.viewCount} views
                            </p>
                            <p className="viewer-video-count">
                              {eachVideo.publishedAt}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className={`${bgThemeColor} saved-no-videos-11`}>
              {!savedVideoview && (
                <div className={`${bgThemeColor}  saved-empty-view`}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                    className="failure-vd-image"
                  />
                  <h1 className="failure-name">No Saved Videos Found</h1>
                  <p className="failure-descc">
                    You can save your videos while watching them.
                  </p>
                </div>
              )}
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const setTheme = isDark ? 'video-bg-dark' : 'video-bg-light'
        return (
          <div className={`${setTheme} saved-bg-container`}>
            <Header />
            <div className="saved-content-container">
              <NavBar className="saved-navbar" />
              <div className="saved-videos-container">
                <div className="display-saved-videos-ss">
                  {getVideoSuccessView()}
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default SavedVideos
