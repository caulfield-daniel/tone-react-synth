import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import {
    PiWaveSawtooth,
    PiWaveSine,
    PiWaveSquare,
    PiWaveTriangle,
} from 'react-icons/pi';

const WaveformIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    gap: 10px;
    cursor: pointer;
    svg {
        font-size: 36px;
        flex-shrink: 0;
    }
`;

const StyledSelect = styled(Select)`
    display: flex;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #666;
    background: #555;
    color: white;
    z-index: 10;
    align-items: center;
    justify-content: center;

    .react-select__control {
        background: #555;
        border: none;
        box-shadow: none;
        width: 100%;
        height: 100%;
    }

    .react-select__indicator-separator {
        display: none;
    }

    .react-select__indicator {
        display: none;
    }

    .react-select__value-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .react-select__single-value {
        color: white !important;
    }

    .react-select__menu {
        background: #555;
    }

    .react-select__menu-list {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const options = [
    {
        value: 'sine',
        label: 'sine',
        icon: <PiWaveSine />,
    },
    {
        value: 'square',
        label: 'square',
        icon: <PiWaveSquare />,
    },
    {
        value: 'sawtooth',
        label: 'sawtooth',
        icon: <PiWaveSawtooth />,
    },
    {
        value: 'triangle',
        label: 'triangle',
        icon: <PiWaveTriangle />,
    },
];

const CustomOption = ({ innerProps, data }) => (
    <WaveformIconContainer {...innerProps}>
        {data.icon}
        {/* {data.label} */}
    </WaveformIconContainer>
);

const CustomSingleValue = ({ data }) => (
    <WaveformIconContainer>
        {data.icon}
        {/* {data.label} */}
    </WaveformIconContainer>
);

export default function WaveformSelect({ value, onChange }) {
    return (
        <StyledSelect
            classNamePrefix="react-select"
            options={options}
            components={{
                Option: CustomOption,
                SingleValue: CustomSingleValue,
            }}
            isSearchable={false}
            value={options.find((opt) => opt.value === value)}
            onChange={(selected) => onChange(selected.value)}
        />
    );
}
