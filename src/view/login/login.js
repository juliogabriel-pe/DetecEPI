import React, { useState } from "react";
import styled from 'styled-components';
// import { useSelector, useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
// import logoImage from '../../image/logo.jpeg';
import { Button } from "@mui/material";

const Card = styled.div`
    display: flex;
    background-color: #f7f7f7;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.1);
    border-radius: 14px;
    max-width: 800px; /* Largura máxima do card */
    margin: 0 auto; /* Centralizar o card na tela */
    overflow: hidden; /* Para evitar que o conteúdo ultrapasse as bordas */
    margin-top: 200px;
    text-align: left;
`;
 
const LeftSide = styled.div`
  flex: 1;
  background-color: #012442;
  color: #fff;
  padding: 10px;
  text-align: center;
  // height: 50vh;
  width: 30px;
`;

const RightSide = styled.div`
  flex: 1.5;
  padding: 50px;

`;

const Title = styled.h1`
  font-size: 30px;
  margin-top: 50px;
  padding: 30px;
`;

const TitleRight = styled.h1`
  font-size: 30px;
  padding: 10px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
`;

// const Logo = styled.img`
//   max-width: 100%;
//   height: auto;
//   margin-bottom: 10px;
// `;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
  align-items: left;
  width: 100% 
`;

const Input = styled.input`
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  border: 0px;
  border-radius: 10px;
`;

function Login(){
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [msgTipo, setMsgTipo] = useState('');

    async function logar() {

        try {
            // Fazendo a requisição POST à rota /Adms (ou a rota correta de login)
            const response = await fetch('https://localhost:8080/Adms', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Falha ao fazer login');
            }

            const data = await response.json();

            // Supondo que a resposta contenha um campo indicando sucesso
            if (data !== null) {
                setMsgTipo('success');
                const usuario = data.find(user => user.email === email && user.senha === senha);

                if (usuario) {
                    
                    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                    debugger;
                    navigate('/home');
                } 
                else {
                    setMsgTipo('error');
                    debugger
                }

            } else {
                setMsgTipo('error');
                // Mostre a mensagem de erro apropriada
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setMsgTipo('error');
            // Mostre uma mensagem de erro para o usuário
        }
    }

    return(
        <>

            {/* {
                useSelector(state => state.usuarioLogado) > 0 ? <Navigate to='/' /> : null
            } */}

            <Card>
                <LeftSide>
                    <Title><br/>Bem-vindo de volta!</Title>
                    <Subtitle>Acesse sua conta agora mesmo</Subtitle>
                    {/* <Logo src={} alt="Logo" /> */}
                    <div>
                        hello, world!
                    </div> 
                </LeftSide>
                <RightSide>

                    <TitleRight>Login</TitleRight>
                    <Label style={{textAlign: 'left'}}>Informe seu e-mail</Label>
                    <Input 
                        type="text" 
                        name='email' 
                        required={true}
                        placeholder="Digite seu login"
                        onChange={(e)=> setEmail(e.target.value)} 
                    />
                    <Label style={{textAlign: 'left'}}>Informe sua senha</Label>
                    <Input 
                        type="password" 
                        name='password' 
                        required={true}
                        placeholder="Digite sua senha"
                        onChange={(e)=> setSenha(e.target.value)}  
                    />

                    
                    <Button     
                        style={{
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '10px',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%',
                            paddingTop: '10px',
                            marginTop: '20px',                              
                            marginBottom: '10px',                              
                            borderRadius: '10px'
                            
                        }}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className=""
                        onClick={logar}
                    >
                        Acessar
                    </Button>
                    
                    <Label style={{textAlign: 'left'}}>O Registro é por Conta da Empresa</Label>
                        
                    <div className="msg-login text-white text-center my-5">
                        <span style={{color: 'red'}}><strong>{msgTipo}</strong></span>
                    </div>
                </RightSide>

            </Card>
        </>
    )
}

export default Login;