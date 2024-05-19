// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-grid.css';
import "./App.css";
import ScrollToTopButton from "./ScrollToTopButton"; // 引入返回顶部按钮组件

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        {/* 你的其他组件 */}
        <ScrollToTopButton />
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container" id="first-row">
          <div className="row">
            <h1 className="navbar-brand" id="name">
              Zhenhao Yang
            </h1>
          </div>
          <div className="row">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#About">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#Experience">
                    Experience
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#Skills">
                    Skills
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#Education">
                    Education
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row" id="row1">
          <div className="col-12" id="About">
            About
          </div>
          <div className="row" id="row-content">
            <div className="col clearfix" id="about-content">
              <img
                src="portrait.png"
                className="image-fluid float-end"
                id="portrait"
                alt="pic"
              />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row" id="row2">
          <div className="col-12" id="Experience">
            Experience
          </div>
          <div className="row" id="experience-content">
            <ul className="col-2 jd">
              <li className="des">Company Name:</li>
              <li className="des">Location:</li>
              <li className="des">Duration:</li>
              <li className="des">Job Title:</li>
            </ul>
            <div className="col-2 c">
              <li className="des">Provigo</li>
              <li className="des">Kirkland</li>
              <li className="des">2022-Present</li>
              <li className="des">Clerk</li>
            </div>

            <div className="col-2 jd text-wrap">Job Description</div>
            <div className="col-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
