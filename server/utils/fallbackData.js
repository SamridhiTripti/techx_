export const fallbackCategories = [
  {
    _id: 'cat_smartphones',
    name: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1510557880182-3dc0c67b11b0?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'cat_laptops',
    name: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'cat_audio',
    name: 'Audio',
    image: 'https://images.unsplash.com/photo-1518441926080-d1c29a5c17d0?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'cat_wearables',
    name: 'Wearables',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'cat_gaming',
    name: 'Gaming',
    image: 'https://images.unsplash.com/photo-1593642532871-8b12e02d091c?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'cat_accessories',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'cat_smart_home',
    name: 'Smart Home',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'cat_cameras',
    name: 'Cameras',
    image: 'https://images.unsplash.com/photo-1519183071298-a2962be90b3b?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'cat_networking',
    name: 'Networking',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'cat_drones',
    name: 'Drones',
    image: 'https://images.unsplash.com/photo-1522844932797-1d171d2aade5?auto=format&fit=crop&w=800&q=80'
  }
]

export const fallbackSubCategories = [
  {
    _id: 'sub_android',
    name: 'Android Phones',
    image: 'https://images.unsplash.com/photo-1512499617640-c2f999089a66?auto=format&fit=crop&w=800&q=80',
    cateogry: ['cat_smartphones'],
    category: [{ _id: 'cat_smartphones', name: 'Smartphones' }]
  },
  {
    _id: 'sub_ios',
    name: 'iPhone',
    image: 'https://images.unsplash.com/photo-1512383840416-eb6de172fca6?auto=format&fit=crop&w=800&q=80',
    cateogry: ['cat_smartphones'],
    category: [{ _id: 'cat_smartphones', name: 'Smartphones' }]
  },
  {
    _id: 'sub_laptops',
    name: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    cateogry: ['cat_laptops'],
    category: [{ _id: 'cat_laptops', name: 'Laptops' }]
  },
  {
    _id: 'sub_headphones',
    name: 'Headphones',
    image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=80',
    cateogry: ['cat_audio'],
    category: [{ _id: 'cat_audio', name: 'Audio' }]
  },
  {
    _id: 'sub_wearables',
    name: 'Smart Watches',
    image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80',
    cateogry: ['cat_wearables'],
    category: [{ _id: 'cat_wearables', name: 'Wearables' }]
  },
  {
    _id: 'sub_peripherals',
    name: 'Peripherals',
    image: 'https://images.unsplash.com/photo-1567859795666-4d2d7f4eb0f3?auto=format&fit=crop&w=800&q=80',
    cateogry: ['cat_gaming'],
    category: [{ _id: 'cat_gaming', name: 'Gaming' }]
  },
  {
    _id: 'sub_chargers',
    name: 'Chargers & Cables',
    image: 'https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=800&q=80',
    cateogry: ['cat_accessories'],
    category: [{ _id: 'cat_accessories', name: 'Accessories' }]
  },
  {
    _id: 'sub_smart_lighting',
    name: 'Smart Lighting',
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80',
    cateogry: ['cat_smart_home'],
    category: [{ _id: 'cat_smart_home', name: 'Smart Home' }]
  },
  {
    _id: 'sub_home_security',
    name: 'Home Security',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    cateogry: ['cat_smart_home'],
    category: [{ _id: 'cat_smart_home', name: 'Smart Home' }]
  },
  {
    _id: 'sub_mirror_camera',
    name: 'Mirrorless Cameras',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    cateogry: ['cat_cameras'],
    category: [{ _id: 'cat_cameras', name: 'Cameras' }]
  },
  {
    _id: 'sub_wifi',
    name: 'Wi-Fi Routers',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80',
    cateogry: ['cat_networking'],
    category: [{ _id: 'cat_networking', name: 'Networking' }]
  },
  {
    _id: 'sub_mesh',
    name: 'Mesh Systems',
    image: 'https://images.unsplash.com/photo-1505577058444-a3dab8e1e5b6?auto=format&fit=crop&w=800&q=80',
    cateogry: ['cat_networking'],
    category: [{ _id: 'cat_networking', name: 'Networking' }]
  },
  {
    _id: 'sub_drones',
    name: 'Drones',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    cateogry: ['cat_drones'],
    category: [{ _id: 'cat_drones', name: 'Drones' }]
  }
]

export const fallbackProducts = [
  {
    _id: 'prod_s24',
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    image: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_smartphones'],
    subCateogry: ['sub_android'],
    unit: 'piece',
    stock: 18,
    price: 64999,
    discount: 10,
    description: 'Flagship Android phone with AI-powered camera and bright AMOLED display.',
    more_details: {
      Battery: '4000mAh with 45W fast charging',
      Storage: '256GB / 12GB RAM',
      Color: 'Onyx Black'
    },
    published: true
  },
  {
    _id: 'prod_oneplus12',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    image: ['https://images.unsplash.com/photo-1512499617640-c2f999089a66?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_smartphones'],
    subCateogry: ['sub_android'],
    unit: 'piece',
    stock: 14,
    price: 59999,
    discount: 8,
    description: 'Premium Snapdragon performance with a smooth 120Hz display.',
    more_details: {
      Battery: '5400mAh with 100W charging',
      Storage: '256GB / 16GB RAM',
      Color: 'Flint Black'
    },
    published: true
  },
  {
    _id: 'prod_iphone15',
    name: 'Apple iPhone 15',
    brand: 'Apple',
    image: ['https://images.unsplash.com/photo-1512383840416-eb6de172fca6?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_smartphones'],
    subCateogry: ['sub_ios'],
    unit: 'piece',
    stock: 12,
    price: 79999,
    discount: 7,
    description: 'Apple’s latest iPhone with Dynamic Island and a brilliant camera system.',
    more_details: {
      Battery: '3349mAh with USB-C charging',
      Storage: '128GB / 6GB RAM',
      Color: 'Blue'
    },
    published: true
  },
  {
    _id: 'prod_redmi13',
    name: 'Redmi Note 13 Pro',
    brand: 'Redmi',
    image: ['https://images.unsplash.com/photo-1518441926080-d1c29a5c17d0?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_smartphones'],
    subCateogry: ['sub_android'],
    unit: 'piece',
    stock: 20,
    price: 22999,
    discount: 12,
    description: 'Value-focused mobile with a large display and fast charging for everyday use.',
    more_details: {
      Battery: '5500mAh',
      Storage: '128GB / 8GB RAM',
      Color: 'Forest Green'
    },
    published: true
  },
  {
    _id: 'prod_realmegt6',
    name: 'realme GT 6',
    brand: 'realme',
    image: ['https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_smartphones'],
    subCateogry: ['sub_android'],
    unit: 'piece',
    stock: 16,
    price: 33999,
    discount: 11,
    description: 'Gaming-ready smartphone with strong performance and vivid AMOLED display.',
    more_details: {
      Battery: '5200mAh with 80W charging',
      Storage: '256GB / 12GB RAM',
      Color: 'Neon Blue'
    },
    published: true
  },
  {
    _id: 'prod_pixel8',
    name: 'Google Pixel 8',
    brand: 'Google',
    image: ['https://images.unsplash.com/photo-1478411809715-780e2d94b1d0?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_smartphones'],
    subCateogry: ['sub_android'],
    unit: 'piece',
    stock: 10,
    price: 54999,
    discount: 9,
    description: 'Clean Android experience with top-tier photography and Google AI features.',
    more_details: {
      Battery: '4575mAh',
      Storage: '128GB / 8GB RAM',
      Color: 'Hazel'
    },
    published: true
  },
  {
    _id: 'prod_m2air',
    name: 'MacBook Air M2',
    brand: 'Apple',
    image: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_laptops'],
    subCateogry: ['sub_laptops'],
    unit: 'piece',
    stock: 9,
    price: 119999,
    discount: 12,
    description: 'Ultra-light premium laptop for students, creators, and professionals.',
    more_details: {
      Processor: 'Apple M2',
      RAM: '8GB',
      Storage: '256GB SSD'
    },
    published: true
  },
  {
    _id: 'prod_thinkpad',
    name: 'Lenovo ThinkPad E14',
    brand: 'Lenovo',
    image: ['https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_laptops'],
    subCateogry: ['sub_laptops'],
    unit: 'piece',
    stock: 11,
    price: 69999,
    discount: 10,
    description: 'Durable business laptop with fast performance and a comfortable keyboard.',
    more_details: {
      Processor: 'Intel Core i5',
      RAM: '16GB',
      Storage: '512GB SSD'
    },
    published: true
  },
  {
    _id: 'prod_hp15',
    name: 'HP Pavilion 15',
    brand: 'HP',
    image: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_laptops'],
    subCateogry: ['sub_laptops'],
    unit: 'piece',
    stock: 13,
    price: 57999,
    discount: 9,
    description: 'Reliable performance laptop for work, study and entertainment with a sleek chassis.',
    more_details: {
      Processor: 'Intel Core i5',
      RAM: '12GB',
      Storage: '512GB SSD'
    },
    published: true
  },
  {
    _id: 'prod_dell16',
    name: 'Dell Inspiron 16',
    brand: 'Dell',
    image: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_laptops'],
    subCateogry: ['sub_laptops'],
    unit: 'piece',
    stock: 12,
    price: 74999,
    discount: 11,
    description: 'A spacious 16-inch laptop with strong multimedia and productivity performance.',
    more_details: {
      Processor: 'Intel Core i7',
      RAM: '16GB',
      Storage: '512GB SSD'
    },
    published: true
  },
  {
    _id: 'prod_asusvivobook',
    name: 'ASUS Vivobook 15',
    brand: 'ASUS',
    image: ['https://images.unsplash.com/photo-1518441926080-d1c29a5c17d0?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_laptops'],
    subCateogry: ['sub_laptops'],
    unit: 'piece',
    stock: 15,
    price: 54999,
    discount: 8,
    description: 'Slim everyday laptop with crisp visuals and dependable battery life.',
    more_details: {
      Processor: 'Ryzen 5',
      RAM: '8GB',
      Storage: '512GB SSD'
    },
    published: true
  },
  {
    _id: 'prod_airpods',
    name: 'Apple AirPods Pro 2',
    brand: 'Apple',
    image: ['https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_audio'],
    subCateogry: ['sub_headphones'],
    unit: 'piece',
    stock: 20,
    price: 24999,
    discount: 6,
    description: 'Noise-cancelling earbuds with adaptive audio and a comfortable in-ear fit.',
    more_details: {
      Battery: 'Up to 6 hours playback',
      Connectivity: 'Bluetooth 5.3',
      Features: 'ANC and transparency mode'
    },
    published: true
  },
  {
    _id: 'prod_bose',
    name: 'Bose QuietComfort Ultra',
    brand: 'Bose',
    image: ['https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_audio'],
    subCateogry: ['sub_headphones'],
    unit: 'piece',
    stock: 8,
    price: 39999,
    discount: 10,
    description: 'Premium over-ear headphones for immersive sound and comfort.',
    more_details: {
      Battery: '24 hours',
      Connectivity: 'Bluetooth 5.3',
      Weight: '250g'
    },
    published: true
  },
  {
    _id: 'prod_wh1000xm5',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    image: ['https://images.unsplash.com/photo-1517072207344-0bca9bbbd282?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_audio'],
    subCateogry: ['sub_headphones'],
    unit: 'piece',
    stock: 10,
    price: 28999,
    discount: 10,
    description: 'Top-tier noise cancelling headphones with long battery life and premium comfort.',
    more_details: {
      Battery: '30 hours',
      Connectivity: 'Bluetooth 5.2',
      Weight: '250g'
    },
    published: true
  },
  {
    _id: 'prod_watch6',
    name: 'Samsung Galaxy Watch 6',
    brand: 'Samsung',
    image: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_wearables'],
    subCateogry: ['sub_wearables'],
    unit: 'piece',
    stock: 13,
    price: 28999,
    discount: 8,
    description: 'Feature-rich smartwatch with fitness tracking, sleep insights, and LTE support.',
    more_details: {
      Battery: '40 hours',
      Display: '1.3-inch AMOLED',
      Compatibility: 'Android and iOS'
    },
    published: true
  },
  {
    _id: 'prod_watchultra',
    name: 'Apple Watch Ultra 2',
    brand: 'Apple',
    image: ['https://images.unsplash.com/photo-1518002279640-5ae1e4f19743?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_wearables'],
    subCateogry: ['sub_wearables'],
    unit: 'piece',
    stock: 7,
    price: 84999,
    discount: 9,
    description: 'Rugged premium smartwatch with advanced health tracking and precision GPS.',
    more_details: {
      Battery: '36 hours',
      Display: '1.92-inch Retina',
      Compatibility: 'iPhone'
    },
    published: true
  },
  {
    _id: 'prod_gamingmouse',
    name: 'Logitech G604 Lightspeed',
    brand: 'Logitech',
    image: ['https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_gaming'],
    subCateogry: ['sub_peripherals'],
    unit: 'piece',
    stock: 16,
    price: 7999,
    discount: 12,
    description: 'High-precision wireless gaming mouse built for fast response and comfort.',
    more_details: {
      Sensor: '25,600 DPI',
      Buttons: '15 programmable buttons',
      Battery: '240 hours'
    },
    published: true
  },
  {
    _id: 'prod_keyboard',
    name: 'Razer BlackWidow V4',
    brand: 'Razer',
    image: ['https://images.unsplash.com/photo-1590487986508-1b803f11f620?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_gaming'],
    subCateogry: ['sub_peripherals'],
    unit: 'piece',
    stock: 10,
    price: 14999,
    discount: 10,
    description: 'Mechanical gaming keyboard with customizable RGB lighting and low-latency switches.',
    more_details: {
      Switches: 'Green mechanical',
      Layout: 'Full-size',
      Connectivity: 'USB-C'
    },
    published: true
  },
  {
    _id: 'prod_charger',
    name: 'Anker 65W GaN Charger',
    brand: 'Anker',
    image: ['https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_accessories'],
    subCateogry: ['sub_chargers'],
    unit: 'piece',
    stock: 25,
    price: 3999,
    discount: 15,
    description: 'Compact USB-C charger with fast charging for phones, tablets, and laptops.',
    more_details: {
      Power: '65W',
      Ports: '2-port',
      Compatibility: 'USB-C devices'
    },
    published: true
  },
  {
    _id: 'prod_cable',
    name: 'Belkin USB-C Cable 100W',
    brand: 'Belkin',
    image: ['https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_accessories'],
    subCateogry: ['sub_chargers'],
    unit: 'piece',
    stock: 22,
    price: 1899,
    discount: 8,
    description: 'Durable USB-C cable for fast data and power delivery.',
    more_details: {
      Length: '1.8m',
      Power: '100W',
      Material: 'Braided nylon'
    },
    published: true
  },
  {
    _id: 'prod_smartbulb',
    name: 'Philips Hue Smart Bulb',
    brand: 'Philips',
    image: ['https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_smart_home'],
    subCateogry: ['sub_smart_lighting'],
    unit: 'piece',
    stock: 28,
    price: 5499,
    discount: 15,
    description: 'Smart LED bulb with color control and app automation.',
    more_details: {
      Brightness: '800 lumens',
      Connectivity: 'Bluetooth + Zigbee',
      Color: '16M colors'
    },
    published: true
  },
  {
    _id: 'prod_ringcam',
    name: 'Ring Battery Cam',
    brand: 'Ring',
    image: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_smart_home'],
    subCateogry: ['sub_home_security'],
    unit: 'piece',
    stock: 14,
    price: 15999,
    discount: 10,
    description: 'Wireless security camera with motion detection and two-way talk.',
    more_details: {
      Battery: 'Rechargeable',
      Connectivity: 'Wi-Fi',
      Resolution: '1080p HD'
    },
    published: true
  },
  {
    _id: 'prod_sonyalpha',
    name: 'Sony Alpha a7 III',
    brand: 'Sony',
    image: ['https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_cameras'],
    subCateogry: ['sub_mirror_camera'],
    unit: 'piece',
    stock: 6,
    price: 169999,
    discount: 5,
    description: 'Full-frame mirrorless camera with excellent low-light performance.',
    more_details: {
      Sensor: '24.2MP',
      Lens: 'FE 28-70mm kit lens',
      Video: '4K HDR'
    },
    published: true
  },
  {
    _id: 'prod_orbi',
    name: 'Netgear Orbi WiFi 6',
    brand: 'Netgear',
    image: ['https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_networking'],
    subCateogry: ['sub_wifi'],
    unit: 'piece',
    stock: 12,
    price: 29999,
    discount: 10,
    description: 'Tri-band mesh router for whole-home coverage and fast speeds.',
    more_details: {
      Speed: '6Gbps',
      Coverage: '3000 sqft',
      Ports: '4 x Gigabit'
    },
    published: true
  },
  {
    _id: 'prod_mavics',
    name: 'DJI Mini 3',
    brand: 'DJI',
    image: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80'],
    cateogry: ['cat_drones'],
    subCateogry: ['sub_drones'],
    unit: 'piece',
    stock: 8,
    price: 79999,
    discount: 7,
    description: 'Compact drone with 4K camera and advanced safety features.',
    more_details: {
      FlightTime: '38 minutes',
      Camera: '4K/30fps',
      Weight: '249g'
    },
    published: true
  }
]
