import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class SearchKeywordTextField extends React.Component {
    constructor(props) {
        super(props);
        this.onClickButton = this.onClickButton.bind(this);
    }

    onClickButton() {
        const { onSearch } = this.props;
        const keyword = ReactDOM.findDOMNode(this.refs.keyword.input).value;
        onSearch(keyword);
    }

    render() {
        return (
            <div>
                <TextField
                    hintText="Hint Text"
                    ref="keyword"
                />
                <FlatButton label="Search" primary={true} onClick={this.onClickButton} />
            </div>
        );
    }
}

SearchKeywordTextField.propTypes = {
    onSearch: PropTypes.func.isRequired
}

export default SearchKeywordTextField