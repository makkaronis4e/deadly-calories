import type { FighterLog } from '@/common/utils/models/interfaces';
import { AnimationType } from '@/common/utils/constants/fighters';

export class Fighter {
    name: string;
    animatedImage: string;
    staticImage: string;
    eating = false;
    private health: number;
    private round = 0;
    private log: FighterLog[] = [];

    calories(): number {
        return this.health;
    }

    get isAlive(): boolean {
        return this.health > 0;
    }

    constructor(name: string, calories: number = 5) {
        this.name = name;
        this.animatedImage = `./src/assets/img/fighters/${AnimationType.Normal}/${name.toLowerCase()}.gif`;
        this.staticImage = `./src/assets/img/fighters/${AnimationType.Static}/${name.toLowerCase()}.png`;
        this.health = calories;
    }

    eat(cookie: Cookie): void {
        if (this.isAlive) {
            this.round += 1;
            this.eating = true;
            setTimeout(() => {
                if (cookie.poisoned) {
                    this.health -= cookie.calories;
                    this.writeLog(`Poisoned cookie! Lost ${cookie.calories} calories!`);
                } else {
                    this.health += cookie.calories;
                    this.writeLog(`Om-nom-nom! Got ${cookie.calories} calories!`);
                }
                this.eating = false;
                this.burnCalories();
            }, 1000);
        }
    }

    updateAnimation(): void {
        const type =
            this.health <= 0 ? AnimationType.Dead : this.health < 3 ? AnimationType.Damaged : AnimationType.Normal;
        this.animatedImage = `./src/assets/img/fighters/${type}/${this.name.toLowerCase()}.gif`;
    }

    burnCalories() {
        this.health -= 1;
        this.updateAnimation();
        this.writeLog('Round ended. Burned 1 calorie!');
        if (this.health <= 0) {
            this.writeLog('Fighter is dead!');
        }
    }

    writeLog(message: string) {
        const currentRound = this.log.find((log) => log.round === this.round);
        if (!currentRound) {
            this.log.push({ round: this.round, events: [message] });
            return;
        }
        currentRound.events.push(message);
    }
}

export class CookieBuilder {
    poisonChance: number;
    caloriesMax: number;
    caloriesMin: number;

    constructor(poisonChance = 0.2, caloriesMax = 0.1, caloriesMin = 2) {
        this.poisonChance = poisonChance;
        this.caloriesMax = caloriesMax;
        this.caloriesMin = caloriesMin;
    }

    bake(): Cookie {
        const calories = Math.floor(Math.random() * (this.caloriesMax - this.caloriesMin + 1) + this.caloriesMin);
        const poisoned = Math.random() < this.poisonChance;
        return new Cookie(calories, poisoned);
    }
}

export class Cookie {
    calories: number;
    poisoned: boolean;

    constructor(calories: number, poisoned: boolean) {
        this.calories = calories;
        this.poisoned = poisoned;
    }
}
