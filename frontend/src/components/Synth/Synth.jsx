import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import useSynth from '../../hooks/useSynth.jsx';
import Keyboard from './Keyboard/Keyboard.jsx';
import SynthControls from './SynthControls/SynthControls.jsx';
import { getNoteFromKey } from '../../constants/keyboardLayout.js';

const SynthContainer = styled.div`
    background: #424242;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    max-width: 800px;
    margin: 2rem auto;
`;

const NoteIndicator = styled.div`
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-family: monospace;
`;

export default function Synth() {
    const { playNote, stopNote, settings, setSettings } = useSynth();
    const [activeNotes, setActiveNotes] = useState([]);

    const handleNoteOn = useCallback(
        (note) => {
            setActiveNotes((prev) =>
                prev.includes(note) ? prev : [...prev, note]
            );
            playNote(note);
        },
        [playNote]
    );

    const handleNoteOff = useCallback(
        (note) => {
            setActiveNotes((prev) => prev.filter((n) => n !== note));
            stopNote(note);
        },
        [stopNote]
    );

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.repeat) return;
            const note = getNoteFromKey(e.key);
            if (note) handleNoteOn(note);
        };

        const handleKeyUp = (e) => {
            const note = getNoteFromKey(e.key);
            if (note) handleNoteOff(note);
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
            />
        </SynthContainer>
    );
}
