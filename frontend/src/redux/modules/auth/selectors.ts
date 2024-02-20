import { RootState } from '../../rootReducer';

export const selectIsAuthMessage = (state: RootState): string|null => state.auth.response;
export const selectIsAuthError = (state: RootState): boolean => state.auth.error;
export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuthenticated;
export const selectAuthenticatedUser = (state: RootState): object => state.auth?.user;
export const selectAuth = (state: RootState): object => state.auth;
