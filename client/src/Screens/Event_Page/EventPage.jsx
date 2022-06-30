import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./eventPage.css";

import { useTranslation } from "react-i18next";

function EventPage() {
  const [inputState, setInputState] = useState("");
  const [commentsState, setCommentsState] = useState(["comment"]);
  const [eventInfo, setEventInfo] = useState({});

  const ref = useRef();
  const Holiday = () => {
    return( 
    <div>
      <h2 className="holidayTitle ui header">{Object.keys(eventInfo).length > 0 && eventInfo.name}</h2>
    </div>
    );
}

  useEffect(() => {
    setEventInfo(location.state.events[0]);
  }, []);


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
          <img className="ui big rounded image" src={Object.keys(eventInfo).length > 0 && eventInfo.image} alt="" />
        </div>
      </div>
    );
  };

  const Description = () => {
    return (
      <div className="holidayDescription">
        <div class="ui raised segment">
          <p>{Object.keys(eventInfo).length > 0 && eventInfo.description}</p>
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

export default EventPage;
