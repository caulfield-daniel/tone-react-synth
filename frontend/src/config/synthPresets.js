export const SYNTH_PRESETS = {
    default: {
        oscillator: 'sawtooth',
        volume: -12,
        envelope: {
            attack: 0.01,
            decay: 0.2,
            sustain: 0.5,
            release: 0.2,
        },
        effects: {
            distortion: 0.2,
            chorus: { frequency: 1.5, depth: 0.5 },
            reverb: { wet: 0.4, decay: 2.0 },
        },
    },
    ambient: {
        oscillator: 'sine',
        volume: -6,
        envelope: {
            attack: 0.5,
            decay: 1.0,
            sustain: 0.7,
            release: 2.0,
        },
        effects: {
            distortion: 0.1,
            chorus: { frequency: 0.8, depth: 0.3 },
            reverb: { wet: 0.6, decay: 5.0 },
        },
    },
};
