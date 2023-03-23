import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SyntheticEvent } from 'react'

import { DogQueryForm } from '../routes/QueryBreedSection'

const imageSelectId = 'imageCount'
const breedSelectId = 'breedName'

const mockQueryProps = {
  breeds: {
    bulldog: [
      'boston',
      'english',
      'french'
    ],
    corgi: [
      'cardigan'
    ],
  },
  minImages: 1,
  maxImages: 50,
  getDogs: (e: any): Promise<string[]> => {throw new Error()},
  setImageLinks: () => {},
  setHasFetched: () => {}
}

test("should show a select field for number of images to fetch", async () => {
  render(<DogQueryForm {...mockQueryProps} />)

  await waitFor(() => {
    expect(screen.getByTestId(imageSelectId))
  })
})


test("should allow user to change number of images", async () => {
  const valToTest = 45;
  render(<DogQueryForm {...mockQueryProps} />)

  const selectElem = await screen.findByLabelText(/# images/i);
  expect(selectElem).toBeInTheDocument();

  userEvent.click(selectElem);

  const popupOptionsEl = await screen.findByRole('listbox');
  userEvent.click(within(popupOptionsEl).getByText(valToTest));


  expect(
    await screen.findByText(valToTest)
  ).toBeInTheDocument();
})

test("should show a select field for breed names", async () => {
  render(<DogQueryForm {...mockQueryProps} />)

  await waitFor(() => {
    expect(screen.getByTestId(breedSelectId))
  })
})

test("should allow user to change breed name", async () => {
  const valToTest = 'cardigan corgi';
  render(<DogQueryForm {...mockQueryProps} />)

  const selectElem = await screen.findByLabelText(/breed/i);
  expect(selectElem).toBeInTheDocument();

  userEvent.click(selectElem);

  const popupOptionsEl = await screen.findByRole('listbox');
  userEvent.click(within(popupOptionsEl).getByText(valToTest));


  expect(
    await screen.findByText(valToTest)
  ).toBeInTheDocument();
})

test("should have a button to submit form", async () => {
  render(<DogQueryForm {...mockQueryProps} />)


  const buttonElem = await screen.findByRole('button', { name: /fetch/i });
  expect(buttonElem).toBeInTheDocument();
})