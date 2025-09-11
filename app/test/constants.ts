// Food groups - centralized definition for consistency
export const FOOD_GROUPS = {
  GRAINS: 'Grains',
  ROOTS_STARCHY_VEG: 'Roots/Starchy Veg',
  SUGAR: 'Sugar',
  LEGUMES: 'Legumes',
  NUTS_SEEDS: 'Nuts & Seeds',
  OILS: 'Oils',
  VEGETABLES: 'Vegetables',
  FRUITS: 'Fruits',
  STIMULANTS_SPICES: 'Stimulants & Spices',
  BEEF_LAMB: 'Beef & Lamb',
  PORK: 'Pork',
  POULTRY: 'Poultry',
  EGGS: 'Eggs',
  FISH: 'Fish',
  DAIRY: 'Dairy'
} as const;

// Food impact data structure - now country-specific
interface FoodImpactData {
  id: string;
  foodGroup: string;
  perGramClimateImpact: number;
  perGramBiodiversityImpact: number;
  perGramLandUseImpact: number;
  perGramWaterUseImpact: number;
  perGramNitrogenImpact: number;
  perGramOceanAcidImpact: number;
  perGramChemicalsImpact: number;
  perGramAerosolsImpact: number;
  perGramOzoneImpact: number;
}

// Country-specific food data
const countryFoodData = {
  austria: [
    {
      id: 'grains',
      foodGroup: FOOD_GROUPS.GRAINS,
      perGramClimateImpact: 0.001184,
      perGramBiodiversityImpact: 0.000082,
      perGramLandUseImpact: 0.0004,
      perGramWaterUseImpact: 0.8,
      perGramNitrogenImpact: 0.002,
      perGramOceanAcidImpact: 0.000816,
      perGramChemicalsImpact: 0.0004,
      perGramAerosolsImpact: 0.01,
      perGramOzoneImpact: 0.000041
    },
    {
      id: 'roots_starchy_veg',
      foodGroup: FOOD_GROUPS.ROOTS_STARCHY_VEG,
      perGramClimateImpact: 0.001357,
      perGramBiodiversityImpact: 0.0002,
      perGramLandUseImpact: 0.000536,
      perGramWaterUseImpact: 1,
      perGramNitrogenImpact: 0.002643,
      perGramOceanAcidImpact: 0.000664,
      perGramChemicalsImpact: 0.000336,
      perGramAerosolsImpact: 0.01,
      perGramOzoneImpact: 0.000043
    },
    {
      id: 'sugar',
      foodGroup: FOOD_GROUPS.SUGAR,
      perGramClimateImpact: 0.008043,
      perGramBiodiversityImpact: 0.001,
      perGramLandUseImpact: 0.002,
      perGramWaterUseImpact: 2,
      perGramNitrogenImpact: 0.006087,
      perGramOceanAcidImpact: 0.002,
      perGramChemicalsImpact: 0.002,
      perGramAerosolsImpact: 0.06087,
      perGramOzoneImpact: 0.000239
    },
    {
      id: 'legumes',
      foodGroup: FOOD_GROUPS.LEGUMES,
      perGramClimateImpact: 0.001,
      perGramBiodiversityImpact: 0.0002,
      perGramLandUseImpact: 0.000505,
      perGramWaterUseImpact: 1,
      perGramNitrogenImpact: 0.003053,
      perGramOceanAcidImpact: 0.001,
      perGramChemicalsImpact: 0.000505,
      perGramAerosolsImpact: 0.008421,
      perGramOzoneImpact: 0.000032
    },
    {
      id: 'nuts_seeds',
      foodGroup: FOOD_GROUPS.NUTS_SEEDS,
      perGramClimateImpact: 0.006765,
      perGramBiodiversityImpact: 0.001,
      perGramLandUseImpact: 0.002353,
      perGramWaterUseImpact: 5,
      perGramNitrogenImpact: 0.013235,
      perGramOceanAcidImpact: 0.003235,
      perGramChemicalsImpact: 0.001676,
      perGramAerosolsImpact: 0.041176,
      perGramOzoneImpact: 0.000176
    },
    {
      id: 'oils',
      foodGroup: FOOD_GROUPS.OILS,
      perGramClimateImpact: 0.007632,
      perGramBiodiversityImpact: 0.0005,
      perGramLandUseImpact: 0.0025,
      perGramWaterUseImpact: 5,
      perGramNitrogenImpact: 0.012632,
      perGramOceanAcidImpact: 0.005,
      perGramChemicalsImpact: 0.0025,
      perGramAerosolsImpact: 0.05,
      perGramOzoneImpact: 0.000211
    },
    {
      id: 'vegetables',
      foodGroup: FOOD_GROUPS.VEGETABLES,
      perGramClimateImpact: 0.000328,
      perGramBiodiversityImpact: 0.000328,
      perGramLandUseImpact: 0.000167,
      perGramWaterUseImpact: 0.832787,
      perGramNitrogenImpact: 0.002,
      perGramOceanAcidImpact: 0.000328,
      perGramChemicalsImpact: 0.000167,
      perGramAerosolsImpact: 0.001639,
      perGramOzoneImpact: 0.000007
    },
    {
      id: 'fruits',
      foodGroup: FOOD_GROUPS.FRUITS,
      perGramClimateImpact: 0.001,
      perGramBiodiversityImpact: 0.000153,
      perGramLandUseImpact: 0.0004,
      perGramWaterUseImpact: 0.752632,
      perGramNitrogenImpact: 0.002,
      perGramOceanAcidImpact: 0.000253,
      perGramChemicalsImpact: 0.002105,
      perGramAerosolsImpact: 0.000011,
      perGramOzoneImpact: 0.000253
    },
    {
      id: 'stimulants_spices',
      foodGroup: FOOD_GROUPS.STIMULANTS_SPICES,
      perGramClimateImpact: 0.005238,
      perGramBiodiversityImpact: 0.001,
      perGramLandUseImpact: 0.002524,
      perGramWaterUseImpact: 2.52381,
      perGramNitrogenImpact: 0.01,
      perGramOceanAcidImpact: 0.002524,
      perGramChemicalsImpact: 0.001,
      perGramAerosolsImpact: 0.014286,
      perGramOzoneImpact: 0.000048
    },
    {
      id: 'beef_lamb',
      foodGroup: FOOD_GROUPS.BEEF_LAMB,
      perGramClimateImpact: 0.00664,
      perGramBiodiversityImpact: 0.002,
      perGramLandUseImpact: 0.00664,
      perGramWaterUseImpact: 1.336,
      perGramNitrogenImpact: 0.00464,
      perGramOceanAcidImpact: 0.00336,
      perGramChemicalsImpact: 0.00264,
      perGramAerosolsImpact: 0.0536,
      perGramOzoneImpact: 0.000216
    },
    {
      id: 'pork',
      foodGroup: FOOD_GROUPS.PORK,
      perGramClimateImpact: 0.008,
      perGramBiodiversityImpact: 0.002545,
      perGramLandUseImpact: 0.008,
      perGramWaterUseImpact: 1.8,
      perGramNitrogenImpact: 0.006,
      perGramOceanAcidImpact: 0.004,
      perGramChemicalsImpact: 0.003,
      perGramAerosolsImpact: 0.055455,
      perGramOzoneImpact: 0.000218
    },
    {
      id: 'poultry',
      foodGroup: FOOD_GROUPS.POULTRY,
      perGramClimateImpact: 0.004,
      perGramBiodiversityImpact: 0.000645,
      perGramLandUseImpact: 0.002,
      perGramWaterUseImpact: 1.070968,
      perGramNitrogenImpact: 0.003355,
      perGramOceanAcidImpact: 0.002,
      perGramChemicalsImpact: 0.001355,
      perGramAerosolsImpact: 0.026452,
      perGramOzoneImpact: 0.00011
    },
    {
      id: 'eggs',
      foodGroup: FOOD_GROUPS.EGGS,
      perGramClimateImpact: 0.002,
      perGramBiodiversityImpact: 0.0002,
      perGramLandUseImpact: 0.000505,
      perGramWaterUseImpact: 0.504762,
      perGramNitrogenImpact: 0.002,
      perGramOceanAcidImpact: 0.000505,
      perGramChemicalsImpact: 0.0002,
      perGramAerosolsImpact: 0.002857,
      perGramOzoneImpact: 0.00001
    },
    {
      id: 'fish',
      foodGroup: FOOD_GROUPS.FISH,
      perGramClimateImpact: 0.002545,
      perGramBiodiversityImpact: 0.000836,
      perGramLandUseImpact: 0.000836,
      perGramWaterUseImpact: 1.254545,
      perGramNitrogenImpact: 0.002545,
      perGramOceanAcidImpact: 0.001636,
      perGramChemicalsImpact: 0.000836,
      perGramAerosolsImpact: 0.02,
      perGramOzoneImpact: 0.000082
    },
    {
      id: 'dairy',
      foodGroup: FOOD_GROUPS.DAIRY,
      perGramClimateImpact: 0.002,
      perGramBiodiversityImpact: 0.000407,
      perGramLandUseImpact: 0.000815,
      perGramWaterUseImpact: 0.8,
      perGramNitrogenImpact: 0.002,
      perGramOceanAcidImpact: 0.001185,
      perGramChemicalsImpact: 0.000815,
      perGramAerosolsImpact: 0.015185,
      perGramOzoneImpact: 0.000059
    }
  ],
  // Germany with slightly different values (example)
  germany: [
    {
      id: 'grains',
      foodGroup: FOOD_GROUPS.GRAINS,
      perGramClimateImpact: 0.0012, // Slightly higher for Germany
      perGramBiodiversityImpact: 0.000085,
      perGramLandUseImpact: 0.00042,
      perGramWaterUseImpact: 0.85,
      perGramNitrogenImpact: 0.0021,
      perGramOceanAcidImpact: 0.00085,
      perGramChemicalsImpact: 0.00042,
      perGramAerosolsImpact: 0.0105,
      perGramOzoneImpact: 0.000043
    },
    // ... (would include all other food groups with Germany-specific values)
    // For brevity, I'll just show the structure - you'd add all food groups
  ]
};

// Impact types - centralized definition
export const IMPACT_TYPES = {
  CLIMATE: 'climate',
  BIODIVERSITY: 'biodiversity', 
  LAND_USE: 'landUse',
  WATER_USE: 'waterUse',
  NITROGEN: 'nitrogen',
  OCEAN_ACID: 'oceanAcid',
  CHEMICALS: 'chemicals',
  AEROSOLS: 'aerosols',
  OZONE: 'ozone'
} as const;

// Impact labels for display
export const IMPACT_LABELS = {
  [IMPACT_TYPES.CLIMATE]: 'Climate Impact',
  [IMPACT_TYPES.BIODIVERSITY]: 'Biodiversity Impact',
  [IMPACT_TYPES.LAND_USE]: 'Land Use Impact', 
  [IMPACT_TYPES.WATER_USE]: 'Water Use Impact',
  [IMPACT_TYPES.NITROGEN]: 'Nitrogen Impact',
  [IMPACT_TYPES.OCEAN_ACID]: 'Ocean Acid Impact',
  [IMPACT_TYPES.CHEMICALS]: 'Chemicals Impact',
  [IMPACT_TYPES.AEROSOLS]: 'Aerosols Impact',
  [IMPACT_TYPES.OZONE]: 'Ozone Impact'
} as const;

// Reference standards
export const REFERENCE_STANDARDS = {
  BMK: 'bmk',
  EAT: 'eat'
} as const;

// Normalized country data structure
export const countryData = [
  {
    id: 'austria',
    name: 'Austria',
    impacts: {
      [IMPACT_TYPES.CLIMATE]: { bmk: 2.6125, eat: 2.525 },
      [IMPACT_TYPES.BIODIVERSITY]: { bmk: 0.5845, eat: 0.585 },
      [IMPACT_TYPES.LAND_USE]: { bmk: 1.5265, eat: 1.535 },
      [IMPACT_TYPES.WATER_USE]: { bmk: 1135.5, eat: 1065 },
      [IMPACT_TYPES.NITROGEN]: { bmk: 3.175, eat: 2.85 },
      [IMPACT_TYPES.OCEAN_ACID]: { bmk: 1.3755, eat: 1.375 },
      [IMPACT_TYPES.CHEMICALS]: { bmk: 0.88, eat: 0.83 },
      [IMPACT_TYPES.AEROSOLS]: { bmk: 17.75, eat: 9.15 },
      [IMPACT_TYPES.OZONE]: { bmk: 0.0715, eat: 0.0365 }
    }
  },
  // Easy to add more countries:
  {
    id: 'germany',
    name: 'Germany',
    impacts: {
      [IMPACT_TYPES.CLIMATE]: { bmk: 2.8, eat: 2.6 },
      [IMPACT_TYPES.BIODIVERSITY]: { bmk: 0.6, eat: 0.59 },
      [IMPACT_TYPES.LAND_USE]: { bmk: 1.6, eat: 1.55 },
      [IMPACT_TYPES.WATER_USE]: { bmk: 1200, eat: 1100 },
      [IMPACT_TYPES.NITROGEN]: { bmk: 3.3, eat: 2.9 },
      [IMPACT_TYPES.OCEAN_ACID]: { bmk: 1.4, eat: 1.38 },
      [IMPACT_TYPES.CHEMICALS]: { bmk: 0.9, eat: 0.85 },
      [IMPACT_TYPES.AEROSOLS]: { bmk: 18.5, eat: 9.5 },
      [IMPACT_TYPES.OZONE]: { bmk: 0.075, eat: 0.038 }
    }
  }
];

// Helper function to get country data by ID
export const getCountryData = (countryId: string) => {
  return countryData.find(country => country.id === countryId);
};

// Helper function to get all impact types
const getAllImpactTypes = () => Object.values(IMPACT_TYPES);

// Helper function to get all reference standards  
const getAllReferenceStandards = () => Object.values(REFERENCE_STANDARDS);

// Helper function to get food data by country and food ID
const getFoodDataById = (countryId: string, foodId: string): FoodImpactData | undefined => {
  const countryFoods = countryFoodData[countryId as keyof typeof countryFoodData];
  return countryFoods?.find(food => food.id === foodId);
};

// Helper function to get all food data for a country
export const getCountryFoodData = (countryId: string): FoodImpactData[] => {
  return countryFoodData[countryId as keyof typeof countryFoodData] || [];
};

// Helper function to get all food IDs (from any country - they should be consistent)
export const getAllFoodIds = (): string[] => {
  const austriaFoods = countryFoodData.austria;
  return austriaFoods.map(food => food.id);
};

// Helper function to get all food groups
const getAllFoodGroups = () => Object.values(FOOD_GROUPS);

// Helper function to get all country IDs that have food data
const getCountriesWithFoodData = (): string[] => {
  return Object.keys(countryFoodData);
};