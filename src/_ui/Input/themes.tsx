/** @jsxImportSource @emotion/react */

import { ReactNode } from 'react'
import { V } from '../flex/V'
import { GlobalInputTheme } from '../_themes/input'
type SizeProps = {
    width?: string | number | '100%' | '50%'
    height?: string | number | '100%'
    borderRadius?: string | number
    padding?: string | number
    txtSize?: number | string
    labelSize?: number | string
}

type ThemeProps = {
    labelColor?: string
    backgroundColor?: string
    borderColor?: string
    txtColor?: string
    edgeColor?: string
    placeholderColor?: string
}

type InputBoxProps = {
    themes: {
        default: ThemeProps | undefined
        error: ThemeProps | undefined
        disabled: ThemeProps | undefined
        focus: ThemeProps | undefined
    }
    sizes: SizeProps | undefined
    focus: boolean | undefined
    error: boolean | undefined
    disabled: boolean | undefined
    children: ReactNode
    align?: 'start' | 'end' | 'center'
}

//
// 라벨
export const Label = ({
    htmlFor,
    important,
    labelSize,
    themes,
    error,

    ...props
}: {
    htmlFor: any
    important: any
    labelSize: string | number
    themes: any
    error: boolean
    children: ReactNode
}) => {
    const LabelColor = () => {
        if (error) return themes?.error?.labelColor ?? '#FF6767'
        return themes?.default?.labelColor ?? '#888'
    }

    return (
        <label
            htmlFor={htmlFor}
            css={{
                color: LabelColor(),
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                fontSize: labelSize ?? '0.813rem',
                marginBottom: '6px',

                '&:focus-within': { fontWeight: 500 },
            }}
        >
            {props.children}
            {!!important && <span css={{ fontSize: 11, color: '#fa7979', fontWeight: 500 }}>{important ?? '*'}</span>}
        </label>
    )
}

//
// 인풋 박스
export const InputBox = ({ sizes, themes, focus, error, disabled, align, ...props }: InputBoxProps) => {
    const borderColor = () => {
        if (focus && !error) return themes?.focus?.borderColor ?? '#b9d0e4'
        if (disabled) return themes?.disabled?.borderColor ?? '#eee'
        if (error) return themes?.error?.borderColor ?? '#FF6767'
        return themes?.default?.borderColor ?? '#e0e0e0'
    }

    const bgColor = () => {
        if (focus && !error) return themes?.focus?.backgroundColor ?? '#f8f9fc'
        if (disabled) return themes?.disabled?.backgroundColor ?? '#f5f5f5'
        if (error) return themes?.error?.backgroundColor ?? '#fffbfb'
        return themes?.default?.backgroundColor ?? '#fff'
    }

    return (
        <V.Row
            width={(sizes?.width as any) ?? '100%'}
            maxWidth={(sizes?.width as any) ?? '100%'}
            align={align ?? 'center'}
            minHeight={sizes?.height ?? 50}
            maxHeight={sizes?.height ?? 50}
            border={{
                solid: 1,
                position: 'all',
                color: borderColor(),
            }}
            borderRadius={sizes?.borderRadius ?? 14}
            backgroundColor={bgColor()}
            transitionTime={0.5}
        >
            {props.children}
        </V.Row>
    )
}

//
// 인풋 스타일
export const InputTheme = ({ sizes, themes, focus, error, disabled }: Omit<InputBoxProps, 'children'>) => {
    const colorTheme = () => {
        if (focus && !error) return themes?.focus?.txtColor ?? '#555'
        if (disabled) return themes?.disabled?.txtColor ?? '#797979'
        if (error) return themes?.error?.txtColor ?? '#555'
        return themes?.default?.txtColor ?? '#555'
    }

    const placeholderTheme = () => {
        if (focus && !error) return themes?.focus?.placeholderColor ?? '#c2c2c2'
        if (disabled) return themes?.disabled?.placeholderColor ?? '#c2c2c2'
        if (error) return themes?.error?.placeholderColor ?? '#c2c2c2'
        return themes?.default?.placeholderColor ?? '#c2c2c2'
    }

    return {
        ...(GlobalInputTheme() as any),
        width: '100%',
        height: '100%',
        color: colorTheme(),
        fontSize: sizes?.txtSize ?? 15,
        padding: sizes?.padding ?? 13,
        outline: 'none',
        border: 'none',
        resize: 'none',
        backgroundColor: 'transparent',
        font: 'inherit',
        WebkitBoxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        boxSizing: 'border-box',
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        backgroundRepeat: 'no-repeat',
        '::placeholder': { color: placeholderTheme() },
    }
}

//
//
export const InputEdgeColorTheme = ({ themes, focus, error, disabled }: Omit<InputBoxProps, 'children' & 'size'>) => {
    if (focus && !error) return themes?.focus?.edgeColor ?? '#999'
    if (disabled) return themes?.disabled?.edgeColor ?? '#999'
    if (error) return themes?.error?.edgeColor ?? '#999'
    return themes?.default?.edgeColor ?? '#888'
}
