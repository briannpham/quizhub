/**
 * @jest-environment jsdom
*/

/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AuthContextProvider, AuthContext } from "../context/AuthContext";
import { CardsContextProvider, CardsContext } from "../context/CardsContext";
import { BrowserRouter } from "react-router-dom";
import App from '../App';
import Navbar from "../components/Navbar";
import SignIn from "../components/SignIn";
import Register from "../components/Register";
import Form from "../components/Form";
import FlashCardsDisplay from "../components/FlashCardsDisplay";


const MockedComponent = ({component}) => {
  return (
    <AuthContextProvider>
      <CardsContextProvider>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </CardsContextProvider>
    </AuthContextProvider>
  );
};

const customRender = (ui, {authProviderProps}, {cardProviderProps}) => {
  return render(
    <AuthContext.Provider value={{...authProviderProps}}>
      <CardsContext.Provider value={{...cardProviderProps}}>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </CardsContext.Provider>
    </AuthContext.Provider>
  );
};

const authProviderProps = {
  user: {
    _id: '1993',
    firstName: 'Brian',
    token: '123456'
  }
};

const cardProviderProps = {
  cards: [
    {
      _id: '1',
      question: 'What is React',
      answer: 'Framework library',
      status: 'Not Reviewed',
      favorite: false,
      createdAt: '2022-12-15'
    },
    {
      _id: '2',
      question: 'What is Redux',
      answer: 'State management',
      status: 'Reviewed',
      favorite: false,
      createdAt: '2022-12-15'
    }
  ]
};

describe('App Component', () => {

  it('Display a welcome message when user is not logged in', () => {
    render(<MockedComponent component={<App />} />);
    expect(screen.getByText('Log in to use Flashcard.io now!')).toBeInTheDocument();
  });
});

describe('Navbar Component', () => {

  it('Display logo text', () => {
    render(<MockedComponent component={<Navbar />} />);
    expect(screen.getByText('Flashcard.io')).toBeInTheDocument();
  });

  it('Display login and signup buttons', () => {
    render(<MockedComponent component={<Navbar />} />);

    expect(screen.getAllByRole('button')[0]).toHaveTextContent('Log in');
    expect(screen.getAllByRole('button')[1]).toHaveTextContent('Sign up');
  });

  it('Navbar component displays correct username and Sign out button', () => {
    customRender(<Navbar />, {authProviderProps}, {cardProviderProps});

    expect(screen.getByText(/welcome/i)).toHaveTextContent('Welcome, Brian');
    expect(screen.getByRole('button')).toHaveTextContent('Sign out');
  });
});

describe('SignIn Component', () => {
  beforeEach(() => {
    render(<MockedComponent component={<SignIn />} />);
  });

  it('Display Sign in heading', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Sign in');
  });
  
  it('Display Email Address and Password inputs', () => {
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('Should be able to type an email', async () => {
    const emailInputElement = screen.getByRole('textbox', {
      name: /email address/i
    });
    await userEvent.type(emailInputElement, 'brian@gmail.com');
    expect(emailInputElement.value).toBe('brian@gmail.com');
  });

  it('Should display error message when submitted if email is empty', async () => {
    const emailInputElement = screen.getByRole('textbox', {
      name: /email address/i
    });

    expect(screen.queryByText(/missing required input fields/i)).toBe(null);

    await userEvent.type(emailInputElement, 'brian@gmail.com');
    const submitButtonElement = screen.getByRole('button', {
      name: /sign in/i
    });
    await userEvent.click(submitButtonElement);

    expect(screen.queryByText(/missing required input fields/i)).toBeInTheDocument();
  });

  it('Should display error message when submitted if email is empty', async () => {
    const passwordInputElement = screen.getByLabelText(/password/i);

    expect(screen.queryByText(/missing required input fields/i)).toBe(null);

    await userEvent.type(passwordInputElement, '123');
    const submitButtonElement = screen.getByRole('button', {
      name: /sign in/i
    });
    await userEvent.click(submitButtonElement);

    expect(screen.queryByText(/missing required input fields/i)).toBeInTheDocument();
  });

  it('Display Sign up text where user can click to go to sign up page', () => {
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });
});

describe('Register Component', () => {
  beforeEach(() => {
    render(<MockedComponent component={<Register />} />);
  });

  it('Display Register heading', () => {
    expect(screen.getByRole('heading').innerHTML).toMatch('Register');
  });
  
  it('Display two input boxes with corresponding label', () => {
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  it('Display a button with REGISTER text', () => {
    expect(screen.getByRole('button')).toHaveTextContent('REGISTER');
  });

  it('Display Sign in text where user can click to go to sign in page', () => {
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });
});

describe('Form Component', () => {
  beforeEach(() => {
    render(<MockedComponent component={<Form />} />);
  });

  it('Display Add Flashcard heading', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Add Flashcard');
  });

  it('Display two input boxes for question and answer', () => {
    expect(screen.getByPlaceholderText('Type your question here')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Answer...')).toBeInTheDocument();
  });

  it('Display two buttons Save and Close', () => {
    expect(screen.getByRole('button', { name: /save/i })).toHaveTextContent('Save');
    expect(screen.getByRole('button', { name: /close/i })).toHaveTextContent('Close');
  });
});

describe('CardContainer and Card Component', () => {
  beforeEach(() => {
    customRender(<FlashCardsDisplay />, {authProviderProps}, {cardProviderProps});
  });

  it('Total cards heading display correct number of cards', async () => {
    expect(screen.getByRole('heading', { name: /total cards/i })).toHaveTextContent('Total Cards: 2');
    expect(screen.getByText(/^not reviewed$/i)).toBeInTheDocument();
    expect(screen.getByText(/^reviewed$/i)).toBeInTheDocument();
    expect(screen.getByText(/^favorite$/i)).toBeInTheDocument();
    expect(screen.getByText(/^reset$/i)).toBeInTheDocument();
  });
  
  it('Display answer when Check Answer is clicked', async () => {
    expect(screen.getByText(/react/i)).toHaveTextContent('What is React');
    expect(screen.getByText(/redux/i)).toHaveTextContent('What is Redux');

    await userEvent.click(screen.queryAllByText(/check answer/i)[0]);
    expect(screen.getByText(/framework library/i)).toBeInTheDocument();
    await userEvent.click(screen.queryAllByText(/check answer/i)[1]);
    expect(screen.getByText(/state management/i)).toBeInTheDocument();
  });
});
