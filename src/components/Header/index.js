import {Link, withRouter} from 'react-router-dom'

import {BsBrightnessHigh} from 'react-icons/bs'
import {BsMoon} from 'react-icons/bs'

import Cookies from 'js-cookie'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, changeTheme} = value
      const onChangeTheme = () => {
        changeTheme(isDark)
      }

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const bgContainerClassName = isDark ? 'bg-dark' : 'bg-light'
      const txtBg = isDark ? 'txt-light' : 'txt-dark'
      const nxtWatchLogo = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      return (
        <div className={`${bgContainerClassName} hh-bg-container`}>
          <ul className={`header-bg-container ${bgContainerClassName}`}>
            <li className={`${bgContainerClassName}`}>
              <Link to="/" className="header-text-decor">
                <img
                  src={nxtWatchLogo}
                  alt="website logo"
                  className="logo-image"
                />
              </Link>
            </li>
            <li className={`card-container ${txtBg} ${bgContainerClassName}`}>
              <button
                type="button"
                onClick={onChangeTheme}
                data-testid="theme"
                className="change-theme-btn"
              >
                {isDark ? (
                  <BsBrightnessHigh className="bg-dark" />
                ) : (
                  <BsMoon className="bg-light" />
                )}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="header-profile-image"
              />
              <button
                type="button"
                className="logout-button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)
export default withRouter(Header)
