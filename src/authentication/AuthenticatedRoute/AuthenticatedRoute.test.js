import React from 'react';
import { shallow, mount } from 'enzyme';
import AuthenticatedRoute from './AuthenticatedRoute';
import { Router } from 'react-router-dom';
import history from '../../services/history';
import {AuthenticationContextProvider} from '../authentication-context';
import authenticationService from '../authentication-service';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';

describe("The Authenticated Route component", () => {
  let _component;

  function FakeComp() {
    return <span>Fake</span>
  }

  describe('The authenticated route component', () => {
    it("exists", () => {
      const authContext = { user: () => { return { role: "admin" } }, roles: ["admin"] };


      jest
        .spyOn(AuthenticationContext, "useAuthentication")
        .mockImplementation(() => authContext);

  xit('exist', () => {
    <Router history={history}>
      {
        act(() => {
          render(
            <AuthenticationContextProvider>
              <AuthenticatedRoute />
            </AuthenticationContextProvider>, _component)
        })
      }
    </Router>

      expect(_component).toEqual("");

    })
  });

})