// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {filterItem, onChangeFilterItem, isTabActive} = props
  const {id, language} = filterItem
  const onClickFilterItem = () => {
    onChangeFilterItem(id)
  }

  const activeClassName = isTabActive ? 'active-tab' : ''

  return (
    <li>
      <button
        type="button"
        className={`filter-item-button ${activeClassName}`}
        onClick={onClickFilterItem}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
