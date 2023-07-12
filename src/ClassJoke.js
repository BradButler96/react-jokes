import React from "react";

import "./ClassJoke.css";


class ClassJokeList extends React.Component {
    constructor (props) {
        super(props);
    }

    submitVote = (id, delta) => {
        this.props.vote(id, delta)
    }

    render() {
        return (
            <div className='jokeContainer' key={ this.props.id }>
                <p className='jokeText'>{this.props.joke}</p>
                <button className='downVoteBtn' onClick={() => this.submitVote(this.props.id, -1)}>
                    <i className="fas fa-thumbs-down" />
                </button>
                <p className='voteCount'> {this.props.voteCount} </p>
                <button className='upVoteBtn' onClick={() => this.submitVote(this.props.id, +1)}>
                    <i className="fas fa-thumbs-up" />
                </button>
            </div>
        )
    }
}

export default ClassJokeList