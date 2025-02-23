import { useEffect, useState } from "react";
function Header() {
  const [homeIcon, setHomeIcon] = useState('IPL Fantasy')
  const [homeIncoURL, setHomeIncoURL]= useState('/')

  // let homeIcon = "IPL Fantasy";
  // let homeIncoURL = "/";

  const [firstNavIcon, setFirstNavIcon] = useState('')
  const [firstNavIconURL, setFirstNavIconURL] = useState('')

  // let firstNavIcon = "";
  // let firstNavIconURL = "";

  const [secondNavIcon, setSecondNavIcon] = useState('')
  const [secondNavIconURL, setSecondNavIconURL] = useState('')

  // let secondNavIcon = "";
  // let secondNavIconURL = "";

  const [thirdNavIcon, setThirdNavIcon] = useState('Login')
  const [thirdNavIconURL, setThirdNavIconURL] = useState('/login')

  // let thirdNavIcon = "Login";
  // let thirdNavIconURL = "/login";

  const [fourthNavIcon, setFourthNavIcon] = useState('Signup')
  const [fourthNavIconURL, setFourthNavIconURL] = useState('/Signup')

  const [fifthNavIcon, setFifthNavIcon] = useState('')
  const [fifthNavIconURL, setFifthNavIconURL] = useState('/Signup')


  // let fourthNavIcon = "Signup";
  // let fourthNavIconURL = "/signup";
  // let loggedInUser = false

  const [loggedInUser, setLoggedInUser]= useState(false)

  useEffect(() => {
  if (
    localStorage.getItem("token") &&
    localStorage.getItem("token") != "undefined"
  ) {
    setLoggedInUser(true)
    // homeIcon = "IPL Fantasy";
    // homeIncoURL = "/";
    setHomeIcon("IPL Fantasy")
    //setHomeIncoURL('/')
    setHomeIncoURL('/series')

    setFirstNavIcon("Games")
    setFirstNavIconURL("/games")

    setSecondNavIcon("Teams")
    setSecondNavIconURL("/teams")

    setThirdNavIcon("Series")
    setThirdNavIconURL("/series")

    setFourthNavIcon("Logout")
    setFourthNavIconURL(`/logout?t=${localStorage.getItem("token")}`)

    setFifthNavIcon("")
    setFifthNavIconURL(``)
    // firstNavIcon = "Games";
    // firstNavIconURL = "/games";
    // secondNavIcon = "Teams";
    // secondNavIconURL = "/teams";
    // thirdNavIcon = "Series";
    // thirdNavIconURL = "/series";
    // fourthNavIcon = "Logout";
    // fourthNavIconURL = `/logout?t=${localStorage.getItem("token")}`;
  }
  },[loggedInUser, homeIcon, firstNavIcon])

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href={homeIncoURL}>
            {homeIcon}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {
                loggedInUser ? <a className="nav-link active" aria-current="page" href={firstNavIconURL}>{firstNavIcon}</a>
                : <></>
              }
              {
                loggedInUser ? <a className="nav-link active" href={secondNavIconURL}>
                {secondNavIcon}
              </a> : <></>
              }
              {
                loggedInUser ? <a className="nav-link active" href={fifthNavIconURL}>
                {fifthNavIcon}
              </a> : <></>
              }
              <a className="nav-link active" href={thirdNavIconURL}>
                {thirdNavIcon}
              </a>
              <a className="nav-link active" href={fourthNavIconURL}>
                {fourthNavIcon}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
