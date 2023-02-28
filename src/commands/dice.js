module.exports = (msg) => {
    const text = msg.content.substring(1);
    let [amountOfDice, dieSize] = text.split('d');

    if (!amountOfDice) amountOfDice = 1;

    const rolls = [];
    for (let i = 0; i < amountOfDice; i++) {
        const roll = Math.floor(Math.random() * dieSize);
        rolls.push(roll);
    }

    const result = rolls.reduce((sum, current) => sum += current, 0);
    
    return {
        embed: {
            title      : `${text} - ${result}`,
            description: `Rolls: ${rolls.join(', ')}`,
            color      : process.env.COLOR_EMBED_1,
            channel    : msg.channel
        }
    };
};