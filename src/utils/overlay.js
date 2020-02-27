import { css } from 'styled-components';

export const overlay = css`
  position: relative;

  &:after {
    content: ' ';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.27);
    opacity: 0;
    transition: all 0.4s;
    -webkit-transition: all 0.4s;
  }

  &:hover:after {
    opacity: 1;
  }
`;
