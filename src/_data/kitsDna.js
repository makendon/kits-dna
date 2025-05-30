export default function () {
  return {
    environment: process.env.ELEVENTY_ENVIRONMENT || "development",
  };
}
