import './App.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

const PasswordItems = props => {
  const {passWordDetails, checkedIs, onDeletePasswordCard} = props
  const {id, websiteName, userName, userPassword} = passWordDetails
  const diaplayPassword = checkedIs ? (
    <p className="show-psd-text">{userPassword}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars"
    />
  )
  const onClickDelete = () => {
    onDeletePasswordCard(id)
  }
  return (
    <li className="password-card">
      <div className="card-3">
        <p className="container-first-letter">A</p>
        <div>
          <p className="text">{websiteName}</p>
          <p className="show-psd-text">{userName}</p>
          {diaplayPassword}
        </div>
      </div>
      <button
        type="button"
        className="dlt-btn"
        onClick={onClickDelete}
        data-testid="delete"
      >
        <img
          className="dlt-icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

class PasswordManager extends Component {
  state = {
    CommentsList: [],
    websiteName: '',
    userName: '',
    userPassword: '',
    checkedIs: false,
    searchInput: '',
  }

  addPasswords = event => {
    event.preventDefault()
    const {websiteName, userName, userPassword} = this.state
    const newPasswordIs = {
      id: uuidv4(),
      websiteName,
      userPassword,
      userName,
    }

    this.setState(prevState => ({
      CommentsList: [...prevState.CommentsList, newPasswordIs],
      websiteName: '',
      userPassword: '',
      userName: '',
    }))
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  UserPasswordIs = event => {
    this.setState({userPassword: event.target.value})
  }

  WebsiteNameIs = event => {
    this.setState({websiteName: event.target.value})
  }

  UserNameIs = event => {
    this.setState({userName: event.target.value})
  }

  getHidePassword = () => {
    this.setState(prevState => ({checkedIs: !prevState.checkedIs}))
  }

  onDeletePasswordCard = id => {
    const {CommentsList} = this.state
    const filteredListDetails = CommentsList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({CommentsList: filteredListDetails})
  }

  render() {
    const {CommentsList, checkedIs, searchInput} = this.state
    const filteredNames = CommentsList.filter(eachItem =>
      eachItem.websiteName.includes(searchInput),
    )
    const Count = CommentsList.length
    return (
      <div className="cards-container">
        <div className="password-submit-container">
          {/* <div className="image-is-card"></div> */}
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />

          <form
            className="form-enter-password-container"
            onSubmit={this.addPasswords}
          >
            <h1 className="title-name">Add New Password</h1>
            <div className="input-cards">
              <img
                className="web-icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input-text-tab"
                onChange={this.WebsiteNameIs}
              />
            </div>
            <div className="input-cards">
              <img
                className="web-icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input-text-tab"
                onChange={this.UserNameIs}
              />
            </div>
            <div className="input-cards">
              <img
                className="web-icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input-text-tab"
                onChange={this.UserPasswordIs}
              />
            </div>
            <div className="button-card">
              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
          </form>
        </div>

        <div className="passwords-display-container">
          <div className="your-psd-srh-container">
            <div className="card">
              <h1 className="text">Your Passwords</h1>
              <p className="counter">{Count}</p>
            </div>

            <div className="input-container">
              <img
                className="dlt-search-icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                className="input-search"
                type="search"
                onChange={this.updateSearchInput}
              />
            </div>
          </div>
          <div className="card-2">
            <input
              id="checkbox"
              type="checkbox"
              onClick={this.getHidePassword}
            />
            <label htmlFor="checkbox" className="show-psd-text">
              Show passwords
            </label>
          </div>
          <ul className="password-card-ul-card">
            {filteredNames.length === 0 ? (
              <div className="img-none-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords-img"
                />
                <p className="paragraph">No Passwords</p>
              </div>
            ) : (
              filteredNames.map(eachItem => (
                <PasswordItems
                  passWordDetails={eachItem}
                  key={eachItem.id}
                  checkedIs={checkedIs}
                  onDeletePasswordCard={this.onDeletePasswordCard}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}
const App = () => (
  <div className="app-container">
    <div className="img-card">
      <img
        className="password-img-icon"
        src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        alt="app logo"
      />
    </div>
    <PasswordManager />
  </div>
)

export default App
