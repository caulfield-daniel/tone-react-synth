import styled from 'styled-components';
import WaveformSelect from './WaveformSelect';

const ControlsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    padding: 1rem;
    margin-bottom: 2rem;
    border: 1px solid #666;
`;

const ControlGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    width: 100%;
`;

const Label = styled.label`
    color: #c8c8c8;
    font-size: 0.8rem;
    text-align: left;
    margin: 0.2rem;
    user-select: none;
`;

const StyledInput = styled.input.attrs({ type: 'range' })`
    width: 100%;
    height: 5px;
    cursor: pointer;
`;

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

    const handleWaveformChange = (value) => {
        onSettingsChange((prev) => ({
            ...prev,
            oscillator: value,
        }));
    };

    return (
        <ControlsContainer>
            <ControlGroup>
                <Label>waveform</Label>
                <WaveformSelect
                    value={settings.oscillator}
                    onChange={handleWaveformChange}
                />
            </ControlGroup>

            <ControlGroup>
                <Label>
                    volume ({(((settings.volume + 40) / 34) * 100).toFixed()}%)
                </Label>

                <StyledInput
                    min="-40"
                    max="-6"
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

            <ControlGroup>
                <Label>distortion ({settings.effects.distortion})</Label>
                <StyledInput
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.effects.distortion}
                    onChange={(e) =>
                        handleNestedChange(
                            'effects',
                            'distortion',
                            Number(e.target.value)
                        )
                    }
                />

                <Label>chorus ({settings.effects.chorus.frequency})</Label>
                <StyledInput
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

                <Label>reverb ({settings.effects.reverb.decay})</Label>
                <StyledInput
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
            </ControlGroup>
        </ControlsContainer>
    );
}
