// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {reposeDetails} = props
  const {
    id,
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = reposeDetails
  return (
    <div className="repo-container">
      <img src={avatarUrl} alt={name} className="avatar-url" />
      <h1 className="name">{name}</h1>
      <div className="counts-main-container">
        <div className="counts-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="stars-image"
          />
          <p className="count">{starsCount} stars</p>
        </div>
        <div className="counts-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="stars-image"
          />
          <p className="count">{forksCount} forks</p>
        </div>
        <div className="counts-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="stars-image"
          />
          <p className="count">{issuesCount} open issues</p>
        </div>
      </div>
    </div>
  )
}

export default RepositoryItem
