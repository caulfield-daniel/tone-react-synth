import { useState, useEffect, useCallback, useRef } from 'react';
import * as Tone from 'tone';
import { SYNTH_PRESETS } from '../config/synthPresets';
import { MIN_REVERB_DECAY, MAX_POLYPHONY } from '../config/synthConfiguration';
import { createEffects } from '../utils/synthUtils';

export default function useSynth() {
    const [settings, setSettings] = useState(SYNTH_PRESETS.default);
    const synthRef = useRef(null);
    const effectsRef = useRef(null);

    const isSynthAvailable = () =>
        synthRef.current && !synthRef.current.disposed;

    // Инициализация синтезатора и эффектов
    const initializeSynth = useCallback(() => {
        if (synthRef.current) return;

        try {
            // 1. Создаем полифонический синтезатор
            synthRef.current = new Tone.PolySynth({
                maxPolyphony: MAX_POLYPHONY,
                voice: Tone.Synth,
                options: {
                    oscillator: {
                        type: settings.oscillator,
                    },
                    envelope: settings.envelope,
                },
            });

            // 2. Инициализируем эффекты
            effectsRef.current = createEffects(settings);

            // 3. Собираем цепочку обработки
            synthRef.current.chain(
                effectsRef.current.distortion,
                effectsRef.current.chorus,
                effectsRef.current.reverb,
                effectsRef.current.limiter,
                Tone.Destination
            );

            // 4. Устанавливаем начальную громкость
            synthRef.current.set({ volume: settings.volume });
        } catch (error) {
            console.error('Ошибка инициализации:', error);
        }
    }, [settings.oscillator, settings.envelope, settings.volume]);

    // Обновление параметров

    useEffect(() => {
        if (isSynthAvailable()) {
            synthRef.current.set({ volume: settings.volume });
        }
    }, [settings.volume]);

    const updateEffects = useCallback(() => {
        if (!effectsRef.current) return;

        try {
            // Обновляем параметры эффектов
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

    // Жизненный цикл
    useEffect(() => {
        initializeSynth();
        updateEffects();

        return () => {
            try {
                if (isSynthAvailable()) {
                    synthRef.current.dispose();
                    synthRef.current = null;
                }

                Object.values(effectsRef.current || {}).forEach((effect) => {
                    if (effect && !effect.disposed) effect.dispose();
                });
                effectsRef.current = null;
            } catch (error) {
                console.error('Ошибка очистки ресурсов:', error);
            }
        };
    }, [initializeSynth, updateEffects]);

    // API для компонентов
    const loadPreset = useCallback((presetName) => {
        const preset = SYNTH_PRESETS[presetName];
        if (!preset) return console.warn(`Пресет "${presetName}" не найден`);

        setSettings((prev) => ({
            ...prev,
            ...preset,
        }));
    }, []);

    const playNote = useCallback((note) => {
        try {
            if (isSynthAvailable()) {
                synthRef.current.triggerAttack(note, Tone.now());
            }
        } catch (error) {
            console.error('Ошибка воспроизведения:', error);
        }
    }, []);

    const stopNote = useCallback((note) => {
        try {
            if (isSynthAvailable()) {
                synthRef.current.triggerRelease(note, Tone.now());
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
