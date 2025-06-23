export const KEYBOARD_LAYOUT = [
    { note: 'C', key: 'a', octave: 4 },
    { note: 'C#', key: 'w', octave: 4 },
    { note: 'D', key: 's', octave: 4 },
    { note: 'D#', key: 'e', octave: 4 },
    { note: 'E', key: 'd', octave: 4 },
    { note: 'F', key: 'f', octave: 4 },
    { note: 'F#', key: 't', octave: 4 },
    { note: 'G', key: 'g', octave: 4 },
    { note: 'G#', key: 'y', octave: 4 },
    { note: 'A', key: 'h', octave: 4 },
    { note: 'A#', key: 'u', octave: 4 },
    { note: 'B', key: 'j', octave: 4 },
    { note: 'C', key: 'k', octave: 5 },
    { note: 'C#', key: 'o', octave: 5 },
    { note: 'D', key: 'l', octave: 5 },
    { note: 'D#', key: 'p', octave: 5 },
    { note: 'E', key: ';', octave: 5 },
];

export const getNoteFromKey = (key) => {
    const foundKey = KEYBOARD_LAYOUT.find((k) => k.key === key.toLowerCase());
    return foundKey ? `${foundKey.note}${foundKey.octave}` : null;
};
