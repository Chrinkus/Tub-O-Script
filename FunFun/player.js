const mover = (state) => ({
    move: () => {
        state.x += 4;
        state.y += 4;
    }
});

const shouter = (state) => ({
    shout: () => {
        console.log("MY NAME IS " + state.name);
        //console.log("I'm sitting at " + state.x + ", " + state.y);
        console.log("My health is " + state.hp);
    }
});

const attacker = (state) => ({
    attack: (tar) => {
        tar.hurt();
    }
});

const hurter = (state) => ({
    hurt: () => state.hp -= 2
});

const player = (name) => {
    const state = {
        name,
        hp: 10,
        x: 0,
        y: 0
    };

    return Object.assign(
        {},
        attacker(state),
        hurter(state),
        shouter(state),
        mover(state)
    );
};

const dude = player("Chris");
//dude.shout();
//dude.move();
//dude.shout();
const guy = player("Dave");

dude.shout();
guy.shout();
dude.attack(guy);
guy.shout();
