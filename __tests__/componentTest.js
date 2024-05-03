import React from 'react';
// import { Provider } from 'react-redux';
// import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
// import regeneratorRuntime from 'regenerator-runtime';

// import Card from '../client/components/Card';
import App from '../client/App.jsx';

describe('Empty state before interactions', () => {
  beforeEach(async () => {
    const app = await render(<App />);
  });

  test('Every card loads with a like button', () => {
    const likeButtons = screen.getAllByRole('button', { name: 'Like' });
    expect(likeButtons.length).toBeGreaterThan(0);
  });
});
