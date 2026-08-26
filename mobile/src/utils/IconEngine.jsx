import React from 'react';
import {
  GiFruitBowl,
  GiBanana,
  GiPeach,
  GiPineapple,
  GiFishCorpse,
  GiCarrot,
  GiHerbsBundle,
  GiChiliPepper,
  GiFlowerPot,
  GiMedicinePills,
  GiCoconuts,
  GiWheat,
  GiMushrooms,
  GiChestnutLeaf
} from 'react-icons/gi';
import {
  FaLeaf,
  FaPepperHot,
  FaMortarPestle,
  FaCoffee,
  FaLemon,
  FaSeedling
} from 'react-icons/fa';

export default function getIconForApplication(title, category) {
  const t = title?.toLowerCase() || '';
  const c = category?.toLowerCase() || '';

  // Exact Title Matches (Legacy parity)
  if (t.includes('jackfruit')) return GiFruitBowl;
  if (t.includes('banana')) return GiBanana;
  if (t.includes('mango') || t.includes('peach')) return GiPeach;
  if (t.includes('pineapple')) return GiPineapple;
  if (t.includes('citrus') || t.includes('lemon')) return FaLemon;
  if (t.includes('papaya')) return GiFruitBowl;
  if (t.includes('turmeric') || t.includes('ginger')) return FaMortarPestle;
  if (t.includes('chili') || t.includes('paprika')) return FaPepperHot;
  if (t.includes('cardamom') || t.includes('pepper')) return GiChiliPepper;
  if (t.includes('culinary herbs')) return GiHerbsBundle;
  if (t.includes('tea') || t.includes('moringa')) return FaLeaf;
  if (t.includes('coffee')) return FaCoffee;
  if (t.includes('coconut')) return GiCoconuts;
  if (t.includes('paddy') || t.includes('rice') || t.includes('corn') || t.includes('cassava')) return GiWheat;
  if (t.includes('millet') || t.includes('pulses') || t.includes('areca') || t.includes('peanut')) return FaSeedling;
  if (t.includes('soybean') || t.includes('legume')) return FaLeaf;
  if (t.includes('cashew')) return GiChestnutLeaf;
  if (t.includes('mushroom')) return GiMushrooms;
  if (t.includes('seasonal vegetable')) return GiCarrot;
  if (t.includes('onion') || t.includes('garlic')) return FaPepperHot; // Or FaSeedling
  if (t.includes('medicinal')) return GiMedicinePills;
  if (t.includes('flower') || t.includes('petal')) return GiFlowerPot;
  if (t.includes('fish') || t.includes('seafood')) return GiFishCorpse;

  // Broad Category Match Fallbacks
  if (c.includes('fruit')) return GiFruitBowl;
  if (c.includes('spice') || c.includes('herb')) return GiHerbsBundle;
  if (c.includes('plantation')) return FaLeaf;
  if (c.includes('grain') || c.includes('pulse')) return GiWheat;
  if (c.includes('nut') || c.includes('tuber')) return FaSeedling;
  if (c.includes('vegetable')) return GiCarrot;

  // Ultimate Fallback
  return FaLeaf;
}
