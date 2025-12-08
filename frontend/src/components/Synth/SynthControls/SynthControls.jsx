import {
    ControlsContainer,
    ControlGroup,
    Label,
    StyledInput,
} from './SynthControls.style';
import WaveformSelect from './WaveformSelect/WaveformSelect';
import PresetManager from './PresetManager/PresetManager';
import EnvelopeControl from './EnvelopeControl';
import EffectControl from './EffectControl';
import { dbToPercent } from '../../../utils/volumeUtils';
import { MAX_VOLUME, MIN_VOLUME } from '../../../config/synthConfiguration';
import { SYNTH_PRESETS } from '../../../config/synthPresets';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function SynthControls({ settings, onSettingsChange }) {
    const handleWaveformChange = (value) => {
        onSettingsChange((prev) => ({ ...prev, oscillator: value }));
    };

    const handleVolumeChange = (volume) => {
        onSettingsChange((prev) => ({ ...prev, volume: Number(volume) }));
    };

    const handleEnvelopeChange = (newEnvelope) => {
        onSettingsChange((prev) => ({ ...prev, envelope: newEnvelope }));
    };

    const handleEffectChange = (effectType, newEffect) => {
        onSettingsChange((prev) => ({
            ...prev,
            effects: {
                ...prev.effects,
                [effectType]: newEffect,
            },
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

    const handleApplyPreset = (presetData) => {
        onSettingsChange((prev) => ({ ...prev, ...presetData }));
    };

    const handleResetPreset = () => {
        onSettingsChange((prev) => ({ ...prev, ...SYNTH_PRESETS.default }));
    };

    return (
        <ControlsContainer>
            <PresetManager
                currentPresetData={settings}
                onApplyPreset={handleApplyPreset}
                onResetPreset={handleResetPreset}
                apiBaseUrl={apiBaseUrl}
                localPresets={SYNTH_PRESETS}
            />

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
                    type="range"
                    min={MIN_VOLUME}
                    max={MAX_VOLUME}
                    step="1"
                    value={settings.volume}
                    onChange={(e) => handleVolumeChange(e.target.value)}
                />
            </ControlGroup>

            <EnvelopeControl
                envelope={settings.envelope}
                onChange={handleEnvelopeChange}
            />

            {['distortion', 'chorus', 'reverb'].map((effectType) => (
                <EffectControl
                    key={effectType}
                    type={effectType}
                    effect={settings.effects[effectType]}
                    onChange={(newEffect) =>
                        handleEffectChange(effectType, newEffect)
                    }
                    onToggle={() => toggleEffect(effectType)}
                />
            ))}
        </ControlsContainer>
    );
}
