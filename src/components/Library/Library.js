import MaterialTable from 'material-table';
import React from 'react';
import LibTable from './LibTable';
import APIData, { LibraryData } from "./APIData"

function Library() {

return (
    <>
    <LibTable className="library-table-body"/>
    <div className="library-content"></div>
    {/* <LibraryData /> */}

    </>
)
}

export default Library;
