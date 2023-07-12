import React from "react";
import axios from "axios";
import ClassJoke from "./ClassJoke";

import "./JokeList.css";

class ClassJokeList extends React.Component {
    constructor (props) {
        super(props);
        this.state = { jokes: [] }
    }

    getJokes = async () => {
        let j = [...this.state.jokes];
        let seenJokes = new Set();

        try {
            while (j.length < 10) {
                let res = await axios.get("https://icanhazdadjoke.com", {
                    headers: { Accept: "application/json" }
                })
                let { status, ...jokeObj } = res.data;

                if (!seenJokes.has(jokeObj.id)) {
                  seenJokes.add(jokeObj.id);
                  j.push({ ...jokeObj, votes: 0 });
                  
                } else {
                  console.error("duplicate found!");
                }
            }
            this.setState({ jokes: j });  
        } catch (e) {
            console.log(e);
        }
    }

    generateNewJokes = () => {
        this.setState({ jokes: [] })
    }

    vote = (id, delta) => {
        let allJokes = [...this.state.jokes];
        allJokes.map(j => { if (j.id === id) j.votes = j.votes + delta })
        this.setState({ jokes: allJokes })
    }
    
    componentDidMount() {
        if (this.state.jokes.length === 0) {
            this.getJokes()
        }
    }

    componentDidUpdate() {
        if (this.state.jokes.length === 0) {
            this.getJokes()
        }
    }

    render() {
        return (
            <div>
                <button className="JokeList-getmore" onClick={this.generateNewJokes}>
                    Get New Jokes
                </button>
                {this.state.jokes.map(j => <ClassJoke key={ j.id } id={ j.id } joke={ j.joke } voteCount={j.votes} vote={ this.vote } />)}
            </div>
        )
    }
}

export default ClassJokeList