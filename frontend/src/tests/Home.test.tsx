import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../routes/Home';

import type { Matcher } from '@testing-library/react';

const gitLinkText: Matcher = /view on github/i;

test('renders view some dogs title', () => {
  render(
    <Home />
  )

  const textElement = screen.getByText(/view some dogs/i);
  expect(textElement).toBeInTheDocument();
});

test('renders github repo link', () => {
  render(
    <Home />
  );

  const linkElement = screen.getByText(gitLinkText);
  expect(linkElement).toBeInTheDocument();
})

test('contains correct github repo link', () => {
  render(
    <Home />
  );

  const linkRoleElem = screen.getByText(gitLinkText).closest('a');
  expect(linkRoleElem).toHaveAttribute('href', 'https://github.com/Andy-Wu12/View-Some-Dogs');
})

test('credits Dog CEO', () => {
  render (
    <Home />
  );

  const linkRoleElem = screen.getByText(/Dog API/).closest('a');
  expect(linkRoleElem).toHaveAttribute('href', 'https://dog.ceo/dog-api/');
})