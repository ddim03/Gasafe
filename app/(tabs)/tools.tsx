import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Switch,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";

export default function Tools() {
  // initial state
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);
  const [isFanEnabled, setIsFanEnabled] = useState(false);
  const [isDeviceEnabled, setIsDeviceEnabled] = useState(false);
  const [interval, setInterval] = useState(5);

  // process state
  const [processAlarm, setProcessAlarm] = useState(false);
  const [processFan, setProcessFan] = useState(false);
  const [processDevice, setProcessDevice] = useState(false);
  const [processInterval, setProcessInterval] = useState(false);

  // mutate state
  const toggleSwitchAlarm = () => {
    if (!isDeviceEnabled) return;
    setProcessAlarm(true);
    setIsAlarmEnabled((previousState) => !previousState);
    setProcessAlarm(false);
  };

  const toggleSwitchFan = () => {
    if (!isDeviceEnabled) return;
    setProcessFan(true);
    setIsFanEnabled((previousState) => !previousState);
    setProcessFan(false);
  };

  const toggleSwitchDevice = () => {
    setProcessDevice(true);
    setIsDeviceEnabled((previousState) => !previousState);
    setInterval(5);
    setIsAlarmEnabled(false);
    setIsFanEnabled(false);
    setProcessDevice(false);
  };

  const handleIncrement = () => {
    if (interval < 5) return;
    setInterval(interval + 5);
  };
  const handleDecrement = () => {
    if (interval < 5 || interval - 5 == 0) return;
    setInterval(interval - 5);
  };
  const handleSaveInterval = () => {
    if (!isDeviceEnabled) return;
    if (interval < 5) return;
    setProcessInterval(true);
    setInterval(interval);
    setProcessInterval(false);
  };

  return (
    <>
      <SafeAreaView className="h-full mt-4 bg-primary">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full min-h-[85vh] px-4 mt-8">
            <Text className="mb-4 text-2xl text-white font-psemibold">
              Tools
            </Text>
            <View className="flex-row justify-between">
              <View className="w-[48%] p-4 mt-4 border border-white rounded-md">
                <View className="flex-row justify-center gap-2">
                  <Text className="text-lg text-center text-white font-psemibold">
                    Device
                  </Text>
                </View>
                <View className="flex-row justify-center gap-2 mt-4">
                  <FontAwesome
                    name="flash"
                    size={32}
                    color={isDeviceEnabled ? "#FF9C01" : "white"}
                  />
                </View>
                <TouchableOpacity
                  className={
                    "flex-row items-center justify-center w-full h-10 gap-2 p-0 mt-4 text-center text-white rounded-full font-pbold " +
                    (isDeviceEnabled ? "bg-secondary-100" : "bg-gray-400")
                  }
                  onPress={toggleSwitchDevice}
                >
                  <Text className="text-lg text-white font-psemibold">
                    {isDeviceEnabled ? "OFF" : "ON"}
                    {processDevice && "Processing..."}
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="w-[48%] p-4 mt-4 border border-white rounded-md">
                <View className="flex-row justify-center gap-2">
                  <Text className="text-lg text-center text-white font-psemibold">
                    Alarm
                  </Text>
                </View>
                <View className="flex-row justify-center gap-2 mt-4">
                  <FontAwesome
                    name="bell"
                    size={32}
                    color={isAlarmEnabled ? "#FF9C01" : "white"}
                  />
                </View>
                <TouchableOpacity
                  className={
                    "flex-row items-center justify-center w-full h-10 gap-2 p-0 mt-4 text-center text-white rounded-full font-pbold " +
                    (isDeviceEnabled ? "bg-secondary-100" : "bg-gray-400")
                  }
                  onPress={toggleSwitchAlarm}
                  disabled={!isDeviceEnabled || processDevice}
                >
                  <Text className="text-lg text-white font-psemibold">
                    {isAlarmEnabled ? "OFF" : "ON"}
                    {processAlarm && "Processing..."}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row justify-between">
              <View className="w-[48%] p-4 mt-4 border border-white rounded-md">
                <View className="items-center justify-center gap-2">
                  <Text className="text-lg text-center text-white font-psemibold">
                    Fan
                  </Text>
                </View>
                <View className="flex-row justify-center gap-2 mt-4">
                  <FontAwesome
                    name="cloud"
                    size={32}
                    color={isFanEnabled ? "#FF9C01" : "white"}
                  />
                </View>
                <TouchableOpacity
                  className={
                    "flex-row items-center justify-center w-full h-10 gap-2 p-0 mt-4 text-center text-white rounded-full font-pbold " +
                    (isDeviceEnabled ? "bg-secondary-100" : "bg-gray-400")
                  }
                  onPress={toggleSwitchFan}
                  disabled={!isDeviceEnabled || processDevice}
                >
                  <Text className="text-lg text-white font-psemibold">
                    {isFanEnabled ? "OFF" : "ON"}
                    {processFan && "processing..."}
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="w-[48%] p-4 mt-4 border border-white rounded-md">
                <View className="flex-row justify-center gap-2">
                  <Text className="text-lg text-center text-white font-psemibold">
                    Interval Report (Minutes)
                  </Text>
                </View>
                <View className="flex-row justify-between gap-2 mt-4">
                  <TouchableOpacity
                    className="items-center justify-center w-10 h-10 p-0 text-center text-white border border-white rounded-full disabled:border-red-500 font-pbold"
                    onPress={handleDecrement}
                    disabled={interval === 5}
                  >
                    <FontAwesome
                      name="minus"
                      size={16}
                      color={interval === 5 ? "red" : "white"}
                    />
                  </TouchableOpacity>

                  <Text className="text-xl text-center text-white align-middle font-psemibold">
                    {interval}
                  </Text>
                  <TouchableOpacity
                    className="items-center justify-center w-10 h-10 p-0 text-center text-white border border-white rounded-full font-pbold disabled:border-red-500"
                    onPress={handleIncrement}
                    disabled={interval === 60}
                  >
                    <FontAwesome
                      name="plus"
                      size={16}
                      color={interval === 60 ? "red" : "white"}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  className={
                    "flex-row items-center justify-center w-full h-10 gap-2 p-0 mt-4 text-center text-white rounded-full font-pbold " +
                    (isDeviceEnabled ? "bg-secondary-100" : "bg-gray-400")
                  }
                  onPress={handleSaveInterval}
                  disabled={!isDeviceEnabled || processDevice}
                >
                  <Text className="text-lg text-white font-psemibold">
                    {processInterval ? "Processing..." : "Save"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar backgroundColor={"#161622"} style="light" />
    </>
  );
}
