export type MenuType = "FutureOne" | "FutureTwo" | "FutureThree" | "FutureThreeB";

export interface MenuCourse {
  name: string;
  description: string;
  servedWith?: string;
}

export interface MenuData {
  type: MenuType;
  starter: MenuCourse;
  main: MenuCourse;
  dessert: MenuCourse;
}

export interface ReceiptData {
  menuType: MenuType;
  date: string;
  cashier: string;
  items: { qty: number; description: string; price: number }[];
  total: number;
  ubniCredits: number;
  code: string;
  // Add more fields as needed for environmental/health impact
} 