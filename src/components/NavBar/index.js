import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {MdSave} from 'react-icons/md'

import ThemeContext from '../../context/ThemeContext'
import './index.css'

const NavBar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark} = value
      const setBgColorText = isDark ? 'bg-dark' : 'bg-light'
      return (
        <div className={`bg-navbar-1 ${setBgColorText}`}>
          <div className={`${setBgColorText} bg-navbar`}>
            <ul className={`bg-navbar ${setBgColorText} navbar-unordered-list`}>
              <li className={`${setBgColorText}`}>
                <Link
                  to="/"
                  className={`nav-link-text-decor ${setBgColorText}`}
                >
                  <IoMdHome className="nav-react-icon-redirect" />
                  <p className="nav-link-redirect">Home</p>
                </Link>
              </li>
              <li className={`${setBgColorText}`}>
                <Link
                  to="/trending"
                  className={`nav-link-text-decor ${setBgColorText}`}
                >
                  <FaFire className="nav-react-icon-redirect" />
                  <p className="nav-link-redirect">Trending</p>
                </Link>
              </li>
              <li className={`${setBgColorText}`}>
                <Link
                  to="/gaming"
                  className={`nav-link-text-decor ${setBgColorText}`}
                >
                  <SiYoutubegaming className="nav-react-icon-redirect" />
                  <p className="nav-link-redirect">Gaming</p>
                </Link>
              </li>
              <li className={`${setBgColorText}`}>
                <Link
                  to="/saved-videos"
                  className={`nav-link-text-decor ${setBgColorText}`}
                >
                  <MdSave className="nav-react-icon-redirect" />
                  <p className="nav-link-redirect">Saved videos</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className={`bg-navbar ${setBgColorText}`}>
            <p>CONTACT US</p>
            <div className="connect">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="connect-logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="connect-logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="connect-logo"
              />
            </div>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default NavBar
