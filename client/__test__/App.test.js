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

  it('Display Sign in heading', () => {
    render(<MockedComponent component={<SignIn />} />);

    expect(screen.getByRole('heading')).toHaveTextContent('Sign in');
  });
  
  it('Display two input boxes with corresponding label', () => {
    render(<MockedComponent component={<SignIn />} />);

    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('Display a button with SIGN IN text', () => {
    render(<MockedComponent component={<SignIn />} />);

    expect(screen.getByRole('button')).toHaveTextContent('SIGN IN');
  });

  it('Display Sign up text where user can click to go to sign up page', () => {
    render(<MockedComponent component={<SignIn />} />);

    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });
});

describe('Register Component', () => {

  it('Display Register heading', () => {
    render(<MockedComponent component={<Register />} />);

    expect(screen.getByRole('heading').innerHTML).toMatch('Register');
  });
  
  it('Display two input boxes with corresponding label', () => {
    render(<MockedComponent component={<Register />} />);

    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  it('Display a button with REGISTER text', () => {
    render(<MockedComponent component={<Register />} />);

    expect(screen.getByRole('button')).toHaveTextContent('REGISTER');
  });

  it('Display Sign in text where user can click to go to sign in page', () => {
    render(<MockedComponent component={<Register />} />);

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });
});

describe('Form Component', () => {

  it('Display Add Flashcard heading', () => {
    render(<MockedComponent component={<Form />} />);

    expect(screen.getByRole('heading')).toHaveTextContent('Add Flashcard');
  });

  it('Display two input boxes for question and answer', () => {
    render(<MockedComponent component={<Form />} />);

    expect(screen.getByPlaceholderText('Type your question here')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Answer...')).toBeInTheDocument();
  });

  it('Display two buttons Save and Close', () => {
    render(<MockedComponent component={<Form />} />);
    expect(screen.getByRole('button', { name: /save/i })).toHaveTextContent('Save');
    expect(screen.getByRole('button', { name: /close/i })).toHaveTextContent('Close');
  });
});

describe('CardContainer and Card Component', () => {

  it('Total cards heading display correct number of cards', async () => {
    const user = userEvent.setup();
    customRender(<FlashCardsDisplay />, {authProviderProps}, {cardProviderProps});
    expect(screen.getByRole('heading', { name: /total cards/i })).toHaveTextContent('Total Cards: 2');
    
    expect(screen.getByText(/^not reviewed$/i)).toBeInTheDocument();
    expect(screen.getByText(/^reviewed$/i)).toBeInTheDocument();
    expect(screen.getByText(/^favorite$/i)).toBeInTheDocument();
    expect(screen.getByText(/^reset$/i)).toBeInTheDocument();
  });
  
  it('Display answer when Check Answer is clicked', async () => {
    const user = userEvent.setup();
    customRender(<FlashCardsDisplay />, {authProviderProps}, {cardProviderProps});

    expect(screen.getByText(/react/i)).toHaveTextContent('What is React');
    expect(screen.getByText(/redux/i)).toHaveTextContent('What is Redux');

    await user.click(screen.queryAllByText(/check answer/i)[0]);
    expect(screen.getByText(/framework library/i)).toBeInTheDocument();
    await user.click(screen.queryAllByText(/check answer/i)[1]);
    expect(screen.getByText(/state management/i)).toBeInTheDocument();
  });
});
