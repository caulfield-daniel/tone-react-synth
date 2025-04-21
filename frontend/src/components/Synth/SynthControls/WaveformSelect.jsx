import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const WaveformIcon = styled.div`
    display: flex;
    align-items: center;
    padding: 8px;
    img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
`;

const StyledSelect = styled(Select)`
    width: 200px;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #666;
    background: #555;
    color: white;
    z-index: 10;

    .react-select__control {
        background: #555;
        border: none;
        box-shadow: none;
    }

    .react-select__single-value {
        color: white !important;
    }

    .react-select__menu {
        background: #555;
    }

    .react-select__option {
        &:hover {
            background: #666;
        }
    }
`;

const waveformIcons = {
    sine: '/icons/waveform-sine.png',
    square: '/icons/waveform-square.png',
    sawtooth: '/icons/waveform-sawtooth.png',
    triangle: '/icons/waveform-triangle.png',
};

const CustomOption = ({ innerProps, data }) => (
    <WaveformIcon {...innerProps}>
        <img src={data.icon} alt={data.label} />
        {data.label}
    </WaveformIcon>
);

const CustomSingleValue = ({ data }) => (
    <WaveformIcon>
        <img src={data.icon} alt={data.label} />
        {data.label}
    </WaveformIcon>
);

const options = [
    { value: 'sine', label: 'sine', icon: waveformIcons.sine },
    { value: 'square', label: 'square', icon: waveformIcons.square },
    { value: 'sawtooth', label: 'sawtooth', icon: waveformIcons.sawtooth },
    { value: 'triangle', label: 'triangle', icon: waveformIcons.triangle },
];

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
