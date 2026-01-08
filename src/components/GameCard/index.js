import {Link} from 'react-router-dom'

import './index.css'

const GameCard = props => {
  const {game} = props
  const {id, title, thumbnailUrl, viewCount} = game

  return (
    <li className="list-item">
      <Link to={`/videos/${id}`} className="gaming-linker">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="gaming-image"
        />
        <p className="game-name">{title}</p>
        <p className="gaming-views">{viewCount} Watching Worldwide</p>
      </Link>
    </li>
  )
}

export default GameCard
