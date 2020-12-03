import React from 'react';
import { Component } from 'react';

const DATA_URL = 'http://localhost:9003/pictures2'; // Examples: http://localhost:9003/pictures?page=0 OR http://localhost:9003/pictures?page=0&rows=1

class Table extends Component {

    state = {
        page: 0,
        data: null,
        numOfItems: null
    };

    componentDidMount() {
        this.getDataFromBack(0);
    }

    getDataFromBack(newPage) {
        fetch(DATA_URL + '?page='+ newPage +'&rows='+ this.props.maxRows )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                // Work with JSON data here
                console.log(data)

                this.setState({
                    "data": data.data,
                    "numOfItems": data.numOfItems *1,
                    "page": data.pageNum *1
                });
            })
            .catch((err) => {
                // Do something for an error here
            })
    }

    btnReload = () => {
        this.setState({data: null}, this.getDataFromBack(0) );
    }

    btnNextPage= () => {
        var p = this.state.page;
        console.log("next! page: ", p++ );
        this.getDataFromBack(p);
    }

    btnPreviousPage= () => {
        var p = this.state.page;
        console.log("previous! page: ", p-- );
        this.getDataFromBack(p);
    }
    
    render() {

        const { data, page } = this.state;
        const { title, details, maxRows } = this.props;
        if ( data === null) return <div>Loading data ...</div>

        var numOfItems = this.state.numOfItems;
        var numOfPages = Math.floor( numOfItems / maxRows ) +1;
        var tableData = data; //this.getRowsFromData( data, page, maxRows );

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