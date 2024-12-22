import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import Chart from "@/components/Chart";
import { dateFormat } from "@/utils/dateFormat";
import { ref, onValue, query, limitToLast } from "firebase/database";
import { database } from "@/lib/firebase";

type GasData = {
  date: String;
  ppm: Number;
};

export default function Home() {
  const [labels, setLabel] = useState<string[]>();
  const [data, setData] = useState<number[]>();
  const [history, setHistory] = useState<GasData[]>();

  useEffect(() => {
    const gasRef = query(ref(database, "data_gas"), limitToLast(5));
    onValue(gasRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filteredData = Object.values(data) as GasData[];
        const ppm = filteredData.map((item: GasData) => item.ppm) as number[];
        const date = filteredData.map((item: GasData) =>
          dateFormat(item.date as string, "short")
        ) as string[];
        setLabel(date);
        setData(ppm);
      }
    });
  }, []);

  useEffect(() => {
    const gasRef = query(ref(database, "data_gas_leaks"), limitToLast(5));
    onValue(gasRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filteredData = Object.values(data) as GasData[];
        setHistory(filteredData);
      }
    });
  }, []);

  return (
    <>
      <SafeAreaView className="h-full bg-primary">
        <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
          <View className="w-full min-h-[85vh] px-4 py-5 mt-4">
            <Text className="mb-4 text-2xl text-white font-psemibold">
              Gasafe
            </Text>
            <Text className="text-lg text-white font-psemibold">Monitor</Text>
            <Chart labels={labels} data={data} />
            <View className="w-full mt-4">
              <Text className="text-lg text-white font-psemibold">Recent</Text>
              {history &&
                history.map((item: GasData, index: number) => (
                  <History
                    key={index}
                    date={item.date as string}
                    ppm={item.ppm as number}
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

const History = ({ date, ppm }: { date: string; ppm: number }) => {
  return (
    <View className="flex-row items-center w-full gap-4 mt-4">
      <View className="flex items-center justify-center w-10 h-10 bg-red-500 border border-red-500 rounded-full">
        <FontAwesome name="warning" color={"#ffe001"} size={16} />
      </View>
      <View>
        <Text className="text-white font-pregular">{dateFormat(date)}</Text>
        <Text className="text-white font-pregular">{ppm} ppm</Text>
      </View>
    </View>
  );
};
