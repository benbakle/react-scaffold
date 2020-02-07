import React from 'react';
import { shallow, mount } from 'enzyme';
import AuthenticatedRoute from './AuthenticatedRoute';
import * as AuthenticationContext from '../authentication-context';
import { Router, MemoryRouter } from 'react-router-dom';

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

      _component = mount(
        <MemoryRouter initialEntries={['/fake']}>
          < AuthenticatedRoute path='/fake' component={FakeComp} roles={["admin"]} />
        </MemoryRouter>);

      expect(_component).toEqual("");

    })
  });

})