/** @jsxImportSource @emotion/react */
import React, { ForwardedRef, HTMLAttributes, ReactNode, forwardRef } from 'react';

import { FlexTheme, FlexType } from '../../_themes/flex';
import { ViewportTypes } from '../../_themes/viewport';

interface Props extends HTMLAttributes<HTMLElement>, ViewportTypes, FlexType {
  children: ReactNode;
  variant?: 'light' | 'dark';
  backgroundColor?: string;
}

const Section = forwardRef((props: Props, ref: ForwardedRef<HTMLElement>) => {
  const {
    zIndex,
    width = '100%',
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    flex,
    direction = 'vertical',
    align = 'center',
    crossAlign,
    wrap,
    gap,
    crossGap,
    backgroundColor,
    ...rest
  } = props;

  const FlexThemes = FlexTheme({
    direction,
    flex: flex ?? '1 auto',
    align,
    crossAlign,
    wrap,
    gap,
    crossGap,
  });

  return (
    <section
      ref={ref}
      css={[
        {
          ...FlexThemes,
          zIndex,
          width,
          height,
          minWidth,
          maxWidth,
          minHeight,
          maxHeight,
          backgroundColor,
          paddingRight: 'env(safe-area-inset-right)',
          paddingLeft: 'env(safe-area-inset-left)',
        },
      ]}
      {...rest}
    >
      {rest.children}
    </section>
  );
});

export { Section };
