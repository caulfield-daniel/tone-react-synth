import { useState, useEffect, useCallback, useRef } from 'react';
import * as Tone from 'tone';
import { SYNTH_PRESETS } from '../config/synthPresets';
import { MIN_REVERB_DECAY, MAX_POLYPHONY } from '../config/synthConfiguration';
import {
    createEffects,
    buildEffectsChain,
} from '../utils/synthUtils';

export default function useSynth() {
    const [settings, setSettings] = useState(SYNTH_PRESETS.default);
    const synthRef = useRef(null);
    const effectsRef = useRef(null);
    const isInitializedRef = useRef(false);


    /**
     * Функция для инициализации синтезатора ОДИН РАЗ
     * Не зависит от settings и вызывается только при монтировании
     */
    const initializeSynth = useCallback(() => {
        if (synthRef.current) return;

        try {
            console.log('Initializing synth...');

            // Создаем полифонический синтезатор с дефолтными настройками
            synthRef.current = new Tone.PolySynth({
                maxPolyphony: MAX_POLYPHONY,
                voice: Tone.Synth,
                options: {
                    oscillator: { type: SYNTH_PRESETS.default.oscillator },
                    envelope: SYNTH_PRESETS.default.envelope,
                },
            });

            // Создаем эффекты с дефолтными настройками
            effectsRef.current = createEffects(SYNTH_PRESETS.default);

            // Собираем начальную цепочку эффектов
            const initialChain = buildEffectsChain(
                effectsRef.current,
                SYNTH_PRESETS.default.effects
            );

            synthRef.current.chain(...initialChain, Tone.Destination);
            synthRef.current.set({ volume: SYNTH_PRESETS.default.volume });

            isInitializedRef.current = true;
            console.log('Synth initialized successfully');
        } catch (error) {
            console.error('Ошибка инициализации синтезатора:', error);
            isInitializedRef.current = false;
        }
    }, []);

    /**
     * Функция для обновления параметров эффектов
     * Вызывается при изменении settings.effects
     */
    const updateEffectParameters = useCallback(() => {
        if (!effectsRef.current) return;

        const { distortion, chorus, reverb } = settings.effects;

        try {
            // Обновляем параметры независимо от активности
            effectsRef.current.distortion.set({
                distortion: distortion.distortion,
                wet: distortion.active ? 1.0 : 0.0,
            });

            effectsRef.current.chorus.set({
                frequency: chorus.frequency,
                depth: chorus.depth || 0.5, // Добавляем дефолтное значение, если отсутствует
                wet: chorus.active ? 1.0 : 0.0,
            });

            effectsRef.current.reverb.set({
                decay: Math.max(reverb.decay, MIN_REVERB_DECAY),
                wet: reverb.active ? 1.0 : 0.0,
            });
        } catch (error) {
            console.error('Ошибка обновления параметров эффектов:', error);
        }
    }, [settings.effects]);

    /**
     * Функция для обновления цепочки эффектов
     * Вызывается только при изменении активности эффектов
     */
    const updateEffectsChain = useCallback(() => {
        if (
            !synthRef.current ||
            !effectsRef.current ||
            !isInitializedRef.current
        )
            return;

        try {
            // Временно отключаем синтезатор для пересборки цепочки
            synthRef.current.disconnect();

            // Собираем актуальную цепочку
            const activeChain = buildEffectsChain(
                effectsRef.current,
                settings.effects
            );
            synthRef.current.chain(...activeChain, Tone.getDestination);

            console.log('Effects chain updated');
        } catch (error) {
            console.error('Ошибка обновления цепочки эффектов:', error);
        }
    }, [
        settings.effects.distortion.active,
        settings.effects.chorus.active,
        settings.effects.reverb.active,
        settings.effects.limiter.active,
    ]);

    /**
     * Инициализация при монтировании
     */
    useEffect(() => {
        initializeSynth();

        // Очистка при размонтировании
        return () => {
            try {
                console.log('Cleaning up synth...');

                if (synthRef.current) {
                    synthRef.current.dispose();
                    synthRef.current = null;
                }

                if (effectsRef.current) {
                    Object.values(effectsRef.current).forEach((effect) => {
                        if (effect && !effect.disposed) {
                            effect.dispose();
                        }
                    });
                    effectsRef.current = null;
                }

                isInitializedRef.current = false;
            } catch (error) {
                console.error('Ошибка при очистке ресурсов:', error);
            }
        };
    }, [initializeSynth]);

    /**
     * Обновление громкости
     */
    useEffect(() => {
        if (!synthRef.current || !isInitializedRef.current) return;

        try {
            synthRef.current.set({ volume: settings.volume });
        } catch (error) {
            console.error('Ошибка обновления громкости:', error);
        }
    }, [settings.volume]);

    /**
     * Обновление осциллятора и огибающей
     */
    useEffect(() => {
        if (!synthRef.current || !isInitializedRef.current) return;

        try {
            // Обновляем осциллятор и огибающую у всех голосов
            synthRef.current.set({
                oscillator: { type: settings.oscillator },
                envelope: settings.envelope,
            });

            console.log('Oscillator and envelope updated');
        } catch (error) {
            console.error(
                'Ошибка обновления осциллятора или огибающей:',
                error
            );
        }
    }, [settings.oscillator, settings.envelope]);

    /**
     * Обновление параметров эффектов
     */
    useEffect(() => {
        if (!isInitializedRef.current) return;

        updateEffectParameters();
    }, [updateEffectParameters]);

    /**
     * Обновление цепочки эффектов при изменении их активности
     */
    useEffect(() => {
        if (!isInitializedRef.current) return;

        updateEffectsChain();
    }, [updateEffectsChain]);

    /**
     * Безопасная проверка доступности синтезатора
     */
    const isSynthAvailable = useCallback(() => {
        return (
            synthRef.current &&
            synthRef.current.disposed !== undefined &&
            !synthRef.current.disposed
        );
    }, []);

    /**
     * 11. API методы
     */
    const loadPreset = useCallback((presetName) => {
        const preset = SYNTH_PRESETS[presetName];
        if (!preset) {
            console.warn(`Пресет "${presetName}" не найден`);
            return;
        }

        // Используем глубокое слияние для безопасности
        setSettings((prev) => {
            const newSettings = {
                ...prev,
                ...preset,
                envelope: { ...prev.envelope, ...(preset.envelope || {}) },
                effects: {
                    ...prev.effects,
                    ...(preset.effects || {}),
                    distortion: {
                        ...prev.effects.distortion,
                        ...(preset.effects?.distortion || {}),
                    },
                    chorus: {
                        ...prev.effects.chorus,
                        ...(preset.effects?.chorus || {}),
                    },
                    reverb: {
                        ...prev.effects.reverb,
                        ...(preset.effects?.reverb || {}),
                    },
                    limiter: {
                        ...prev.effects.limiter,
                        ...(preset.effects?.limiter || {}),
                    },
                },
            };
            return newSettings;
        });
    }, []);

    const playNote = useCallback(
        (note) => {
            try {
                if (isSynthAvailable()) {
                    synthRef.current.triggerAttack(note, Tone.now());
                }
            } catch (error) {
                console.error('Ошибка воспроизведения ноты:', error);
            }
        },
        [isSynthAvailable]
    );

    const stopNote = useCallback(
        (note) => {
            try {
                if (isSynthAvailable()) {
                    synthRef.current.triggerRelease(note, Tone.now());
                }
            } catch (error) {
                console.error('Ошибка остановки ноты:', error);
            }
        },
        [isSynthAvailable]
    );

    return {
        playNote,
        stopNote,
        settings,
        setSettings,
        loadPreset,
        isInitialized: isInitializedRef.current,
    };
}
