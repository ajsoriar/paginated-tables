import React from 'react';
import { Component } from 'react';

const DATA_URL = 'http://localhost:9003/pictures';

class Table extends Component {

    state = {
        page: 0,
        data: null
    };

    componentDidMount() {
        this.getDataFromBack();
    }

    getDataFromBack() {
        fetch(DATA_URL)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                // Work with JSON data here
                console.log(data)

                this.setState({"data": data.data});
            })
            .catch((err) => {
                // Do something for an error here
            })
    }

    btnReload = () => {
        this.setState({data: null}, this.getDataFromBack() );
    }

    getRowsFromData = ( data, page, maxRows ) => {
        if ( !data ) return data;
        var arr = [];
        var startRow = page * maxRows;
        var endRow = startRow + maxRows;
        if ( endRow > data.length ) endRow = data.length;
        for ( var i = startRow; i < endRow; i++ ) arr.push( data[i] );
        return arr
    }

    btnNextPage= () => {
        var p = this.state.page;
        console.log("next! page: ", p++ );
        this.setState({page: p});
    }

    btnPreviousPage= () => {
        var p = this.state.page;
        console.log("previous! page: ", p-- );
        this.setState({page: p});
    }
    
    render() {

        const { data, page } = this.state;
        const { title, details, maxRows } = this.props;
        if ( data === null) return <div>Loading data ...</div>

        var numOfItems = data.length;
        var numOfPages = Math.floor( numOfItems / maxRows ) +1;
        var tableData = this.getRowsFromData( data, page, maxRows );

        return <>
            <h1>{title}</h1>
            { details && <p>{ details }</p>}
            <table className="table" border="2">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Picture name</th>
                        <th>Picture type</th>
                        <th>Picture description</th>
                    </tr>
                </thead>
                <tbody>
                    { data === null && <tr><td colSpan="4">Loading data ...</td></tr> }
                    { data != null && <>
                            { !tableData.length && <tr><td colSpan="4">No data in this table</td></tr> } 
                            { tableData.length > 0 && tableData.map(( item, index ) => <tr key={index}>
                                    <td>{ item.id }</td>
                                    <td>{ item.name }</td>
                                    <td>{ item.type }</td>
                                    <td>{ item.description }</td>
                                </tr> )
                            } 
                        </>
                    }
                </tbody>
            </table>
            <div className="controls">
                <button className="reload-btn" disabled={data === null} onClick={this.btnReload}>Reload</button>
                <button className="previous-page-btn" disabled={data === null || this.state.page === 0} onClick={this.btnPreviousPage}>Previous</button>
                <button className="next-page-btn" disabled={data === null || (page+1) === numOfPages} onClick={this.btnNextPage}>Next</button> 
                <br/>
                Items: {numOfItems} | Page Num: {page +1} | Num of pages: { numOfPages } 
            </div>
        </>
    }
};

export default Table