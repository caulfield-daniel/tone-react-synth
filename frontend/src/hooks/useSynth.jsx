import { useState, useEffect, useCallback } from 'react';
import * as Tone from 'tone';
import {
    SYNTH_PARAMS,
    SYNTH_ENVELOPE,
    SYNTH_EFFECTS,
} from '../config/synthConfiguration';

const MIN_REVERB_DECAY = 0.01;

export default function useSynth() {
    const [synth, setSynth] = useState(null);
    const [effects, setEffects] = useState(null);
    const [settings, setSettings] = useState({
        ...SYNTH_PARAMS,
        envelope: SYNTH_ENVELOPE,
        effects: SYNTH_EFFECTS,
    });

    useEffect(() => {
        const newSynth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: settings.oscillator },
            envelope: settings.envelope,
        }).toDestination();

        const distortion = new Tone.Distortion(settings.effects.distortion);
        const chorus = new Tone.Chorus({
            frequency: settings.effects.chorus.frequency,
            depth: settings.effects.chorus.depth,
        });
        const reverb = new Tone.Reverb({
            wet: settings.effects.reverb.wet,
            decay: Math.max(settings.effects.reverb.decay, MIN_REVERB_DECAY),
        });

        // Собираем цепочку эффектов
        newSynth.chain(distortion, chorus, reverb, Tone.getDestination());

        setSynth(newSynth);
        setEffects({ distortion, chorus, reverb });

        return () => {
            newSynth.dispose();
            distortion.dispose();
            chorus.dispose();
            reverb.dispose();
        };
    }, [settings.oscillator, settings.envelope]);

    useEffect(() => {
        if (!synth) return;

        synth.set({
            volume: settings.volume,
        });
    }, [synth, settings.volume]);

    useEffect(() => {
        if (!effects) return;

        effects.distortion.distortion = settings.effects.distortion;
        effects.chorus.set({
            frequency: settings.effects.chorus.frequency,
            depth: settings.effects.chorus.depth,
        });
        effects.reverb.set({
            wet: settings.effects.reverb.wet,
            decay: Math.max(settings.effects.reverb.decay, MIN_REVERB_DECAY),
        });
    }, [
        effects,
        settings.effects.distortion,
        settings.effects.chorus,
        settings.effects.reverb,
    ]);

    const playNote = useCallback((note) => synth?.triggerAttack(note), [synth]);

    const stopNote = useCallback(
        (note) => synth?.triggerRelease(note),
        [synth]
    );

    return {
        playNote,
        stopNote,
        settings,
        setSettings,
    };
}
