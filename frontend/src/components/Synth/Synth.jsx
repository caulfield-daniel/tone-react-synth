import { useEffect } from 'react';
import { SynthContainer, NoteIndicator, VersionLabel } from './Synth.style';
import useSynth from '../../hooks/useSynth';
import useActiveNotes from '../../hooks/useActiveNotes';
import useKeyboard from '../../hooks/useKeyboard';
import Keyboard from './Keyboard/Keyboard';
import SynthControls from './SynthControls/SynthControls';
import packageJson from '../../../package.json';

export default function Synth() {
    const { playNote, stopNote, settings, setSettings, loadPreset } =
        useSynth();
    const { activeNotes, addNote, removeNote, clearNotes } = useActiveNotes();

    useEffect(() => {
        loadPreset('default');
    }, [loadPreset]);

    const handleNoteOn = (note) => {
        if (!activeNotes.includes(note)) {
            addNote(note);
            playNote(note);
        }
    };

    const handleNoteOff = (note) => {
        removeNote(note);
        stopNote(note);
    };

    const handleClearNotes = () => {
        activeNotes.forEach(stopNote);
        clearNotes();
    };

    useKeyboard(handleNoteOn, handleNoteOff);

    return (
        <SynthContainer>
            <NoteIndicator>
                Active notes: {activeNotes.join(', ') || 'none'}
            </NoteIndicator>

            <SynthControls settings={settings} onSettingsChange={setSettings} />

            <Keyboard
                onNoteOn={handleNoteOn}
                onNoteOff={handleNoteOff}
                activeNotes={activeNotes}
                onClearNotes={handleClearNotes}
            />

            <VersionLabel>v{packageJson.version}</VersionLabel>
        </SynthContainer>
    );
}
