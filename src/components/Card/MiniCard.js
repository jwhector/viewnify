import React from "react";
/* PROPS
    complementary
    media { poster_path, backdrop, title, (((release data))), (((rating))), overview }
    bgColor
*/
export default function MiniCard(props) {
  return (
    <div className="mini-card">
        {/* <div className="content-gradient-overlay" /> */}
        <div className="mini-content-img">
            <img onClick={props.openModal} className="mini-cur-content-img" src={props.poster} />
        </div>
    </div>
  );
}
