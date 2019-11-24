import { ResponsiveBar } from "@nivo/bar";

const BarComponent = (props) => {
  const {
    data: {
      data: { color }
    }
  } = props;

  return (
    <g transform={`translate(${props.x},${props.y})`}>
      <rect
        x={-3}
        y={7}
        width={props.width}
        height={props.height}
        fill="rgba(0, 0, 0, .07)"
      />
      <rect width={props.width} height={props.height} fill={color} />
      <rect
        x={props.width - 5}
        width={5}
        height={props.height}
        fill={props.borderColor}
        fillOpacity={0.2}
      />
      <text
        x={props.width - 16}
        y={props.height / 2}
        textAnchor="end"
        dominantBaseline="central"
        fill="#f9f9f9"
        style={{
          fontWeight: 600,
          fontSize: 11
        }}
      >
        {props.data.value} шт.
      </text>
    </g>
  );
};

export default ({ data }) => {
  return (
    <ResponsiveBar
      layout="horizontal"
      reverse={true}
      margin={{ top: 26, right: 20, bottom: 26, left: 50 }}
      data={data}
      indexBy="name"
      keys={["amount"]}
      enableGridX
      enableGridY={false}
      axisTop={{
        format: "~s"
      }}
      axisBottom={{
        format: "~s"
      }}
      axisLeft={null}
      padding={0.3}
      motionStiffness={90}
      motionDamping={5}
      barComponent={BarComponent}
    />
  );
};
