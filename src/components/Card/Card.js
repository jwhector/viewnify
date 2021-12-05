import React from "react";

export default function Card(props) {
    /* PROPS
        idx
        complementary
        images
        media { backdrop, title, (((release data))), (((rating))), overview }
        bgColor
    */

  return (
    <>
        {/* <div className="card"> */}
          <div
            className="media-main media-B back"
            style={{ boxShadow: `4px 4px 8px ${props.complementary}` }}
          >
            <div className="content-gradient-overlay" />
            <div className="content-img">
              <img className="cur-content-img" src={props.images[bIdx]} />
            </div>
            <div className="content-description hidden">
              <img
                className="content-background"
                src={props.media[bIdx]?.backdrop}
              />
              <div className="content-title">
                <h2>{props.media[bIdx]?.title}</h2>
              </div>
              <div
                className="media-a-info"
                style={{
                  background: `linear-gradient(180deg, ${props.bgColor} 0%, transparent 3%)`,
                }}
              >
                <div className="release-rating">
                  <p className="release-date">
                    Release Date: {props.media[bIdx]?.release_date}
                  </p>
                  <p className="rating">Rating: {props.media[bIdx]?.rating}</p>
                </div>
                <p>{props.media[bIdx]?.overview}</p>
              </div>
            </div>
            <div className="bottom-border"></div>
          </div>
          {/* <div
            className="media-main media-A front"
            style={{ boxShadow: `4px 4px 8px ${props.complementary}` }}
          >
            <div className="content-gradient-overlay" />
            <div className="content-img ">
              <img className="cur-content-img" src={props.images[aIdx]} />
            </div>
            <div className="content-description hidden">
              <img
                className="content-background"
                src={props.media[aIdx]?.backdrop}
              />
              <div className="content-title">
                <h2>{props.media[aIdx]?.title}</h2>
              </div>
              <div
                className="media-a-info"
                style={{
                  background: `linear-gradient(180deg, ${props.bgColor} 0%, transparent 3%)`,
                }}
              >
                <div className="release-rating">
                  <p className="release-date">
                    Release Date: {props.media[aIdx]?.release_date}
                  </p>
                  <p className="rating">Rating: {props.media[aIdx]?.rating}</p>
                </div>
                <p>{props.media[aIdx]?.overview}</p>
              </div>
            </div>
            <div className="bottom-border" />
          </div>
          <div className="btn-container">
            <div className="pause-btn">
              <div className="bar-container">
                <div className="pause-bars"></div>
                <div className="pause-bars"></div>
              </div>
            </div>
            <div className="play-btn">
              <img className="play-img" src={playIco} />
              <div className="btn-background"></div>
            </div>
          </div>

          <div className="watch-container"></div> */}
        {/* </div> */}
        {/* <div
          id="play-pause"
          style={{ boxShadow: `4px 4px 8px ${props.complementary}` }}
        >
          <div id="play-btn" onClick={saveDislike}>
            <img className="discover-btn pause-ico" src={pauseIco} />
          </div>
          <div id="play-btn" onClick={saveLike}>
            <img className="discover-btn play-ico" src={playIco} />
          </div>
        </div> */}
    </>
  );
}
