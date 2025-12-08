import * as Tone from 'tone';

export function createEffects(settings) {
    return {
        distortion: new Tone.Distortion(settings.effects.distortion),
        chorus: new Tone.Chorus(settings.effects.chorus),
        reverb: new Tone.Reverb(settings.effects.reverb),
        limiter: new Tone.Limiter(settings.effects.limiter),
    };
}

export function buildEffectsChain(effects, effectsSettings) {
    return [
        { effect: effects.distortion, active: effectsSettings.distortion.active },
        { effect: effects.chorus, active: effectsSettings.chorus.active },
        { effect: effects.reverb, active: effectsSettings.reverb.active },
        { effect: effects.limiter, active: effectsSettings.limiter.active },
    ]
        .filter(({ active }) => active)
        .map(({ effect }) => effect);
}