const functions = require("firebase-functions/v2");
const app = require("./src/app");
let { APP_PORT, REGION } = require("./config/config");
APP_PORT = APP_PORT || 3000;

app.listen(APP_PORT, () => console.log(`Example app listening on port ${APP_PORT}!`));

// Expose Express API as a single Cloud Function:
// exports.app = functions.region(process.env.REGION).https.onRequest(app);
functions.setGlobalOptions({ region: REGION });
exports.app = functions.https.onRequest(app);
