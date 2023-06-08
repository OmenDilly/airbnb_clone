'use client'

import React, { FC } from 'react'
import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon
}) => {
  return (
    <button
      className={`
        relative
        dusabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-90
        transition
        w-full
        border-rose-500
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-[2px]'}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {
        Icon && (
          <Icon
            size={small ? 18 : 24}
            className={`
              absolute
              ${small ? 'left-2 top-1' : 'left-4 top-3'}
            `}
          />
        )
      }
      {label}
    </button>
  )
}

export default Button