const products = [
  {
    name: "Smartphone X200",
    description: "Latest 5G smartphone with AMOLED display and 128GB storage.",
    price: 25999,
    category: "Electronics",
    image: "https://tse1.mm.bing.net/th/id/OIP.OcdSqY5gftJvJieB7BYLpwHaHa?pid=Api&P=0&h=180"
  },
  {
    name: "Smartphone Y15",
    description: "Budget smartphone with 4GB RAM and 64GB storage.",
    price: 11999,
    category: "Electronics",
    image: "https://media.hitekno.com/thumbs/2019/07/28/53297-smartphone-baru-vivo-y15/730x480-img-53297-smartphone-baru-vivo-y15.jpg"
  },
  {
    name: "Wireless Earbuds Pro",
    description: "Noise-cancelling Bluetooth earbuds with 30-hour battery life.",
    price: 2999,
    category: "Electronics",
    image: "https://tse1.mm.bing.net/th/id/OIP.UFfLcN7gVWNascHVtxlVCgHaHa?pid=Api&P=0&h=180"
  },
  {
    name: "Gaming Laptop Z",
    description: "High-performance laptop with RTX 4060 GPU and 16GB RAM.",
    price: 84999,
    category: "Electronics",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6319/6319980_rd.jpg"
  },
  {
    name: "Work Laptop SlimBook",
    description: "Lightweight business laptop with Intel i5 and 512GB SSD.",
    price: 55999,
    category: "Electronics",
    image: "https://tse2.mm.bing.net/th/id/OIP._VBrirslcTkJ7gcPgIsqvwHaD_?pid=Api&P=0&h=180"
  },
  {
    name: "Smartwatch Pro",
    description: "Water-resistant smartwatch with fitness tracking and GPS.",
    price: 6999,
    category: "Electronics",
    image: "https://tse3.mm.bing.net/th/id/OIP.qaT7hTEc5ONtIMDFKYQDTwHaEK?pid=Api&P=0&h=180"
  },
  {
    name: "Smartwatch Lite",
    description: "Affordable smartwatch with heart-rate monitor.",
    price: 2999,
    category: "Electronics",
    image: "https://tse1.mm.bing.net/th/id/OIP.1i-ndgTvw4UKlI1T4rL-yQHaHa?pid=Api&P=0&h=180"
  },
  {
    name: "LED TV 43-inch",
    description: "Full HD Smart LED TV with Android apps.",
    price: 24999,
    category: "Electronics",
    image: "https://tse2.mm.bing.net/th/id/OIP.4MkgoRJ6LUwFMZTJcQIrsAHaFH?pid=Api&P=0&h=180"
  },
  {
    name: "LED TV 55-inch 4K",
    description: "Ultra HD 4K Smart LED TV with HDR support.",
    price: 42999,
    category: "Electronics",
    image: "https://tse3.mm.bing.net/th/id/OIP.NHY4d-WQUmc0rOrsg8_aQwHaHQ?pid=Api&P=0&h=180"
  },
  {
    name: "Bluetooth Speaker Boom",
    description: "Portable speaker with powerful bass and waterproof design.",
    price: 3499,
    category: "Electronics",
    image: "https://tse4.mm.bing.net/th/id/OIP.6gHqojDb97DP113op4y8bQHaHa?pid=Api&P=0&h=180"
  },
  {
    name: "Bluetooth Speaker Mini",
    description: "Compact Bluetooth speaker with clear sound.",
    price: 1299,
    category: "Electronics",
    image: "https://tse2.mm.bing.net/th/id/OIP.Pnxr4usSzs9V6AzlwDZArAHaHa?pid=Api&P=0&h=180"
  },
  {
    name: "Power Bank 10000mAh",
    description: "Fast-charging portable power bank with dual USB output.",
    price: 1299,
    category: "Electronics",
    image: "https://tse1.mm.bing.net/th/id/OIP.lQjYh3Eq3QP8nxjbYpsbNgHaHa?pid=Api&P=0&h=180"
  },
  {
    name: "Power Bank 20000mAh",
    description: "Extra capacity power bank for long travels.",
    price: 1999,
    category: "Electronics",
    image: "https://tse1.mm.bing.net/th/id/OIP.BKA9nrueOnOzAqrVyoWoKQHaFR?pid=Api&P=0&h=180"
  },
  {
    name: "Tablet XPad",
    description: "10-inch Android tablet with 6GB RAM.",
    price: 18999,
    category: "Electronics",
    image: "https://tse1.mm.bing.net/th/id/OIP.lQcx4ywl8w6iowhtR9w0QAHaE8?pid=Api&P=0&h=180"
  },
  {
    name: "Tablet MiniPad",
    description: "Compact 8-inch tablet for reading and light use.",
    price: 9999,
    category: "Electronics",
    image: "https://tse3.mm.bing.net/th/id/OIP.pOnMXPHefgbBIY8gVsS2LQHaHa?pid=Api&P=0&h=180"
  },
  {
    name: "Wireless Headphones",
    description: "Over-ear headphones with active noise cancellation.",
    price: 4999,
    category: "Electronics",
    image: "https://tse4.mm.bing.net/th/id/OIP.RZjRvaO9IfDAwpD20I7e5wHaHa?pid=Api&P=0&h=180"
  },
  {
    name: "Wired Gaming Headset",
    description: "RGB wired headset with mic for gamers.",
    price: 2499,
    category: "Electronics",
    image: "https://i5.walmartimages.com/asr/e5beb641-f888-4b3c-b3c0-4b8da8888404_1.a97419dc2469ff26ed7c8c6c943a6157.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"
  },
  {
    name: "DSLR Camera 24MP",
    description: "Professional DSLR with 24MP sensor and 18-55mm lens.",
    price: 39999,
    category: "Electronics",
    image: "https://tse2.mm.bing.net/th/id/OIP.cX4R9zWDwXu_92dqP6AxZQHaGU?pid=Api&P=0&h=180"
  },
  {
    name: "Mirrorless Camera 20MP",
    description: "Compact mirrorless camera with 4K video recording.",
    price: 44999,
    category: "Electronics",
    image: "https://tse2.mm.bing.net/th/id/OIP.essVUJ5jhF2kvJ3ualAX-AHaEy?pid=Api&P=0&h=180"
  },
  {
    name: "Wireless Keyboard & Mouse",
    description: "Combo of slim wireless keyboard and mouse.",
    price: 1599,
    category: "Electronics",
    image: "https://tse2.mm.bing.net/th/id/OIP.EuMWLp12i2k1mrdn-wm_pgHaFP?pid=Api&P=0&h=180"
  }
];

export default products;
