import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

type ChartProps = {
  labels: string[] | undefined;
  data: number[] | undefined;
};

export default function Chart({ labels, data }: ChartProps) {
  if (!labels || !data) {
    return <></>;
  }

  return (
    <LineChart
      data={{
        labels: labels,
        datasets: [
          {
            data: data,
          },
        ],
      }}
      width={Dimensions.get("window").width - 27} // from react-native
      height={500}
      yAxisInterval={1} // optional, defaults to 1
      verticalLabelRotation={60}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726",
        },
      }}
      style={{
        marginVertical: 2,
        borderRadius: 8,
      }}
    />
  );
}
