module.exports = (text) => {
    const firstWord = text.split(' ')[0];
    const mapping = {
        //UE FR YT channel
        uefr: 'https://www.youtube.com/channel/UCVo4TMKRmdiMYHdMaPWbPNA',
    };

    if (firstWord in mapping) return mapping[firstWord];

    return `!link [ ${Object.keys(mapping).toString().replace(/,/g,' | ')} ]`;
};