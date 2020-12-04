import React from 'react';
import { Component } from 'react';

const DATA_URL = 'http://localhost:9003/pictures2'; // Examples: http://localhost:9003/pictures?page=0 OR http://localhost:9003/pictures?page=0&rows=1

class Table extends Component {

    state = {
        page: 0,
        data: null,
        numOfItems: null,
        error: false
    };

    componentDidMount() {
        this.getDataFromBack(0);
    }

    handleErrors(response) {
        console.log("Err 1!");
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    getDataFromBack(newPage) {
        fetch(DATA_URL + '?page='+ newPage +'&rows='+ this.props.maxRows )
            .then(this.handleErrors)
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
                this.setState({ error: 2 });
            })
    }

    btnReload = () => {
        this.setState({data: null}, this.getDataFromBack(0) );
    }

    btnNextPage = () => {
        var p = this.state.page;
        console.log("next! page: ", p++ );
        this.getDataFromBack(p);
    }

    btnPreviousPage = () => {
        var p = this.state.page;
        console.log("previous! page: ", p-- );
        this.getDataFromBack(p);
    }

    btnFirstPage = () => {
        this.getDataFromBack(0);
    }

    btnLastPage = () => {
        this.getDataFromBack( this.getNumOfPages() -1 );
    }

    getNumOfPages = () => {
        return Math.floor( this.state.numOfItems / this.props.maxRows ) +1;
    }
    
    render() {

        const { data, page, error } = this.state;
        const { title, details } = this.props;

        var numOfItems = this.state.numOfItems;
        var numOfPages = this.getNumOfPages();
        var tableData = data;

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
                    { (!data && !error ) && <tr><td colSpan="4">Loading data ...</td></tr> }
                    { (!data && error ) && <tr><td colSpan="4">ERROR: Is the server running?</td></tr> }
                    { (data && !error ) && <>
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
                <button className="first-page-btn" disabled={data === null || this.state.page === 0} onClick={this.btnFirstPage}>First</button>
                <button className="previous-page-btn" disabled={data === null || this.state.page === 0} onClick={this.btnPreviousPage}>Previous</button>
                <button className="next-page-btn" disabled={data === null || (page+1) === numOfPages} onClick={this.btnNextPage}>Next</button> 
                <button className="last-page-btn" disabled={data === null || (page+1) === numOfPages} onClick={this.btnLastPage}>Last</button>
                <br/>
                { (data && !error)  && <> Items: {numOfItems} | Page Num: {page +1} | Num of pages: { numOfPages } </> }
            </div>
        </>
    }
};

export default Table