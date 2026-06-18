require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const User = require('../models/User');

const img = (label) =>
  `https://placehold.co/600x600/12121a/00f0ff?text=${encodeURIComponent(label)}`;

const products = [
  {
    name: 'Logitech G Pro X Superlight 2',
    slug: 'logitech-g-pro-x-superlight-2',
    description:
      'Ultra-lightweight wireless esports mouse built for competitive FPS. HERO 2 sensor, 60g shell, and up to 95 hours of battery life.',
    price: 159.99,
    compareAtPrice: 179.99,
    category: 'mouse',
    game: 'Valorant',
    brand: 'Logitech',
    images: [img('G Pro X SL2')],
    stock: 45,
    rating: 4.8,
    reviewCount: 312,
    featured: true,
    tags: ['wireless', 'pro', 'fps'],
  },
  {
    name: 'Razer Viper V3 Pro',
    slug: 'razer-viper-v3-pro',
    description:
      'Symmetrical wireless mouse tuned for pro play. Focus Pro 35K sensor and hyper-fast optical switches.',
    price: 149.99,
    category: 'mouse',
    game: 'CS2',
    brand: 'Razer',
    images: [img('Viper V3 Pro')],
    stock: 38,
    rating: 4.7,
    reviewCount: 198,
    featured: true,
    tags: ['wireless', 'pro', 'symmetrical'],
  },
  {
    name: 'Finalmouse Starlight-12',
    slug: 'finalmouse-starlight-12',
    description:
      'Magnesium alloy shell, limited-run design, and cult following in the competitive scene.',
    price: 189.99,
    category: 'mouse',
    game: 'General',
    brand: 'Finalmouse',
    images: [img('Starlight-12')],
    stock: 12,
    rating: 4.5,
    reviewCount: 89,
    featured: false,
    tags: ['limited', 'ultralight'],
  },
  {
    name: 'Pulsar X2H Mini',
    slug: 'pulsar-x2h-mini',
    description:
      'Compact ergonomic shape with solid clicks and a reliable PAW3395 sensor for claw and fingertip grips.',
    price: 69.99,
    category: 'mouse',
    game: 'Valorant',
    brand: 'Pulsar',
    images: [img('X2H Mini')],
    stock: 60,
    rating: 4.6,
    reviewCount: 145,
    featured: false,
    tags: ['wireless', 'compact'],
  },
  {
    name: 'Wooting 60HE+',
    slug: 'wooting-60he-plus',
    description:
      'Hall-effect analog switches with rapid trigger — the keyboard of choice for many Valorant pros.',
    price: 174.99,
    category: 'keyboard',
    game: 'Valorant',
    brand: 'Wooting',
    images: [img('Wooting 60HE+')],
    stock: 25,
    rating: 4.9,
    reviewCount: 421,
    featured: true,
    tags: ['analog', 'rapid-trigger', 'pro'],
  },
  {
    name: 'Razer Huntsman V3 Pro',
    slug: 'razer-huntsman-v3-pro',
    description:
      'Full-size optical keyboard with adjustable actuation and a magnetic wrist rest for long scrim blocks.',
    price: 249.99,
    compareAtPrice: 269.99,
    category: 'keyboard',
    game: 'CS2',
    brand: 'Razer',
    images: [img('Huntsman V3')],
    stock: 30,
    rating: 4.7,
    reviewCount: 156,
    featured: true,
    tags: ['optical', 'rgb', 'full-size'],
  },
  {
    name: 'Keychron Q1 Pro',
    slug: 'keychron-q1-pro',
    description:
      'Aluminum gasket-mount keyboard with hot-swap switches and wireless connectivity.',
    price: 199.99,
    category: 'keyboard',
    game: 'General',
    brand: 'Keychron',
    images: [img('Q1 Pro')],
    stock: 40,
    rating: 4.6,
    reviewCount: 203,
    featured: false,
    tags: ['wireless', 'hot-swap', 'custom'],
  },
  {
    name: 'SteelSeries Apex Pro TKL',
    slug: 'steelseries-apex-pro-tkl',
    description:
      'OmniPoint 2.0 adjustable switches with OLED display and tenkeyless layout for more mouse space.',
    price: 189.99,
    category: 'keyboard',
    game: 'League of Legends',
    brand: 'SteelSeries',
    images: [img('Apex Pro TKL')],
    stock: 35,
    rating: 4.5,
    reviewCount: 178,
    featured: false,
    tags: ['tkl', 'adjustable', 'oled'],
  },
  {
    name: 'HyperX Cloud III Wireless',
    slug: 'hyperx-cloud-iii-wireless',
    description:
      'Comfortable closed-back wireless headset with DTS spatial audio and a detachable noise-canceling mic.',
    price: 169.99,
    category: 'headset',
    game: 'General',
    brand: 'HyperX',
    images: [img('Cloud III')],
    stock: 50,
    rating: 4.6,
    reviewCount: 267,
    featured: true,
    tags: ['wireless', 'comfort', 'spatial-audio'],
  },
  {
    name: 'SteelSeries Arctis Nova Pro Wireless',
    slug: 'steelseries-arctis-nova-pro-wireless',
    description:
      'Premium dual-battery system so you never pause a ranked game to charge. Active noise cancellation included.',
    price: 349.99,
    category: 'headset',
    game: 'CS2',
    brand: 'SteelSeries',
    images: [img('Nova Pro')],
    stock: 18,
    rating: 4.8,
    reviewCount: 134,
    featured: true,
    tags: ['wireless', 'anc', 'premium'],
  },
  {
    name: 'Razer BlackShark V2 Pro',
    slug: 'razer-blackshark-v2-pro',
    description:
      'Tournament-grade wireless headset with THX spatial audio and a hyper-clear cardioid mic.',
    price: 199.99,
    category: 'headset',
    game: 'Valorant',
    brand: 'Razer',
    images: [img('BlackShark V2')],
    stock: 42,
    rating: 4.7,
    reviewCount: 189,
    featured: false,
    tags: ['wireless', 'fps', 'thx'],
  },
  {
    name: 'Logitech G Pro X 2 Lightspeed',
    slug: 'logitech-g-pro-x-2-lightspeed',
    description:
      'Pro-grade wireless headset with 50mm graphene drivers and broadcast-quality Blue VO!CE mic filtering.',
    price: 249.99,
    category: 'headset',
    game: 'General',
    brand: 'Logitech',
    images: [img('G Pro X 2')],
    stock: 28,
    rating: 4.7,
    reviewCount: 112,
    featured: false,
    tags: ['wireless', 'pro', 'lightspeed'],
  },
  {
    name: 'Team Liquid 2025 Pro Jersey',
    slug: 'team-liquid-2025-pro-jersey',
    description:
      'Official Team Liquid pro jersey with moisture-wicking fabric and embroidered logo. Rep the blue squad.',
    price: 89.99,
    category: 'jersey',
    game: 'General',
    team: 'Team Liquid',
    brand: 'Team Liquid',
    images: [img('TL Jersey')],
    stock: 75,
    rating: 4.4,
    reviewCount: 98,
    featured: true,
    tags: ['official', 'merch', 'limited'],
  },
  {
    name: 'FaZe Clan Hoodie 2025',
    slug: 'faze-clan-hoodie-2025',
    description:
      'Heavyweight FaZe Clan hoodie with embroidered crest. Built for cold LAN nights and stream marathons.',
    price: 79.99,
    category: 'jersey',
    game: 'General',
    team: 'FaZe Clan',
    brand: 'FaZe Clan',
    images: [img('FaZe Hoodie')],
    stock: 60,
    rating: 4.5,
    reviewCount: 156,
    featured: false,
    tags: ['hoodie', 'merch', 'streetwear'],
  },
  {
    name: 'Cloud9 Valorant Champions Jersey',
    slug: 'cloud9-valorant-champions-jersey',
    description:
      'Cloud9 Valorant roster jersey from the Champions era. Lightweight mesh panels for stage heat.',
    price: 84.99,
    category: 'jersey',
    game: 'Valorant',
    team: 'Cloud9',
    brand: 'Cloud9',
    images: [img('C9 Jersey')],
    stock: 40,
    rating: 4.3,
    reviewCount: 67,
    featured: false,
    tags: ['valorant', 'official', 'merch'],
  },
  {
    name: 'T1 Worlds 2024 Jacket',
    slug: 't1-worlds-2024-jacket',
    description:
      'T1 Worlds commemorative jacket with premium embroidery and a fit inspired by stage walkouts.',
    price: 129.99,
    compareAtPrice: 149.99,
    category: 'jersey',
    game: 'League of Legends',
    team: 'T1',
    brand: 'T1',
    images: [img('T1 Jacket')],
    stock: 22,
    rating: 4.8,
    reviewCount: 201,
    featured: true,
    tags: ['worlds', 'limited', 'lol'],
  },
  {
    name: 'CS2 Major Trophy Replica',
    slug: 'cs2-major-trophy-replica',
    description:
      'Desktop-scale replica of the CS2 Major championship trophy. Die-cast metal with engraved base plate.',
    price: 59.99,
    category: 'collectible',
    game: 'CS2',
    brand: 'Valve',
    images: [img('CS2 Trophy')],
    stock: 100,
    rating: 4.6,
    reviewCount: 88,
    featured: false,
    tags: ['replica', 'desk', 'cs2'],
  },
  {
    name: 'Valorant Jett Figure',
    slug: 'valorant-jett-figure',
    description:
      'Detailed 8-inch Jett figure in her signature Updraft pose. Perfect for shelf flex or stream backdrop.',
    price: 44.99,
    category: 'collectible',
    game: 'Valorant',
    brand: 'Riot Games',
    images: [img('Jett Figure')],
    stock: 85,
    rating: 4.7,
    reviewCount: 143,
    featured: true,
    tags: ['figure', 'riot', 'valorant'],
  },
  {
    name: 'League of Legends Ahri Nendoroid',
    slug: 'lol-ahri-nendoroid',
    description:
      'Chibi-style Ahri Nendoroid with interchangeable faces and orb accessory. Collector-grade packaging.',
    price: 54.99,
    category: 'collectible',
    game: 'League of Legends',
    brand: 'Good Smile Company',
    images: [img('Ahri Nendo')],
    stock: 35,
    rating: 4.9,
    reviewCount: 76,
    featured: false,
    tags: ['nendoroid', 'lol', 'anime'],
  },
  {
    name: 'ZOWIE EC2-CW',
    slug: 'zowie-ec2-cw',
    description:
      'Classic ergonomic shape trusted by CS veterans, now wireless with the same no-nonsense performance.',
    price: 119.99,
    category: 'mouse',
    game: 'CS2',
    brand: 'ZOWIE',
    images: [img('EC2-CW')],
    stock: 33,
    rating: 4.5,
    reviewCount: 91,
    featured: false,
    tags: ['wireless', 'ergonomic', 'cs2'],
  },
  {
    name: 'Ducky One 3 Mini Daybreak',
    slug: 'ducky-one-3-mini-daybreak',
    description:
      'Compact 60% keyboard with hot-swap sockets, PBT keycaps, and the iconic Ducky build quality.',
    price: 119.99,
    category: 'keyboard',
    game: 'General',
    brand: 'Ducky',
    images: [img('One 3 Mini')],
    stock: 48,
    rating: 4.6,
    reviewCount: 124,
    featured: false,
    tags: ['60%', 'hot-swap', 'pbt'],
  },
  {
    name: 'Sentinels Valorant Mousepad XL',
    slug: 'sentinels-valorant-mousepad-xl',
    description:
      'Sentinels-branded XL desk mat with stitched edges and a smooth glide surface for low-DPI aimers.',
    price: 34.99,
    category: 'collectible',
    game: 'Valorant',
    team: 'Sentinels',
    brand: 'Sentinels',
    images: [img('SEN Mousepad')],
    stock: 120,
    rating: 4.4,
    reviewCount: 55,
    featured: false,
    tags: ['mousepad', 'desk-mat', 'merch'],
  },
];

const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);

    const adminEmail = 'admin@esports.com';
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      await User.create({
        name: 'Store Admin',
        email: adminEmail,
        password: 'admin123',
        role: 'admin',
      });
      console.log(`Admin user created: ${adminEmail} / admin123`);
    }
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();
