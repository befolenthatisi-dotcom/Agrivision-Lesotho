import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('shows the Agrivision dashboard and identifies example data', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /good morning, karabo/i })).toBeInTheDocument();
  expect(screen.getByText(/illustrative demo forecast · not live weather/i)).toBeInTheDocument();
  expect(screen.getByText(/sample data/i)).toBeInTheDocument();
});

test('changing location updates the forecast location', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/choose location/i), { target: { value: 'Maseru' } });
  expect(screen.getByText(/Maseru, Maseru/i)).toBeInTheDocument();
});

test('navigation opens the learning hub and marks a guide complete', () => {
  render(<App />);
  fireEvent.click(screen.getAllByRole('button', { name: /learning hub/i })[0]);
  expect(screen.getByRole('heading', { name: /growing knowledge/i })).toBeInTheDocument();
  fireEvent.click(screen.getAllByRole('button', { name: /mark complete/i })[0]);
  expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument();
});

test('market page clearly labels sample prices', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /market prices/i }));
  expect(screen.getByText(/sample data only — not current market prices/i)).toBeInTheDocument();
  expect(screen.getByText(/not real quotations/i)).toBeInTheDocument();
});

test('switches the interface between English and Sesotho', () => {
  localStorage.clear();
  render(<App />);
  fireEvent.change(screen.getByLabelText(/choose language/i), { target: { value: 'st' } });
  expect(screen.getByRole('heading', { name: /lumela hoseng, karabo/i })).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /boemo ba leholimo/i })[0]).toBeInTheDocument();
  expect(localStorage.getItem('agrivision-language')).toBe('st');
  fireEvent.change(screen.getByLabelText(/khetha puo/i), { target: { value: 'en' } });
  expect(screen.getByRole('heading', { name: /good morning, karabo/i })).toBeInTheDocument();
});

test('does not expose role switching or admin actions before authentication is configured', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /karabo m\. producer · demo/i }));
  expect(screen.getByText(/authentication is not connected/i)).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /agrivision admin/i })).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /success stories/i }));
  expect(screen.getByRole('heading', { name: /stories that inspire/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /add a story/i })).not.toBeInTheDocument();
});
