import { combineReducers } from 'redux';
import CompanyReducer from './CompanyReducer';
import OfficeReducer from './OfficeReducer';

export default combineReducers({
    comp: CompanyReducer,
    offi: OfficeReducer
});