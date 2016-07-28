import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import keycode from 'keycode';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class SearchKeywordTextField extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.onClickButton = this.onClickButton.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);
    }
    
    search() {
        const { onSearch } = this.props;
        const keyword = ReactDOM.findDOMNode(this.refs.keyword.input).value;
        onSearch(keyword);
    }
    
    onClickButton() {
        this.search();
    }

    handleKeyDown(e) {
        if (keycode(e) === 'enter') this.handleEnterKeyDown(e);
    }

    handleEnterKeyDown(e) {
        this.search();
    }
    
    render() {
        const { placeholder } = this.props;
        return (
            <div>
                <TextField
                    hintText={placeholder}
                    ref="keyword"
                    onKeyDown={this.handleKeyDown}
                />
                <FlatButton label="Search" primary={true} onClick={this.onClickButton} />
            </div>
        );
    }
}

SearchKeywordTextField.propTypes = {
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired
}

export default SearchKeywordTextField