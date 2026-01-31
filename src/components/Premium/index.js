import {BsX} from 'react-icons/bs'
import {withRouter} from 'react-router-dom'
import './index.css'

const Premium = props => {
  const {showPremiumAd} = props
  const redirectGet = () => {
    const {history} = props
    history.push('/Not-Found')
  }
  const premiumAd = () => {
    showPremiumAd()
  }
  return (
    <div data-testid="banner" className="bg-containerr">
      <div className="premium-logo-close-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="theme"
          className="premium-logo-image"
        />
        <button
          type="button"
          data-testid="close"
          className="premium-close-btn"
          onClick={premiumAd}
        >
          <BsX className="premium-close-react-icon" />
        </button>
      </div>
      <p className="premium-para">
        Buy Nxt Watch Premium prepaid plans with UPI
      </p>
      <button type="button" className="premium-button" onClick={redirectGet}>
        GET IT NOW
      </button>
    </div>
  )
}

export default withRouter(Premium)
