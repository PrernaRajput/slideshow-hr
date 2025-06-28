/* eslint-disable jest/no-conditional-expect */
import React from 'react';
import Slides from './components/Slides';
import { render, fireEvent, screen } from '@testing-library/react';

const testIds = {
  restartButton: 'button-restart',
  prevButton: 'button-prev',
  nextButton: 'button-next',
  title: 'title',
  text: 'text',
};

const makeSlides = (numSlides) =>
  Array.from({ length: numSlides }, (_, idx) => ({
    title: `title ${idx}`,
    text: `text ${idx}`,
  }));

const renderApp = (slides) => render(<Slides slides={slides} />);

test('App renders correctly', () => {
  const slides = makeSlides(2);

  renderApp(slides); // no need to destructure

  const restartButton = screen.getByTestId(testIds.restartButton);
  expect(restartButton.textContent).toBe('Restart');
  expect(restartButton.disabled).toBe(true);

  const prevButton = screen.getByTestId(testIds.prevButton);
  expect(prevButton.textContent).toBe('Prev');
  expect(prevButton.disabled).toBe(true);

  const nextButton = screen.getByTestId(testIds.nextButton);
  expect(nextButton.textContent).toBe('Next');
  expect(nextButton.disabled).toBe(false);

  const titleElem = screen.getByTestId(testIds.title);
  expect(titleElem.textContent).toBe(slides[0].title);

  const textElem = screen.getByTestId(testIds.text);
  expect(textElem.textContent).toBe(slides[0].text);
});

test('Switching between slides works as expected', () => {
  const slides = makeSlides(5);

  renderApp(slides);

  const restartButton = screen.getByTestId(testIds.restartButton);
  const prevButton = screen.getByTestId(testIds.prevButton);
  const nextButton = screen.getByTestId(testIds.nextButton);
  const titleElem = screen.getByTestId(testIds.title);
  const textElem = screen.getByTestId(testIds.text);

  const clicks = [
    'next',
    'next',
    'next',
    'prev',
    'prev',
    'prev',
    'next',
    'next',
    'restart',
    'next',
    'next',
    'next',
    'next',
    'prev',
  ];

  let idx = 0;
  for (const click of clicks) {
    if (click === 'restart') {
      fireEvent.click(restartButton);
      idx = 0;
    } else if (click === 'prev') {
      fireEvent.click(prevButton);
      idx -= 1;
    } else if (click === 'next') {
      fireEvent.click(nextButton);
      idx += 1;
    }

    expect(idx >= 0).toBe(true);
    expect(idx < slides.length).toBe(true);

    if (idx > 0) {
      expect(restartButton.disabled).toBe(false);
      expect(prevButton.disabled).toBe(false);
    } else {
      expect(restartButton.disabled).toBe(true);
      expect(prevButton.disabled).toBe(true);
    }

    if (idx + 1 < slides.length) {
      expect(nextButton.disabled).toBe(false);
    } else {
      expect(nextButton.disabled).toBe(true);
    }

    const { title, text } = slides[idx];
    expect(titleElem.textContent).toBe(title);
    expect(textElem.textContent).toBe(text);
  }
});
