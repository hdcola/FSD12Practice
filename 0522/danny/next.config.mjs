/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath:
    process.env.NODE_ENV === "production"
      ? "/FSD12Practice/0520/danny/dist"
      : "",
  distDir: "dist",
};

export default nextConfig;
