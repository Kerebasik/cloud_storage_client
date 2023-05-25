import { LocalStorageVariable } from '../enums/localStorageVariable';

type localStorageReturn = string | null;

export function deleteAccessToken(): void {
  return localStorage.removeItem(LocalStorageVariable.accessToken);
}

export function setAccessToken(token: string): void {
  return localStorage.setItem(LocalStorageVariable.accessToken, token);
}

export function getLocalStorageItem(item: string): localStorageReturn {
  return localStorage.getItem(item);
}
