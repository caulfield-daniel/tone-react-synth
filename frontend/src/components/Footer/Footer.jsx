import styled from 'styled-components';

export const StyledFooter = styled.footer`
    background-color: transparent;
    color: white;
    padding: 20px 0;
    text-align: center;
`;

export const FooterParagraph = styled.p`
    font-size: 14px;
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
`;

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <StyledFooter>
            <FooterParagraph>
                &copy; {currentYear} Daniel Caulfield, NCFU.
            </FooterParagraph>
        </StyledFooter>
    );
}
