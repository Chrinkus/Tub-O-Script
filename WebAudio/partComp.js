/* This file attempts to rewirte the Part constructor using the composition
 * pattern.
 */

/* WIP
const parser = (state) => ({
    parsePlan: (plan) => {
        plan.forEach((entry, i) => {
            if (entry) {
                parseEntry(entry)
            }
        });
    }
});
*/

const queuer = (state) => ({
    queue: (offset) => {

        if (offset < 0) {
            offset += state.loopTime;
        }

        state.sound.play(offset, state.schedule[state.iterator]);
    }
});

const part = (name) => {
    let state = {
        name,
        sound = null,
        schedule: [],
        loopTime: 0,
        iterator: 0
    }

    return Object.assign(
        {},
        queuer(state)
    );
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = part;
}
