import jwt from 'jsonwebtoken'

export const generateTokens = async (data: any) => {
  let token = jwt.sign(
    { data: { email: data?.email, id: data?.id } },
    "LOGIN_SECRET",
    {
      expiresIn: 60 * 60,
    },
  );
  let refreshToken = await jwt.sign(
    {
      data: {
        email: data?.email,
        id: data?.id,
      },
    },
    "REFRESH_SECRET",
  );
  return {
  token,
  refreshToken
};
};
