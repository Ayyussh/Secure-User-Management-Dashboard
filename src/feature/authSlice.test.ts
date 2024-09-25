import authReducer, { login, logout } from './authSlice';

describe('authSlice', () => {
  // Testing the login action
  it('should handle login', () => {
    const initialState = { user: null, token: null };

    // Dispatch the login action
    const newState = authReducer(initialState, login({ email: 'eve.holt@reqres.in', token: 'token123' }));

    // Expect the state to be updated correctly
    expect(newState).toEqual({
      user: { email: 'eve.holt@reqres.in' },
      token: 'token123',
    });
  });

  // Testing the logout action
  it('should handle logout', () => {
    const initialState = { user: { email: 'eve.holt@reqres.in' }, token: 'token123' };

    // Dispatch the logout action
    const newState = authReducer(initialState, logout());

    // Expect the state to be cleared after logout
    expect(newState).toEqual({
      user: null,
      token: null,
    });
  });
});
