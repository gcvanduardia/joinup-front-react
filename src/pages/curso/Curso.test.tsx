import React from 'react';
import { render, screen } from '@testing-library/react';
import Curso from './Curso';

test('renders Home component', () => {
  render(<Curso />);
  const linkElement = screen.getByText(/Blank/i);
  expect(linkElement).toBeInTheDocument();
});