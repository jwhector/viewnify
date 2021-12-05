import React from "react";
/* PROPS
    idx
    complementary
    images
    media { backdrop, title, (((release data))), (((rating))), overview }
    bgColor
    aOrB
    isFront
*/
export default function Card(props) {
  

  return (
    <div className={`media-main ${props.aOrB ? props.aOrB : ''} ${props.isFront ? 'front' : 'back'}`} style={{ boxShadow: `4px 4px 8px ${props.complementary}` }}>
        <div className="content-gradient-overlay" />
        <div className="content-img">
            <img className="cur-content-img" src={props.images[props.idx]} />
        </div>
        <div className="content-description hidden">
            <img className="content-background" src={props.media[props.idx]?.backdrop} />
            <div className="content-title">
                <h2 className="info-title">{props.media[props.idx]?.title}</h2>
            </div>
            <div className="media-a-info" style={{background: `linear-gradient(180deg, ${props.bgColor} 0%, transparent 3%)`,}}>
                <div className="release-rating card-info">
                <p className="release-date card-info">Release Date: {props.media[props.idx]?.release_date}</p>
                <p className="rating card-info">Rating: {props.media[props.idx]?.rating}</p>
                </div>
                <p className="card-info">{props.media[props.idx]?.overview}</p>
            </div>
        </div>
        <div className="bottom-border" />
    </div>
  );
}
