const INITIAL_STATE = { offices: [] }

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case "GET_OFFICES_SUCCESS" :
            return { offices: action.payload };
        default :   
            return state;
    }
}