const mongoose = require('mongoose');
const Fivondronana = require('../models/Fivondronana');
require('dotenv').config();

const initFivondronana = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    // Données Fivondronana par défaut
    const fivondronanaData = [ 
    { fivondronana_id: 1, code: "1e", description: "PAROISSE INTERNATIONALE ANDOHALO" },
    { fivondronana_id: 2, code: "2e", description: "EEM AMBOHIMANORO" },
    { fivondronana_id: 5, code: "5e", description: "GUILPIN" },
    { fivondronana_id: 7, code: "7e", description: "FJKM RASALAMA MANJAKARAY " },
    { fivondronana_id: 8, code: "8e", description: "ANTSAHAMANITRA" },
    { fivondronana_id: 9, code: "9e", description: "FJKM TRANOVATO FARAVOHITRA" },
    { fivondronana_id: 10A, code: "10eA", description: "FJKM AMPARIBE FAMONJENA" },
    { fivondronana_id: 10B, code: "10eB", description: "FJKM ATSIMON'NY MAHAMASINA" },
    { fivondronana_id: 12, code: "12e", description: "FJKM AVARATR'ANDOHALO " },
    { fivondronana_id: 13, code: "13e", description: "FJKM AMBAVAHADIMITAFO " },
    { fivondronana_id: 14, code: "14e", description: "FJKM TRANOVATO AMBATONAKANGA " },
    { fivondronana_id: 15, code: "15e", description: "FJKM KATEDRALY ANALAKELY" },
    { fivondronana_id: 16, code: "16e", description: "FFJKM ANDRAINARIVO FAHASOAVANA" },
    { fivondronana_id: 17, code: "17e", description: "FJKM ANKADIFOTSY" },
    { fivondronana_id: 19, code: "19e", description: "FJKM AMBONINAMPAHAMARINANA" },
    { fivondronana_id: 21, code: "21e", description: "FJKM AMBOHITANTELY " },
    { fivondronana_id: 29, code: "29e", description: "FJKM AMBONDRONA FIRAISANA" },
    { fivondronana_id: 48, code: "48e", description: "FJKM ANTANIMENA ANDREFANA FANASIM-PIDERANA" },
    { fivondronana_id: 54, code: "54e", description: "FMTA AMBATONAKANGA " },
    { fivondronana_id: 56, code: "56e", description: "FLM AMBATOVINAKY " },
    { fivondronana_id: 61, code: "61e", description: "FJKM AMBALAVAO ISOTRY" },
    { fivondronana_id: 72, code: "72e", description: "FJKM ANDRAVOAHANGY FIVAHAHANA" },
    { fivondronana_id: 82, code: "82e", description: "FJKM ANJANAHARY MARITIORA" },
    { fivondronana_id: 87, code: "87e", description: "EEM TRINITE MASINA AVARATRANJOMA" },
    { fivondronana_id: 98, code: "98e", description: "FJKM AMBOHIPOTSY RASALAMA MARITIORA" },
    { fivondronana_id: 103, code: "103e", description: "FJKM KRISTY FANANTENANA ANTOHOMADINIKA" },
    { fivondronana_id: 105, code: "105e", description: "CHAPELLE MILITAIRE AMPAHIBE" },
    { fivondronana_id: 107, code: "107e", description: "FLM 67HA" },
    { fivondronana_id: 109, code: "109e", description: "FJKM AMBATOMENA" },
    { fivondronana_id: 112, code: "112e", description: "FJKM ISOTRY FITIAVANA" },
    { fivondronana_id: 119, code: "119e", description: "AKAMA" },
    { fivondronana_id: 121, code: "121e", description: "FJKM ANTANIMENA ANTSINANANA FIFALIANA" },
    { fivondronana_id: 129, code: "129e", description: "FJKM ANDOHOTAPENAKA" },
    { fivondronana_id: 134, code: "134e", description: "FEEM ANKADIFOTSY" },
    { fivondronana_id: 139, code: "139e", description: "FJKM ANDAVAMAMBA KRISTY VELONA" },
    { fivondronana_id: 144, code: "144e", description: "CENHOSOA" },
    { fivondronana_id: 153, code: "153e", description: "FJKM AMBODITSIRY" }, 
    { fivondronana_id: 165, code: "165e", description: "FJKM MANDROSOA AMBOHIJATOVO " },
    { fivondronana_id: 211, code: "211e", description: "METM AMBODIMANGA BESARETY" },
    { fivondronana_id: 212, code: "212e", description: "EEM ANATIHAZO ISOTRY" },
    { fivondronana_id: 213, code: "213e", description: "METM AVARADOHA" },
    { fivondronana_id: 214, code: "214e", description: "FJKM SALEMA VAOVAO" },
    { fivondronana_id: 215, code: "215e", description: "FJKM MANARINTSOA FINOANA" },
    { fivondronana_id: 267, code: "267e", description: "METM ANKAZOMANGA" },
    { fivondronana_id: 287, code: "287e", description: "FJKM AMBOASARIKELY" },
    { fivondronana_id: 296, code: "296e", description: "FJKM AMBATOMITSANGANA LA HAUTE VILLE" },
    { fivondronana_id: 298, code: "298e", description: "FJKM ANDAVAMAMBA FILADELFIA" },
    { fivondronana_id: 398, code: "398e", description: "FJKM KRISTY FIORENANA A KAZOMANGA" },
    { fivondronana_id: 430, code: "430e", description: "FMTA ANTOHOMADINIKA " },
    { fivondronana_id: 434, code: "434e", description: "FMTA ANTSAHAVOLA" }
    ];

    // Nettoyer et insérer
    await Fivondronana.deleteMany({});
    await Fivondronana.insertMany(fivondronanaData);

    console.log('✅ Fivondronana initialisés avec succès');
    console.log('📊 Données créées:', fivondronanaData.length);

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

initFivondronana();
