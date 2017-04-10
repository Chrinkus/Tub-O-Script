/* Composition over Inheritance
 *
 * 20 Sept 2015
 */

const barker = (state) => ({
    bark: () => console.log("Woof, I am " + state.name)
});

const driver = (state) => ({
    drive: () => state.position = state.position + state.speed
});

const killer = (state) => ({
    kill: () => state.bloodlust = "heightened"
});

barker({name: "karo"}).bark();  // Woof, I am karo

const murderRobotDog = (name) => {
    let state = {
        name,
        speed: 100,
        position: 0
    };

    return Object.assign(
        {},
        barker(state),
        driver(state),
        killer(state)
    );
};

murderRobotDog("sniffles").bark();  // Woof, I am sniffles
