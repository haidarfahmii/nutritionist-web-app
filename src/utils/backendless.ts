import Backendless from "backendless";

const APP_ID = process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID;
const API_KEY = process.env.NEXT_PUBLIC_BACKENDLESS_API_KEY;

if (!APP_ID || !API_KEY) {
  throw new Error(
    "Backendless APP_ID or API_KEY is not defined in environment variables."
  );
}

// Check if the app is already initialized before calling initApp
if (!Backendless.appId) {
  Backendless.initApp(APP_ID, API_KEY);
  console.log("Backendless SDK initialized (Server).");
}

export default Backendless;
