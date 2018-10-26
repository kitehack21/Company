const INITIAL_STATE = { companies: [] }

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case "GET_COMPANIES_SUCCESS" :
        console.log(action.payload)
            return { companies: action.payload };
        default :   
            return state;
    }
}