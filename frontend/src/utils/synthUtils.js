import * as Tone from 'tone';
import {
    MIN_REVERB_DECAY,
    DEFAULT_LIMITER,
} from '../config/synthConfiguration';

export function createEffects(settings) {
    return {
        distortion: new Tone.Distortion(settings.effects.distortion),
        chorus: new Tone.Chorus(settings.effects.chorus),
        reverb: new Tone.Reverb({
            ...settings.effects.reverb,
            decay: Math.max(settings.effects.reverb.decay, MIN_REVERB_DECAY),
        }),
        limiter: new Tone.Limiter(DEFAULT_LIMITER.threshold),
    };
}
