import { Component } from 'react';

export default class LikeDislike extends Component {
    
    state = {
        likesCount: 1984,
        dislikesCount: 0,
        like: false,
        dislike: false
    }
    
    /* // this works fine. v1
    
    btnLike = () => {
        var num = this.state.likesCount +1;
        this.setState({"likesCount": num });
        this.setState({"like": true });
    }
    
    btnDisLike = () => {
        var num = this.state.dislikesCount -1;
        this.setState({"dislikesCount": num });
        this.setState({"dislike": true });
    }
    
    */
    
    /* // this works fine. v2 */
    
    /* TODO: Fix the horrible setState-hell */
    
    btnLike = () => {
        
        var num = this.state.likesCount;

        if ( this.state.like ) {
            this.setState({"like": false });
            num = num - 1;
        } else {
            this.setState({"like": true });
            num = num + 1;
            
            if ( this.state.dislike ) {
                this.setState({"dislike": false, "dislikesCount": (this.state.dislikesCount -1) });
            }
        }
        
        this.setState({"likesCount": num });
    }
    
    btnDisLike = () => {
        
        var num = this.state.dislikesCount;

        if ( this.state.dislike ) {
            this.setState({"dislike": false });
            num = num - 1;
        } else {
            this.setState({"dislike": true });
            num = num + 1;
            
            if ( this.state.like ) {
                this.setState({"like": false, "likesCount": (this.state.likesCount -1) });
            }
        }
        
        this.setState({"dislikesCount": num });
    }
    
    /* TODO: Fix the horrible setState-hell */
    
    render() {
        
        var { likesCount, dislikesCount, like, dislike } = this.state;
        
        var strLikeclass = "like-button";
        if ( like ) strLikeclass += " liked";
        
        var strDisLikeclass = "dislike-button";
        if ( dislike ) strDisLikeclass += " disliked";
        
        return (
            <div className="likeDislike">
                <h4>For sure you like all this examples!</h4>
                <style>{`
                    .likeDislike {
                        text-align: center;
                    }
                    .like-button, .dislike-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:   #585858;
                        cursor: pointer;
                    }

                    .liked, .disliked {
                        font-weight: bold;
                        color: #607d8b;
                    }
                    
                    .likes-counter{
                        display: inline-block;
                    }
                `}</style>
                <div className="btnContainer">
                    <button className={strLikeclass} onClick={this.btnLike}>Like | <div className="likes-counter">{likesCount}</div></button>&nbsp;
                    <button className={strDisLikeclass} onClick={this.btnDisLike}>Dislike | <div className="likes-counter">{dislikesCount}</div></button>
                </div>
                <br/>
                By Andres!
            </div>
        );
    }
}