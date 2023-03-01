// ============================
// LONG MESSAGE STRINGS
// ============================


module.exports.helperMessage = {embed: {
    title      : 'All commands:',
    description: `
      **\\_d\\_ / d_**: roll dice or only one if nothing is specified before \`d\`
      **monsters / ms [args]**: list monsters. If args is a single letter, return monsters starting with the letter. If a word is specified, returns monsters having the word in their name.
      **spells / ss [args]**: list spells, same for args
      **magicitems / mis [args]**: list magic items, same for args
      **m [monster's name]**: return monster's information
      **s [spell's name]**: return spell's information
      **mi [item's name]**: return item's information
      `
}};

module.exports.errorMessage = ':bangbang: Erreur! Demande de l\'aide a un membre du staff ¯\\_(ツ)_/¯';

module.exports.dndApiUrl = 'www.dnd5eapi.co';