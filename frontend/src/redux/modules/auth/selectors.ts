import { RootState } from '../../rootReducer';

export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuthenticated;
export const selectAuthenticatedUser = (state: RootState): object => state.auth?.user;
export const selectAuth = (state: RootState): object => state.auth;
