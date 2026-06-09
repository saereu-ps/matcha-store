/**
 * Matcha product images — matched to each product type.
 *
 * Image mapping logic:
 * - Ceremonial grade → vibrant green powder in chawan (tea bowl), traditional preparation
 * - Premium grade → matcha with tools/accessories, everyday drinking setup
 * - Culinary grade → matcha latte, baking, cooking applications
 * - Gift sets → chasen + chawan + accessories arranged
 * - Origins → Japanese tea landscapes matching each region
 */

const unsplash = (id: string, w = 600, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80`;

export const images = {
  products: {
    // Uji Ceremonial Okumidori — traditional ceremonial preparation, vibrant green in bowl
    ujiCeremonial: unsplash('1515823064-d6e0c04616a7'),

    // Kagoshima Premium Saemidori — everyday matcha with whisk, relaxed preparation
    kagoshimaPremium: unsplash('1556881286-fc6915169721'),

    // Nishio First Flush — pristine matcha powder being scooped (first harvest = freshest)
    nishioFirstFlush: unsplash('1564890369478-c89ca6d9cde9'),

    // Yame Mountain Blend — rich matcha tea prepared, dark/full-bodied look
    yameMountain: unsplash('1563822249366-3efb23b8e0c9'),

    // Shizuoka Culinary Grade — matcha in a baking/cooking context
    shizuokaCulinary: unsplash('1558160074-4d7d8bdf4256'),

    // Matcha Latte Blend — latte art, milk foam, cafe-style
    latteMix: unsplash('1536256263959-770b48d82b0a'),

    // Kagoshima Ceremonial Asahi — pure matcha powder close-up (bright green)
    kagoshimaAsahi: unsplash('1582793988951-9aed5509eb97'),

    // Gift Set — chasen (bamboo whisk) + tools artfully arranged
    giftSet: unsplash('1509042239860-f550ce710b93'),
  },

  // Hero / lifestyle
  hero: {
    // Main — matcha bowl close-up, moody lighting
    main: unsplash('1515823064-d6e0c04616a7', 1920, 1080),
    // Tea ceremony setup with all tools
    ceremony: unsplash('1544787219-7f47ccb76574', 1920, 1080),
    // Japanese tea field with rows of bushes
    field: unsplash('1576092768241-dec231879fc3', 1920, 1080),
  },

  // Origins — Japanese regional landscapes
  origins: {
    // Uji, Kyoto — tea terraces in misty mountains
    uji: unsplash('1576092768241-dec231879fc3', 800, 500),
    // Nishio — coastal Japanese landscape
    nishio: unsplash('1528164344705-47542687000d', 800, 500),
    // Kagoshima — lush green volcanic landscape
    kagoshima: unsplash('1524413840807-0c3cb6fa808d', 800, 500),
    // Yame — mountain forest with fog
    yame: unsplash('1493976040374-85c8e12f0c0e', 800, 500),
    // Shizuoka — Mt Fuji area landscape
    shizuoka: unsplash('1480796927426-f609979314bd', 800, 500),
  },

  // Education — brewing and ceremony
  education: {
    // Traditional preparation with chasen
    brewing: unsplash('1544787219-7f47ccb76574', 800, 500),
    // Bamboo whisk close-up (chasen)
    tools: unsplash('1509042239860-f550ce710b93', 800, 500),
    // Serene ceremony room / zen aesthetic
    ceremony: unsplash('1531969179221-3946e6b5a5e7', 800, 500),
  },

  // Placeholder avatar
  avatar: unsplash('1472099645785-5658abf4ff4e', 100, 100),
};

/**
 * Maps product IDs to the correct image.
 * Use this in product listings and detail pages.
 */
export const productImageMap: Record<string, string> = {
  '1': images.products.ujiCeremonial,      // Uji Ceremonial Okumidori
  '2': images.products.kagoshimaPremium,    // Kagoshima Premium Saemidori
  '3': images.products.nishioFirstFlush,    // Nishio First Flush
  '4': images.products.yameMountain,        // Yame Mountain Blend
  '5': images.products.shizuokaCulinary,    // Shizuoka Culinary Grade
  '6': images.products.latteMix,            // Matcha Latte Blend
  '7': images.products.kagoshimaAsahi,      // Kagoshima Ceremonial Asahi
  '8': images.products.giftSet,             // Gift Set — Ceremony Essentials
};
