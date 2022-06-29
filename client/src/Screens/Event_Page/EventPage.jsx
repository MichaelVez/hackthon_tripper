import React from "react";
import "./eventPage.css";
function EventPage() {
  const Holiday = () => {
    return (
      <h2 className='holidayTitle ui header'>New Year's Day in Finland</h2>
    );
  };
  const Flag = () => {
    return (
      <div className='holidayFlag'>
        <img src='https://c.tadst.com/gfx/n/fl/48/fi.png' alt='' />
      </div>
    );
  };
  const ImageComp = () => {
    return (
      <div className='holidayImage'>
        <img
          className='ui medium rounded image'
          src='https://c.tadst.com/gfx/750w/fireworks-in-the-sky.jpg'
          alt=''
        />
      </div>
    );
  };
  const Description = () => {
    return (
      <div className='holidayDescription'>
        Event Description:
        <p>
          New Year's Day, which is on January 1, marks the start of the year in
          the Gregorian calendar and it's a public holiday in many countries.
          Count down to the New Year, no matter where you are.
        </p>
      </div>
    );
  };
  const Comments = () => {
    return <div className='holidayComments'>{}</div>;
  };
  const BlogComp = () => {
    return (
      <div className='ui input holidayBlog'>
        <div className='ui action input'>
          <input type='text' placeholder='Comment on this' />
          <button className='ui button'>Comment</button>
        </div>
        <div className='ui labeled button' tabindex='0'>
          <div className='ui red button'>
            <i className='heart icon'></i> Like
          </div>
          <a className='ui basic red left pointing label'>1,048</a>
        </div>
      </div>
    );
  };
  return (
    <div className='eventPage ui container'>
      {/* <i className='finland flag' id='flags' /> */}
      <div className='row'>
        <Flag />
        <Holiday />
      </div>
      <ImageComp />
      <Description />
      <BlogComp />
      <Comments />
    </div>
  );
}

export default EventPage;
