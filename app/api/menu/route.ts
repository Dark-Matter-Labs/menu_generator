import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const futureScenarios = {
  FutureOne: {
    name: "UBNI - Food as Medicine",
    context: `The year is 2040. Europe has successfully implemented Universal Basic Nutrient Income (UBNI) as part of both public health and the labor market, which has changed the way citizens view food, health and community.

UBNI – Food as Medicine
Food has become a central part of the healthcare system, where UBNI is used to prevent and treat disease. Citizens receive personal UBNI credits to buy nutritious and healthy food, especially adapted to their health needs, for example for people with diabetes or cardiovascular diseases. This has reduced the need for expensive medical treatments, lowered healthcare costs and improved public health. By making preventive, cost-effective changes in dietary habits, Europe has effectively reduced diseases linked to poor diets.

UBNI - Work for Food
The "Work for Food" model has become part of the city's culture and infrastructure. Work contracts now include an agreement where employees trade one work day/week for a day of participating in the local food system. This model has made cities self-sufficient in food, reduced dependence on global markets, strengthened the social connections and ensured that all neighborhoods have access to fresh, nutritious food.`
  },
  FutureTwo: {
    name: "Business as Usual",
    context: `The year is 2040, and no progress has been made to either diets nor the way we produce food. The region is still heavily dependent on imported food, making it extremely vulnerable to global shocks such as climate change and geopolitical tensions. Food prices have skyrocketed, and sustainable, nutritious alternatives are increasingly difficult to come by. Those on lower incomes live on cheap, nutrient-poor foods such as instant noodles, sausages, and processed foods, while more expensive, healthier alternatives remain out of reach. Diet-related diseases such as obesity, diabetes, and cardiovascular disease are common and burden the healthcare system.

Many urban neighborhoods have become "food deserts," where access to fresh vegetables and nutritious food is severely limited. Economic disparities have grown, and societal problems such as social isolation, stress, and mental illness have increased. Despite the knowledge of sustainable and healthy food production, there is a lack of incentives and structures to change consumption patterns. The food system continues to be driven by short-term economic gains rather than long-term sustainability, deepening social and health gaps in society.`
  },
  FutureThree: {
    name: "Collapse Scenario",
    context: `The year is 2040. Decades of unsustainable agricultural practices and monocultures have led to a complete loss of nutrient-rich soils. The region is plagued by extreme weather events, unpredictable rainfall, and a collapse in local food production. The once-fertile lands can no longer provide enough food for the population, and key import countries have closed their borders. It's every person for themselves now.

Municipalities have been forced to adapt to a new reality, focusing entirely on the survival of as many people as possible. Citizens receive nutrition packages from the authorities containing what can still be produced in labs: algae protein tablets, nutrient-dense meal replacements, vitamin supplements, and lab-grown carbohydrates. Food has completely lost its cultural significance and has become merely a necessity for survival. You have witnessed the dramatic transformation of society. Fresh and nutritious food is almost impossible to find, and what little exists is mostly emergency aid or synthetic production. Municipal contributions ensure that everyone gets enough nutrients to survive, but they cannot meet the diverse needs of individuals.`
  },
  FutureThreeB: {
    name: "Collapse Scenario with Extras",
    context: `The year is 2040. Decades of unsustainable agricultural practices and monocultures have led to a complete loss of nutrient-rich soils. The region is plagued by extreme weather events, unpredictable rainfall, and a collapse in local food production. The once-fertile lands can no longer provide enough food for the population, and key import countries have closed their borders. It's every person for themselves now.

Municipalities have been forced to adapt to a new reality, focusing entirely on the survival of as many people as possible. Citizens receive nutrition packages from the authorities containing what can still be produced in labs: algae protein tablets, nutrient-dense meal replacements, vitamin supplements, and lab-grown carbohydrates. Food has completely lost its cultural significance and has become merely a necessity for survival. You have witnessed the dramatic transformation of society. Fresh and nutritious food is almost impossible to find, and what little exists is mostly emergency aid or synthetic production. Municipal contributions ensure that everyone gets enough nutrients to survive, but they cannot meet the diverse needs of individuals.

However, you have access to some additional resources and can occasionally source some traditional ingredients, allowing for slightly more varied meals than the standard ration packages.`
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

Generate a JSON menu with this exact structure:
{
  "type": "${menuType}",
  "starter": {
    "name": "Creative dish name",
    "description": "Detailed description",
    "servedWith": "Accompaniments"
  },
  "main": {
    "name": "Creative dish name",
    "description": "Detailed description", 
    "servedWith": "Accompaniments"
  },
  "dessert": {
    "name": "Creative dish name",
    "description": "Detailed description",
    "servedWith": "Accompaniments"
  }
}

Respond with ONLY the JSON, no additional text.`;

      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a creative chef who generates futuristic menus. Always respond with valid JSON only."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.8,
          max_tokens: 500,
        });

        const generatedText = response.choices[0]?.message?.content || "";
        
        // Try to extract JSON from the response
        let menuData;
        const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            menuData = JSON.parse(jsonMatch[0]);
            // Ensure the type is correct
            menuData.type = menuType;
          } catch {
            // If JSON parsing fails, create structured data
            menuData = createStructuredMenu(menuType, generatedText);
          }
        } else {
          // If no JSON found, create structured data from the text
          menuData = createStructuredMenu(menuType, generatedText);
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

    return NextResponse.json(menus);

  } catch (error) {
    console.error("Error generating menus:", error);
    return NextResponse.json(
      { error: "Failed to generate menus" },
      { status: 500 }
    );
  }
}

function createStructuredMenu(menuType: string, generatedText: string): any {
  // Extract dish names from the generated text
  const lines = generatedText.split('\n').filter(line => line.trim());
  const dishNames = lines.slice(0, 3).map(line => line.trim().replace(/^[-*]\s*/, ''));
  
  return {
    type: menuType,
    starter: {
      name: dishNames[0] || "AI-Generated Starter",
      description: "A creative starter dish for the future scenario",
      servedWith: "Seasonal accompaniments"
    },
    main: {
      name: dishNames[1] || "AI-Generated Main Course", 
      description: "A creative main course for the future scenario",
      servedWith: "Local ingredients"
    },
    dessert: {
      name: dishNames[2] || "AI-Generated Dessert",
      description: "A creative dessert for the future scenario", 
      servedWith: "Fresh garnishes"
    }
  };
} 


// context
// a corporate dinner for a company interested in teaching their employees about ESG
// Goals
// team members are more aware of the impact climate change can have on food systmes. 