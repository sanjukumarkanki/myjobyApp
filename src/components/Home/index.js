import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onRedirectToJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-description-container">
          <h1 className="home-heading">
            Find The Job That <br />
            Fits Your Life
          </h1>
          <p className="home-paragraph">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link className="retry-btn-link" to="/jobs">
            <button
              className="home-jobs-button"
              type="button"
              onClick={onRedirectToJobs}
            >
              Find Jobs
            </button>
          </Link>
        </div>

        <img
          className="img-icon"
          alt="home thumbnail"
          src="https://cdni.iconscout.com/illustration/premium/thumb/modern-workspace-workplace-with-desk-and-business-people-2952672-2482386.png"
        />
      </div>
    </>
  )
}

export default Home
