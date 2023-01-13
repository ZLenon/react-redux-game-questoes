import React from "react";
import { findByText, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Login from "../Pages/Login";
import App from "../App";
import mockResult from "./helpers/mock";

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

  it('Ao apertar o botão, o token é guardado no localstorage', () => {

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
describe('Testa a tela de Feedback.', () => {
  it('verifica se todas as informações são apresentadas conforme solicitado;', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResult),
    });

    renderWithRouterAndRedux(<App />, mockResult, '/feedback');

    const feedback = screen.getByTestId('h1-text');
    const message = screen.getByTestId('feedback-text');
    const hits = screen.getByText('Acertos:');
    const valueHits = screen.getByTestId('feedback-total-question');
    const points = screen.getByText('Pontuação:');
    const valuePoints = screen.getByTestId('feedback-total-score');
    const buttonPlayAgain = screen.getByTestId('btn-play-again');
    const buttonRanking = screen.getByTestId('btn-ranking');

    expect(feedback).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(hits).toBeInTheDocument();
    expect(valueHits.innerHTML).toEqual('4');
    expect(points).toBeInTheDocument();
    expect(valuePoints.innerHTML).toEqual('243');
    expect(buttonPlayAgain).toBeInTheDocument();
    expect(buttonRanking).toBeInTheDocument();

    userEvent.click(buttonPlayAgain);
  });
  it('verifica se ao clicar no botão "Play Again", o usuário retorna para tela de Login;', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResult),
    });

    const { history } = renderWithRouterAndRedux(<App />, mockResult, '/feedback');

    const buttonPlayAgain = screen.getByTestId('btn-play-again');
    

    userEvent.click(buttonPlayAgain);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
  it('verifica se ao clicar no botão "Ranking", o usuário retorna para tela de Ranking;', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResult),
    });

    const { history } = renderWithRouterAndRedux(<App />, mockResult, '/feedback');

    const buttonRanking = screen.getByTestId('btn-ranking');

    userEvent.click(buttonRanking);

    const { pathname } = history.location;
    
    expect(pathname).toBe('/ranking');
  });
});