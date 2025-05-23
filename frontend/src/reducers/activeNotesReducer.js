export const ACTIONS = {
    ADD_NOTE: 'add-note',
    REMOVE_NOTE: 'remove-note',
    CLEAR_NOTES: 'clear-notes',
};

export function activeNotesReducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD_NOTE:
            return state.includes(action.payload)
                ? state
                : [...state, action.payload];
        case ACTIONS.REMOVE_NOTE:
            return state.filter((note) => note !== action.payload);
        case ACTIONS.CLEAR_NOTES:
            return [];
        default:
            return state;
    }
}
