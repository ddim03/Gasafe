import { getApps, initializeApp } from "firebase/app";
import {
  getDatabase,
  limitToLast,
  onValue,
  query,
  ref,
  set,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const database = getDatabase(app);

export const getMonitoringData = query(
  ref(database, "data_gas"),
  limitToLast(5)
);

export const getRecentGasLeaksData = query(
  ref(database, "data_gas_leaks"),
  limitToLast(5)
);

export const getDeviceStatus = () => {
  let data;
  const deviceStatusRef = ref(database, "device/is_active/");
  onValue(deviceStatusRef, (snapshot) => {
    data = snapshot.val();
  });
  return data ? data : false;
};

export const getAlarmStatus = () => {
  let data;
  const alarmStatusRef = ref(database, "buzzer/is_active/");
  onValue(alarmStatusRef, (snapshot) => {
    data = snapshot.val();
  });
  return data ? data : false;
};
export const getFanStatus = () => {
  let data;
  const fanStatusRef = ref(database, "fan/is_active/");
  onValue(fanStatusRef, (snapshot) => {
    data = snapshot.val();
  });
  return data ? data : false;
};

export const getInterval = () => {
  let data = 5;
  const intervalRef = ref(database, "interval/second/");
  onValue(intervalRef, (snapshot) => {
    data = snapshot.val();
  });
  return data / 60;
};

export const updateDeviceStatus = (state: boolean) => {
  const deviceStatusRef = ref(database, "device/is_active/");
  set(deviceStatusRef, state);
  return state;
};

export const updateAlarmStatus = (state: boolean) => {
  const alarmStatusRef = ref(database, "buzzer/is_active/");
  set(alarmStatusRef, state);
  return state;
};

export const updateFanStatus = (state: boolean) => {
  const fanStatusRef = ref(database, "fan/is_active/");
  set(fanStatusRef, state);
  return state;
};

export const updateInterval = (state: number) => {
  const intervalRef = ref(database, "interval/second/");
  set(intervalRef, state * 60);
  return state;
};
