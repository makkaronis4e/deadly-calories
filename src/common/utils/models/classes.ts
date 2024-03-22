import type { FighterLog } from '@/common/utils/models/interfaces';
import { AnimationType } from '@/common/utils/constants/fighters';
import { toRaw } from 'vue'

export class Fighter {
    name: string;

    animatedImage: string;
    staticImage: string;
    isAlive = true;
    percentageOfHealth = '100%';
    eating = false;
    log: FighterLog[] = [];

    private maxHealth: number;
    private health: number;
    private round = 0;

    constructor(name: string, calories: number = 5) {
        this.name = name;
        this.animatedImage = `./img/fighters/${AnimationType.Normal}/${name.toLowerCase()}.gif`;
        this.staticImage = `./img/fighters/${AnimationType.Static}/${name.toLowerCase()}.png`;
        this.maxHealth = calories;
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
                this.calculatePercentageOfHealth();
            }, 100);
        }
    }

    updateAnimation(): void {
        const type =
            this.health <= 0 ? AnimationType.Dead : this.health < 3 ? AnimationType.Damaged : AnimationType.Normal;
        this.animatedImage = `./img/fighters/${type}/${this.name.toLowerCase()}.gif`;
    }

    burnCalories() {
        this.health -= 1;
        this.updateAnimation();
        this.writeLog('Round ended. Burned 1 calorie! Current HP is: ' + this.health);
        if (this.health <= 0) {
            this.isAlive = false;
            this.writeLog('Fighter is dead!');
            setTimeout(() => {
                this.animatedImage = `./img/fighters/dead/grave.webp`;
            }, 1000);
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

    calculatePercentageOfHealth() {
        const percentage = (this.health / this.maxHealth) * 100;
        this.percentageOfHealth = percentage > 0 ? percentage + '%' : 'game.dead';
    }
}

export class CookieBuilder {
    private poisonChance: number;
    private caloriesMax: number;
    private caloriesMin: number;

    constructor(poisonChance = 0.2, caloriesRange = [0.2, 2]) {
        this.poisonChance = poisonChance;
        this.caloriesMax = caloriesRange[1];
        this.caloriesMin = caloriesRange[0];
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
    id: string;

    constructor(calories: number, poisoned: boolean) {
        this.calories = calories;
        this.poisoned = poisoned;
        this.id = 'id' + Math.random().toString(16).slice(2);
    }
}

export class Round {
    num: number;
    snapshot: Fighter[];
    finished = false;

    constructor(num: number, snapshot: Fighter[]) {
        this.num = num;
        this.snapshot = snapshot;
    }

    finishRound(reset?: boolean) {
        this.finished = !reset;
    }
}
