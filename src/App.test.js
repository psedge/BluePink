import { render, screen } from '@testing-library/react';
import Gender from './App';

test('renders learn react link', () => {
  render(<Gender />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
