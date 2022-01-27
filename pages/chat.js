import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React, { useImperativeHandle, useState } from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
  const [mensagem, setMensagem] = React.useState('');
  const [listaDeMensagens, setListadeMensagens] = React.useState([]);

  // Usuário
  // - usuário digita no camo textarea
  // - aperta enter para enviar
  // - tem que adicionar o texto na listagem

  // Dev
  // [x] campo criado
  // - vamos usar o onChange, UseState (limpar o campo apos o envio)
  // - lista de mensagem

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      id: listaDeMensagens.length + 1,
      de: 'tfpeixoto',
      texto: novaMensagem,
    }
    // chamada de um backend
    setListadeMensagens([
      mensagem,
      ...listaDeMensagens
    ])
    setMensagem('');
  }

  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >
          <MessageList mensagens={listaDeMensagens} />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              value={mensagem}
              onChange={e => {
                const valor = e.target.value;
                setMensagem(valor);
              }}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button 
            onClick={e => {
              handleNovaMensagem(mensagem);
            }}
            iconName="arrowRight" 
            styleSheet={{
              maxWidth: '40px',
              maxHeight: '40px',
            }}
            buttonColors={{
              contrastColor: appConfig.theme.colors.neutrals["000"],
              mainColor: appConfig.theme.colors.primary[500],
              mainColorLight: appConfig.theme.colors.primary[400],
              mainColorStrong: appConfig.theme.colors.primary[600],
            }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  const mensagens = props.listaDeMensagens;

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
      }}
    >

      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">
                {mensagem.de}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {(new Date().toLocaleDateString())}
              </Text>
              <Icon
                onClick={e => {
                  console.log(mensagem.id)
                }}
                label="Fechar"
                name="FaTimes"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals['000'],
                  cursor: 'Pointer',
                  float: 'Right',
                }}
              />
            </Box>
            {mensagem.texto}
          </Text>
        );
      })
      }
    </Box>
  )
}