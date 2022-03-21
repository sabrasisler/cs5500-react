import Tuits from "../components/tuits";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllTuits } from "../services/tuits-service";
import axios from "axios";

const MOCKED_TUITS = [{ tuit: "alice's tuit", _id: "1" }, { tuit: "bob's tuit", _id: "2" }, { tuit: "charlies's tuit", _id: "3" }];

test('tuit list renders static tuit array', () => {
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS} />
    </HashRouter>);
  const aliceTuit = screen.getByText(/alice's tuit/i);
  const bobTuit = screen.getByText(/bob's tuit/i);
  const charlieTuit = screen.getByText(/charlies's tuit/i);
  expect(aliceTuit).toBeInTheDocument();
  expect(bobTuit).toBeInTheDocument();
  expect(charlieTuit).toBeInTheDocument();
});


test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
    <HashRouter>
      <Tuits tuits={tuits} />
    </HashRouter>);
  console.log(tuits);
  const linkElement = screen.getByText(/bob's 2nd tuit/i);
  expect(linkElement).toBeInTheDocument();
})


test('user list renders mocked', async () => {

  const mock = jest.spyOn(axios, 'get');
  mock.mockImplementationOnce(() =>
    Promise.resolve({ data: { tuits: MOCKED_TUITS } }));

  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
    <HashRouter>
      <Tuits tuits={tuits} />
    </HashRouter>);

  const aliceTuit = screen.getByText(/alice's tuit/i);
  const bobTuit = screen.getByText(/bob's tuit/i);
  const charlieTuit = screen.getByText(/charlies's tuit/i);
  expect(aliceTuit).toBeInTheDocument();
  expect(bobTuit).toBeInTheDocument();
  expect(charlieTuit).toBeInTheDocument();

  mock.mockRestore();
});