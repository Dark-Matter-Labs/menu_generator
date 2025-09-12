import { MenuData } from "@/types/menu";
import { useMemo } from "react";
import {
  getCountryFoodData,
  IMPACT_TYPES,
  IMPACT_LABELS,
} from "@/lib/constants";

interface FoodGroupSectionProps {
  menuData: MenuData[];
  countryId?: string; // Add country selection
}

// Types for impact calculations
type ImpactType = (typeof IMPACT_TYPES)[keyof typeof IMPACT_TYPES];

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

// Component for displaying calculated impacts
const ImpactResults: React.FC<{ impacts: ImpactSums }> = ({ impacts }) => (
  <div className="space-y-2">
    <h3 className="text-lg font-semibold">Environmental Impact</h3>
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

// Component for individual impact category charts
const ImpactChart: React.FC<{ chartData: ChartDataPoint[] }> = ({
  chartData,
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Environmental Impact Comparison</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {chartData.map(dataPoint => {
        const maxValue = Math.max(
          dataPoint.bmk,
          dataPoint.eat,
          dataPoint.dinner
        );
        const yourMenuHeight = (dataPoint.dinner / maxValue) * 100;
        const bmkLineHeight = (dataPoint.bmk / maxValue) * 100;
        const eatLineHeight = (dataPoint.eat / maxValue) * 100;

        return (
          <div
            key={dataPoint.label}
            className="bg-white rounded-lg p-4 border border-gray-200"
          >
            <h4 className="text-sm font-medium text-gray-700 mb-3 text-center">
              {dataPoint.label}
            </h4>
            <div className="relative h-32 flex items-end justify-center">
              {/* Your Menu Bar */}
              <div
                className="w-16 bg-green-500 bg-opacity-60 rounded-t-md relative z-10"
                style={{ height: `${yourMenuHeight}%` }}
                title={`Your Menu: ${dataPoint.dinner.toFixed(4)}`}
              />

              {/* BMK Line */}
              <div
                className="absolute w-full border-t-2 border-orange-500 z-20"
                style={{ bottom: `${bmkLineHeight}%` }}
                title={`BMK: ${dataPoint.bmk.toFixed(4)}`}
              />

              {/* EAT Line */}
              <div
                className="absolute w-full border-t-2 border-blue-500 z-20"
                style={{ bottom: `${eatLineHeight}%` }}
                title={`EAT: ${dataPoint.eat.toFixed(4)}`}
              />
            </div>

            {/* Legend */}
            <div className="mt-3 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 bg-opacity-60 rounded"></div>
                  <span>Your Menu</span>
                </div>
                <span className="font-mono">{dataPoint.dinner.toFixed(4)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-orange-500"></div>
                  <span>BMK</span>
                </div>
                <span className="font-mono">{dataPoint.bmk.toFixed(4)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-blue-500"></div>
                  <span>EAT</span>
                </div>
                <span className="font-mono">{dataPoint.eat.toFixed(4)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default function FoodGroupSection({
  menuData,
  countryId = "austria",
}: FoodGroupSectionProps) {
  // Get all unique food groups across all menus
  const allFoodGroups = useMemo(() => {
    const groups = new Set<string>();
    if (menuData && menuData.length > 0) {
      menuData.forEach(menu => {
        if (menu.foodGroupTotals) {
          Object.keys(menu.foodGroupTotals).forEach(foodGroup => {
            groups.add(foodGroup);
          });
        }
      });
    }
    return Array.from(groups).sort();
  }, [menuData]);

  // Calculate impacts for all menus
  const menuImpactsMap = useMemo(() => {
    const impacts: { [key: string]: ImpactSums } = {};
    if (menuData && menuData.length > 0) {
      menuData.forEach(menu => {
        impacts[menu.type] = calculateImpactForMenu(
          menu.foodGroupTotals || {},
          countryId
        );
      });
    }
    return impacts;
  }, [menuData, countryId]);

  // Prepare chart data for all menus
  const chartDataMap = useMemo(() => {
    const charts: { [key: string]: ChartDataPoint[] } = {};

    if (!menuData || menuData.length === 0) return charts;

    // For now, we'll use Austria's reference data - you can make this dynamic later
    const austriaData = {
      [IMPACT_TYPES.CLIMATE]: { bmk: 2.6125, eat: 2.525 },
      [IMPACT_TYPES.BIODIVERSITY]: { bmk: 0.5845, eat: 0.585 },
      [IMPACT_TYPES.LAND_USE]: { bmk: 1.5265, eat: 1.535 },
      [IMPACT_TYPES.WATER_USE]: { bmk: 1135.5, eat: 1065 },
      [IMPACT_TYPES.NITROGEN]: { bmk: 3.175, eat: 2.85 },
      [IMPACT_TYPES.OCEAN_ACID]: { bmk: 1.3755, eat: 1.375 },
      [IMPACT_TYPES.CHEMICALS]: { bmk: 0.88, eat: 0.83 },
      [IMPACT_TYPES.AEROSOLS]: { bmk: 17.75, eat: 9.15 },
      [IMPACT_TYPES.OZONE]: { bmk: 0.0715, eat: 0.0365 },
    };

    menuData.forEach(menu => {
      const menuImpacts = menuImpactsMap[menu.type];
      charts[menu.type] = Object.entries(IMPACT_LABELS).map(
        ([impactType, label]) => {
          const impactKey = impactType as ImpactType;
          const referenceData = austriaData[impactKey];

          return {
            label: label.replace(/([A-Z])/g, " $1").trim(),
            bmk: referenceData?.bmk || 0,
            eat: referenceData?.eat || 0,
            dinner: menuImpacts[impactKey] || 0,
          };
        }
      );
    });

    return charts;
  }, [menuData, menuImpactsMap]);

  // Helper function to calculate impact for a single menu (not a hook)
  function calculateImpactForMenu(
    foodGroupTotals: {
      [foodGroup: string]: { totalGrams: number; perPersonGrams: number };
    },
    countryId: string
  ): ImpactSums {
    const countryFoods = getCountryFoodData(countryId);

    const sums = countryFoods.reduce(
      (acc, foodItem) => {
        const foodGroupTotal = foodGroupTotals[foodItem.foodGroup];
        const amount = foodGroupTotal?.perPersonGrams || 0; // Use total grams for the menu

        acc[IMPACT_TYPES.CLIMATE] += amount * foodItem.perGramClimateImpact;
        acc[IMPACT_TYPES.BIODIVERSITY] +=
          amount * foodItem.perGramBiodiversityImpact;
        acc[IMPACT_TYPES.LAND_USE] += amount * foodItem.perGramLandUseImpact;
        acc[IMPACT_TYPES.WATER_USE] += amount * foodItem.perGramWaterUseImpact;
        acc[IMPACT_TYPES.NITROGEN] += amount * foodItem.perGramNitrogenImpact;
        acc[IMPACT_TYPES.OCEAN_ACID] +=
          amount * foodItem.perGramOceanAcidImpact;
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
      sums[key as keyof ImpactSums] =
        Math.round(sums[key as keyof ImpactSums] * 10000) / 10000;
    });

    return sums;
  }

  if (!menuData || menuData.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {menuData.map(menu => {
        const menuImpacts = menuImpactsMap[menu.type];
        const chartData = chartDataMap[menu.type];

        return (
          <div
            key={menu.type}
            className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 px-10 py-10"
          >
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 capitalize">
              {menu.type.replace(/([A-Z])/g, " $1").trim()} - Food Group
              Analysis
            </h2>

            {/* Food Group Totals */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">
                Food Group Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allFoodGroups.map(foodGroup => {
                  const totals = menu.foodGroupTotals?.[foodGroup];
                  if (!totals || !totals.totalGrams || totals.totalGrams === 0)
                    return null;

                  return (
                    <div
                      key={foodGroup}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                    >
                      <h4 className="font-medium text-gray-800 mb-2">
                        {foodGroup}
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Total:</span>
                          <span className="font-mono">
                            {(totals.totalGrams || 0).toFixed(1)}g
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Per person:</span>
                          <span className="font-mono">
                            {(totals.perPersonGrams || 0).toFixed(1)}g
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {(!menu.foodGroupTotals ||
                Object.keys(menu.foodGroupTotals).length === 0) && (
                <p className="text-gray-500 text-center py-4">
                  No food group data available
                </p>
              )}
            </div>

            {/* Environmental Impact Section */}
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <ImpactResults impacts={menuImpacts} />
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <ImpactChart chartData={chartData} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
