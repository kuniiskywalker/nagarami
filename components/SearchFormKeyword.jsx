import React, { PropTypes, Component } from 'react';
import keycode from 'keycode';
import TextField from 'material-ui/TextField';

import {grey100} from '../node_modules/material-ui/styles/colors';

class SearchFormKeyword extends React.Component {
    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);
    }

    handleKeyDown(e) {
        if (keycode(e) === 'enter') this.handleEnterKeyDown(e);
    }

    handleEnterKeyDown(e) {
        this.props.submit();
    }

    render() {
        return (
            <TextField
                hintText="Enterをおして検索してください"
                floatingLabelText="検索"
                ref="keyword"
                onChange={(type, code) => {
                    this.props.changeValue(code)
                }}
                onKeyDown={this.handleKeyDown}
                value={this.props.keyword}
                style={this.props.style}
                hintStyle={{color: grey100}}
                floatingLabelStyle={{color: grey100}}
                floatingLabelFocusStyle={{color: grey100}}
            />
        );
    }
}

SearchFormKeyword.propTypes = {
    keyword: PropTypes.string.isRequired,
    changeValue: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
}

export default SearchFormKeyword