import { useReducer, useEffect, useCallback } from 'react';
import { SynthContainer, NoteIndicator } from './Synth.style';
import useSynth from '../../hooks/useSynth.jsx';
import Keyboard from './Keyboard/Keyboard.jsx';
import SynthControls from './SynthControls/SynthControls.jsx';
import { getNoteFromKey } from '../../constants/keyboardLayout.js';
import {
    ACTIONS,
    activeNotesReducer,
} from '../../reducers/activeNotesReducer.js';

export default function Synth() {
    const { playNote, stopNote, settings, setSettings, loadPreset } =
        useSynth();
    const [activeNotes, dispatch] = useReducer(activeNotesReducer, []);

    useEffect(() => {
        loadPreset('default');
    }, []);

    const handleNoteOn = useCallback(
        (note) => {
            if (!activeNotes.includes(note)) {
                dispatch({ type: ACTIONS.ADD_NOTE, payload: note });
                playNote(note);
            }
        },
        [activeNotes, playNote]
    );

    const handleNoteOff = useCallback(
        (note) => {
            dispatch({ type: ACTIONS.REMOVE_NOTE, payload: note });
            stopNote(note);
        },
        [stopNote]
    );

    const handleClearNotes = useCallback(() => {
        activeNotes.forEach((note) => stopNote(note));
        dispatch({ type: ACTIONS.CLEAR_NOTES });
    }, [activeNotes, stopNote]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.repeat) return;
            const note = getNoteFromKey(e.key);
            if (note) handleNoteOn(note);
        };

        const handleKeyUp = (e) => {
            const note = getNoteFromKey(e.key);
            if (note) {
                handleNoteOff(note);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleNoteOn, handleNoteOff]);

    return (
        <SynthContainer>
            <NoteIndicator>
                Active notes: {activeNotes.join(', ')}
            </NoteIndicator>

            <SynthControls settings={settings} onSettingsChange={setSettings} />

            <Keyboard
                onNoteOn={handleNoteOn}
                onNoteOff={handleNoteOff}
                activeNotes={activeNotes}
                onClearNotes={handleClearNotes}
            />
        </SynthContainer>
    );
}
