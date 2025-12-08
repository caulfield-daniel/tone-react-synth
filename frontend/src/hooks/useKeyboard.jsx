import { useCallback, useEffect } from 'react';
import { getNoteFromKey } from '../utils/keyboardUtils';

export default function useKeyboard(onNoteOn, onNoteOff) {
    const handleKeyDown = useCallback(
        (e) => {
            if (e.repeat) return;
            const note = getNoteFromKey(e.key);
            if (note) onNoteOn(note);
        },
        [onNoteOn]
    );

    const handleKeyUp = useCallback(
        (e) => {
            const note = getNoteFromKey(e.key);
            if (note) onNoteOff(note);
        },
        [onNoteOff]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);
}
