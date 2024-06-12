import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup'
import { useUser } from "../../hooks/UserContext";

import api from '../../services/api'

import Button from "../../components/Button";
import LoginImg from '../../assets/Login_Image.png'
import LogoImg from '../../assets/logo.png'
import {
  Container,
  ContainerItens,
  Label,
  Input,
  SignInLink,
  LoginImage,
  ErrorMessage
} from './styles'

function Login() {
const {putUserData} = useUser()

  const schema = Yup.object().shape({
    email: Yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 digitos')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })



  const onSubmit = async clientData => {

    const {data} = await toast.promise(
      api.post('sessions', {
        email: clientData.email,
        password: clientData.password
      }),
      {
        pending:'Verificando seus dados',
        success:'Seja bem-vindo(a)',
        error:'Verifique seu e-mail e senha'
      }
    )
    putUserData(data)
    
  }

  return (
    <Container>
      <LoginImage src={LoginImg} alt='login-image' />
      <ContainerItens>
        <img src={LogoImg} alt='logo-image' />
        <h1>Login</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>Email</Label>
          <Input type="email" {...register("email")} error={errors.email?.message}></Input>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label>Senha</Label>
          <Input type="password" {...register("password")} error={errors.password?.message}></Input>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
          <Button type="submit" style={{ marginTop:75, marginBottom:25}}>Sign In</Button>
        </form>
        <SignInLink>Não possui conta ? <a>Sign Up</a></SignInLink>
      </ContainerItens>
    </Container>
  )
}

export default Login;
