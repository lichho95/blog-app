import { screen } from '@testing-library/react';

export const expectTextInTheDocument = (...texts: Array<string | RegExp>) => {
  texts.forEach((text) => {
    expect(screen.getByText(text)).toBeInTheDocument();
  });
};
