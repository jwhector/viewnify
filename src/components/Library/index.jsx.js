// import axios from "axios";
// import React, { useEffect, useMemo, useState } from "react";
// import tw from "twin.macro";
// import { useTable } from "react-table";


// const Table = tw.table`
//     table-fixed
//     text-base
//     text-black
// `;

// const TableHead = tw.thead`
//     p-2
// `;

// const TableRow = tw.tr`
//     border
//     border-black
//     p-2
// `;

// const TableBody = tw.tbody`

// `;

// const TableData = tw.td`
//     border
//     border-black
//     p-5
// `;

// const Button = tw.button`
//     pl-4
//     pr-4
//     pt-2
//     pb-2
//     text-gray-900
//     rounded-md
//     bg-black
//     hover:bg-green-200
//     transition-colors
// `;

// export default function Movies(props) {

//     const [movies, setMovies] = useState([]);

//     const fetchMovies = async () => {
//         console.log("fetchMovies")
//         const response = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=3516458404b8ed5f73b3b631421314e1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate").catch(err => console.log(err));

//         if(response) {
//             console.log(response)
//             setMovies(response.data);
//         }
//     };

//     const data = useMemo(() => (
//         [
//             {
//                 "page": 2,
//                 "results": [
//                     {
//                         "adult": false,
//                         "backdrop_path": "/ruKcAP8XimNLfrKwNl9YfAUlCGm.jpg",
//                         "genre_ids": [
//                             28,
//                             18
//                         ],
//                         "id": 763025,
//                         "original_language": "en",
//                         "original_title": "Never Back Down: Revolt",
//                         "overview": "An amateur fighter is lured by a trafficking syndicate specializing in elite underground fighting where her brutal captor forces her to fight or face certain death.",
//                         "popularity": 909.6,
//                         "poster_path": "/icAG01wZyy1ZpS3UEnPReph3jMV.jpg",
//                         "release_date": "2021-11-15",
//                         "title": "Never Back Down: Revolt",
//                     },
//                 ]
//             },
//         ], []));

//         const columns = useMemo(() => ([
//             {
//                 Header: "Title",
//                 accessor: "title",

//             },
//             {
//                 Header: "Genre",
//                 accessor: "genre_ids",

//             },
//             {
//                 Header: "Cover",
//                 accessor: "poster_path",

//             },
//             {
//                 Header: "Overview",
//                 accessor: "overview",

//             },
//         ], [])
//     )


//         const moviesData = useMemo(() => [...movies], [movies]);

//         const moviesColumns = useMemo(() => movies[0] ? Object.keys(movies[0]).filter((key) !=="genre_ids").map((key) => {
//             return { Header: key, accessor: key };
//         }) : [],   [movies]);
        

//         const tableInstance = useTable({ columns: moviesColumns, data: moviesData });

//         const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

//         useEffect(() => {
//             fetchMovies().then(() => {

//                 console.log("Movies: ", movies);
//             });
//         }, []);
    
//     return(

//         <Table {...getTableProps()}> 
//     <TableHead>
//         {headerGroups.map((headerGroup,) => (
//             <TableRow {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                     <TableHeader {...column.getHeaderProps()}>
//                         { column.render("Header") }
//                     </TableHeader>
//                 ))}
//             </TableRow>
//         ))};
//     </TableHead>
//     <TableBody {...getTableBodyProps()}>
//         {rows.map((row) => {
//             prepareRow(row);
            
//             return row.cells.map((cell, idx) => (
//                 <TableData {...cell.getCellProps()}>{ cell.render("Cell") }</TableData>
//                 ))
//             })}

//     </TableBody>
//     </Table>
// )
// };





// // const apiKey = "3516458404b8ed5f73b3b631421314e1";
// // "https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate"

// // https://api.themoviedb.org/3/discover/movie?api_key=3516458404b8ed5f73b3b631421314e1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate