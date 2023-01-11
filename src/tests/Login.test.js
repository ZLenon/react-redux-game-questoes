import React from "react";
import { findByText, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Login from "../Pages/Login";
import App from "../App";

const nome = 'Jose da Silva';
const email = 'alguem@email.com';

describe('Pagina de Login', () => {
  it('Ao colocar valores corretos, o botão fica habilitado', () => {
    renderWithRouterAndRedux(<Login />);

    // novos inputs no formulario
    const nomeInput = screen.getByTestId('input-player-name');
    userEvent.type(nomeInput, nome);
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, email);

    // confere se com valores validos o botao esta habilitado
    const button = screen.getByTestId('btn-play');
    expect(button).not.toBeDisabled();
  });

  it('Ao apertar o botão, é redirecionado a outra pagina', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const nomeInput = screen.getByTestId('input-player-name');
    userEvent.type(nomeInput, nome);
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, email);
    const button = screen.getByTestId('btn-play');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  });

  it('Ao apertar o botão, o token é guardado no localstorage', async () => {

    const joke = {
      "response_code":0,
      "response_message":"Token Generated Successfully!",
      "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    };
  
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(joke),
    });

    window.localStorage.setItem('token', '');

    renderWithRouterAndRedux(<App />);

    const nomeInput = screen.getByTestId('input-player-name');
    userEvent.type(nomeInput, nome);
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, email);
    const button = screen.getByTestId('btn-play');
    userEvent.click(button);
  });
});