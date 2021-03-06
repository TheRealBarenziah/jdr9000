module.exports = (invokerUsername, rpName) => {
  return {
    "discordName": invokerUsername,
    "rpName": rpName ? rpName : "Default",
    "stats": {
      "adresse": {
        "artisanat": 0,
        "visee": 0,
        "minutie": 0
      },
      "agilite": {
        "souplesse": 0,
        "reflexe": 0,
        "mouvement": 0
      },
      "force": {
        "athletisme": 0,
        "puissance": 0,
        "constitution": 0
      },
      "social": {
        "aura": 0,
        "parole": 0,
        "sangFroid": 0
      },
      "magie": {
        "puissance": 0,
        "adresse": 0,
        "reflexe": 0
      },
      "savoirMagique": {
        "perception": 0,
        "education": 0,
        "intuition": 0
      },
      "artsDeLaGuerre": {
        "perception": 0,
        "education": 0,
        "pratique": 0
      }
    },
    "competences": [{
      "name": "Stiletto",
      "type": "Commune",
      "level": 8,
      "exp": 7,
      "expToLevelUp": 40
    }]
  };
};