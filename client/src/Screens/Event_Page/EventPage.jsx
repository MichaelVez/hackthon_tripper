import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./eventPage.css";

import { useTranslation } from "react-i18next";

function EventPage() {
  const [inputState, setInputState] = useState("");
  const [commentsState, setCommentsState] = useState(["comment"]);
  const [ eventInfo, setEventInfo ] = useState({});

  const ref = useRef();
  const Holiday = ({ title }) => {
    return <h2 className="holidayTitle ui header">{Object.keys(eventInfo).length > 0 && eventInfo.title}</h2>;
  };

  useEffect(() => {
    setEventInfo(location.state.events[0]);
  }, []);


  const { t } = useTranslation();
  const Flag = () => {
    return (
      <div className="holidayFlag">
        <img src="https://c.tadst.com/gfx/n/fl/48/fi.png" alt="" />
      </div>
    );
  };
  const ImageComp = () => {
    return (
      <div class="ui segment">
        <div className="holidayImage">
          <img className="ui big rounded image" src={Object.keys(eventInfo).length > 0 && eventInfo.image} alt="" />
        </div>
      </div>
    );
  };

  const Description = () => {
    return (
      <div className="holidayDescription">
        {t("blog.event")}
        <p>{Object.keys(eventInfo).length > 0 && eventInfo.description}</p>
      </div>
    );
  };

  const LikeComponent = () => {
    return (
      <div className="ui labeled button" tabIndex="0">
        <div className="ui red button">
          <i className="heart icon"></i> Like
        </div>
        <a className="ui basic red left pointing label">1,048</a>
      </div>
    );
  };
  const handleChange = async (e) => {
    await setInputState(e.target.value);
    ref.current.focus();
  };
  const handleClick = async (e) => {
    console.log(inputState);
  };
  const BlogComp = () => {
    return (
      <div className="ui input holidayBlog">
        <div className="ui action input">
          <input
            type="text"
            onChange={handleChange}
            value={inputState}
            ref={ref}
            placeholder={t("blog.commentOnThis")}
          />
          <button className="ui button" onClick={handleClick}>
            Comment
          </button>
        </div>
      </div>
    );
  };
  const location = useLocation();
  // location.state ? console.log(location.state) : null;
  return (
    <div className="eventPage ui container">
      {/* <i className='finland flag' id='flags' /> */}
      <div className="row">
        <Flag />
        {/* <Holiday title={location.state ? location.state.event.title : ""} /> */}
      </div>
      <ImageComp />
      <Description />
      <LikeComponent />
      <BlogComp />
      {location.state ? console.log(location.state) : ""}
      {/* {location.state} */}
    </div>
  );
}

export default EventPage;
