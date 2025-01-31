import React, { useState, useEffect, useRef } from "react";
import "./SpeedDial.css";
import { ReactComponent as ArrowIcon } from "./arrow-top-right-svgrepo-com.svg";
import { ReactComponent as IgIcon } from "./ig-icon.svg";
import { ReactComponent as LinkedinIcon } from "./linkedin-icon.svg";
// import { ReactComponent as PinterestIcon } from "./pinterest-icon.svg";
import { ReactComponent as YoutubeIcon } from "./youtube-icon.svg";

import { ReactComponent as LeftArrow } from "./arrow-left.svg";
import { ReactComponent as RightArrow } from "./arrow-right.svg";

import emailjs from "emailjs-com";
import AWS from 'aws-sdk';

// Configure AWS S3
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, // Replace with your access key
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY, // Replace with your secret key
  region: process.env.REACT_APP_AWS_REGION, // Replace with your region
});

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.REACT_APP_AWS_S3_BUCKET_NAME;; // Replace with your bucket name

// const sendEmailToAdmin = (formType, answers, questions, toEmail) => {
//   const formattedAnswers = questions.map((q, i) => `${q}: ${answers[i]}`).join('\n');
  
//   const templateParams = {
//     to_name: "NoFiltrSocial", // You can customize this
//     from_name: formType, // Using form type as the sender name
//     message: formattedAnswers, // This will show all Q&A in the message body
//     to_email: toEmail,
//     subject: `New message from ${answers[0]}`
//   };

//   return emailjs
//     .send(
//       process.env.REACT_APP_EMAILJS_SERVICE_ID, // Use environment variable
//       process.env.REACT_APP_EMAILJS_TEMPLATE_ID, // Use environment variable
//       templateParams,
//       process.env.REACT_APP_EMAILJS_USER_ID // Use environment variable
//     )
//     .then((response) => {
//       console.log("Email sent successfully:", response.status, response.text);
//       return response;
//     })
//     .catch((error) => {
//       console.error("Error sending email:", error);
//       throw error;
//     });
// };


const sendEmailToAdmin = (
  userName,
  userEmail,
  formType,
  answers,
  questions,
  toEmail
) => {
  const formattedAnswers = questions
    .map(
      (q, i) => `
      <div class="qa-item">
        <span class="question">${q}:</span>
        <div class="answer">${answers[i]}</div>
      </div>
    `
    )
    .join("");

  const templateParams = {
    to_name: "NoFiltrSocial", // The recipient's display name
    from_name: userName, // Sender's name
    message: formattedAnswers, // The formatted Q&A responses
    to_email: userEmail, // Sender's email address
    subject: `New message from ${userName} (${userEmail})`, // Includes name and email in the subject
    formType: formType, // Add form type here
  };

  return emailjs
    .send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
    .then((response) => {
      console.log("Email sent successfully:", response.status, response.text);
      return response;
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      throw error;
    });
};

const SpeedDial = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWorkFormVisible, setWorkFormVisible] = useState(false);
  const [isSignFormVisible, setSignFormVisible] = useState(false);
  const [currentWorkQuestionIndex, setCurrentWorkQuestionIndex] = useState(0);
  const [currentSignQuestionIndex, setCurrentSignQuestionIndex] = useState(0);
  const [workAnswers, setWorkAnswers] = useState(Array(5).fill(""));
  const [signAnswers, setSignAnswers] = useState(Array(5).fill(""));
  const workFormRef = useRef(null);
  const signFormRef = useRef(null);

  const workQuestions = [
    "Name",
    "Email ID",
    "Contact No.",
    "What's the piece of technology that you use?",
    "What's the most shocking/influential cultural moment, according to you?",
    "If you were an animal, which one would you be and why?",
    "One thing you don't want to change about the world?",
    "Explain your reel algorithm in emojis.",
    "Convince God to let you in heaven.",
    "Why Nofiltr?",

  ];

  const signQuestions = [
    "Name",
    "Email ID",
    "Contact No.",
    "Mention your platform handles.",
    "Write to us about your best day as a creator.",
    "If social media didn't exist, what other career or passion would you pursue?",
    "What is your dream collaboration?",
    "If at some point, you had to create your own brand- tell us what it would be about?",
    "Why Nofiltr?",
  ];

  useEffect(() => {
    // Ensure component is fully mounted before rendering content
    const timer = setTimeout(() => {
      setIsLoaded(true);
      console.log("SpeedDial component fully loaded");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSocialLinkClick = (url, e) => {
    e.preventDefault();
    if (isLoaded) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWorkAnswerChange = (e) => {
    const newAnswers = [...workAnswers];
    newAnswers[currentWorkQuestionIndex] = e.target.value;
    setWorkAnswers(newAnswers);
  };

  const handleSignAnswerChange = (e) => {
    const newAnswers = [...signAnswers];
    newAnswers[currentSignQuestionIndex] = e.target.value;
    setSignAnswers(newAnswers);
  };

  const nextWorkQuestion = () => {
    if (currentWorkQuestionIndex < workQuestions.length - 1) {
      setCurrentWorkQuestionIndex(currentWorkQuestionIndex + 1);
    } else {
      submitWorkAnswers();
    }
  };

  const nextSignQuestion = () => {
    if (currentSignQuestionIndex < signQuestions.length - 1) {
      setCurrentSignQuestionIndex(currentSignQuestionIndex + 1);
    } else {
      submitSignAnswers();
    }
  };

  const toggleWorkForm = () => {
    setWorkFormVisible(!isWorkFormVisible);
    setCurrentWorkQuestionIndex(0);
    setWorkAnswers(Array(10).fill(""));
  };

  const toggleSignForm = () => {
    setSignFormVisible(!isSignFormVisible);
    setCurrentSignQuestionIndex(0);
    setSignAnswers(Array(10).fill(""));
  };

  const handleWorkBack = () => {
    if (currentWorkQuestionIndex === 0) {
      toggleWorkForm();
    } else {
      setCurrentWorkQuestionIndex(currentWorkQuestionIndex - 1);
    }
  };

  const handleSignBack = () => {
    if (currentSignQuestionIndex === 0) {
      toggleSignForm();
    } else {
      setCurrentSignQuestionIndex(currentSignQuestionIndex - 1);
    }
  };

const submitWorkAnswers = async () => {
  try {
    const userName = workAnswers[0] || "Anonymous";
    const userEmail = workAnswers[1] || "No email provided";
    const userContact = workAnswers[2] || "No contact provided";

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Upload data to S3
    const sanitizedName = userName.toLowerCase().replace(/[^a-z0-9]/g, "_");
    const s3Params = {
      Bucket: BUCKET_NAME,
      Key: `work-answers/${sanitizedName}_work_with_us_${Date.now()}.json`,
      Body: JSON.stringify({
        timestamp: new Date().toISOString(),
        userName: userName,
        userEmail: userEmail,
        userContact: userContact,
        answers: workAnswers,
        questions: workQuestions,
      }),
      ContentType: "application/json",
    };

    await s3.upload(s3Params).promise();

    // Send email with new configuration
    await emailjs.send(
      "service_pv8k8ws", // New Work With Us Service ID
      "template_7pgih1y", // New Work With Us Template ID
      {
        to_name: "NoFiltrSocial",
        from_name: userName,
        message: workQuestions.map((q, i) => `${q}: ${workAnswers[i]}`).join('\n'),
        to_email: "acquisition@nofiltr.social", // New Work With Us email
        subject: `New Work With Us submission from ${userName}`,
        formType: "Work With Us Form",
      },
      "tmDpal9QNvSEFmy94" // New Work With Us User ID
    );

    setWorkFormVisible(false);
    setWorkAnswers(Array(workQuestions.length).fill(""));
    alert("Thank you for your submission!");
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Error submitting form. Please try again.");
  }
};

const submitSignAnswers = async () => {
  try {
    const userName = signAnswers[0] || "Anonymous";
    const userEmail = signAnswers[1] || "No email provided";
    const userContact = signAnswers[2] || "No contact provided";

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Upload data to S3
    const sanitizedName = userName.toLowerCase().replace(/[^a-z0-9]/g, "_");
    const s3Params = {
      Bucket: BUCKET_NAME,
      Key: `sign-answers/${sanitizedName}_sign_with_us_${Date.now()}.json`,
      Body: JSON.stringify({
        timestamp: new Date().toISOString(),
        userName: userName,
        userEmail: userEmail,
        userContact: userContact,
        answers: signAnswers,
        questions: signQuestions,
      }),
      ContentType: "application/json",
    };

    await s3.upload(s3Params).promise();

    // Send email with new configuration
    await emailjs.send(
      "service_slobtww", // New Sign With Us Service ID
      "template_ualcodn", // New Sign With Us Template ID
      {
        to_name: "NoFiltrSocial",
        from_name: userName,
        message: signQuestions.map((q, i) => `${q}: ${signAnswers[i]}`).join('\n'),
        to_email: "recruitment@nofiltr.social", // New Sign With Us email
        subject: `New Sign With Us submission from ${userName}`,
        formType: "Sign With Us Form",
      },
      "sS_hILyfFR8fyDuTH" // New Sign With Us User ID
    );

    setSignFormVisible(false);
    setSignAnswers(Array(signQuestions.length).fill(""));
    alert("Thank you for your submission!");
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Error submitting form. Please try again.");
  }
};

  const handleClickOutside = (event) => {
    if (
      workFormRef.current &&
      !workFormRef.current.contains(event.target) &&
      isWorkFormVisible
    ) {
      setWorkFormVisible(false);
    }
    if (
      signFormRef.current &&
      !signFormRef.current.contains(event.target) &&
      isSignFormVisible
    ) {
      setSignFormVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isWorkFormVisible, isSignFormVisible]);

  if (!isLoaded) {
    return <div className="center-contact">Loading...</div>;
  }

  return (
    <div className="center-contact">
      <div className="contact-container">
        <div className="contact-section">
          <h3>HR email</h3>
          <a
            href="mailto:hr@nofiltr.social"
            style={{
              WebkitTapHighlightColor: "transparent",
              display: "block",
            }}
          >
            hr@nofiltr.social
          </a>
        </div>

        <div className="contact-section address">
          <h3>NF address</h3>
          <div>
            1404, Lodha Supremus, Dr,
            <br />
            E Moses Road,
            <br />
            Worli Naka, Upper Worli,
            <br />
            Mumbai 400018
          </div>
        </div>

        <div className="contact-section policy-grid">
          {[
            ["POSH Policies", "https://nfs-speed-dial-policies.s3.us-east-1.amazonaws.com/NF+Posh+Policies.pdf"],
            ["Terms & Condition", "https://nfs-speed-dial-policies.s3.us-east-1.amazonaws.com/Terms+and+Conditions.pdf"],
            ["Privacy Policy", "https://nfs-speed-dial-policies.s3.us-east-1.amazonaws.com/Privacy+Policy.pdf"],
            ["Cookie Policy", "https://nfs-speed-dial-policies.s3.us-east-1.amazonaws.com/Cookie+Policy.pdf"]
          ].map(([displayName, url], index) => (
            <h3 key={index}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: "#ffffff",
                  WebkitTapHighlightColor: "transparent",
                  display: "block"
                }}
                onClick={(e) => {
                  if (!isLoaded) e.preventDefault();
                }}
              >
                {displayName}
              </a>
            </h3>
          ))}
        </div>

        <div className="contact-section">
          <h3>Social Media Links</h3>
          <div className="social-links">
            {[
              {
                icon: <IgIcon className="social-icon" />,
                text: "@nofiltr.group",
                url: "https://instagram.com/nofiltr.group",
              },
              {
                icon: <IgIcon className="social-icon" />,
                text: "@postoffice.nf",
                url: "https://instagram.com/postoffice.nf",
              },
              {
                icon: <LinkedinIcon className="social-icon" />,
                text: "NOFILTR.GROUP",
                url: "https://www.linkedin.com/company/nofiltr-social/",
              },
              {
                icon: <YoutubeIcon className="social-icon" />,
                text: "Nofiltr.Social",
                url: "https://www.youtube.com/@NofiltrSocial",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleSocialLinkClick(social.url, e)}
                style={{
                  WebkitTapHighlightColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {social.icon}
                {social.text}
              </a>
            ))}
          </div>
        </div>

        <div className="contact-section">
          <div className="action-buttons">
            <button
              className="work-with-us"
              onClick={() => isLoaded && toggleWorkForm()}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              Work with Us
              <ArrowIcon className="arrow-icon-speed-dial" />
            </button>
            <button
              className="sign-with-us"
              onClick={() => isLoaded && toggleSignForm()}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              Sign with Us
              <ArrowIcon className="arrow-icon-speed-dial" />
            </button>
          </div>
        </div>

        {isWorkFormVisible && (
          <div className="slide-in-form" ref={workFormRef}>
            <h3 className="form-header">Work With Us</h3>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    ((currentWorkQuestionIndex + 1) / workQuestions.length) *
                    100
                  }%`,
                }}
              />
            </div>
            <p className="form-questions">
              {workQuestions[currentWorkQuestionIndex]}
            </p>
            <input
              type="text"
              placeholder="Type your answer here"
              value={workAnswers[currentWorkQuestionIndex]}
              onChange={handleWorkAnswerChange}
              required
            />
            <div className="form-buttons">
              <button
                type="button"
                className="back-button"
                onClick={handleWorkBack}
              >
                <LeftArrow className="button-arrow" />
                Back
              </button>
              <button
                type="button"
                className="next-button"
                onClick={nextWorkQuestion}
              >
                {currentWorkQuestionIndex === workQuestions.length - 1
                  ? "Submit"
                  : "Next"}
                <RightArrow className="button-arrow" />
              </button>
            </div>
          </div>
        )}

        {isSignFormVisible && (
          <div className="slide-in-form" ref={signFormRef}>
            <h3 className="form-header">Sign With Us</h3>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    ((currentSignQuestionIndex + 1) / signQuestions.length) *
                    100
                  }%`,
                }}
              />
            </div>
            <p className="form-questions">
              {signQuestions[currentSignQuestionIndex]}
            </p>
            <input
              type="text"
              placeholder="Type your answer here"
              value={signAnswers[currentSignQuestionIndex]}
              onChange={handleSignAnswerChange}
              required
            />
            <div className="form-buttons">
              <button
                type="button"
                className="back-button"
                onClick={handleSignBack}
              >
                <LeftArrow className="button-arrow" />
                Back
              </button>
              <button
                type="button"
                className="next-button"
                onClick={nextSignQuestion}
              >
                {currentSignQuestionIndex === signQuestions.length - 1
                  ? "Submit"
                  : "Next"}
                <RightArrow className="button-arrow" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedDial;
