const isNumeric = require("../utils/isNumeric");
const mainStats = ["adresse", "agilite", "force", "social", "magie", "savoirMagique", "artsDeLaGuerre"];
const offStats = ["artisanat", "visee", "minutie", "souplesse", "reflexe", "mouvement", "athletisme", "puissance", "constitution", "aura", "parole", "sangFroid", "adresse", "perception", "education", "intuition", "pratique"];

module.exports = (arg1, arg2) => {
  const k1 = arg1.split(".")[0];
  const k2 = arg1.split(".")[1];
  const bool1 = mainStats.includes(k1);
  const bool2 = offStats.includes(k2);
  const bool3 = (isNumeric(arg2) && (0 <= arg2) && (arg2 <= 100));
  if (bool1 + bool2 + bool3 === 3) {
    return true;
  }
  else {
    return false;
  }
};
