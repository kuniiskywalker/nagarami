import { connect } from 'react-redux';
import createIpc, { send } from 'redux-electron-ipc';
import SearchFormSort from '../components/SearchFormSort';

import { setSearchConditions } from '../actions';

function mapStateToProps(state) {
    return state.searchConditions
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeValue(val) {
            dispatch(setSearchConditions({"sort": val}));
            if (!this.keyword) {
                return false;
            }
            dispatch(send('search-video', {
                keyword: this.keyword,
                sort: val
            }));
        }
    }
}

const VisibleSearchFormSort = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchFormSort)

export default VisibleSearchFormSort
