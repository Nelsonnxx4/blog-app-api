const jwtConfig = {
  secret:
    process.env.JWT_SECRET ||
    (() => {
      throw new Error("JWT_SECRET must be defined");
    })(),
  expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as string,
};
export default jwtConfig;
