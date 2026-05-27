import JwtService from "@/core/services/JwtService";

export const userInSession = (): boolean => {
  const accessToken = JwtService.getToken();
  return !!accessToken;
};

export const isValidEmail = (email: string) => {
  if (email.trim().length !== 0) {
    return !!email.trim().match(/\S+@\S+\.\S+/);
  } else {
    return !email.trim().match(/\S+@\S+\.\S+/);
  }
};

export const toLocaleDate = (date: string | Date) => {
  if (!date) return;
  return new Date(date).toLocaleString();
};

export const formatDate = (
  date: string | Date | null | undefined,
): string | undefined => {
  if (!date) return;
  return new Date(date).toLocaleDateString();
};
