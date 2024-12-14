module.exports = {
  reactStrictMode: true,
  env: {
    ADMIN_IP: process.env.ADMIN_IP,
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
