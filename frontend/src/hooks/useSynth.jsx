import { useState, useEffect, useCallback, useRef } from 'react';
import * as Tone from 'tone';
import { SYNTH_PRESETS } from '../config/synthPresets';
import { MIN_REVERB_DECAY, MAX_POLYPHONY } from '../config/synthConfiguration';

export default function useSynth() {
    const [settings, setSettings] = useState(SYNTH_PRESETS.default);
    const synthRef = useRef(null);
    const effectsRef = useRef(null);

    // Инициализация синтезатора
    const initializeSynth = useCallback(() => {
        if (synthRef.current) return;

        try {
            synthRef.current = new Tone.PolySynth({
                maxPolyphony: MAX_POLYPHONY,
                voice: Tone.Synth,
                options: {
                    oscillator: { type: settings.oscillator },
                    envelope: settings.envelope,
                },
            }).toDestination();

            // Инициализация эффектов
            effectsRef.current = {
                distortion: new Tone.Distortion(settings.effects.distortion),
                chorus: new Tone.Chorus(settings.effects.chorus),
                reverb: new Tone.Reverb({
                    ...settings.effects.reverb,
                    decay: Math.max(
                        settings.effects.reverb.decay,
                        MIN_REVERB_DECAY
                    ),
                }),
            };

            // Подключение цепочки эффектов
            synthRef.current.chain(
                effectsRef.current.distortion,
                effectsRef.current.chorus,
                effectsRef.current.reverb,
                Tone.Destination
            );
        } catch (error) {
            console.error('Ошибка инициализации:', error);
        }
    }, [settings.oscillator, settings.envelope]);

    // Обновление громкости
    useEffect(() => {
        if (synthRef.current && !synthRef.current.disposed) {
            synthRef.current.set({ volume: settings.volume });
        }
    }, [settings.volume]);

    // Обновление эффектов
    const updateEffects = useCallback(() => {
        if (!effectsRef.current) return;

        try {
            effectsRef.current.distortion.distortion =
                settings.effects.distortion;
            effectsRef.current.chorus.set(settings.effects.chorus);
            effectsRef.current.reverb.set({
                ...settings.effects.reverb,
                decay: Math.max(
                    settings.effects.reverb.decay,
                    MIN_REVERB_DECAY
                ),
            });
        } catch (error) {
            console.error('Ошибка обновления эффектов:', error);
        }
    }, [settings.effects]);

    // Инициализация и очистка
    useEffect(() => {
        initializeSynth();
        updateEffects();

        return () => {
            if (synthRef.current && !synthRef.current.disposed) {
                synthRef.current.dispose();
                synthRef.current = null;
            }
            Object.values(effectsRef.current || {}).forEach((effect) => {
                if (effect && !effect.disposed) effect.dispose();
            });
            effectsRef.current = null;
        };
    }, [initializeSynth, updateEffects]);

    // Загрузка пресета
    const loadPreset = useCallback((presetName) => {
        const preset = SYNTH_PRESETS[presetName];
        if (!preset) return;

        setSettings({
            oscillator: preset.oscillator,
            envelope: preset.envelope,
            effects: preset.effects,
            volume: preset.volume,
        });
    }, []);

    // Воспроизведение ноты
    const playNote = useCallback((note) => {
        try {
            if (synthRef.current && !synthRef.current.disposed) {
                synthRef.current.triggerAttack(note);
            }
        } catch (error) {
            console.error('Ошибка воспроизведения:', error);
        }
    }, []);

    // Остановка ноты
    const stopNote = useCallback((note) => {
        try {
            if (synthRef.current && !synthRef.current.disposed) {
                synthRef.current.triggerRelease(note);
            }
        } catch (error) {
            console.error('Ошибка остановки:', error);
        }
    }, []);

    return {
        playNote,
        stopNote,
        settings,
        setSettings,
        loadPreset,
    };
}
