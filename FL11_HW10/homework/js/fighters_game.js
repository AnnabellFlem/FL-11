class Fighter {
    constructor({ name, damage, hp, agility }) {
        this._name = name;
        this._damage = damage;
        this._hp = hp;
        this._maxhp = hp;
        this._agility = agility;
        this._wins = 0;
        this._losses = 0;
    }

    getName() {
        return this._name;
    }

    getDamage() {
        return this._damage;
    }

    getAgility() {
        return this._agility;
    }

    getHealth() {
        return this._hp;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    attack(fighter) {
        const maxLimit = 100;
        const random = this.getRandomInt(0, maxLimit + 1);
        const probabilityAttack = maxLimit - fighter.getAgility();
        if (probabilityAttack < random || !probabilityAttack) {
            console.log(`${fighter.getName()} attack missed`);
        } else {
            fighter.dealDamage(this.getDamage());
            if (!fighter.getHealth()) {
                this.addWin();
                fighter.addLoss();
            }
            console.log(`${this.getName()} make ${this.getDamage()} damage to ${fighter.getName()}`);
        }
    }

    logCombatHistory() {
        console.log(`Name: ${this.getName()}, Wins: ${this._wins}, Losses: ${this._losses}`);
    }

    heal(hp) {
        this._hp = Math.min(this._hp + hp, this._maxhp);
    }

    dealDamage(hp) {
        this._hp = Math.max(0, this._hp - hp);
    }

    addWin() {
        this._wins++;
    }

    addLoss() {
        this._losses++;
    }
}

function battle(fighter1, fighter2) {
    if (!fighter1.getHealth()) {
        console.log(`${fighter1.getName()} is dead and can't fight.`);
    } else if (!fighter2.getHealth()) {
        console.log(`${fighter2.getName()} is dead and can't fight.`);
    } else {
        const timeout = 1000;
        let order = true;
        const interval = setInterval(() => {
            if (!fighter1.getHealth() || !fighter2.getHealth()) {
                clearInterval(interval);
            } else if (order) {
                fighter1.attack(fighter2);
            } else {
                fighter2.attack(fighter1);
            }
            order = !order;
        }, timeout);
    }
}