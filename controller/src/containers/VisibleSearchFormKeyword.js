import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';

import createIpc, { send } from 'redux-electron-ipc';
import SearchFormKeyword from '../components/SearchFormKeyword';

import { setSearchKeyword } from '../actions';

function mapStateToProps(state) {
    return state.searchConditions
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeValue(val) {
            dispatch(setSearchKeyword(val));
        },
        submit() {
            if (!this.keyword) {
                return false;
            }
            dispatch(send('search-video', {
                keyword: this.keyword,
                sort: this.sort
            }));
        },
        routerActions: bindActionCreators( Object.assign({}, routerActions), dispatch)
    }
}

const VisibleSearchFormKeyword = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchFormKeyword)

export default VisibleSearchFormKeyword
