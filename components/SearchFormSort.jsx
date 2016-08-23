import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';

const styles = {
    radioButtonGroup: {
        margin: '10px 0px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    radioButton: {
        display: 'block',
        width: '150px'
    }
};

class SearchFormSort extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Tabs
                onChange={(code) => {
                    this.props.changeValue(code)
                }}
                value={this.props.sort}
            >
                <Tab label="最新順" value="date" />
                <Tab label="人気順" value="rating" />
                <Tab label="再生数順" value="viewCount" />
            </Tabs>
        );
    }
}

SearchFormSort.propTypes = {
    sort: PropTypes.string.isRequired,
    changeValue: PropTypes.func.isRequired
}

export default SearchFormSort
