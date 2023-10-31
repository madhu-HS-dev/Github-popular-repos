import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    languageList: [],
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getLanguages()
  }

  getLanguages = async () => {
    const {activeId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(repo => ({
        name: repo.name,
        id: repo.id,
        issuesCount: repo.issues_count,
        forksCount: repo.forks_count,
        starsCount: repo.stars_count,
        avatarUrl: repo.avatar_url,
      }))

      this.setState({
        languageList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeFilterItem = tabId => {
    this.setState({activeId: tabId}, this.getLanguages)
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {languageList} = this.state
    return (
      <ul className="repository-items-container">
        {languageList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} reposeDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Something Went Wrong</h1>
    </div>
  )

  renderRepositoryUserInterface = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return this.renderLoadingView()
    }
  }

  render() {
    const {activeId} = this.state
    return (
      <div className="popular-repo-container">
        <h1 className="popular-repo-heading">Popular</h1>
        <ul className="filter-items-list">
          {languageFiltersData.map(eachData => (
            <LanguageFilterItem
              key={eachData.id}
              filterItem={eachData}
              onChangeFilterItem={this.onChangeFilterItem}
              isTabActive={eachData.id === activeId}
            />
          ))}
        </ul>
        {this.renderRepositoryUserInterface()}
      </div>
    )
  }
}

export default GithubPopularRepos
