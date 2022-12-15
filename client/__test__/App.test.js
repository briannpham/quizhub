/**
 * @jest-environment jsdom
*/

/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { AuthContextProvider } from "../context/AuthContext";
import { CardsContextProvider } from "../context/CardsContext";
import { BrowserRouter } from "react-router-dom";
import App from '../App';
import Navbar from "../components/Navbar";
import SignIn from "../components/SignIn";
import Register from "../components/Register";
import Form from "../components/Form";

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
});

describe('SignIn Component', () => {

  it('Display Sign in heading', () => {
    render(<MockedComponent component={<SignIn />} />)

    expect(screen.getByRole('heading')).toHaveTextContent('Sign in')
  })
  
  it('Display two input boxes with corresponding label', () => {
    render(<MockedComponent component={<SignIn />} />)

    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('Display a button with SIGN IN text', () => {
    render(<MockedComponent component={<SignIn />} />)

    expect(screen.getByRole('button')).toHaveTextContent('SIGN IN')
  })

  it('Display Sign up text where user can click to go to sign up page', () => {
    render(<MockedComponent component={<SignIn />} />)

    expect(screen.getByText(/sign up/i)).toBeInTheDocument()
  })
})

describe('Register Component', () => {

  it('Display Register heading', () => {
    render(<MockedComponent component={<Register />} />)

    expect(screen.getByRole('heading').innerHTML).toMatch('Register')
  })
  
  it('Display two input boxes with corresponding label', () => {
    render(<MockedComponent component={<Register />} />)

    expect(screen.getByLabelText('First Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
  })

  it('Display a button with REGISTER text', () => {
    render(<MockedComponent component={<Register />} />)

    expect(screen.getByRole('button')).toHaveTextContent('REGISTER')
  })

  it('Display Sign in text where user can click to go to sign in page', () => {
    render(<MockedComponent component={<Register />} />)

    expect(screen.getByText(/sign in/i)).toBeInTheDocument()
  })
})

describe('Form Component', () => {

  it('Display Add Flashcard heading', () => {
    render(<MockedComponent component={<Form />} />)

    expect(screen.getByRole('heading')).toHaveTextContent('Add Flashcard')
  })

  it('Display two input boxes for question and answer', () => {
    render(<MockedComponent component={<Form />} />)

    expect(screen.getByPlaceholderText('Type your question here')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Answer...')).toBeInTheDocument()
  })

  it('Display two buttons Save and Close', () => {
    render(<MockedComponent component={<Form />} />)

    expect(screen.getAllByRole('button')[0]).toHaveTextContent('Save')
    expect(screen.getAllByRole('button')[1]).toHaveTextContent('Close')
  })
})