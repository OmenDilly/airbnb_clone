'use client'

import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import useRegisterModal from '../hooks/useRegisterModal'
import { FieldValues, SubmitErrorHandler, useForm } from 'react-hook-form'
import Modal from './Modal'
import Heading from '../ui/Heading'
import Input from '../ui/Input'

const RegisterModal = () => {

  const registerModal = useRegisterModal()

  const [isloading, setIsloading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    setIsloading(true)
    console.log(data)

    axios.post('api/register', data)
      .then(() => {
        registerModal.onClose()
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsloading(false)
      })
  }

  const bodyContent = (
    <div
      className='
        flex
        flex-col
        gap-4
      '
    >
      <Heading
        title='Welcome to Airbnb'
        subtitle='Create an account'
      />
      <Input
        id='name'
        label='name'
        type='name'
        disabled={isloading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='email'
        label='email'
        type='email'
        disabled={isloading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='password'
        type='password'
        disabled={isloading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  return (
    <Modal
      disabled={isloading}
      isOpen={registerModal.isOpen}
      actionLabel='Continue'
      title='Register'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  )
}

export default RegisterModal