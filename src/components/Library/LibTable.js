import MaterialTable from "material-table";
import { data } from "./Data";
import { useEffect } from "react";

const LibTable = () => {
  const columns = [
    { title: "Title", field: "original_title" },
    { title: "Genre", field: "genre" },
    { title: "Movie Cover", field: "poster_path" },
    { title: "Overview", field: "overview" },
    { title: "Rating", field: "rating" },
  ];

  // export default function libraryData(props) {

  //     const apiKey = '3516458404b8ed5f73b3b631421314e1';

  //     const columns = [
  //         { title: 'Title', field: 'title' },
  //         { title: 'Genre', field: 'genre' },
  //         { title: 'Image', field: 'poster_path' },
  //         { title: 'Overview', field: 'overview' },
  //         { title: 'Rating', field: 'rating' }
  //         ];

  //     const [title, setTitle] = useState([]);
  //     const [genre, setGenre] = useState([]);
  //     const [images, setImages] = useState([]);
  //     const [overview, setOverview] = useState([]);
  //     const [rating, setRating] = useState([]);

  //     useEffect(() => {
  //         getEntries().then(results => {
  //             const titleHolder = [];
  //             const genreHolder = [];
  //             const imageHolder = [];
  //             const overviewHolder = [];
  //             const ratingHolder = [];
  //             results.forEach(results => {
  //                 titleHolder.push({
  //                     tmbd_id: result.id,
  //                     title: result.original_title,
  //                 });
  //                 genreHolder.push({
  //                     tmbd_id: result.id,
  //                     genre: result.genre,
  //                 });
  //                 imageHolder.push({
  //                     tmbd_id: result.id,
  //                     image: `https://image.tmdb.org/t/p/original${result.poster_path}`,
  //                 });
  //                 overviewHolder.push({
  //                     tmbd_id: result.id,
  //                     overview: result.overview,
  //                 })
  //                 ratingHolder.push({
  //                     tmbd_id: result.id,
  //                     rating: result.rating,
  //                 });
  //                 setImages(imageHolder);
  //                 setRating(ratingHolder);
  //                 setTitle(titleHolder);
  //                 setGenre(genreHolder);
  //                 setOverview(overviewHolder);
  //             });
  //     }, []);

  //     useEffect(async () => {
  //         const getEntries = async () => {
  //             const entries = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate`)
  //             .then(data => data.json());
  //             console.log(entries);
  //             const results = entries.results.filter(elem => !seenMedia.includes(elem.id));

  //             return results;
  //         };
  //     });

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={columns}
        data={data}
        title="Your Favorite Entertainment"
      />
    </div>
  );
};

export default LibTable;
