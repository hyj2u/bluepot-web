/** @jsxImportSource @emotion/react */

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { CursorTheme, CursorType } from '../_themes/cursor';
import { SpaceTheme, SpaceType } from '../_themes/space';

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    SpaceType,
    CursorType {
  children: ReactNode;
  size?: number;
  color?: string;
  disabledColor?: string;
  lineHeight?: number;
  txtAlign?: 'start' | 'end' | 'center';
  weight?: 'lighter' | 'normal' | 'medium' | 'bold';
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line';
  underline?: boolean;
}

export function TxtTab(props: Props) {
  const { cursor, color = '#4788f4', size = 14 } = props;
  const { padding, margin, weight = 'normal', disabledColor, underline } = props;

  const TYPOGRAPH_WEIGHT = {
    lighter: { fontWeight: '300' },
    normal: { fontWeight: '400' },
    medium: { fontWeight: '500' },
    bold: { fontWeight: '600' },
  } as const;

  const spaceT = SpaceTheme({ padding, margin }) as any;
  const cursorT = CursorTheme({ cursor, onClick: props.onClick }) as any;

  return (
    <button
      type="button"
      css={{
        whiteSpace: 'nowrap',
        fontWeight: TYPOGRAPH_WEIGHT[weight].fontWeight,
        fontSize: size ? `${size / 16}rem` : '0.938rem',
        color,
        textDecoration: underline && 'underline',
        transition: '0.1s ease-in-out',
        ...spaceT,
        ...cursorT,

        '&:disabled': { color: disabledColor ?? '#ccc', cursor: 'default' },

        '&:active': { opacity: 0.7 },
      }}
      {...props}
    >
      {props.children}
    </button>
  );
}
