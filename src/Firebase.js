import * as firebase from "firebase";
import config from "./environments/environment";

firebase.initializeApp(config.firebase);

export default firebase;
