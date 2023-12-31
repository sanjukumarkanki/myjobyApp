import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import {ImCancelCircle} from 'react-icons/im'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutJobItem extends Component {
  state = {
    jobDataDetails: [],
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  onSubmitForm = e => {
    e.preventDefault()
  }

  // eslint-disable-next-line no-unused-vars
  getJobData = async props => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const optionsJobData = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const responseJobData = await fetch(jobDetailsApiUrl, optionsJobData)
    if (responseJobData.ok === true) {
      const fetchedJobData = await responseJobData.json()
      const updatedJobDetailsData = [fetchedJobData.job_details].map(
        eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          companyWebsiteUrl: eachItem.company_website_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          lifeAtCompany: {
            description: eachItem.life_at_company.description,
            imageUrl: eachItem.life_at_company.image_url,
          },
          location: eachItem.location,
          packagePerAnnum: eachItem.package_per_annum,
          rating: eachItem.rating,
          skills: eachItem.skills.map(eachSkill => ({
            imageUrl: eachSkill.image_url,
            name: eachSkill.name,
          })),
          title: eachItem.title,
        }),
      )

      const updatedSimilarJobDetails = fetchedJobData.similar_jobs.map(
        eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          employmentType: eachItem.employment_type,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        }),
      )
      this.setState({
        jobDataDetails: updatedJobDetailsData,
        similarJobsData: updatedSimilarJobDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  // The below code will render when  api status is sccess

  renderJobDetailsSuccessView = () => {
    const {jobDataDetails, similarJobsData} = this.state
    if (jobDataDetails.length >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        // eslint-disable-next-line no-unused-vars
        id,
        jobDescription,
        lifeAtCompany,
        location,
        packagePerAnnum,
        rating,
        skills,
        title,
      } = jobDataDetails[0]
      return (
        <>
          <div className="job-item-container">
            <div className="first-part-container">
              <div className="img-title-container">
                <img
                  className="company-logo"
                  src={companyLogoUrl}
                  alt="job details company logo"
                />
                <div className="title-rating-container">
                  <h1 className="title-heading">{title}</h1>
                  <div className="star-rating-container">
                    <AiFillStar className="star-icon" />
                    <p className="rating-text">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="location-package-container">
                <div className="location-job-type-container">
                  <div className="location-icon-location-container">
                    <MdLocationOn className="location-icon" />
                    <p className="location">{location}</p>
                  </div>
                  <div className="employment-type-icon-employment-type-container">
                    <p className="job-type">{employmentType}</p>
                  </div>
                </div>
                <div className="package-container">
                  <p className="package">{packagePerAnnum}</p>
                </div>
              </div>
            </div>
            <hr className="item-hr-line" />
            <div className="second-part-container">
              <div className="description-visit-container">
                <h1 className="description-job-heading">Description</h1>
                <a className="visit-anchor" href={companyWebsiteUrl}>
                  Visit <BiLinkExternal />
                </a>
              </div>
              <p className="description-para">{jobDescription}</p>
            </div>
            <h1>Skills</h1>
            <ul className="ul-job-details-container">
              {skills.map(eachItem => (
                <li className="li-job-details-container" key={eachItem.name}>
                  <img
                    className="skill-img"
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                  />
                  <p>{eachItem.name}</p>
                </li>
              ))}
            </ul>
            <div className="company-life-img-container">
              <div className="life-heading-para-container">
                <h1>Life at Company</h1>
                <p>{lifeAtCompany.description}</p>
              </div>
              <img src={lifeAtCompany.imageUrl} alt="life at company" />
            </div>

            <br />

            {/* This button opens react popup */}
            <div className="popup-container">
              <Popup
                modal
                trigger={
                  <button type="button" className="apply-button">
                    Apply Now
                  </button>
                }
              >
                {/* The popup close Content */}
                {close => (
                  <div className="popup-description-container">
                    <button
                      type="button"
                      className="trigger-button"
                      onClick={() => close()}
                    >
                      <ImCancelCircle style={{height: '50px', width: '50px'}} />
                    </button>
                    <br />
                    <br />
                    <div className="job-item-container">
                      <div className="first-part-container">
                        <div className="img-title-container">
                          <img
                            className="company-logo"
                            src={companyLogoUrl}
                            alt="job details company logo"
                          />
                          <div className="title-rating-container">
                            <h1 className="title-heading">{title}</h1>
                            <div className="star-rating-container">
                              <AiFillStar className="star-icon" />
                              <p className="rating-text">{rating}</p>
                            </div>
                          </div>
                        </div>
                        <div className="location-package-container">
                          <div className="location-job-type-container">
                            <div className="location-icon-location-container">
                              <MdLocationOn className="location-icon" />
                              <p className="location">{location}</p>
                            </div>
                            <div className="employment-type-icon-employment-type-container">
                              <p className="job-type">{employmentType}</p>
                            </div>
                          </div>
                          <div className="package-container">
                            <p className="package">{packagePerAnnum}</p>
                          </div>
                        </div>
                      </div>

                      <br />
                      {/* On Apply Job Details */}
                      <form className="popup-form-container">
                        {/* User Name Input */}
                        <div>
                          <label htmlFor="name">Name</label>
                          <br />
                          <input
                            type="text"
                            required
                            placeholder="Enter Applicant Name"
                          />
                        </div>

                        <br />
                        {/* User Email Input */}
                        <div>
                          <label htmlFor="name">Name</label>
                          <br />
                          <input
                            type="email"
                            required
                            placeholder="Enter Applicant E-Mail"
                          />
                        </div>

                        <br />
                        {/* User Resume Upload Input */}
                        <div>
                          <input
                            type="file"
                            name="foo"
                            required
                            accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                          />
                        </div>

                        <br />
                        {/* User Cover Letter Input */}
                        <div>
                          <label htmlFor="name">Name</label>
                          <textarea rows="8" cols="7" required>
                            Write A Cover Letter
                          </textarea>
                        </div>

                        <br />
                        {/* Form submit Button */}
                        <button
                          type="submit"
                          onSubmit={this.onSubmitForm}
                          style={{width: '90%'}}
                          className="apply-button"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>

          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-ul-container">
            {similarJobsData.map(eachItem => (
              <SimilarJobs
                key={eachItem.id}
                similarJobData={eachItem}
                employmentType={employmentType}
              />
            ))}
          </ul>
        </>
      )
    }
    return null
  }

  // When the api staus gets fail and so there is need a refresh code and here the code

  onRetryJobDetailsAgain = () => {
    this.getJobData()
  }

  // The below code will render when  api status is failed, this can happend with bad internet conncetion
  // so we provide a network lost image for user experience

  renderJobFailureView = () => (
    <div className="job-details-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for.</p>
      <div className="btn-container-failure">
        <button
          className="failure-jod-details-btn"
          type="button"
          onClick={this.onRetryJobDetailsAgain}
        >
          retry
        </button>
      </div>
    </div>
  )

  // The below code will render when  api status in the form of loading

  renderJobLoadingView = () => (
    <div className="job-details-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // The below code will render according to the api status

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-view-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default AboutJobItem
