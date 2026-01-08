import {Link} from 'react-router-dom'
import './index.css'

const TrendVideo = props => {
  const {trendingVideo} = props
  const {id, title, thumbnailUrl, viewCount, publishedAt, channel} =
    trendingVideo
  const {name} = channel
  return (
    <Link to={`/videos/${id}`} className="linker-trending">
      <li className="trend-container">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="t-thumbnail-image"
        />
        <div className="text-container">
          <p className="t-title-name">{title}</p>
          <p className="channel-name">{name}</p>
          <div className="viewers">
            <p className="t-published">{viewCount} views . </p>
            <p className="t-published"> {publishedAt}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default TrendVideo
