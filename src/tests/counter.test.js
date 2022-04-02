/**
 * @file To test the Dislikes screen
 */

/**
* @jest-environment jsdom
*/


import React from "react";
import '@testing-library/jest-dom';

import { screen, render } from '@testing-library/react';

import { act, create } from 'react-test-renderer';
import { HashRouter } from "react-router-dom";
import Profile from "./../components/profile/index";
import tuitsJson from "./react-test-renderer/tuits/tuits.json"; 
import MyDislikes from "../components/profile/my-dislikes";
import axios from "axios";

describe('test that the dislikes tab exists on the profile page', () => {

  test("render my profile and find dislikes screen", async () => {
    render(
      <HashRouter>
        <Profile />
      </HashRouter>);

    const linkElement = screen.getByText("Dislikes");
    expect(linkElement).toBeInTheDocument();
  });
});

describe('test that the likes tab exists on the profile page', () => {

  test("render my profile and find likes screen", async () => {
    render(
      <HashRouter>
        <Profile />
      </HashRouter>);

    const linkElement = screen.getByText("Likes");
    expect(linkElement).toBeInTheDocument();
  });
});

// describe('test that disliked tuits render on the my dislikes page', () => {

//   test("render my dislikes", async () => {
//     render(
//       <HashRouter>
//         <Profile>
//       </HashRouter>);

//       const linkElement = screen.getByText("Dislikes");
//       expect(linkElement).toBeInTheDocument();
//   });
// });


// describe("test that my dislikes renders disliked tuits", () => {

//   let tuitsRender
//   act(() => {
//     tuitsRender = create(
//       <MyDislikes
//         tuits={tuitsJson}/>
//     )
//   })
//   const root = tuitsRender.root
//   const ttrTuits = root.findAllByProps({
//     className: 'ttr-tuit'})
//   expect(ttrTuits.length).toBe(tuitsJson.length)
//   ttrTuits.forEach((ttrTuit, ndx) => {
//     expect(ttrTuit.props.children).toBe(tuitsJson[ndx].tuit)
//   })
// })



