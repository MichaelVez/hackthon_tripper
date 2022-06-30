import React, { Fragment, useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./eventPage.css";

import { useTranslation } from "react-i18next";
import { userComment, allCommentsPerEvent } from "../../api/comment.api";
import { appContext } from "../../context/appContext";
import i18next from "i18next";
import { translateText } from "../../utils/utils";

function EventPage() {
  const [inputState, setInputState] = useState("");
  const [commentsState, setCommentsState] = useState([]);
  const [eventInfo, setEventInfo] = useState({});
  const { token } = useContext(appContext);

  const ref = useRef();
  const Holiday = () => {
    return (
      <div>
        <h2 className="holidayTitle ui header">
          {Object.keys(eventInfo).length > 0 && eventInfo.name}
        </h2>
      </div>
    );
  };

  useEffect(() => {
    setEventInfo(location.state.events[0]);
  }, []);

  useEffect(() => {
    if (Object.keys(eventInfo).length > 0) {
      const allComments = async () => {
        const comments = await allCommentsPerEvent(eventInfo._id);
        setCommentsState(comments);
        console.log(comments);
      };
      allComments();
    }
  }, [eventInfo]);

  const generateComments = () => {
    return commentsState.map((comment) => {
      return (
        <Fragment key={comment._id}>
          <UserCOmment
            userName={comment.author}
            time={`Todat at ${Math.ceil(Math.random() * 10)}PM`}
            commentText={comment.text}
          />
        </Fragment>
      );
    });
  };


  const { t } = useTranslation();
  const Flag = () => {
    return (
      <div className="holidayFlag">
        <img src={location.state.flag && location.state.flag} alt="" />
      </div>
    );
  };

  const ImageComp = () => {
    return (
      <div class="ui segment">
        <div className="holidayImage">
          <img
            className="ui big rounded image"
            src={Object.keys(eventInfo).length > 0 && eventInfo.image}
            alt=""
          />
        </div>
      </div>
    );
  };

  const Description = () => {
    const [description, setDescription] = useState("");
    useEffect(() => {
      const translateDescription = async () => {
        const description = await translateText(
          eventInfo.description,
          i18next.language
        );
        setDescription(description);
      };
      translateDescription();
    }, [i18next.language]);

    return (
      <div className="holidayDescription">
        <div class="ui raised segment">
          <p>{Object.keys(eventInfo).length > 0 && description}</p>
        </div>
      </div>
    );
  };

  const LikeComponent = () => {
    return (
      <div className="ui labeled button" tabIndex="0">
        <div className="ui red button">
          <i className="heart icon"></i> Like
        </div>

        <a className="ui basic red left pointing label">
          {Math.floor(Math.random() * 1000)}
        </a>
      </div>
    );
  };

  const handleChange = async (e) => {
    await setInputState(e.target.value);
    ref.current.focus();
  };
  const handleClick = async (e) => {
    console.log(inputState);
    console.log(eventInfo);
    const comment = await userComment(
      eventInfo._id,
      { countryName: location.state.countryName, text: inputState },
      token
    );
    console.log(comment);
  };
  const BlogComp = () => {
    return (
      <>
        <div className="ui input holidayBlog">
          <div className="ui action input ">
            <input
              style={{ width: "50vw" }}
              type="text"
              onChange={handleChange}
              value={inputState}
              ref={ref}
              placeholder={t("blog.commentOnThis")}
            />
            <button className="ui button" onClick={handleClick}>
              {t("blog.comment")}
            </button>
          </div>
        </div>
        <div
          className="ui raised segment"
          style={{ width: "78%", margin: "auto" }}
        >
          <div className="ui big comments" style={{ margin: "auto" }}>
            <h3 className="ui dividing header">Comments</h3>

            {generateComments()}
            {/* <UserCOmment
              userName={"Shira"}
              time={"Yesterday at 11AM"}
              commentText={"Lovley people and amazing country, best event ever"}
            /> */}
          </div>
        </div>
      </>
    );
  };
  const location = useLocation();
  // location.state ? console.log(location.state) : null;
  return (
    <div className="eventPage ui container">
      {/* <i className='finland flag' id='flags' /> */}
      <div className="row">
        <Flag />
        <Holiday />
      </div>
      <ImageComp />
      <Description />
      <LikeComponent />
      <BlogComp />
      {/* {location.state} */}
    </div>
  );
}

function UserCOmment({ userName, time, commentText }) {
  return (
    <div
      className="comment"
      style={{ borderBottom: "1px solid rgba(34, 36, 38, 0.15)" }}
    >
      <div className="content">
        <a className="author">{userName}</a>
        <div className="metadata">
          <span className="date">{time}</span>
        </div>
        <div className="text">{commentText}</div>
      </div>
    </div>
  );
}

export default EventPage;
