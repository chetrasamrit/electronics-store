import type { Product } from '~/stores/cart'

export const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    price: 1199,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
    category: 'phones',
    rating: 4.9,
    reviews: 2847,
    badge: 'Best Seller',
    specs: ['6.9" OLED Display', 'A18 Pro Chip', '48MP Camera', '4685mAh Battery'],
    inStock: true,
  },
  {
    id: 2,
    name: 'Samsung Galaxy S25 Ultra',
    brand: 'Samsung',
    price: 1099,
    originalPrice: 1249,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
    category: 'phones',
    rating: 4.8,
    reviews: 1934,
    badge: 'New',
    specs: ['6.8" Dynamic AMOLED', 'Snapdragon 8 Elite', '200MP Camera', 'S Pen Included'],
    inStock: true,
  },
  {
    id: 3,
    name: 'MacBook Pro 16" M4',
    brand: 'Apple',
    price: 2499,
    originalPrice: 2699,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    category: 'laptops',
    rating: 4.9,
    reviews: 1258,
    badge: 'Hot Deal',
    specs: ['M4 Pro Chip', '18GB Unified Memory', '512GB SSD', '22hr Battery'],
    inStock: true,
  },
  {
    id: 4,
    name: 'Dell XPS 15',
    brand: 'Dell',
    price: 1799,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=400&fit=crop',
    category: 'laptops',
    rating: 4.7,
    reviews: 876,
    specs: ['Intel Core i9', '32GB DDR5 RAM', '1TB NVMe SSD', '15.6" 4K OLED'],
    inStock: true,
  },
  {
    id: 5,
    name: 'Sony BRAVIA 65" 4K OLED',
    brand: 'Sony',
    price: 1899,
    originalPrice: 2299,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop',
    category: 'tvs',
    rating: 4.8,
    reviews: 654,
    badge: 'Sale',
    specs: ['65" 4K OLED', '120Hz Refresh Rate', 'Dolby Vision & Atmos', 'Google TV'],
    inStock: true,
  },
  {
    id: 6,
    name: 'LG C4 55" OLED evo',
    brand: 'LG',
    price: 1399,
    originalPrice: 1699,
    image: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=400&h=400&fit=crop',
    category: 'tvs',
    rating: 4.7,
    reviews: 1123,
    specs: ['55" OLED evo', 'α9 AI Processor Gen7', '144Hz Gaming Mode', 'webOS 24'],
    inStock: true,
  },
  {
    id: 7,
    name: 'Sony A7 V Full Frame',
    brand: 'Sony',
    price: 3199,
    originalPrice: 3499,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    category: 'cameras',
    rating: 4.9,
    reviews: 432,
    badge: 'New',
    specs: ['61MP Full Frame BSI', '4K 120fps Video', '5-Axis IBIS', 'AI AF Tracking'],
    inStock: true,
  },
  {
    id: 8,
    name: 'Sony WH-1000XM6',
    brand: 'Sony',
    price: 399,
    originalPrice: 449,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'audio',
    rating: 4.8,
    reviews: 3241,
    badge: 'Top Rated',
    specs: ['Industry-Best ANC', '40hr Battery', 'LDAC Hi-Res Audio', 'Multipoint Connect'],
    inStock: true,
  },
  {
    id: 9,
    name: 'AirPods Pro 3',
    brand: 'Apple',
    price: 279,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop',
    category: 'audio',
    rating: 4.7,
    reviews: 5682,
    specs: ['H3 Chip', 'Adaptive ANC', '35hr Total Battery', 'USB-C Charging'],
    inStock: true,
  },
  {
    id: 10,
    name: 'iPad Pro 13" M4',
    brand: 'Apple',
    price: 1299,
    originalPrice: 1399,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    category: 'tablets',
    rating: 4.8,
    reviews: 987,
    badge: 'New',
    specs: ['M4 Chip', '13" Ultra Retina XDR', 'Apple Pencil Pro', 'Nano-texture Glass'],
    inStock: true,
  },
  {
    id: 11,
    name: 'Samsung Galaxy Tab S10 Ultra',
    brand: 'Samsung',
    price: 1099,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop',
    category: 'tablets',
    rating: 4.6,
    reviews: 543,
    specs: ['14.6" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 3', '12GB RAM', 'S Pen Included'],
    inStock: true,
  },
  {
    id: 12,
    name: 'DJI Mini 4 Pro',
    brand: 'DJI',
    price: 759,
    originalPrice: 839,
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&h=400&fit=crop',
    category: 'cameras',
    rating: 4.8,
    reviews: 762,
    specs: ['4K 100fps Video', '20MP Hasselblad Camera', '34min Flight Time', 'Omnidirectional Obstacle Sensing'],
    inStock: false,
  },
]

export const categories = [
  { slug: 'phones',    label: 'Phones',   icon: 'lucide:smartphone', color: 'bg-blue-100 text-blue-600' },
  { slug: 'laptops',   label: 'Laptops',  icon: 'lucide:laptop',     color: 'bg-purple-100 text-purple-600' },
  { slug: 'tvs',       label: 'TVs',      icon: 'lucide:tv',         color: 'bg-green-100 text-green-600' },
  { slug: 'cameras',   label: 'Cameras',  icon: 'lucide:camera',     color: 'bg-yellow-100 text-yellow-600' },
  { slug: 'audio',     label: 'Audio',    icon: 'lucide:headphones', color: 'bg-pink-100 text-pink-600' },
  { slug: 'tablets',   label: 'Tablets',  icon: 'lucide:tablet',     color: 'bg-orange-100 text-orange-600' },
]

export function useProducts() {
  function getByCategory(category: string) {
    return products.filter((p) => p.category === category)
  }

  function getById(id: number) {
    return products.find((p) => p.id === id)
  }

  function search(query: string) {
    const q = query.toLowerCase()
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.includes(q),
    )
  }

  function getFeatured() {
    return products.filter((p) => p.badge)
  }

  return { products, getByCategory, getById, search, getFeatured }
}
