module.exports = (text) => {
    const firstWord = text.split(' ')[0];
    const mapping = {
        //UE FR YT channel
        yt: 'https://www.youtube.com/',
    };

    if (firstWord in mapping) return mapping[firstWord];

    return `!link [ ${Object.keys(mapping).toString().replace(/,/g,' | ')} ]`;
};