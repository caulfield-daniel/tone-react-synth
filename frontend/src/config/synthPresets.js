import { DEFAULT_LIMITER } from "./synthConfiguration";

export const SYNTH_PRESETS = {
    default: {
        oscillator: 'sawtooth',
        volume: -17,
        envelope: {
            attack: 0.01,
            decay: 0.2,
            sustain: 0.5,
            release: 0.2,
        },
        effects: {
            distortion: { active: false, distortion: 0 },
            chorus: { active: false, frequency: 1.5, depth: 0.5 },
            reverb: { active: false, wet: 0.4, decay: 2.0 },
            limiter: DEFAULT_LIMITER,
        },
    },
    ambient: {
        oscillator: 'sine',
        volume: -17,
        envelope: {
            attack: 0.5,
            decay: 1.0,
            sustain: 0.7,
            release: 2.0,
        },
        effects: {
            distortion: { active: false, distortion: 0 },
            chorus: { active: true, frequency: 0.8, depth: 0.3 },
            reverb: { active: true, wet: 0.6, decay: 7.0 },
            limiter: DEFAULT_LIMITER,
        },
    },
};
