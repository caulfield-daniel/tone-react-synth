import {
    ControlsContainer,
    ControlGroup,
    EffectControlGroup,
    EffectToggleButton,
    Label,
    StyledInput,
} from './SynthControls.style';
import WaveformSelect from './WaveformSelect/WaveformSelect';
import PresetManager from './PresetManager/PresetManager';
import { dbToPercent } from '../../../utils/volumeUtils';
import { MAX_VOLUME, MIN_VOLUME } from '../../../config/synthConfiguration';

export default function SynthControls({ settings, onSettingsChange }) {
    const handleNestedChange = (parent, child, value) => {
        onSettingsChange((prev) => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [child]:
                    typeof value === 'number'
                        ? Number(value.toFixed(2))
                        : value,
            },
        }));
    };

    // Обработчики

    const handleWaveformChange = (value) => {
        onSettingsChange((prev) => ({
            ...prev,
            oscillator: value,
        }));
    };

    const toggleEffect = (effectType) => {
        onSettingsChange((prev) => ({
            ...prev,
            effects: {
                ...prev.effects,
                [effectType]: {
                    ...prev.effects[effectType],
                    active: !prev.effects[effectType].active,
                },
            },
        }));
    };

    return (
        <ControlsContainer>
            <PresetManager />
            <ControlGroup>
                <Label>waveform</Label>
                <WaveformSelect
                    value={settings.oscillator}
                    onChange={handleWaveformChange}
                />
            </ControlGroup>

            <ControlGroup>
                <Label>volume ({dbToPercent(settings.volume)}%)</Label>

                <StyledInput
                    min={MIN_VOLUME}
                    max={MAX_VOLUME}
                    step="1"
                    value={settings.volume}
                    onChange={(e) =>
                        onSettingsChange((prev) => ({
                            ...prev,
                            volume: Number(e.target.value),
                        }))
                    }
                />
            </ControlGroup>

            <ControlGroup>
                <Label>attack ({settings.envelope.attack})</Label>
                <StyledInput
                    min="0"
                    max="5"
                    step="0.01"
                    value={settings.envelope.attack}
                    onChange={(e) =>
                        onSettingsChange((prev) => ({
                            ...prev,
                            envelope: {
                                ...prev.envelope,
                                attack: Number(e.target.value),
                            },
                        }))
                    }
                />

                <Label>decay ({settings.envelope.decay})</Label>
                <StyledInput
                    min="0"
                    max="2"
                    step="0.01"
                    value={settings.envelope.decay}
                    onChange={(e) =>
                        onSettingsChange((prev) => ({
                            ...prev,
                            envelope: {
                                ...prev.envelope,
                                decay: Number(e.target.value),
                            },
                        }))
                    }
                />

                <Label>sustain ({settings.envelope.sustain})</Label>
                <StyledInput
                    min="0"
                    max="1"
                    step="0.01"
                    value={settings.envelope.sustain}
                    onChange={(e) =>
                        onSettingsChange((prev) => ({
                            ...prev,
                            envelope: {
                                ...prev.envelope,
                                sustain: Number(e.target.value),
                            },
                        }))
                    }
                />

                <Label>release ({settings.envelope.release})</Label>
                <StyledInput
                    min="0"
                    max="5"
                    step="0.01"
                    value={settings.envelope.release}
                    onChange={(e) =>
                        onSettingsChange((prev) => ({
                            ...prev,
                            envelope: {
                                ...prev.envelope,
                                release: Number(e.target.value),
                            },
                        }))
                    }
                />
            </ControlGroup>

            <EffectControlGroup $isActive={settings.effects.distortion.active}>
                <EffectToggleButton
                    $isActive={settings.effects.distortion.active}
                    onClick={() => toggleEffect('distortion')}
                ></EffectToggleButton>
                <Label>
                    distortion ({settings.effects.distortion.distortion})
                </Label>
                <StyledInput
                    disabled={!settings.effects.distortion.active}
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.effects.distortion.distortion}
                    onChange={(e) =>
                        handleNestedChange('effects', 'distortion', {
                            ...settings.effects.distortion,
                            distortion: Number(e.target.value),
                        })
                    }
                />
            </EffectControlGroup>

            <EffectControlGroup $isActive={settings.effects.chorus.active}>
                <EffectToggleButton
                    $isActive={settings.effects.reverb.active}
                    onClick={() => toggleEffect('chorus')}
                ></EffectToggleButton>
                <Label>chorus ({settings.effects.chorus.frequency})</Label>
                <StyledInput
                    disabled={!settings.effects.chorus.active}
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={settings.effects.chorus.frequency}
                    onChange={(e) =>
                        handleNestedChange('effects', 'chorus', {
                            ...settings.effects.chorus,
                            frequency: Number(e.target.value),
                        })
                    }
                />
            </EffectControlGroup>

            <EffectControlGroup $isActive={settings.effects.reverb.active}>
                <EffectToggleButton
                    $isActive={settings.effects.reverb.active}
                    onClick={() => toggleEffect('reverb')}
                ></EffectToggleButton>
                <Label>reverb ({settings.effects.reverb.decay})</Label>
                <StyledInput
                    disabled={!settings.effects.reverb.active}
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={settings.effects.reverb.decay}
                    onChange={(e) =>
                        handleNestedChange('effects', 'reverb', {
                            ...settings.effects.reverb,
                            decay: Number(e.target.value),
                        })
                    }
                />
            </EffectControlGroup>
        </ControlsContainer>
    );
}
