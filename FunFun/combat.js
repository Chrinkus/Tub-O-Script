// 3. basic method adder
const addShout = (state) => ({
    shout: () => {
        console.log(`I am ${state.name}! ${state.msg}`);
    }
});

const addMove = (state) => ({
    move: (x, y) => {
        state.x += x;
        state.y += y;
    }
});

const addGetStatus = (state) => ({
    getStatus: () => {
        console.log(
                `${state.name}: Loc: ${state.x}, ${state.y} HP: ${state.hp}`);
    }
});

const addAttack = (state) => ({
    attack: (target) => {
        const damage = Math.ceil(Math.random() * 5);
        // 4. Pattern prevents direct access to obj variables
        //target.hp -= damage;  cannot directly access target's properties
        target.hurt(damage);
    }
});

// 5. objects can change their own props with methods
const addHurt = (state) => ({
    hurt: (damage) => {
        state.hp -= damage * (100 - state.armor); // Next step: helper
    }
});

// 1. player obj factory
const player = (name, msg) => {
    const state = {
        name,
        msg,
        x: 0,
        y: 0,
        hp: 100,
        armor: 10
    };

    // 2. adding features/abilities is trivial
    return Object.assign({},
                         addShout(state),
                         addMove(state),
                         addGetStatus(state),
                         addAttack(state),
                         addHurt(state));
};

const chris = player("Chrusk", "GRRAARGH!!");
chris.shout();
chris.move(3, -1);
chris.getStatus();

const dave = player("Davek", "PENISHH!!");
dave.shout();

chris.attack(dave);
dave.getStatus();

dave.attack(chris);
chris.getStatus();
