import styled from 'styled-components';

export const StyledHeader = styled.header`
    color: white;
    text-align: center;
    padding-top: 50px;

    .title {
        font-size: 48px;
        margin: auto;
    }

    .subtitle {
        font-size: 24px;
    }
`;
export default function Header() {
    return (
        <StyledHeader className="Header">
            <h1 className="title">WebSynth</h1>
            <h2 className="subtitle">Tone/React based synthetizer</h2>
        </StyledHeader>
    );
}
