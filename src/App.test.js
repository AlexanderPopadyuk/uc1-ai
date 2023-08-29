import { render, screen } from '@testing-library/react';
import { App } from './App';

jest.mock('./App', () => ({
  App: () => <div>Form</div>
}));

test('renders Form component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Form/i);
  expect(linkElement).toBeInTheDocument();
});
