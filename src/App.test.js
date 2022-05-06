import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';

describe('When rendering App without a token', () => {
  test('Renders login page', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByTestId('login-page')).toHaveTextContent(/log in/i)
    expect(screen.getByText(/User Name/i)).toBeInTheDocument()
    expect(screen.getByText(/password/i)).toBeInTheDocument()
  })
})