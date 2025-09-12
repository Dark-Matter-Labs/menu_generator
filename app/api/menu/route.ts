import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FOOD_GROUPS } from "../../test/constants";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const futureScenarios = {
  FutureOne: {
    name: "UBNI - Food as Medicine",
    context: `The year is 2040. Europe has successfully implemented Universal Basic Nutrient Income (UBNI) as part of both public health and the labor market, which has changed the way citizens view food, health and community.

UBNI – Food as Medicine
Food has become a central part of the healthcare system, where UBNI is used to prevent and treat disease. Citizens receive personal UBNI credits to buy nutritious and healthy food, especially adapted to their health needs, for example for people with diabetes or cardiovascular diseases. This has reduced the need for expensive medical treatments, lowered healthcare costs and improved public health. By making preventive, cost-effective changes in dietary habits, Europe has effectively reduced diseases linked to poor diets.

UBNI - Work for Food
The "Work for Food" model has become part of the city's culture and infrastructure. Work contracts now include an agreement where employees trade one work day/week for a day of participating in the local food system. This model has made cities self-sufficient in food, reduced dependence on global markets, strengthened the social connections and ensured that all neighborhoods have access to fresh, nutritious food.

The food culture is vibrant and delicious - think regenerative agriculture, locally sourced ingredients, seasonal menus, and innovative cooking techniques that prioritize both taste and nutrition. Restaurants and home cooks alike focus on creating meals that are both satisfying and health-promoting.`,
  },
  FutureTwo: {
    name: "Business as Usual",
    context: `The year is 2040, and no progress has been made to either diets nor the way we produce food. The region is still heavily dependent on imported food, making it extremely vulnerable to global shocks such as climate change and geopolitical tensions. Food prices have skyrocketed, and sustainable, nutritious alternatives are increasingly difficult to come by. Those on lower incomes live on cheap, nutrient-poor foods such as instant noodles, sausages, and processed foods, while more expensive, healthier alternatives remain out of reach. Diet-related diseases such as obesity, diabetes, and cardiovascular disease are common and burden the healthcare system.

Many urban neighborhoods have become "food deserts," where access to fresh vegetables and nutritious food is severely limited. Economic disparities have grown, and societal problems such as social isolation, stress, and mental illness have increased. Despite the knowledge of sustainable and healthy food production, there is a lack of incentives and structures to change consumption patterns. The food system continues to be driven by short-term economic gains rather than long-term sustainability, deepening social and health gaps in society.

The typical diet consists of heavily processed, mass-produced foods from supermarkets - think frozen meals, canned goods, instant noodles, processed meats, sugary drinks, and convenience foods. Fresh produce is expensive and often of poor quality, while cheap, calorie-dense processed foods dominate the market.`,
  },
  FutureThree: {
    name: "Collapse Scenario",
    context: `The year is 2040. Decades of unsustainable agricultural practices and monocultures have led to a complete loss of nutrient-rich soils. The region is plagued by extreme weather events, unpredictable rainfall, and a collapse in local food production. The once-fertile lands can no longer provide enough food for the population, and key import countries have closed their borders. It's every person for themselves now.

Municipalities have been forced to adapt to a new reality, focusing entirely on the survival of as many people as possible. Citizens receive nutrition packages from the authorities containing what can still be produced in labs: algae protein tablets, nutrient-dense meal replacements, vitamin supplements, and lab-grown carbohydrates. Food has completely lost its cultural significance and has become merely a necessity for survival. You have witnessed the dramatic transformation of society. Fresh and nutritious food is almost impossible to find, and what little exists is mostly emergency aid or synthetic production. Municipal contributions ensure that everyone gets enough nutrients to survive, but they cannot meet the diverse needs of individuals.

The diet consists entirely of functional nutrition - protein powders, vitamin tablets, meal replacement shakes, algae-based supplements, synthetic carbohydrates, and fortified survival rations. There's no real cooking or dining experience, just the mechanical consumption of nutrients to stay alive.`,
  },
  FutureThreeB: {
    name: "Collapse Scenario with Extras",
    context: `The year is 2040. Decades of unsustainable agricultural practices and monocultures have led to a complete loss of nutrient-rich soils. The region is plagued by extreme weather events, unpredictable rainfall, and a collapse in local food production. The once-fertile lands can no longer provide enough food for the population, and key import countries have closed their borders. It's every person for themselves now.

Municipalities have been forced to adapt to a new reality, focusing entirely on the survival of as many people as possible. Citizens receive nutrition packages from the authorities containing what can still be produced in labs: algae protein tablets, nutrient-dense meal replacements, vitamin supplements, and lab-grown carbohydrates. Food has completely lost its cultural significance and has become merely a necessity for survival. You have witnessed the dramatic transformation of society. Fresh and nutritious food is almost impossible to find, and what little exists is mostly emergency aid or synthetic production. Municipal contributions ensure that everyone gets enough nutrients to survive, but they cannot meet the diverse needs of individuals.

However, you have access to some additional resources and can occasionally source some traditional ingredients, allowing for slightly more varied meals than the standard ration packages. You might be able to grow a small garden, trade for fresh vegetables, or have access to some preserved foods. This allows for a basic salad or fresh garnish to accompany the functional nutrition supplements.`,
  },
};

// Function to categorize ingredients into food groups (fallback when LLM doesn't provide foodGroup)
function categorizeIngredient(ingredientName: string): string {
  const name = ingredientName.toLowerCase();
  
  // Grains
  if (name.includes('rice') || name.includes('wheat') || name.includes('barley') || 
      name.includes('oats') || name.includes('quinoa') || name.includes('millet') ||
      name.includes('buckwheat') || name.includes('rye') || name.includes('corn') ||
      name.includes('bread') || name.includes('pasta') || name.includes('noodles') ||
      name.includes('flour') || name.includes('grain')) {
    return FOOD_GROUPS.GRAINS;
  }
  
  // Roots/Starchy Vegetables
  if (name.includes('potato') || name.includes('sweet potato') || name.includes('yam') ||
      name.includes('cassava') || name.includes('taro') || name.includes('plantain') ||
      name.includes('beetroot') || name.includes('turnip') || name.includes('parsnip')) {
    return FOOD_GROUPS.ROOTS_STARCHY_VEG;
  }
  
  // Sugar
  if (name.includes('sugar') || name.includes('honey') || name.includes('syrup') ||
      name.includes('molasses') || name.includes('agave') || name.includes('maple') ||
      name.includes('stevia') || name.includes('artificial sweetener')) {
    return FOOD_GROUPS.SUGAR;
  }
  
  // Legumes
  if (name.includes('bean') || name.includes('lentil') || name.includes('chickpea') ||
      name.includes('pea') || name.includes('soy') || name.includes('tofu') ||
      name.includes('tempeh') || name.includes('edamame') || name.includes('lupin')) {
    return FOOD_GROUPS.LEGUMES;
  }
  
  // Nuts & Seeds
  if (name.includes('nut') || name.includes('seed') || name.includes('almond') ||
      name.includes('walnut') || name.includes('cashew') || name.includes('pistachio') ||
      name.includes('hazelnut') || name.includes('pecan') || name.includes('sunflower') ||
      name.includes('pumpkin') || name.includes('sesame') || name.includes('chia') ||
      name.includes('flax') || name.includes('hemp')) {
    return FOOD_GROUPS.NUTS_SEEDS;
  }
  
  // Oils
  if (name.includes('oil') || name.includes('butter') || name.includes('margarine') ||
      name.includes('ghee') || name.includes('lard') || name.includes('shortening') ||
      name.includes('coconut oil') || name.includes('olive oil') || name.includes('sunflower oil')) {
    return FOOD_GROUPS.OILS;
  }
  
  // Vegetables
  if (name.includes('tomato') || name.includes('onion') || name.includes('garlic') ||
      name.includes('carrot') || name.includes('celery') || name.includes('pepper') ||
      name.includes('cucumber') || name.includes('lettuce') || name.includes('spinach') ||
      name.includes('kale') || name.includes('broccoli') || name.includes('cauliflower') ||
      name.includes('cabbage') || name.includes('zucchini') || name.includes('eggplant') ||
      name.includes('mushroom') || name.includes('herb') || name.includes('basil') ||
      name.includes('parsley') || name.includes('cilantro') || name.includes('dill') ||
      name.includes('thyme') || name.includes('oregano') || name.includes('rosemary') ||
      name.includes('vegetable') || name.includes('leafy green') || name.includes('squash')) {
    return FOOD_GROUPS.VEGETABLES;
  }
  
  // Fruits
  if (name.includes('apple') || name.includes('banana') || name.includes('orange') ||
      name.includes('lemon') || name.includes('lime') || name.includes('grape') ||
      name.includes('berry') || name.includes('strawberry') || name.includes('blueberry') ||
      name.includes('raspberry') || name.includes('blackberry') || name.includes('cherry') ||
      name.includes('peach') || name.includes('pear') || name.includes('plum') ||
      name.includes('mango') || name.includes('pineapple') || name.includes('coconut') ||
      name.includes('avocado') || name.includes('fig') || name.includes('date') ||
      name.includes('fruit') || name.includes('citrus')) {
    return FOOD_GROUPS.FRUITS;
  }
  
  // Stimulants & Spices
  if (name.includes('coffee') || name.includes('tea') || name.includes('cocoa') ||
      name.includes('chocolate') || name.includes('cinnamon') || name.includes('ginger') ||
      name.includes('turmeric') || name.includes('cumin') || name.includes('coriander') ||
      name.includes('cardamom') || name.includes('clove') || name.includes('nutmeg') ||
      name.includes('pepper') || name.includes('salt') || name.includes('vanilla') ||
      name.includes('spice') || name.includes('seasoning') || name.includes('condiment')) {
    return FOOD_GROUPS.STIMULANTS_SPICES;
  }
  
  // Beef & Lamb
  if (name.includes('beef') || name.includes('lamb') || name.includes('mutton') ||
      name.includes('veal') || name.includes('steak') || name.includes('roast beef') ||
      name.includes('ground beef') || name.includes('lamb chop') || name.includes('leg of lamb')) {
    return FOOD_GROUPS.BEEF_LAMB;
  }
  
  // Pork
  if (name.includes('pork') || name.includes('bacon') || name.includes('ham') ||
      name.includes('sausage') || name.includes('pork chop') || name.includes('pork tenderloin') ||
      name.includes('prosciutto') || name.includes('pancetta') || name.includes('chorizo')) {
    return FOOD_GROUPS.PORK;
  }
  
  // Poultry
  if (name.includes('chicken') || name.includes('turkey') || name.includes('duck') ||
      name.includes('goose') || name.includes('quail') || name.includes('pheasant') ||
      name.includes('poultry') || name.includes('breast') || name.includes('thigh') ||
      name.includes('wing') || name.includes('drumstick')) {
    return FOOD_GROUPS.POULTRY;
  }
  
  // Eggs
  if (name.includes('egg') || name.includes('yolk') || name.includes('white') ||
      name.includes('quail egg') || name.includes('duck egg')) {
    return FOOD_GROUPS.EGGS;
  }
  
  // Fish
  if (name.includes('fish') || name.includes('salmon') || name.includes('tuna') ||
      name.includes('cod') || name.includes('halibut') || name.includes('trout') ||
      name.includes('mackerel') || name.includes('sardine') || name.includes('anchovy') ||
      name.includes('seafood') || name.includes('shrimp') || name.includes('crab') ||
      name.includes('lobster') || name.includes('mussel') || name.includes('oyster') ||
      name.includes('clam') || name.includes('scallop') || name.includes('squid') ||
      name.includes('octopus') || name.includes('seaweed') || name.includes('algae')) {
    return FOOD_GROUPS.FISH;
  }
  
  // Dairy
  if (name.includes('milk') || name.includes('cheese') || name.includes('yogurt') ||
      name.includes('cream') || name.includes('butter') || name.includes('sour cream') ||
      name.includes('cottage cheese') || name.includes('ricotta') || name.includes('mozzarella') ||
      name.includes('cheddar') || name.includes('parmesan') || name.includes('feta') ||
      name.includes('goat cheese') || name.includes('dairy') || name.includes('whey')) {
    return FOOD_GROUPS.DAIRY;
  }
  
  // Default fallback - if we can't categorize, assume it's a vegetable
  return FOOD_GROUPS.VEGETABLES;
}

// Function to calculate food group totals
function calculateFoodGroupTotals(ingredients: { name: string; grams: string; category: string; foodGroup: string }[], numberOfGuests: number) {
  const totals: { [key: string]: { totalGrams: number; perPersonGrams: number } } = {};
  
  ingredients.forEach(ingredient => {
    const foodGroup = ingredient.foodGroup;
    const grams = parseFloat(ingredient.grams) || 0;
    
    if (!totals[foodGroup]) {
      totals[foodGroup] = { totalGrams: 0, perPersonGrams: 0 };
    }
    
    totals[foodGroup].totalGrams += grams;
  });
  
  // Calculate per-person values
  Object.keys(totals).forEach(foodGroup => {
    totals[foodGroup].perPersonGrams = totals[foodGroup].totalGrams / numberOfGuests;
  });
  
  return totals;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form data
    const location = formData.get("location") as string;
    const season = formData.get("season") as string;
    const numberOfGuests = formData.get("numberOfGuests") as string;
    const dinnerContext = formData.get("dinnerContext") as string;
    const dietaryPreference = formData.get("dietaryPreference") as string;
    const allergies = formData.get("allergies") as string;
    const preferences = formData.get("preferences") as string;

    // Generate all 4 menus
    const menus = [];

    for (const [menuType, scenario] of Object.entries(futureScenarios)) {
      const prompt = `Create a 3-course menu for the year 2040 based on this scenario: ${scenario.context}

Location: ${location}, Season: ${season}, Guests: ${numberOfGuests}, Dinner Context and Goals: ${dinnerContext}, Dietary Preference: ${dietaryPreference}${allergies ? `, Allergies: ${allergies}` : ""}${preferences ? `, Additional Preferences: ${preferences}` : ""}

IMPORTANT: Calculate ingredient quantities based on ${numberOfGuests} guests. Each ingredient should be scaled appropriately for the number of people.

FOOD GROUP CATEGORIZATION: For each ingredient, categorize it into the appropriate food group from this list:
- "Grains" (rice, wheat, barley, oats, quinoa, millet, buckwheat, rye, corn, bread, pasta, noodles, flour)
- "Roots/Starchy Veg" (potatoes, sweet potatoes, yams, cassava, taro, plantains, beetroot, turnips, parsnips)
- "Sugar" (sugar, honey, syrup, molasses, agave, maple, stevia, artificial sweeteners)
- "Legumes" (beans, lentils, chickpeas, peas, soy, tofu, tempeh, edamame, lupin)
- "Nuts & Seeds" (nuts, seeds, almonds, walnuts, cashews, pistachios, hazelnuts, pecans, sunflower seeds, pumpkin seeds, sesame, chia, flax, hemp)
- "Oils" (oil, butter, margarine, ghee, lard, shortening, coconut oil, olive oil, sunflower oil)
- "Vegetables" (tomatoes, onions, garlic, carrots, celery, peppers, cucumbers, lettuce, spinach, kale, broccoli, cauliflower, cabbage, zucchini, eggplant, mushrooms, herbs, leafy greens, squash)
- "Fruits" (apples, bananas, oranges, lemons, limes, grapes, berries, cherries, peaches, pears, plums, mangoes, pineapples, coconuts, avocados, figs, dates, citrus)
- "Stimulants & Spices" (coffee, tea, cocoa, chocolate, cinnamon, ginger, turmeric, cumin, coriander, cardamom, cloves, nutmeg, pepper, salt, vanilla, spices, seasonings, condiments)
- "Beef & Lamb" (beef, lamb, mutton, veal, steak, roast beef, ground beef, lamb chops, leg of lamb)
- "Pork" (pork, bacon, ham, sausage, pork chops, pork tenderloin, prosciutto, pancetta, chorizo)
- "Poultry" (chicken, turkey, duck, goose, quail, pheasant, poultry, breast, thigh, wing, drumstick)
- "Eggs" (eggs, egg yolks, egg whites, quail eggs, duck eggs)
- "Fish" (fish, salmon, tuna, cod, halibut, trout, mackerel, sardines, anchovies, seafood, shrimp, crab, lobster, mussels, oysters, clams, scallops, squid, octopus, seaweed, algae)
- "Dairy" (milk, cheese, yogurt, cream, sour cream, cottage cheese, ricotta, mozzarella, cheddar, parmesan, feta, goat cheese, whey)

You must respond with ONLY a valid JSON object in this exact format:
{
  "type": "${menuType}",
  "starter": {
    "name": "Creative dish name",
    "description": "Brief description (max 250 characters)",
    "servedWith": "Accompaniments or garnishes"
  },
  "main": {
    "name": "Creative dish name",
    "description": "Brief description (max 250 characters)", 
    "servedWith": "Accompaniments or garnishes"
  },
  "dessert": {
    "name": "Creative dish name",
    "description": "Brief description (max 250 characters)",
    "servedWith": "Accompaniments or garnishes"
  },
  "ingredients": [
    {
      "name": "ingredient name",
      "grams": "total grams needed for all ${numberOfGuests} guests",
      "category": "starter/main/dessert/general",
      "foodGroup": "Grains/Roots/Starchy Veg/Sugar/Legumes/Nuts & Seeds/Oils/Vegetables/Fruits/Stimulants & Spices/Beef & Lamb/Pork/Poultry/Eggs/Fish/Dairy"
    }
  ]
}

CRITICAL JSON REQUIREMENTS:
- Respond with ONLY the JSON object, no additional text
- Do NOT wrap the JSON in markdown code blocks (no \`\`\`json or \`\`\`)
- Do NOT add any formatting, just pure JSON
- Keep descriptions brief (max 250 characters)
- Keep servedWith brief (max 90 characters)
- ALWAYS include "servedWith" for all dishes with appropriate accompaniments
- For ingredients: include ALL ingredients needed for the entire menu, scaled for ${numberOfGuests} guests
- Ingredient quantities should be realistic and appropriate for the number of guests
- Use "grams" as string values (e.g., "500" not 500)
- Category should be one of: "starter", "main", "dessert", or "general"
- FoodGroup should be one of: "Grains", "Roots/Starchy Veg", "Sugar", "Legumes", "Nuts & Seeds", "Oils", "Vegetables", "Fruits", "Stimulants & Spices", "Beef & Lamb", "Pork", "Poultry", "Eggs", "Fish", "Dairy"
- Ensure all JSON syntax is valid with proper quotes and commas
- Do not include any text before or after the JSON object
- Do NOT add trailing commas
- Do NOT add extra commas or malformed structures
- Ensure every property has a valid value
- Test your JSON syntax before responding`;

      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedText = response.text();

        console.log(`Raw response for ${menuType}:`, generatedText);

        // Try to extract JSON from the response
        let menuData;
        try {
          // Parse the entire response as JSON
          menuData = JSON.parse(generatedText);
          // Ensure the type is correct
          menuData.type = menuType;

          // Validate that we have the required structure
          if (
            !menuData.starter ||
            !menuData.main ||
            !menuData.dessert ||
            !menuData.ingredients
          ) {
            throw new Error("Missing required menu structure");
          }

          // Ensure all ingredients have food group categorization (LLM should provide this, but fallback if needed)
          menuData.ingredients = menuData.ingredients.map((ingredient: { name: string; grams: string; category: string; foodGroup?: string }) => ({
            ...ingredient,
            foodGroup: ingredient.foodGroup || categorizeIngredient(ingredient.name)
          }));

          // Calculate food group totals
          menuData.foodGroupTotals = calculateFoodGroupTotals(menuData.ingredients, parseInt(numberOfGuests));
        } catch (parseError) {
          console.error(`JSON parsing failed for ${menuType}:`, parseError);
          throw new Error(`Failed to parse JSON for ${menuType}`);
        }

        menus.push(menuData);
      } catch (error) {
        console.error(`Error generating menu for ${menuType}:`, error);
        throw new Error(`Failed to generate menu for ${menuType}: ${error}`);
      }
    }

    console.log("Generated menus count:", menus.length);
    console.log(
      "Menu types:",
      menus.map(m => m.type)
    );

    // Check if we have exactly 4 menus
    if (menus.length < 4) {
      console.error(`Only generated ${menus.length} menus, expected 4`);
      return NextResponse.json(
        {
          error: `Failed to generate all 4 menus. Only generated ${menus.length} menus.`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(menus);
  } catch (error) {
    console.error("Error generating menus:", error);
    return NextResponse.json(
      { error: "Failed to generate menus" },
      { status: 500 }
    );
  }
}
