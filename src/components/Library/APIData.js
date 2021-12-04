import React, { useEffect } from "react";
import axios from "axios";

export function LibraryData(props) {

    const apiKey = "3516458404b8ed5f73b3b631421314e1";

    const [images, setImages] = useEffect([]);

    const fetchImages = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate`).catch(err => console.log(err));

        if(response) {
            console.log("images", images);
            setImages(images);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);
    return <div>Hello World</div>;
}