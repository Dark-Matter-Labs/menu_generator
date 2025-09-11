'use client'
import React, { useState, useMemo } from "react";
import { 
  countryData, 
  getCountryData,
  getCountryFoodData,
  getAllFoodIds,
  IMPACT_TYPES, 
  IMPACT_LABELS
} from "./constants";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Types for better type safety
type ImpactType = typeof IMPACT_TYPES[keyof typeof IMPACT_TYPES];

interface ImpactSums {
  [IMPACT_TYPES.CLIMATE]: number;
  [IMPACT_TYPES.BIODIVERSITY]: number;
  [IMPACT_TYPES.LAND_USE]: number;
  [IMPACT_TYPES.WATER_USE]: number;
  [IMPACT_TYPES.NITROGEN]: number;
  [IMPACT_TYPES.OCEAN_ACID]: number;
  [IMPACT_TYPES.CHEMICALS]: number;
  [IMPACT_TYPES.AEROSOLS]: number;
  [IMPACT_TYPES.OZONE]: number;
}

interface ChartDataPoint {
  label: string;
  bmk: number;
  eat: number;
  dinner: number;
}

interface Country {
  id: string;
  name: string;
  impacts: {
    [key in ImpactType]: {
      bmk: number;
      eat: number;
    };
  };
}

// New interface for LLM input - individual food amounts
interface FoodAmounts {
  [foodId: string]: number; // foodId -> amount in grams
}

// Interface for LLM output structure
interface LLMMenuInput {
  foodAmounts: FoodAmounts;
  // Future: could add more fields like menuName, description, etc.
}

// Custom hook for impact calculations with individual food amounts and country-specific data
const useImpactCalculator = (foodAmounts: FoodAmounts, countryId: string) => {
  return useMemo(() => {
    const countryFoods = getCountryFoodData(countryId);
    
    const sums = countryFoods.reduce(
      (acc, foodItem) => {
        const amount = foodAmounts[foodItem.id] || 0; // Get amount for this specific food
        
        acc[IMPACT_TYPES.CLIMATE] += amount * foodItem.perGramClimateImpact;
        acc[IMPACT_TYPES.BIODIVERSITY] += amount * foodItem.perGramBiodiversityImpact;
        acc[IMPACT_TYPES.LAND_USE] += amount * foodItem.perGramLandUseImpact;
        acc[IMPACT_TYPES.WATER_USE] += amount * foodItem.perGramWaterUseImpact;
        acc[IMPACT_TYPES.NITROGEN] += amount * foodItem.perGramNitrogenImpact;
        acc[IMPACT_TYPES.OCEAN_ACID] += amount * foodItem.perGramOceanAcidImpact;
        acc[IMPACT_TYPES.CHEMICALS] += amount * foodItem.perGramChemicalsImpact;
        acc[IMPACT_TYPES.AEROSOLS] += amount * foodItem.perGramAerosolsImpact;
        acc[IMPACT_TYPES.OZONE] += amount * foodItem.perGramOzoneImpact;
        return acc;
      },
      {
        [IMPACT_TYPES.CLIMATE]: 0,
        [IMPACT_TYPES.BIODIVERSITY]: 0,
        [IMPACT_TYPES.LAND_USE]: 0,
        [IMPACT_TYPES.WATER_USE]: 0,
        [IMPACT_TYPES.NITROGEN]: 0,
        [IMPACT_TYPES.OCEAN_ACID]: 0,
        [IMPACT_TYPES.CHEMICALS]: 0,
        [IMPACT_TYPES.AEROSOLS]: 0,
        [IMPACT_TYPES.OZONE]: 0,
      } as ImpactSums
    );

    // Round to 4 decimal places
    Object.keys(sums).forEach(key => {
      sums[key as keyof ImpactSums] = Math.round(sums[key as keyof ImpactSums] * 10000) / 10000;
    });

    return sums;
  }, [foodAmounts, countryId]);
};

// Legacy hook for backward compatibility (single input value)
const useLegacyImpactCalculator = (userInput: number, countryId: string) => {
  const foodAmounts = useMemo(() => {
    const amounts: FoodAmounts = {};
    getAllFoodIds().forEach(foodId => {
      amounts[foodId] = userInput;
    });
    return amounts;
  }, [userInput]);
  
  return useImpactCalculator(foodAmounts, countryId);
};

// Component for displaying calculated impacts
const ImpactResults: React.FC<{ impacts: ImpactSums }> = ({ impacts }) => (
  <div className="space-y-2">
    <h2 className="text-xl font-semibold">Calculated Impacts</h2>
    <div className="grid grid-cols-2 gap-2 text-sm">
      {Object.entries(impacts).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span className="capitalize">
            {IMPACT_LABELS[key as ImpactType].replace(/([A-Z])/g, " $1")}:
          </span>
          <span className="font-mono">{value.toFixed(4)}</span>
        </div>
      ))}
    </div>
  </div>
);

// Component for the bar chart
const ImpactChart: React.FC<{ chartData: ChartDataPoint[] }> = ({ chartData }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Environmental Impact Comparison</h2>
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="label" 
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
          />
          <YAxis scale="log" domain={[1, 'auto']} />
          <Tooltip />
          <Legend />
          <Bar dataKey="bmk" fill="#f97316" name="BMK" />
          <Bar dataKey="eat" fill="#3b82f6" name="EAT" />
          <Bar dataKey="dinner" fill="#10b981" name="Your Menu" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// Main component
const EnvironmentalImpactCalculator: React.FC = () => {
  const [userInput, setUserInput] = useState<number>(50);
  const [selectedCountry, setSelectedCountry] = useState<string>('austria');
  const [calculatedImpacts, setCalculatedImpacts] = useState<ImpactSums | null>(null);
  
  // Calculate impacts based on user input (legacy mode)
  const currentImpacts = useLegacyImpactCalculator(userInput, selectedCountry);

  // Get selected country data
  const country = getCountryData(selectedCountry);

  // Prepare chart data - NEW VERSION
  const chartData: ChartDataPoint[] = useMemo(() => {
    const impacts = calculatedImpacts || currentImpacts;
    
    if (!country) return [];
    
    return Object.entries(IMPACT_LABELS).map(([impactType, label]) => {
      const impactKey = impactType as ImpactType;
      const countryImpactData = country.impacts[impactKey];
      
      return {
        label: label.replace(/([A-Z])/g, " $1").trim(),
        bmk: countryImpactData?.bmk || 0,
        eat: countryImpactData?.eat || 0,
        dinner: impacts[impactKey] || 0
      };
    });
  }, [calculatedImpacts, currentImpacts, country]);

  const handleCalculate = () => {
    setCalculatedImpacts(currentImpacts);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Environmental Impact Calculator</h1>
        <p className="text-gray-600">Calculate the environmental impact of your menu choices</p>
      </div>

      {/* Input Section */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <Label htmlFor="input" className="text-sm font-medium">
            Food Amount (grams):
          </Label>
          <Input
            id="input"
            type="number"
            value={userInput}
            onChange={(e) => setUserInput(Number(e.target.value))}
            className="w-32"
            min="0"
            step="1"
          />
          
          <Label htmlFor="country" className="text-sm font-medium">
            Country:
          </Label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countryData.map((country) => (
                <SelectItem key={country.id} value={country.id}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button onClick={handleCalculate} className="ml-4">
            Calculate Impacts
          </Button>
        </div>
        
        {calculatedImpacts && (
          <ImpactResults impacts={calculatedImpacts} />
        )}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <ImpactChart chartData={chartData} />
      </div>
    </div>
  );
};

export default EnvironmentalImpactCalculator;