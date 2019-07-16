//Prismic connection
const Prismic = require("prismic-javascript");
// let isConnected;

// module.exports = connectToPrismic = async () => {
//   if (isConnected) {
//     //console.log("=> using existing prismic connection");
//     return isConnected;
//   }

//   console.log("=> using new prismic connection");
//   isConnected = await Prismic.getApi(process.env.PRISMIC_API_ENDPOINT, {
//     accessToken: process.env.PRISMIC_ACCESS_TOKEN
//   });

//   return isConnected;
// };

module.exports = connectToPrismic = async () =>
  await Prismic.getApi(process.env.PRISMIC_API_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
  });
