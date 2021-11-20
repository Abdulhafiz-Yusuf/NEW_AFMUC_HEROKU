import React from 'react'
import Results from "./Results";

export default class ResultClassBased extends React.PureComponent {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <Results uid={this.props.uid} />
        );
    }
}