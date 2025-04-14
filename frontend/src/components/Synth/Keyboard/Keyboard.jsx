import Key from './Key.jsx';
import styled from 'styled-components';
import { useState } from 'react';

const Div = styled.div`
    background-color: #000000;
    height: 200px;
    display: flex;
    gap: 0.5px;
    flex-direction: row;
    justify-content: space-evenly;
    position: relative;
    user-select: none;
`;

export default function Keyboard({ activeNotes, onNoteOn, onNoteOff }) {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    const handleMouseDown = (note) => {
        setIsMouseDown(true);
        setCurrentNote(note);
        onNoteOn(note);
    };

    const handleMouseEnter = (note) => {
        if (isMouseDown && note !== currentNote) {
            if (currentNote) onNoteOff(currentNote);
            setCurrentNote(note);
            onNoteOn(note);
        }
    };

    const handleGlobalMouseUp = () => {
        if (isMouseDown) {
            setIsMouseDown(false);
            if (currentNote) onNoteOff(currentNote);
            setCurrentNote(null);
        }
    };

    const keys = [
        { note: 'C', key: 'a' },
        { note: 'C#', key: 'w' },
        { note: 'D', key: 's' },
        { note: 'D#', key: 'e' },
        { note: 'E', key: 'd' },
        { note: 'F', key: 'f' },
        { note: 'F#', key: 't' },
        { note: 'G', key: 'g' },
        { note: 'G#', key: 'y' },
        { note: 'A', key: 'h' },
        { note: 'A#', key: 'u' },
        { note: 'B', key: 'j' },
    ];

    return (
        <Div onMouseLeave={handleGlobalMouseUp} onMouseUp={handleGlobalMouseUp}>
            {keys.map((keyObj) => (
                <Key
                    key={keyObj.note}
                    onMouseDown={() => handleMouseDown(keyObj.note + '4')}
                    onMouseEnter={() => handleMouseEnter(keyObj.note + '4')}
                    isActive={activeNotes.includes(keyObj.note + '4')}
                    isBlack={keyObj.note.endsWith('#')}
                    keyboardKey={keyObj.key}
                ></Key>
            ))}
        </Div>
    );
}
