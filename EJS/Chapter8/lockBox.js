var box = {
    locked: true,
    unlock: function() { this.locked = false; },
    lock: function() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error('Locked!');
        return this._content;
    }
};

function withBoxUnlocked(body) {
    // My code
    try {
        box.unlock();
        return body();
    } finally {
        box.lock();
    }
}

withBoxUnlocked(function() {
    box.content.push('gold piece');
});

try {
    withBoxUnlocked(function() {
        // console.log(box.content);
        throw new Error('Pirates on the horizon! Abort!');
    });
} catch (e) {
    console.log('Error raised:', e);
}
console.log(box.locked); // true
