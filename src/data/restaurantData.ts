import { MenuItem, MenuCategory, RestaurantOutlet } from '../types/restaurant';

export const RESTAURANT_INFO = {
  brandName: 'Parampara Rasoi',
  tagline: 'Deccan & Dakshin Culinary Heritage',
  establishedYear: '1978',
  cuisine: 'South Indian & Maharashtrian Vegetarian Specialties',
  headquarters: 'Pune, Maharashtra, India',
  primaryPhone: '+91 20 2567 8900',
  whatsappNumber: '+91 98230 45670',
  supportEmail: 'contact@parampararasoi.in',
  openingHours: '7:00 AM – 11:00 PM (All 7 Days)',
  currency: '₹',
  timeZone: 'Asia/Kolkata',
  averageRating: '4.8',
  reviewCount: '14,200+'
};

export const RESTAURANT_OUTLETS: RestaurantOutlet[] = [
  {
    id: 'fc-road',
    name: 'FC Road Flagship',
    area: 'Deccan Gymkhana',
    city: 'Pune',
    address: 'Survey No. 1204/4, Opposite Fergusson College Gate No. 3, FC Road',
    landmark: 'Next to British Council Library',
    phone: '+91 20 2567 8901',
    whatsapp: '+91 98230 45671',
    timings: '7:00 AM – 11:00 PM',
    seatingCapacity: 120,
    features: ['Valet Parking', 'Indoor Air-Conditioned', 'Traditional Baithak Seating', 'Live Filter Coffee Counter'],
    mapEmbedQuery: 'Fergusson+College+Road+Pune',
    acceptsReservations: true,
    acceptsOnlineDelivery: true
  },
  {
    id: 'law-college',
    name: 'Erandwane Heritage Pavilion',
    area: 'Law College Road',
    city: 'Pune',
    address: 'Plot 45, Gulmohar Path, Near Film and Television Institute of India (FTII)',
    landmark: 'Off Law College Road',
    phone: '+91 20 2544 3210',
    whatsapp: '+91 98230 45672',
    timings: '7:30 AM – 10:30 PM',
    seatingCapacity: 95,
    features: ['Verandah Garden Dining', 'Family Private Dining', 'Wheelchair Accessible', 'Breakfast Special Buffets'],
    mapEmbedQuery: 'Law+College+Road+Pune',
    acceptsReservations: true,
    acceptsOnlineDelivery: true
  },
  {
    id: 'baner-highstreet',
    name: 'Baner High Street',
    area: 'Baner',
    city: 'Pune',
    address: 'Ground Floor, Signature Towers, Balewadi High Street Link Road',
    landmark: 'Opposite Cummins India Campus',
    phone: '+91 20 6790 1200',
    whatsapp: '+91 98230 45673',
    timings: '8:00 AM – 11:30 PM',
    seatingCapacity: 140,
    features: ['Fast Express Takeaway', 'Modern Contemporary Cafe', 'EV Charging Spot', 'Late Night Dining'],
    mapEmbedQuery: 'Balewadi+High+Street+Baner+Pune',
    acceptsReservations: true,
    acceptsOnlineDelivery: true
  }
];

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'all',
    name: 'Full Menu',
    description: 'Explore our complete heritage menu crafted with pure ingredients',
    iconName: 'Utensils',
    dishCount: 16
  },
  {
    id: 'signature-dosas',
    name: 'Signature Dosas',
    description: 'Crisp golden fermented crepes cooked on cast iron with pure desi ghee',
    iconName: 'Flame',
    dishCount: 5
  },
  {
    id: 'steamed-crispy',
    name: 'Idlis & Vadas',
    description: 'Cloud-soft steamed idlis and golden spiced lentil vadas with drumstick sambar',
    iconName: 'Sparkles',
    dishCount: 3
  },
  {
    id: 'maharashtrian',
    name: 'Maharashtrian Favorites',
    description: 'Authentic Puneri misal, sabudana wada, thalipeeth, and kothimbir vadi',
    iconName: 'Coffee',
    dishCount: 3
  },
  {
    id: 'thalis-combos',
    name: 'Thalis & Combos',
    description: 'Wholesome balanced meal platters and curated morning breakfast tiffins',
    iconName: 'Layers',
    dishCount: 3
  },
  {
    id: 'beverages-desserts',
    name: 'Filter Kaapi & Sweets',
    description: 'Freshly roasted Chikmagalur degree filter coffee and artisanal traditional desserts',
    iconName: 'CupSoda',
    dishCount: 2
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'mysore-masala-dosa',
    name: 'Royal Mysore Masala Dosa',
    regionalName: 'म्हैसूर मसाला डोसा',
    category: 'signature-dosas',
    price: 185,
    description: 'Crispy fermented rice & urad crepe layered with fiery red garlic-chili chutney, stuffed with spiced tempered potato masala, roasted in pure A2 desi ghee.',
    image: '/images/hero_masala_dosa.jpg',
    dietary: 'veg',
    spiceLevel: 'medium',
    isBestseller: true,
    isChefSpecial: true,
    preparationTimeMinutes: 12,
    ingredients: ['Stone-ground Rice Batter', 'A2 Desi Ghee', 'Red Chili Garlic Paste', 'Spiced Potato Masala', 'Fresh Curry Leaves'],
    customizable: true,
    availableOptions: [
      {
        name: 'Ghee Selection',
        choices: [
          { label: 'Standard Desi Ghee', price: 0 },
          { label: 'Extra Gir Cow A2 Ghee (+₹25)', price: 25 },
          { label: 'Low-oil Tawa Roast', price: 0 }
        ]
      },
      {
        name: 'Spice Accompaniment',
        choices: [
          { label: 'Traditional Gunpowder (Milagai Podi)', price: 20 },
          { label: 'Extra Sambar Bowl', price: 15 },
          { label: 'Fresh Coconut Chutney Double', price: 15 }
        ]
      }
    ],
    isAvailable: true
  },
  {
    id: 'ghee-button-idli-vada',
    name: 'Ghee Podi Button Idli & Crispy Medu Vada Combo',
    regionalName: 'तूप इडली वडा कॉम्बो',
    category: 'steamed-crispy',
    price: 165,
    description: 'Fourteen mini steamed idlis bathed in warm drumstick sambar and molten golden ghee, paired with two crunchy medu vadas and trio of fresh stone chutneys.',
    image: '/images/ghee_idli_vada.jpg',
    dietary: 'veg',
    spiceLevel: 'mild',
    isBestseller: true,
    preparationTimeMinutes: 8,
    ingredients: ['Steamed Rice Cakes', 'Urad Dal Vada', 'Drumstick & Tamarind Sambar', 'Coconut-Chana Chutney', 'Molten Ghee'],
    customizable: true,
    availableOptions: [
      {
        name: 'Serving Style',
        choices: [
          { label: 'Dunked in Sambar (Dip Idli)', price: 0 },
          { label: 'Separate Sambar & Chutneys', price: 0 }
        ]
      },
      {
        name: 'Add-ons',
        choices: [
          { label: 'Add Roasted Malgudi Podi (+₹20)', price: 20 },
          { label: 'Extra Medu Vada 1 pc (+₹40)', price: 40 }
        ]
      }
    ],
    isAvailable: true
  },
  {
    id: 'grand-deccan-thali',
    name: 'Grand Deccan Heritage Thali',
    regionalName: 'शाही दख्खन थाळी',
    category: 'thalis-combos',
    price: 345,
    description: 'Lavish traditional bell-metal feast featuring Dal Makhani, Paneer Deccan Masala, seasonal vegetable bhaji, fragrant Jeera Basmati, hot puffed puris, kothimbir vadi, basundi sweet, and roasted papad.',
    image: '/images/grand_regional_thali.jpg',
    dietary: 'veg',
    spiceLevel: 'medium',
    isBestseller: true,
    isChefSpecial: true,
    preparationTimeMinutes: 15,
    ingredients: ['Paneer Deccan Gravy', 'Slow-cooked Dal Makhani', 'Puffed Wheat Puris', 'Saffron Basundi', 'Puneri Solkadhi'],
    customizable: true,
    availableOptions: [
      {
        name: 'Bread Preference',
        choices: [
          { label: '4 Puffed Wheat Puris', price: 0 },
          { label: '3 Phulkas with Desi Ghee', price: 0 },
          { label: '2 Jowar Bhakri (+₹20)', price: 20 }
        ]
      },
      {
        name: 'Sweet Choice',
        choices: [
          { label: 'Saffron Almond Basundi', price: 0 },
          { label: 'Warm Gulab Jamun (2 pcs)', price: 0 }
        ]
      }
    ],
    isAvailable: true
  },
  {
    id: 'chikmagalur-filter-kaapi',
    name: 'Authentic Chikmagalur Degree Filter Kaapi',
    regionalName: 'पारंपरिक डिग्री फिल्टर कॉफी',
    category: 'beverages-desserts',
    price: 75,
    description: 'Slow-dripped dark roast coffee blend with 15% chicory from Karnataka highlands, boiled with thick creamy farm milk and poured back-and-forth in a brass dabarah.',
    image: '/images/artisanal_filter_coffee.jpg',
    dietary: 'veg',
    spiceLevel: 'mild',
    isBestseller: true,
    preparationTimeMinutes: 5,
    ingredients: ['Chikmagalur Plantation AA Arabica & Robusta', 'Chicory', 'Fresh Full Cream Milk', 'Organic Brown Sugar'],
    customizable: true,
    availableOptions: [
      {
        name: 'Sweetness',
        choices: [
          { label: 'Standard Sweet', price: 0 },
          { label: 'Less Sugar', price: 0 },
          { label: 'Zero Sugar / Black Kaapi', price: 0 },
          { label: 'With Jaggery (Gud)', price: 10 }
        ]
      }
    ],
    isAvailable: true
  },
  {
    id: 'puneri-special-misal-pav',
    name: 'Puneri Tarri Misal Pav with Farsan',
    regionalName: 'पुणेरी तरी मिसळ पाव',
    category: 'maharashtrian',
    price: 150,
    description: 'Sprouted moth beans cooked in fiery aromatic Kolhapuri-Puneri tarri rassa, crowned with crisp spicy farsan, finely chopped red onions, fresh coriander, lemon wedge, and butter-toasted ladi pav.',
    image: '/images/grand_regional_thali.jpg',
    dietary: 'veg',
    spiceLevel: 'spicy',
    isBestseller: true,
    preparationTimeMinutes: 10,
    ingredients: ['Sprouted Matki Beans', 'Puneri Kat Rassa', 'Ratnagiri Farsan', 'Fresh Onions & Coriander', 'Ladi Pav with Amul Butter'],
    customizable: true,
    availableOptions: [
      {
        name: 'Spice Heat Level',
        choices: [
          { label: 'Medium Spice (Puneri Style)', price: 0 },
          { label: 'Fiery Kolhapuri Zing', price: 0 },
          { label: 'Mild (Jain Style available)', price: 0 }
        ]
      },
      {
        name: 'Pav Serving',
        choices: [
          { label: '2 Butter-toasted Ladi Pav', price: 0 },
          { label: 'Extra Pav Pair (+₹25)', price: 25 },
          { label: 'Extra Rassa Kat Bowl (+₹25)', price: 25 }
        ]
      }
    ],
    isAvailable: true
  },
  {
    id: 'kothimbir-vadi-crunch',
    name: 'Steamed & Crisp-Fried Kothimbir Vadi',
    regionalName: 'खमंग कोथिंबीर वडी',
    category: 'maharashtrian',
    price: 140,
    description: 'Finely chopped fresh coriander greens blended with spiced gram flour, steamed into savory cakes, and shallow fried until golden crisp. Served with raw mango mint chutney.',
    image: '/images/ghee_idli_vada.jpg',
    dietary: 'veg',
    spiceLevel: 'medium',
    isChefSpecial: true,
    preparationTimeMinutes: 10,
    ingredients: ['Fresh Coriander Greens', 'Besan (Gram Flour)', 'Roasted Sesame Seeds', 'Carom Seeds (Ajwain)', 'Green Chili Garlic'],
    isAvailable: true
  },
  {
    id: 'benne-dosa-davangere',
    name: 'Davangere Benne Dosa',
    regionalName: 'दावणगेरे लोणी डोसा',
    category: 'signature-dosas',
    price: 195,
    description: 'Fluffy yet crisp spongy dosa generously lathered with white churned butter (Makkhan), served with spiced mashed potato palya and spicy raw coconut-garlic chutney.',
    image: '/images/hero_masala_dosa.jpg',
    dietary: 'veg',
    spiceLevel: 'mild',
    isBestseller: true,
    preparationTimeMinutes: 12,
    ingredients: ['Fermented Rice Batter', 'White Cultured Butter', 'Potato Palya', 'Spicy Coconut Chutney'],
    isAvailable: true
  },
  {
    id: 'rava-onion-chili-dosa',
    name: 'Golden Crisp Onion Rava Dosa',
    regionalName: 'कांदा रवा डोसा',
    category: 'signature-dosas',
    price: 175,
    description: 'Lacy, crackling semolina crepe studded with crushed black pepper, finely chopped onions, cumin seeds, and fresh curry leaves. Extra crisp on cast-iron tawa.',
    image: '/images/hero_masala_dosa.jpg',
    dietary: 'veg',
    spiceLevel: 'medium',
    preparationTimeMinutes: 14,
    ingredients: ['Semolina Rava', 'Rice Flour', 'Cumin & Peppercorns', 'Sweet Red Onions', 'Green Chilies'],
    isAvailable: true
  },
  {
    id: 'sabudana-khichdi-vada',
    name: 'Upvas Special Sabudana Khichdi & Vada',
    regionalName: 'साबुदाणा खिचडी आणि वडे',
    category: 'maharashtrian',
    price: 160,
    description: 'Non-sticky tapioca pearls tossed with coarse roasted peanuts, cumin, diced potatoes, and fresh coriander in pure ghee, accompanied by two crisp sabudana vadas and sweet peanut curd dip.',
    image: '/images/ghee_idli_vada.jpg',
    dietary: 'veg',
    spiceLevel: 'mild',
    preparationTimeMinutes: 10,
    ingredients: ['Soaked Tapioca Pearls', 'Crushed Peanuts', 'Sendha Namak (Rock Salt)', 'Cumin Seeds', 'Sweetened Dahi'],
    isAvailable: true
  },
  {
    id: 'south-indian-tiffin-combo',
    name: 'South Indian Sunrise Tiffin Combo',
    regionalName: 'दक्षिण भारतीय टिफिन कॉम्बो',
    category: 'thalis-combos',
    price: 240,
    description: 'The ultimate breakfast spread: 1 Mini Masala Dosa, 2 Steamed Button Idlis, 1 Crispy Medu Vada, accompanied by piping hot Sambar, Coconut Chutney, Tomato Chutney, and 1 Brass Tumbler Filter Kaapi.',
    image: '/images/hero_masala_dosa.jpg',
    dietary: 'veg',
    spiceLevel: 'medium',
    isBestseller: true,
    isChefSpecial: true,
    preparationTimeMinutes: 12,
    ingredients: ['Mini Masala Dosa', '2 Steamed Idlis', '1 Medu Vada', 'Drumstick Sambar', 'Chikmagalur Filter Coffee'],
    customizable: true,
    availableOptions: [
      {
        name: 'Beverage Choice',
        choices: [
          { label: 'Hot Filter Kaapi', price: 0 },
          { label: 'Masala Chai with Ginger', price: 0 },
          { label: 'Fresh Spiced Buttermilk (Chaas)', price: 0 }
        ]
      }
    ],
    isAvailable: true
  },
  {
    id: 'saffron-pistachio-basundi',
    name: 'Kashmiri Saffron & Pistachio Basundi',
    regionalName: 'केशर पिस्ता बासुंदी',
    category: 'beverages-desserts',
    price: 130,
    description: 'Slow-simmered whole milk reduced to a rich creamy consistency, infused with royal Kashmiri saffron threads, cardamom seeds, and roasted slivered almonds & pistachios.',
    image: '/images/grand_regional_thali.jpg',
    dietary: 'veg',
    spiceLevel: 'mild',
    preparationTimeMinutes: 5,
    ingredients: ['Full Fat Farm Milk', 'Kashmiri Saffron', 'Green Cardamom', 'Pistachios & Almonds', 'Cane Sugar'],
    isAvailable: true
  },
  {
    id: 'podi-thatte-idli',
    name: 'Bengaluru Thatte Idli with Malgudi Podi',
    regionalName: 'तट्टे इडली गनपावडर',
    category: 'steamed-crispy',
    price: 145,
    description: 'Large saucer-sized steamed fluffy idli drenched in aromatic Malgudi gunpowder lentils and warm desi ghee. Soft as morning dew, served with thick white coconut chutney.',
    image: '/images/ghee_idli_vada.jpg',
    dietary: 'veg',
    spiceLevel: 'medium',
    preparationTimeMinutes: 8,
    ingredients: ['Coarse Rice Batter', 'Malgudi Gunpowder Podi', 'A2 Desi Ghee', 'Fresh Coconut Chutney'],
    isAvailable: true
  }
];

export const COMBOS_DATA = [
  {
    id: 'combo-morning-tiffin',
    title: 'The Deccan Sunrise Tiffin',
    tagline: 'Best for Breakfast & Brunch',
    price: 240,
    originalPrice: 280,
    items: ['1 Crisp Mini Masala Dosa', '2 Steamed Idlis', '1 Crispy Medu Vada', 'Chikmagalur Filter Kaapi', 'Trio of Chutneys & Sambar'],
    image: '/images/hero_masala_dosa.jpg',
    badge: 'Popular Combo'
  },
  {
    id: 'combo-puneri-chaat-thali',
    title: 'Puneri Heritage Afternoon Meal',
    tagline: 'Authentic Maharashtrian Lunch',
    price: 345,
    originalPrice: 390,
    items: ['Royal Deccan Thali with Paneer & Dal', '4 Desi Ghee Puris', 'Kothimbir Vadi (4 pcs)', 'Saffron Basundi', 'Spiced Mattha Buttermilk'],
    image: '/images/grand_regional_thali.jpg',
    badge: 'Chef Choice'
  },
  {
    id: 'combo-kaapi-snacks',
    title: 'Evening Kaapi & Wada Pav Platter',
    tagline: 'Classic 4 PM Teatime Comfort',
    price: 175,
    originalPrice: 210,
    items: ['2 Golden Steamed & Fried Vadas', 'Chutney & Fried Chilies', 'Degree Filter Kaapi in Brass Dabarah', 'Banana Chips'],
    image: '/images/artisanal_filter_coffee.jpg',
    badge: 'Teatime Special'
  }
];

export const TESTIMONIALS = [
  {
    id: '1',
    author: 'Ananya Deshpande',
    role: 'Food Chronicler & Resident of Deccan Gymkhana',
    outlet: 'FC Road Flagship',
    content: 'Parampara Rasoi captures that nostalgic, authentic warmth that Pune has cherished for decades. The Mysore Masala Dosa with pure desi ghee is uncompromised perfection, and the brass-service filter kaapi is the finest in town.',
    rating: 5,
    date: 'October 2026'
  },
  {
    id: '2',
    author: 'Raghavan Iyer',
    role: 'Senior Software Architect, Hinjewadi',
    outlet: 'Baner High Street',
    content: 'Finding genuine South Indian tiffin that does not use shortcuts is rare. The Thatte Idli with Malgudi podi tastes like morning breakfasts in Malleshwaram. Their online delivery arrived piping hot and neatly packed.',
    rating: 5,
    date: 'September 2026'
  },
  {
    id: '3',
    author: 'Dr. Meenal Kulkarni',
    role: 'Professor, Fergusson College',
    outlet: 'Erandwane Heritage Pavilion',
    content: 'We celebrated my mother’s 70th birthday at the Erandwane pavilion. The staff accommodated our large family party gracefully, and the Deccan Heritage Thali with freshly prepared basundi was cherished by three generations.',
    rating: 5,
    date: 'August 2026'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'Freshly Rolled Mysore Masala Dosa on Banana Leaf',
    category: 'Culinary Craft',
    image: '/images/hero_masala_dosa.jpg'
  },
  {
    id: 'gal-2',
    title: 'Steaming Button Idlis & Crispy Medu Vadas with Desi Ghee',
    category: 'Morning Tiffin',
    image: '/images/ghee_idli_vada.jpg'
  },
  {
    id: 'gal-3',
    title: 'Grand Deccan Heritage Feast in Traditional Brassware',
    category: 'Dining Experience',
    image: '/images/grand_regional_thali.jpg'
  },
  {
    id: 'gal-4',
    title: 'Warm Hospitality & Heritage Teak Ambiance',
    category: 'Atmosphere',
    image: '/images/restaurant_dining_interior.jpg'
  },
  {
    id: 'gal-5',
    title: 'Theatre of Artisanal Degree Filter Kaapi Pour',
    category: 'Traditions',
    image: '/images/artisanal_filter_coffee.jpg'
  }
];

export const BRAND_VALUES = [
  {
    title: 'Stone-Ground Fermentation',
    description: 'Our batters undergo a natural 14-hour fermentation in traditional granite wet grinders, yielding velvety texture with zero chemical leaveners.'
  },
  {
    title: '100% Pure Desi Ghee',
    description: 'Every dosa and sweet is prepared exclusively using pure churned cow ghee, bringing unmatched aroma, golden crispness, and easy digestion.'
  },
  {
    title: 'Single-Estate Chicory Kaapi',
    description: 'Custom roasted beans sourced directly from Chikmagalur plantation heights, freshly grounded every morning and slow-extracted.'
  },
  {
    title: 'Warm Deccan Atithi Devo Bhava',
    description: 'Hospitality rooted in genuine care, hygienic open kitchens, and prompt service designed to make families feel right at home.'
  }
];
