import styled from 'styled-components/macro';

export const SessionButton = styled.button`
    display: inline-block;
    padding: 5px;
    
    &:hover {
        background: rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: translate(1px, 1px);
    }
`;

const Icon = styled.img`
    margin-right: 4px;
    padding: 2px;
    vertical-align: middle;
    box-sizing: border-box;
    border: 1px solid #FEFEFE;
    border-radius: 3px;
`;

export const DangerIcon = styled(Icon)`
    background: radial-gradient(circle at 5% 5%, #F1AF9F, #E35830, #DE3601);
    box-shadow: 
        inset 1px 1px 1px #E35E3D,
        inset -2px -2px 3px -1px rgb(131, 26, 0);
    
    &:hover, *:hover>& {
        background:
            radial-gradient(circle at 70% 70%, #FE9870, transparent 40%), 
            radial-gradient(circle at 5% 5%, #F1AF9F 10%, #F64D3A 60%);
        box-shadow: 
            inset 1px 1px 1px #FE7667cc,
            inset -1px -1px 3px rgba(177, 51, 32, 0.89);
    }
`;

export const WarningIcon = styled(Icon)`
    background: radial-gradient(circle at 5% 5%, #EDCD9F, #DB9B36, #E3B113);
    box-shadow: 
        inset 1px 1px 1px #DC9E44,
        inset -2px -2px 3px #9B6311;
    
    &:hover, *:hover>& {
        background:
            radial-gradient(circle at 70% 70%, #FEE226, transparent 40%), 
            radial-gradient(circle at 5% 5%, #FED9A3 10%, #F59F1D 60%);
        box-shadow: 
            inset 1px 1px 1px #FEB548,
            inset -1px -1px 3px #BC7610;
    }
`;

