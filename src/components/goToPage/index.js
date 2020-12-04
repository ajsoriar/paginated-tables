import { Component } from 'react';

export default class GoToPage extends Component {
    
    btnGoTo = ( pageNum ) => {
        if (this.props.selectPageFunc) this.props.selectPageFunc ( pageNum );
    }
    
    render() {
        var { currentPage, numOfPages } = this.props;
        var items = new Array(numOfPages).fill(0); // LOL: Use fill or map just will not iterate over the array.        
        return (
            <>
                <style>{`
                    .btnGoTo {
                        padding: 3px 7px;
                        color:   #585858;
                        cursor: pointer;
                    }
                    .current {
                        font-weight: bold;
                        color: black;
                    }
                `}</style>
                <p>
                    Take me to page: { items.map(( item, index ) => <button key={index} className={(index == currentPage)?'btnGoTo current' :'btnGoTo'} onClick={ () => this.btnGoTo(index) }>{index +1}</button> ) }
                </p>
            </>
        );
    }
}