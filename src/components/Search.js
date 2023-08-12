import React, { Component, createContext } from 'react'

const searchText = createContext();
export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            text: "trump"
        }
    }

    render() {
        return (
            <div>
                <searchText.Provider value={this.state.text}>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={this.state.text} onChange={(e) => {
                            this.setState({ text: e.target.value });
                        }} />
                        <button className="btn btn-outline-success" type="submit" >Search</button>
                    </form>
                </searchText.Provider>
            </div>
        )
    }
}
