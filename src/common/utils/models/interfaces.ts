export interface FighterLog {
    round: number;
    events: string[];
}

export interface GameConfig {
    caloriesRange: number[];
    poisonChance: number;
    startingCalories: number;
}
