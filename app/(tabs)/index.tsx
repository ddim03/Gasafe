import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import Chart from "@/components/Chart";

const gasLeaksHistory = [
  {
    id: 1,
    date: "2023-01-01 00:00:00",
    gasLeak: 234.5,
  },
  {
    id: 2,
    date: "2023-01-02 00:00:00",
    gasLeak: 234.5,
  },
  {
    id: 3,
    date: "2023-01-03 00:00:00",
    gasLeak: 234.5,
  },
  {
    id: 4,
    date: "2023-01-04 00:00:00",
    gasLeak: 234.5,
  },
  {
    id: 5,
    date: "2023-01-05 00:00:00",
    gasLeak: 234.5,
  },
];

export default function Home() {
  return (
    <>
      <SafeAreaView className="h-full bg-primary">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full min-h-[85vh] px-4 mt-4">
            <Text className="mb-4 text-2xl text-white font-psemibold">
              Gasafe
            </Text>
            <Chart />
            <View className="w-full mt-4">
              <Text className="text-lg text-white font-psemibold">
                Recent Gas Leaks
              </Text>
              {gasLeaksHistory.map((item) => (
                <History
                  key={item.id}
                  date={item.date}
                  gasLeak={item.gasLeak}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar backgroundColor={"#161622"} style="light" />
    </>
  );
}

const History = (item: any) => {
  return (
    <View className="flex-row items-center w-full gap-4 mt-4">
      <View className="flex items-center justify-center w-10 h-10 bg-red-500 border border-red-500 rounded-full">
        <FontAwesome name="warning" color={"#ffe001"} size={16} />
      </View>
      <View>
        <Text className="text-white font-pregular">
          {dateFormat(item.date)}
        </Text>
        <Text className="text-white font-pregular">{item.gasLeak} ppm</Text>
      </View>
    </View>
  );
};

const dateFormat = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};
