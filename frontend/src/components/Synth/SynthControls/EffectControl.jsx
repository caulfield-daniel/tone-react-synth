import {
    EffectControlGroup,
    EffectToggleButton,
    Label,
    StyledInput,
} from './SynthControls.style';

const EFFECT_CONFIG = {
    distortion: { min: 0, max: 1, step: 0.1, param: 'distortion' },
    chorus: { min: 0.1, max: 10, step: 0.1, param: 'frequency' },
    reverb: { min: 0.1, max: 10, step: 0.1, param: 'decay' },
};

export default function EffectControl({ type, effect, onChange, onToggle }) {
    const config = EFFECT_CONFIG[type];
    const value = effect[config.param];

    return (
        <EffectControlGroup $isActive={effect.active}>
            <EffectToggleButton
                $isActive={effect.active}
                onClick={onToggle}
                aria-label={`Toggle ${type}`}
            />
            <Label>
                {type} ({value})
            </Label>
            <StyledInput
                disabled={!effect.active}
                min={config.min}
                max={config.max}
                step={config.step}
                value={value}
                onChange={(e) =>
                    onChange({
                        ...effect,
                        [config.param]: Number(e.target.value),
                    })
                }
            />
        </EffectControlGroup>
    );
}
