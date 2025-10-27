import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FOOD_GROUPS } from "@/lib/constants";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const futureScenarios = {
  FutureOne: {
    name: "UBNI - Food as Medicine",
    context: `The year is 2040. Europe has successfully implemented Universal Basic Nutrient Income (UBNI) as part of both public health and the labor market, which has changed the way citizens view food, health and community.

UBNI – Food as Medicine
Food has become a central part of the healthcare system, where UBNI is used to prevent and treat disease. Citizens receive personal UBNI credits to buy nutritious and healthy food, especially adapted to their health needs, for example for people with diabetes or cardiovascular diseases. This has reduced the need for expensive medical treatments, lowered healthcare costs and improved public health. By making preventive, cost-effective changes in dietary habits, Europe has effectively reduced diseases linked to poor diets.

UBNI - Work for Food
The "Work for Food" model has become part of the city's culture and infrastructure. Work contracts now include an agreement where employees trade one work day/week for a day of participating in the local food system. This model has made cities self-sufficient in food, reduced dependence on global markets, strengthened the social connections and ensured that all neighborhoods have access to fresh, nutritious food.

The food culture is vibrant and delicious - think regenerative agriculture, locally sourced ingredients, seasonal menus, and innovative cooking techniques that prioritize both taste and nutrition. Restaurants and home cooks alike focus on creating meals that are both satisfying and health-promoting.

IMPORTANT: All ingredients used in menus must be categorized into these exact food groups: Grains, Roots/Starchy Veg, Sugar, Legumes, Nuts & Seeds, Oils, Vegetables, Fruits, Stimulants & Spices, Beef & Lamb, Pork, Poultry, Eggs, Fish, Dairy. Do not use any other food group categories.`,
  },
  FutureTwo: {
    name: "Business as Usual",
    context: `The year is 2040, and no progress has been made to either diets nor the way we produce food. The region is still heavily dependent on imported food, making it extremely vulnerable to global shocks such as climate change and geopolitical tensions. Food prices have skyrocketed, and sustainable, nutritious alternatives are increasingly difficult to come by. Those on lower incomes live on cheap, nutrient-poor foods such as instant noodles, sausages, and processed foods, while more expensive, healthier alternatives remain out of reach. Diet-related diseases such as obesity, diabetes, and cardiovascular disease are common and burden the healthcare system.

Many urban neighborhoods have become "food deserts," where access to fresh vegetables and nutritious food is severely limited. Economic disparities have grown, and societal problems such as social isolation, stress, and mental illness have increased. Despite the knowledge of sustainable and healthy food production, there is a lack of incentives and structures to change consumption patterns. The food system continues to be driven by short-term economic gains rather than long-term sustainability, deepening social and health gaps in society.

The typical diet consists of heavily processed, mass-produced foods from supermarkets - think frozen meals, canned goods, instant noodles, processed meats, sugary drinks, and convenience foods. Fresh produce is expensive and often of poor quality, while cheap, calorie-dense processed foods dominate the market.

IMPORTANT: All ingredients used in menus must be categorized into these exact food groups: Grains, Roots/Starchy Veg, Sugar, Legumes, Nuts & Seeds, Oils, Vegetables, Fruits, Stimulants & Spices, Beef & Lamb, Pork, Poultry, Eggs, Fish, Dairy. Do not use any other food group categories.`,
  },
  FutureThree: {
    name: "Collapse Scenario",
    context: `The year is 2040. Decades of unsustainable agricultural practices and monocultures have led to a complete loss of nutrient-rich soils. The region is plagued by extreme weather events, unpredictable rainfall, and a collapse in local food production. The once-fertile lands can no longer provide enough food for the population, and key import countries have closed their borders. It's every person for themselves now.

Municipalities have been forced to adapt to a new reality, focusing entirely on the survival of as many people as possible. Citizens receive nutrition packages from the authorities containing what can still be produced in labs: algae protein tablets, nutrient-dense meal replacements, vitamin supplements, and lab-grown carbohydrates. Food has completely lost its cultural significance and has become merely a necessity for survival. You have witnessed the dramatic transformation of society. Fresh and nutritious food is almost impossible to find, and what little exists is mostly emergency aid or synthetic production. Municipal contributions ensure that everyone gets enough nutrients to survive, but they cannot meet the diverse needs of individuals.

The diet consists entirely of functional nutrition - protein powders, vitamin tablets, meal replacement shakes, algae-based supplements, synthetic carbohydrates, and fortified survival rations. There's no real cooking or dining experience, just the mechanical consumption of nutrients to stay alive.

IMPORTANT: All ingredients used in menus must be categorized into these exact food groups: Grains, Roots/Starchy Veg, Sugar, Legumes, Nuts & Seeds, Oils, Vegetables, Fruits, Stimulants & Spices, Beef & Lamb, Pork, Poultry, Eggs, Fish, Dairy. Do not use any other food group categories.`,
  },
  FutureThreeB: {
    name: "Collapse Scenario with Extras",
    context: `The year is 2040. Decades of unsustainable agricultural practices and monocultures have led to a complete loss of nutrient-rich soils. The region is plagued by extreme weather events, unpredictable rainfall, and a collapse in local food production. The once-fertile lands can no longer provide enough food for the population, and key import countries have closed their borders. It's every person for themselves now.

Municipalities have been forced to adapt to a new reality, focusing entirely on the survival of as many people as possible. Citizens receive nutrition packages from the authorities containing what can still be produced in labs: algae protein tablets, nutrient-dense meal replacements, vitamin supplements, and lab-grown carbohydrates. Food has completely lost its cultural significance and has become merely a necessity for survival. You have witnessed the dramatic transformation of society. Fresh and nutritious food is almost impossible to find, and what little exists is mostly emergency aid or synthetic production. Municipal contributions ensure that everyone gets enough nutrients to survive, but they cannot meet the diverse needs of individuals.

However, you have access to some additional resources and can occasionally source some traditional ingredients, allowing for slightly more varied meals than the standard ration packages. You might be able to grow a small garden, trade for fresh vegetables, or have access to some preserved foods. This allows for a basic salad or fresh garnish to accompany the functional nutrition supplements.

IMPORTANT: All ingredients used in menus must be categorized into these exact food groups: Grains, Roots/Starchy Veg, Sugar, Legumes, Nuts & Seeds, Oils, Vegetables, Fruits, Stimulants & Spices, Beef & Lamb, Pork, Poultry, Eggs, Fish, Dairy. Do not use any other food group categories.`,
  },
};

// Function to calculate food group totals
function calculateFoodGroupTotals(
  ingredients: {
    name: string;
    grams: string;
    category: string;
    foodGroup: string;
  }[],
  numberOfGuests: number
) {
  const totals: {
    [key: string]: { totalGrams: number; perPersonGrams: number };
  } = {};

  console.log(
    `calculateFoodGroupTotals called with ${ingredients.length} ingredients and ${numberOfGuests} guests`
  );

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
    totals[foodGroup].perPersonGrams =
      totals[foodGroup].totalGrams / numberOfGuests;
    console.log(
      `${foodGroup}: ${totals[foodGroup].totalGrams}g total, ${totals[foodGroup].perPersonGrams}g per person`
    );
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

    console.log("Form data received:", {
      location,
      season,
      numberOfGuests,
      dinnerContext,
      dietaryPreference,
      allergies,
      preferences,
    });

    // Generate all 4 menus
    const menus = [];

    for (const [menuType, scenario] of Object.entries(futureScenarios)) {
      let menuData;
      let attempts = 0;
      const maxAttempts = 3;

      while (attempts < maxAttempts) {
        try {
          const prompt = `Create a 3-course menu for the year 2040 based on this scenario: ${scenario.context}

Location: ${location}, Season: ${season}, Guests: ${numberOfGuests}, Dinner Context and Goals: ${dinnerContext}, Dietary Preference: ${dietaryPreference}${allergies ? `, Allergies: ${allergies}` : ""}${preferences ? `, Additional Preferences: ${preferences}` : ""}

IMPORTANT: Calculate ingredient quantities based on ${numberOfGuests} guests. Each ingredient should be scaled appropriately for the number of people.

FOOD GROUP CATEGORIZATION: For each ingredient, categorize it into the appropriate food group from this EXACT list. You MUST NOT create any new categories, food groups, or use "general" or any other category names. Only use the exact names provided below:
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

CRITICAL: Every ingredient MUST be assigned to one of the above food groups exactly as written. Do NOT use "general", "other", "miscellaneous", or any other category names. If an ingredient doesn't clearly fit, choose the closest match from the list above.

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

          const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const generatedText = response.text();

          // Try to extract JSON from the response
          let jsonText = generatedText.trim();
          
          // Remove markdown code blocks if present
          if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
          } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
          }
          
          menuData = JSON.parse(jsonText);
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

          // Validate that all food groups match our constants exactly
          const validFoodGroups = Object.values(FOOD_GROUPS);
          const invalidIngredients = menuData.ingredients.filter(
            (ingredient: {
              name: string;
              grams: string;
              category: string;
              foodGroup?: string;
            }) =>
              !ingredient.foodGroup ||
              !validFoodGroups.includes(
                ingredient.foodGroup as (typeof FOOD_GROUPS)[keyof typeof FOOD_GROUPS]
              )
          );

          if (invalidIngredients.length > 0) {
            console.error(
              `Invalid food groups found in attempt ${attempts + 1}:`,
              invalidIngredients.map(
                (i: { name: string; foodGroup?: string }) =>
                  `${i.name}: "${i.foodGroup}"`
              )
            );
            throw new Error(
              `Invalid food groups detected. All ingredients must use exact food group names from the provided list.`
            );
          }

          // LLM should provide food group categorization - no fallback needed
          // Just ensure the foodGroup property exists
          menuData.ingredients = menuData.ingredients.map(
            (ingredient: {
              name: string;
              grams: string;
              category: string;
              foodGroup?: string;
            }) => ({
              ...ingredient,
              foodGroup: ingredient.foodGroup || "Vegetables", // Simple fallback only if completely missing
            })
          );

          // Calculate food group totals
          const guestCount = parseInt(numberOfGuests) || 1; // Default to 1 if parsing fails
          console.log(
            `Calculating food group totals for ${guestCount} guests (original: ${numberOfGuests})`
          );
          menuData.foodGroupTotals = calculateFoodGroupTotals(
            menuData.ingredients,
            guestCount
          );

          // If we get here, the menu is valid
          break;
        } catch (error) {
          attempts++;
          console.error(
            `Error generating menu for ${menuType} (attempt ${attempts}):`,
            error
          );

          if (attempts >= maxAttempts) {
            throw new Error(
              `Failed to generate valid menu for ${menuType} after ${maxAttempts} attempts: ${error}`
            );
          }

          // Wait a bit before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      menus.push(menuData);
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
