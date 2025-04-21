export const SYNTH_CONFIG = {
    volume: -12,
    type: 'sawtooth',

    envelope: {
        attack: 1,
        decay: 0.1,
        sustain: 0.9,
        release: 10,
    },

    effects: {
        detune: 0.1,
        reverb: {
            decay: 0.5,
            preDelay: 0.01,
            wet: 0.7,
        },
        chorus: {
            frequency: 2.5,
            depth: 0.5,
        },
        distortion: 0.2,
    },

    lfo: {
        rate: 0.2,
        type: 'sine',
        depth: 0.05,
    },
};
