import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup'
import api from '../../services/api'

import Button from "../../components/Button";
import RegisterImg from '../../assets/burgerImage.png'
import LogoImg from '../../assets/logo.png'
import {
  Container,
  ContainerItens,
  Label,
  Input,
  SignInLink,
  RegisterImage,
  ErrorMessage
} from './styles'
import { toast } from "react-toastify";
import { Link } from "react-router-dom"

function Register() {
  const schema = Yup.object().shape({
    name: Yup.string().required('O seu nome é obrigatório'),
    email: Yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 digitos'),
    confirmPassword: Yup.string().required('A senha é obrigatória').oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })



  const onSubmit = async clientData => {

    try {
      const { status } = await api.post('users', {
        name: clientData.name,
        email: clientData.email,
        password: clientData.password
      }, { validateStatus: () => true })

      if (status == 201 || status == 200) { 
        toast.success('Cadastro criado com sucesso  ') 
      }else if (status ==409){
        toast.error('E-mail já cadastrado! Faça login para continuar')
      }else {
        throw new Error()
      }

    } catch (err) {
      toast.error("Falha no sistema tente novamente")
    }


  }

  return (
    <Container>
      <RegisterImage src={RegisterImg} alt='register-image' />
      <ContainerItens>
        <img src={LogoImg} alt='logo-image' />
        <h1>Cadastre-se</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>Nome</Label>
          <Input type="text" {...register("name")} error={errors.name?.message}></Input>
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

          <Label>Email</Label>
          <Input type="email" {...register("email")} error={errors.email?.message}></Input>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label>Senha</Label>
          <Input type="password" {...register("password")} error={errors.password?.message}></Input>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Label>Confirmar Senha</Label>
          <Input type="password" {...register("confirmPassword")} error={errors.confirmPassword?.message}></Input>
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 25, marginBottom: 25 }}>Sign Up</Button>
        </form>
        <SignInLink>Já possui conta ? < Link style={{color:'white'}}  to="/login">Sign In</ Link></SignInLink>
      </ContainerItens>
    </Container>
  )
}

export default Register;
