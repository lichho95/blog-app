import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';

describe('Blog page', () => {
  beforeAll(() => {
    window.history.pushState({}, 'Test page', 'blogs');
  });

  afterAll(() => {
    window.history.pushState({}, 'Test page', '/');
  });

  it('should render the blog page', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('blog-page')).toBeInTheDocument();
    });
  });
});

describe('Redirect to blog', () => {
  beforeAll(() => {
    window.history.pushState({}, 'Test page', '/');
  });

  afterAll(() => {
    window.history.pushState({}, 'Test page', '/');
  });

  it('should redirect to blog page', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('blog-page')).toBeInTheDocument();
    });
  });
});

describe('Blog details page', () => {
  beforeAll(() => {
    window.history.pushState({}, 'Test page', '/blog/2');
  });

  afterAll(() => {
    window.history.pushState({}, 'Test page', '/');
  });

  it('should render the blog details page', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('blog-details-page')).toBeInTheDocument();
    });

  });
});

describe('Not found page', () => {
  beforeAll(() => {
    window.history.pushState({}, 'Test page', '/blogwe/sadfsd');
  });

  afterAll(() => {
    window.history.pushState({}, 'Test page', '/');
  });

  it('should render the not found page', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
