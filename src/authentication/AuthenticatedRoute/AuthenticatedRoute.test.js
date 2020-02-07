import React from 'react';
import { mount } from 'enzyme';
import AuthenticatedRoute from './AuthenticatedRoute';
import authenticationService from '../authentication-service';
import { AuthenticationContextProvider } from '../authentication-context';
import ReactTestUtils from 'react-dom/test-utils';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';

describe("The Authenticated Route component", () => {
  let _component;

  beforeEach(() => {
    spyOn(authenticationService, "load").and.stub();
    _component = document.createElement('div');
    document.body.appendChild(_component);
  });


  it('exists', () => {
    <AuthenticationContextProvider>
      act(() => {<AuthenticatedRoute />},_component);
    </AuthenticationContextProvider>;

    expect(_component).toBeDefined();
  });
})