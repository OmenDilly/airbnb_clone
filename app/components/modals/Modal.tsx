'use client'

import React, { FC, ReactElement, ReactNode, useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from '../ui/Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
  secondaryActionLabel?: string
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel
}) => {

  const [showModal, setShowModal] = useState<boolean>(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleCloseModal = useCallback(() => {
    if (disabled) {
      return null
    }

    setShowModal(false)

    setTimeout(() => {
      onClose()
    }, 300)

  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return null
    }
    
    onSubmit
  }, [disabled, onSubmit])

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return null
    }
    
    secondaryAction()
  }, [disabled, secondaryAction])

  if (!isOpen) {
    return null
  }

  return (
    <>
      {/* modal backdrop */}
      <div
        className='
          flex
          items-center
          justify-center
          overflow-x-hidden
          overflow-y-auto
          fixed
          inset-0
          z-50
          outline-none
          focus:outline-none
          bg-neutral-800/70
        '
      >
        <div
          className='
            relative
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto
            h-full
            lg:h-auto
            md:h-auto
          '
        >
          {/* modal content */}
          <div
            className={`
              translate
              duration-300
              h-full
              ${showModal ? 'translate-y-0' : 'translate-y-full'}
              ${showModal ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div
              className='
                translate
                h-full
                lg:h-auto
                md:before:h-auto
                border-o
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
              '
            >
              {/* modal header */}
              <div
                className='
                  flex
                  items-center
                  p-6
                  rounded-t
                  justify-center
                  relative
                  border-b-[1px]
                '
              >
                <button
                  className='
                    p-2
                    border-0
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  '
                  onClick={handleCloseModal}
                >
                  <IoMdClose size={18}/>
                </button>
                <div
                  className='
                    text-lg
                    font-semibold
                  '
                >
                  {title}
                </div>
              </div>
              {/* modal body */}
              <div
                className='
                  relative
                  p-6
                  flex-auto
                '
              >
                {body}
              </div>
              {/* modal footer */}
              <div
                className='
                  gap-2
                  p-6
                  flex
                  flex-col
                '
              >
                <div
                  className='
                    flex
                    flex-row
                    items-center
                    gap-4
                    w-full
                  '
                >
                  {
                    secondaryAction && secondaryActionLabel && (
                      <Button
                        outline
                        disabled={disabled}
                        label={secondaryActionLabel}
                        onClick={handleSecondaryAction}
                      />
                    )
                  }
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal