import { connect } from 'react-redux'
import createIpc, { send } from 'redux-electron-ipc';
import SearchFormKeyword from '../components/SearchFormKeyword'

import { setSearchConditions } from '../actions'

function mapStateToProps(state) {
    return state.searchConditions
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeValue(val) {
            dispatch(setSearchConditions({"keyword": val}));
        },
        submit() {
            if (!this.keyword) {
                return false;
            }
            dispatch(send('search-video', {
                keyword: this.keyword,
                sort: this.sort
            }));
        }
    }
}

const VisibleSearchFormKeyword = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchFormKeyword)

export default VisibleSearchFormKeyword
