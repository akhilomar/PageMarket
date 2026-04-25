export const env = {
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-me",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
};

