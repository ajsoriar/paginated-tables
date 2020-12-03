import React from 'react';
import { Component } from 'react';

const DATA_URL = 'http://localhost:9003/pictures';

class Table extends Component {

    state = {
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
    
    render() {

        const { data } = this.state;

        return <>
            <h1>{this.props.title}</h1>
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
                    { !data && <tr><td colSpan="4">Loading data ...</td></tr> }
                    { data && <>
                            { !data.length && <tr><td colSpan="3">No data in this table</td></tr> } 
                            { data.length > 0 && data.map(( item, index ) => <tr key={index}>
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
            </div>
        </>
    }
};

export default Table