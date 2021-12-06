import React, { useEffect, useRef } from "react";
import Hammer from 'hammerjs';
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
    const elem = useRef(null);

    useEffect(() => {
        let hammertimeTap;
        if (elem.current !== null) {
            hammertimeTap = handleTap();
        }
        return function clearHammer() {
            if(hammertimeTap) hammertimeTap.off('tap');
        }
    });

    function handleTap() {
        const el = elem.current;
        // console.log(el);
        var hammertimeTap = new Hammer(el);
        
        const imgEl = el.querySelector('.content-img');
        const descEl = el.querySelector('.content-description');
        const gradient = el.querySelector('.content-gradient-overlay');
        
        hammertimeTap.on('tap', function (e) {
            const isLeftClick = getCursorPosition(el, e);
            const isTopDesc = imgEl.classList.contains('hidden') && e.target.classList.contains('info-title') ? true : false;
            if (isLeftClick && !isTopDesc) {
                imgEl.classList.remove('hidden');
                descEl.classList.add('hidden');
                gradient.classList.remove('hidden');
            } else {
                imgEl.classList.add('hidden');
                descEl.classList.remove('hidden');
                gradient.classList.add('hidden');
            }
        });

        return hammertimeTap;
    }

    function getCursorPosition(el, event) {
        const rect = el.getBoundingClientRect()
        const x = event.center.x - rect.left
        if (x < rect.width / 2) {
            return true;
        } else {
            return false;
        }
    }
    
  return (
    <div className={`media-main ${props.aOrB ? props.aOrB : ''} ${props.isFront ? 'front' : 'back'}`} style={{ boxShadow: `4px 4px 8px ${props.complementary}` }} ref={elem}>
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
