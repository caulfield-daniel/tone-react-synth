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

            // 3. Собираем цепочку обработки с учетом активности эффектов
            const effectsChain = [
                {
                    effect: effectsRef.current.distortion,
                    active: settings.effects.distortion.active,
                },
                {
                    effect: effectsRef.current.chorus,
                    active: settings.effects.chorus.active,
                },
                {
                    effect: effectsRef.current.reverb,
                    active: settings.effects.reverb.active,
                },
                {
                    effect: effectsRef.current.limiter,
                    active: settings.effects.limiter.active,
                },
            ]
                .filter((e) => e.active)
                .map((e) => e.effect);

            synthRef.current.chain(...effectsChain, Tone.Destination);

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

    useEffect(() => {
        if (!isSynthAvailable() || !effectsRef.current) return;

        // Временно отключаем синтезатор
        synthRef.current.disconnect();

        // Пересобираем цепочку с актуальными активными эффектами
        const effectsChain = [
            {
                effect: effectsRef.current.distortion,
                active: settings.effects.distortion.active,
            },
            {
                effect: effectsRef.current.chorus,
                active: settings.effects.chorus.active,
            },
            {
                effect: effectsRef.current.reverb,
                active: settings.effects.reverb.active,
            },
            {
                effect: effectsRef.current.limiter,
                active: settings.effects.limiter.active,
            },
        ]
            .filter((e) => e.active)
            .map((e) => e.effect);

        synthRef.current.chain(...effectsChain, Tone.Destination);
    }, [
        settings.effects.distortion.active,
        settings.effects.chorus.active,
        settings.effects.reverb.active,
        settings.effects.limiter.active,
    ]);

    const updateEffects = useCallback(() => {
        if (!effectsRef.current) return;

        try {
            // Обновляем только активные эффекты
            if (settings.effects.distortion.active) {
                effectsRef.current.distortion.distortion =
                    settings.effects.distortion;
            }

            if (settings.effects.chorus.active) {
                effectsRef.current.chorus.set(settings.effects.chorus);
            }

            if (settings.effects.reverb.active) {
                effectsRef.current.reverb.set({
                    ...settings.effects.reverb,
                    decay: Math.max(
                        settings.effects.reverb.decay,
                        MIN_REVERB_DECAY
                    ),
                });
            }
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
