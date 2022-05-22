const accessToken = "token";
const roleName = "role";

export const setAccessToken = (token: string) => {
  localStorage.setItem(accessToken, token);
};

export const getAccessToken = () => {
  return localStorage.getItem(accessToken);
};

export const removeAccessToken = () => {
  return localStorage.removeItem(accessToken);
};

export const setRoleName = (role: string) => {
  localStorage.setItem(roleName, role);
};

export const getRoleName = () => {
  return localStorage.getItem(roleName);
};

export const removeRoleName = () => {
  return localStorage.removeItem(roleName);
};
