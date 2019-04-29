import styled from 'styled-components/macro';
import moreProgramsArrow from '../../../assets/widgets/startpanel-moreprograms-normal.png';
import moreProgramsArrowHover from '../../../assets/widgets/startpanel-moreprograms-hover.png';

export const MoreProgramsButton = styled.div`
    min-height: 30px;
    flex: 0 0;
    color: rgb(55, 55, 56);
    font-family: 'Tahoma';
    font-size: 8pt;
    font-weight: bold;
    position: relative;
    padding: 0px 8px 6px 8px;
    text-align: center;

    &::after {
        content: '';
        display: inline-block;
        vertical-align: middle;
        background-image: url(${moreProgramsArrow});
        width: 16px;
        height: 24px;
        margin-left: 12px;
    }

    &:hover {
        color: white;
        background: rgb(48, 112, 208);
        background-clip: content-box;

        &::after {
            background-image: url(${moreProgramsArrowHover});
        }
    }
`;