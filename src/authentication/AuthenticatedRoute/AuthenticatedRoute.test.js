import React from 'react';
import { mount } from 'enzyme';
import AuthenticatedRoute from './AuthenticatedRoute';
import { Router } from 'react-router-dom';
import history from '../../services/history';
import AuthenticationContext from '../authentication-context';
import authenticationService from '../authentication-service';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';

describe('The Authenticated Route Component', () => {
  let _component = null;

  beforeEach(() => {
    spyOn(authenticationService, "load").and.stub();

    _component = document.createElement("div");
    document.body.appendChild(_component);
  });

  it('exist', () => {
    <Router history={history}>
      {
        act(() => {
          render(
            <AuthenticationContext.Provider>
              <AuthenticatedRoute />
            </AuthenticationContext.Provider>, _component)
        })
      }
    </Router>

    expect(_component).toEqual("");
  });
});