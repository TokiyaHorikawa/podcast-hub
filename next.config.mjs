/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO: Mock用に外部hostの画像へのアクセス許可をしている。supabase導入後に削除する
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**",
      },
    ],
  },
};

export default nextConfig;
