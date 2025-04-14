import { useState, useEffect, useCallback } from 'react';
import * as Tone from 'tone';

const MIN_REVERB_DECAY = 0.01;

export default function useSynth() {
    const [synth, setSynth] = useState(null);
    const [effects, setEffects] = useState(null);
    const [settings, setSettings] = useState({
        volume: -12,
        type: 'sawtooth',
        detune: 0,
        reverb: 0.4,
        chorus: 0.5,
        distortion: 0.2,
    });

    useEffect(() => {
        const newSynth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: settings.type },
            envelope: {
                attack: 0.01,
                decay: 0.1,
                sustain: 0.3,
                release: 0.4,
            },
        });

        const initialReverb = Math.max(settings.reverb, MIN_REVERB_DECAY);
        const distortion = new Tone.Distortion(settings.distortion);
        const chorus = new Tone.Chorus({
            frequency: settings.chorus,
            delayTime: 2.5,
            depth: 0.5,
        });
        const reverb = new Tone.Reverb(initialReverb);

        newSynth.chain(distortion, chorus, reverb, Tone.getDestination());

        setSynth(newSynth);
        setEffects({ distortion, chorus, reverb });

        return () => {
            newSynth.dispose();
            distortion.dispose();
            chorus.dispose();
            reverb.dispose();
        };
    }, [settings.type, settings.chorus, settings.distortion, settings.reverb]);

    useEffect(() => {
        synth?.set({
            volume: settings.volume,
            detune: settings.detune,
        });
    }, [synth, settings.volume, settings.detune]);

    useEffect(() => {
        if (!effects) return;

        effects.distortion.set({ distortion: settings.distortion });
        effects.chorus.set({ frequency: settings.chorus });

        const safeReverb = Math.max(settings.reverb, MIN_REVERB_DECAY);
        effects.reverb.set({ decay: safeReverb });
        
    }, [effects, settings.distortion, settings.chorus, settings.reverb]);

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
