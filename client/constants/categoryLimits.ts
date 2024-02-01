export enum Categories {
  essentials = "Essentials",
  foodstuffs = "Foodstuffs",
  gas = "Gas",
  subscriptions = "Subscriptions",
  dates = "Dates",
  funWithFriends = "Fun With Friends",
  presents = "Presents",
  house = "House",
  travel = "Travel",
  investment = "Investment",
  goodsAndServices = "Goods & Services"
}

// TODO: Make this dynamic in db
export const categoryLimits = {
  "Essentials": 1500,
  "Foodstuffs": 350,
  "Gas": 140,
  "Subscriptions": 65,
  "Dates": 250,
  "Fun with Friends": 350,
  "Presents": 100,
  "House": 50,
  "Travel": 200,
  "Investment": 300,
  "Goods & Services": 125,
};