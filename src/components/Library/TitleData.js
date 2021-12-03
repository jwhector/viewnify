import { useEffect } from "react";

function libraryData() {
    const [title, setTitle] = useState([]);
    const [genre, setGenre] = useState([]);
    const [cover, setCover] = useState([]);
    const [overview, setOverview] = useState([]);
    const [popularity, setPopularity] = useState([]);
}

useEffect(async () => {
    const entries = getEntries();
    setTitle()
})

// export default function movieTitle(props) {
//     const apiKey = '3516458404b8ed5f73b3b631421314e1';
//     // const genres = props.genres;
//     // const services = props.services;
//     const [curImg, setCurImg] = useState('');

//     useEffect(async () => {
//         const entries = await getEntries();
//         setCurImg(`https://image.tmdb.org/t/p/w500${entries.results[7].poster_path}`);
//     });

//     const getEntries = async () => {
//         const entries = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
//             .then(data => data.json());
//         console.log(entries);
//         return entries;
//     }
// }