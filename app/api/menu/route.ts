import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const futureScenarios = {
  FutureOne: {
    name: "UBNI - Food as Medicine",
    context: `The year is 2040. Europe has successfully implemented Universal Basic Nutrient Income (UBNI) as part of both public health and the labor market, which has changed the way citizens view food, health and community.

UBNI – Food as Medicine
Food has become a central part of the healthcare system, where UBNI is used to prevent and treat disease. Citizens receive personal UBNI credits to buy nutritious and healthy food, especially adapted to their health needs, for example for people with diabetes or cardiovascular diseases. This has reduced the need for expensive medical treatments, lowered healthcare costs and improved public health. By making preventive, cost-effective changes in dietary habits, Europe has effectively reduced diseases linked to poor diets.

UBNI - Work for Food
The "Work for Food" model has become part of the city's culture and infrastructure. Work contracts now include an agreement where employees trade one work day/week for a day of participating in the local food system. This model has made cities self-sufficient in food, reduced dependence on global markets, strengthened the social connections and ensured that all neighborhoods have access to fresh, nutritious food.

The food culture is vibrant and delicious - think regenerative agriculture, locally sourced ingredients, seasonal menus, and innovative cooking techniques that prioritize both taste and nutrition. Restaurants and home cooks alike focus on creating meals that are both satisfying and health-promoting.`
  },
  FutureTwo: {
    name: "Business as Usual",
    context: `The year is 2040, and no progress has been made to either diets nor the way we produce food. The region is still heavily dependent on imported food, making it extremely vulnerable to global shocks such as climate change and geopolitical tensions. Food prices have skyrocketed, and sustainable, nutritious alternatives are increasingly difficult to come by. Those on lower incomes live on cheap, nutrient-poor foods such as instant noodles, sausages, and processed foods, while more expensive, healthier alternatives remain out of reach. Diet-related diseases such as obesity, diabetes, and cardiovascular disease are common and burden the healthcare system.

Many urban neighborhoods have become "food deserts," where access to fresh vegetables and nutritious food is severely limited. Economic disparities have grown, and societal problems such as social isolation, stress, and mental illness have increased. Despite the knowledge of sustainable and healthy food production, there is a lack of incentives and structures to change consumption patterns. The food system continues to be driven by short-term economic gains rather than long-term sustainability, deepening social and health gaps in society.

The typical diet consists of heavily processed, mass-produced foods from supermarkets - think frozen meals, canned goods, instant noodles, processed meats, sugary drinks, and convenience foods. Fresh produce is expensive and often of poor quality, while cheap, calorie-dense processed foods dominate the market.`
  },
  FutureThree: {
    name: "Collapse Scenario",
    context: `The year is 2040. Decades of unsustainable agricultural practices and monocultures have led to a complete loss of nutrient-rich soils. The region is plagued by extreme weather events, unpredictable rainfall, and a collapse in local food production. The once-fertile lands can no longer provide enough food for the population, and key import countries have closed their borders. It's every person for themselves now.

Municipalities have been forced to adapt to a new reality, focusing entirely on the survival of as many people as possible. Citizens receive nutrition packages from the authorities containing what can still be produced in labs: algae protein tablets, nutrient-dense meal replacements, vitamin supplements, and lab-grown carbohydrates. Food has completely lost its cultural significance and has become merely a necessity for survival. You have witnessed the dramatic transformation of society. Fresh and nutritious food is almost impossible to find, and what little exists is mostly emergency aid or synthetic production. Municipal contributions ensure that everyone gets enough nutrients to survive, but they cannot meet the diverse needs of individuals.

The diet consists entirely of functional nutrition - protein powders, vitamin tablets, meal replacement shakes, algae-based supplements, synthetic carbohydrates, and fortified survival rations. There's no real cooking or dining experience, just the mechanical consumption of nutrients to stay alive.`
  },
  FutureThreeB: {
    name: "Collapse Scenario with Extras",
    context: `The year is 2040. Decades of unsustainable agricultural practices and monocultures have led to a complete loss of nutrient-rich soils. The region is plagued by extreme weather events, unpredictable rainfall, and a collapse in local food production. The once-fertile lands can no longer provide enough food for the population, and key import countries have closed their borders. It's every person for themselves now.

Municipalities have been forced to adapt to a new reality, focusing entirely on the survival of as many people as possible. Citizens receive nutrition packages from the authorities containing what can still be produced in labs: algae protein tablets, nutrient-dense meal replacements, vitamin supplements, and lab-grown carbohydrates. Food has completely lost its cultural significance and has become merely a necessity for survival. You have witnessed the dramatic transformation of society. Fresh and nutritious food is almost impossible to find, and what little exists is mostly emergency aid or synthetic production. Municipal contributions ensure that everyone gets enough nutrients to survive, but they cannot meet the diverse needs of individuals.

However, you have access to some additional resources and can occasionally source some traditional ingredients, allowing for slightly more varied meals than the standard ration packages. You might be able to grow a small garden, trade for fresh vegetables, or have access to some preserved foods. This allows for a basic salad or fresh garnish to accompany the functional nutrition supplements.`
  }
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const location = formData.get("location") as string;
    const season = formData.get("season") as string;
    const numberOfGuests = formData.get("numberOfGuests") as string;
    const context = formData.get("context") as string;
    const goals = formData.get("goals") as string;

    // Generate all 4 menus
    const menus = [];

    for (const [menuType, scenario] of Object.entries(futureScenarios)) {
      const prompt = `Create a 3-course menu for the year 2040 based on this scenario: ${scenario.context}

Location: ${location}, Season: ${season}, Guests: ${numberOfGuests}, Context: ${context}, Goals: ${goals}

You must respond with ONLY a valid JSON object in this exact format:
{
  "type": "${menuType}",
  "starter": {
    "name": "Creative dish name",
    "description": "Brief description (max 250 characters)",
    "servedWith": "${menuType === 'FutureThreeB' ? 'Accompaniments' : ''}"
  },
  "main": {
    "name": "Creative dish name",
    "description": "Brief description (max 250 characters)", 
    "servedWith": "${menuType === 'FutureThreeB' ? 'Accompaniments' : ''}"
  },
  "dessert": {
    "name": "Creative dish name",
    "description": "Brief description (max 250 characters)",
    "servedWith": "${menuType === 'FutureThreeB' ? 'Accompaniments' : ''}"
  }
}

CRITICAL REQUIREMENTS:
- Respond with ONLY the JSON object, no additional text
- Do NOT wrap the JSON in markdown code blocks (no \`\`\`json or \`\`\`)
- Do NOT add any formatting, just pure JSON
- Keep descriptions brief (max 250 characters)
- Keep servedWith brief (max 90 characters)
- For FutureThreeB: always include "servedWith" for all dishes
- For other scenarios: randomly include "servedWith" (about 50% of dishes)
- If "servedWith" is not needed, use empty string ""
- Ensure all JSON syntax is valid with proper quotes and commas
- Do not include any text before or after the JSON object`;

      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedText = response.text();
        
        // Try to extract JSON from the response
        let menuData;
        try {
          // Parse the entire response as JSON
          menuData = JSON.parse(generatedText);
          // Ensure the type is correct
          menuData.type = menuType;
          
          // Validate that we have the required structure
          if (!menuData.starter || !menuData.main || !menuData.dessert) {
            throw new Error("Missing required menu structure");
          }
        } catch (parseError) {
          console.error(`JSON parsing failed for ${menuType}:`, parseError);
          throw new Error(`Failed to parse JSON for ${menuType}`);
        }

        menus.push(menuData);
      } catch (error) {
        console.error(`Error generating menu for ${menuType}:`, error);
        // Fallback to dummy data if API fails
        menus.push({
          type: menuType,
          starter: {
            name: "AI-Generated Starter",
            description: "A starter dish reflecting the future scenario",
            servedWith: "Seasonal accompaniments"
          },
          main: {
            name: "AI-Generated Main Course",
            description: "A main course reflecting the future scenario",
            servedWith: "Local ingredients"
          },
          dessert: {
            name: "AI-Generated Dessert",
            description: "A dessert reflecting the future scenario",
            servedWith: "Fresh garnishes"
          }
        });
      }
    }

    console.log("Generated menus count:", menus.length);
    console.log("Menu types:", menus.map(m => m.type));
    
    return NextResponse.json(menus);

  } catch (error) {
    console.error("Error generating menus:", error);
    return NextResponse.json(
      { error: "Failed to generate menus" },
      { status: 500 }
    );
  }
} 