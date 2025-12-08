import * as Tone from 'tone';

/**
 * Создает эффекты с начальными параметрами
 */
export function createEffects(settings) {
    try {
        return {
            distortion: new Tone.Distortion({
                distortion: settings.effects.distortion.distortion || 0,
                wet: settings.effects.distortion.active ? 1.0 : 0.0,
            }),
            chorus: new Tone.Chorus({
                frequency: settings.effects.chorus.frequency || 1.5,
                delayTime: settings.effects.chorus.delayTime || 2.5,
                depth: settings.effects.chorus.depth || 0.5,
                wet: settings.effects.chorus.active ? 1.0 : 0.0,
            }),
            reverb: new Tone.Reverb({
                decay: settings.effects.reverb.decay || 1.5,
                wet: settings.effects.reverb.active ? 1.0 : 0.0,
            }),
            limiter: new Tone.Limiter({
                threshold: -6,
                wet: settings.effects.limiter.active ? 1.0 : 0.0,
            }),
        };
    } catch (error) {
        console.error('Ошибка создания эффектов:', error);
        return null;
    }
}

/**
 * Строит цепочку активных эффектов
 */
export function buildEffectsChain(effects, effectsSettings) {
    if (!effects) return [];

    const effectChain = [
        {
            effect: effects.distortion,
            active: effectsSettings.distortion.active,
            name: 'distortion',
        },
        {
            effect: effects.chorus,
            active: effectsSettings.chorus.active,
            name: 'chorus',
        },
        {
            effect: effects.reverb,
            active: effectsSettings.reverb.active,
            name: 'reverb',
        },
        {
            effect: effects.limiter,
            active: effectsSettings.limiter.active,
            name: 'limiter',
        },
    ];

    // Фильтруем только активные эффекты и возвращаем сами эффекты
    return effectChain
        .filter(({ active }) => active)
        .map(({ effect }) => effect);
}

/**
 * Обновляет параметры эффекта с валидацией
 */
export function updateEffect(effect, newParams) {
    if (!effect || !newParams) return;

    try {
        // Проверяем, что эффект еще не удален
        if (effect.disposed) {
            console.warn('Попытка обновить удаленный эффект');
            return;
        }

        // Устанавливаем новые параметры
        effect.set(newParams);
    } catch (error) {
        console.error(`Ошибка обновления эффекта:`, error);
    }
}
