import React from "react";
import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Login from "../Pages/Login";
import App from "../App";
import mockResult from "./helpers/mock";
import Ranking from "../Pages/Ranking";
import Feedback from "../Pages/Feedback";
import perguntasRespostas from "../services/DATA"
import requisicaoToken from "../services/API"
import Question from "../components/Question";

const nome = 'Jose da Silva';
const email = 'alguem@email.com';

afterEach(() => {
  localStorage.clear();
  cleanup();
});

describe('Testa a tela de Game:', () => {
  it('Verifica se com um token inválido, o usuario é redirecionado para a tela de Login;', async () => {
    const {history } = renderWithRouterAndRedux(<Question />);

    const teste = '156189156489';
    
    const jsonConv = JSON.stringify(teste);
    localStorage.setItem('token', jsonConv);
    const result = await perguntasRespostas(teste);
    await waitFor(() => {
      expect(result.response_code).toEqual(3);
      expect(history.location.pathname).toBe('/');
    });
  });
});

describe('Testa a tela de Login:', () => {
  it('Verifica se ao colocar valores corretos, o botão fica habilitado;', () => {
    renderWithRouterAndRedux(<Login />);

    const nomeInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const button = screen.getByTestId('btn-play');
    
    userEvent.type(nomeInput, nome);
    userEvent.type(emailInput, email);

    expect(button).toBeEnabled();
  });

  it('Verifica se ao clicar no botão "Play", o usuário é direcionado a tela de Game e o jogo começa;', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const nomeInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');

    userEvent.type(nomeInput, nome);
    userEvent.type(emailInput, email);
    userEvent.click(playButton);

    await waitFor(() => expect(history.location.pathname).toBe('/game'));

    const token = await requisicaoToken();
    localStorage.setItem('token', token);

    await perguntasRespostas(token)

    const correctButton = screen.getByTestId('correct-answer');
    userEvent.click(correctButton);

    const nextQuestion = screen.getByTestId('btn-next');
    userEvent.click(nextQuestion);

    const correctButton2 = screen.getByTestId('correct-answer');
    userEvent.click(correctButton2);

    const nextQuestion2 = screen.getByTestId('btn-next');
    userEvent.click(nextQuestion2);

    const correctButton3 = screen.getByTestId('correct-answer');
    userEvent.click(correctButton3);

    const nextQuestion3 = screen.getByTestId('btn-next');
    userEvent.click(nextQuestion3);

    const correctButton4 = screen.getByTestId('correct-answer');
    userEvent.click(correctButton4);

    const nextQuestion4 = screen.getByTestId('btn-next');
    userEvent.click(nextQuestion4);

    const correctButton5 = screen.getByTestId('correct-answer');
    userEvent.click(correctButton5);

    const timer = screen.getByTestId('timer-question');
    expect(timer.innerHTML).toBe('timer 30');
    
    const nextQuestion5 = screen.getByTestId('btn-next');
    userEvent.click(nextQuestion5);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/feedback');
    });
  });

  it('Verifica se ao clicar no botão "Play", o token é guardado no localstorage;', () => {
    const joke = {
      response_code: "0",
      response_message: "Token Generated Successfully!",
      token: "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    };
  
    renderWithRouterAndRedux(<App />);

    const nomeInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const button = screen.getByTestId('btn-play');

    userEvent.type(nomeInput, nome);
    userEvent.type(emailInput, email);
    userEvent.click(button);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(joke),
    });
    
    const resultJSON = JSON.stringify(joke.token);
    window.localStorage.setItem('token', resultJSON);
    const localStorage = window.localStorage.getItem('token');
    const finalResult = JSON.parse(localStorage);
    expect(finalResult).toBe('f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6');
  });

  it('Verifica se ao clicar no botão "Config", o usuário é direcionado a tela de Configurações;', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const configButton = screen.getByTestId('btn-settings');

    userEvent.click(configButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/settings');
  });
});

describe('Testa a tela de Feedback:', () => {
  it('Verifica se todas as informações são apresentadas conforme solicitado;', () => {
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
  });

  it('Verifica se caso haja acréscimo de novas jogadas, a tela de Feedback é atualizada;', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResult),
    });

    const info = [
      {
        name: 'Teste1',
        score: 70,
        picture: 'https://www.gravatar.com/avatar/0cc175b9c0f1b6a831c399e269772661',
      }
    ];

    const mergeInfo = [
      {
        name: 'Teste1',
        score: 70,
        picture: 'https://www.gravatar.com/avatar/0cc175b9c0f1b6a831c399e269772661',
      },
      {
        name: 'a',
        score: 243,
        picture: 'https://www.gravatar.com/avatar/0cc175b9c0f1b6a831c399e269772661',
      }
    ];

    window.localStorage.setItem('ranking', JSON.stringify(info));

    renderWithRouterAndRedux(<App />, mockResult, '/feedback');

    const a = window.localStorage.getItem('ranking');
    const b = JSON.parse(a)

    expect(b).toEqual(mergeInfo);
  });

  it('Verifica se a mensagem "Could be better" aparece na tela;', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResult),
    });

    const info = [
      {
        name: 'Teste1',
        score: 70,
        picture: 'https://www.gravatar.com/avatar/0cc175b9c0f1b6a831c399e269772661',
      }
    ];

    window.localStorage.setItem('ranking', JSON.stringify(info));

    renderWithRouterAndRedux(<Feedback />);

    const message = screen.getByTestId('feedback-text');

    expect(message.innerHTML).toBe('Could be better...');
  });

  it('Verifica se ao clicar no botão "Play Again", o usuário retorna para tela de Login;', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResult),
    });

    const { history } = renderWithRouterAndRedux(<App />, mockResult, '/feedback');

    const buttonPlayAgain = screen.getByTestId('btn-play-again');

    userEvent.click(buttonPlayAgain);
    
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Verifica se ao clicar no botão "Ranking", o usuário é direcionado para a tela de Ranking.', () => {
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

describe('Testa a tela de Ranking:', () => {
  it('Verifica se as informações são apresentadas corretamente;', () => {
    const info = [
      {
        name: "Teste",
        score: "100",
        picture: "https://www.gravatar.com/avatar/a481195dcff81fe3fdb41111a17853a4",
      },
      {
        name: "Teste",
        score: "70",
        picture: "https://www.gravatar.com/avatar/a481195dcff81fe3fdb41111a17853a4",
      },
    ];

    const resultJSON = JSON.stringify(info);
    window.localStorage.setItem('ranking', resultJSON);
    
    renderWithRouterAndRedux(<Ranking />);

    const titleRanking = screen.getByTestId('ranking-title');
    const initialButton = screen.getByTestId('btn-go-home');
    const avatar = screen.getByText('Foto');
    const name = screen.getByText('Nome');
    const nameValue0 = screen.getByTestId(`player-name-0`);
    const score = screen.getByText('Score');
    const scoreValue0 = screen.getByTestId(`player-score-0`);
    const image = screen.getAllByRole('img','foto de perfil');
    const nameValue1 = screen.getByTestId(`player-name-1`);
    const scoreValue1 = screen.getByTestId(`player-score-1`);


    expect(titleRanking).toBeInTheDocument();
    expect(initialButton).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(nameValue0.innerHTML).toEqual(info[0].name);
    expect(score).toBeInTheDocument();
    expect(scoreValue0.innerHTML).toEqual(info[0].score);
    expect(image[0]).toBeInTheDocument();
    expect(nameValue1.innerHTML).toEqual(info[1].name);
    expect(scoreValue1.innerHTML).toEqual(info[1].score);
  });

  it('Verifica se ao clicar no botão "Início", o usuário é direcionado para a tela de Login;', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResult),
    });

    const { history } = renderWithRouterAndRedux(<App />, mockResult, '/ranking');

    const initialButton = screen.getByTestId('btn-go-home');

    userEvent.click(initialButton);

    const { pathname } = history.location;
    
    expect(pathname).toBe('/');
  });
});

describe('Testa a tela de Configurações:', () => {
  it('Verifica se é mostrado um título escrito "Configurações".', () => {
    renderWithRouterAndRedux(<App />, '', '/settings');

    const titleSettings = screen.getByTestId('settings-title');

    expect(titleSettings).toBeInTheDocument();
  })
});
