import React from 'react';
import { Component } from 'react';

class Table extends Component {

    state = {
        data: []
    };

    componentDidMount() {
        this.getDataFromBack();
    }

    getDataFromBack() {
        this.setState({
            data: [
                {
                    id: 1,
                    name: "lol-1",
                    date: 1606941947188
                },{
                    id: 2,
                    name: "lol-2",
                    date: 1606941957044
                },{
                    id: 3,
                    name: "lol-3",
                    date: 1606941963972
                }
            ]
        });
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
                        <th>Picture date</th>
                    </tr>
                </thead>
                <tbody>
                    { !data.length && <tr><td colSpan="3">No data in this table</td></tr> } 
                    { data.length > 0 && data.map(( item, index ) => <tr key={index}>
                            <td>{ item.id }</td>
                            <td>{ item.name }</td>
                            <td>{ item.date }</td>
                        </tr> )
                    } 
                </tbody>
            </table>
        </>
    }
};

export default Table