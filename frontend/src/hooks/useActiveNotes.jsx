import { useReducer, useCallback } from 'react';
import { ACTIONS, activeNotesReducer } from '../reducers/activeNotesReducer';

export default function useActiveNotes() {
    const [activeNotes, dispatch] = useReducer(activeNotesReducer, []);

    const addNote = useCallback((note) => {
        dispatch({ type: ACTIONS.ADD_NOTE, payload: note });
    }, []);

    const removeNote = useCallback((note) => {
        dispatch({ type: ACTIONS.REMOVE_NOTE, payload: note });
    }, []);

    const clearNotes = useCallback(() => {
        dispatch({ type: ACTIONS.CLEAR_NOTES });
    }, []);

    return {
        activeNotes,
        addNote,
        removeNote,
        clearNotes,
        dispatch,
    };
}
