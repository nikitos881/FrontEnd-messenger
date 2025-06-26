import Svg, { Path, Rect, SvgProps } from "react-native-svg";

export function BinIcon(props: SvgProps) {
    return (
        <Svg
      width={41}
      height={40}
      viewBox="0 0 41 40"
      fill="none"
      {...props}
    >
      <Rect
        x={1.05859}
        y={0.5}
        width={39}
        height={39}
        rx={19.5}
        fill="#fff"
        fillOpacity={1}
      />
      <Rect
        x={1.05859}
        y={0.5}
        width={39}
        height={39}
        rx={19.5}
        stroke="color(display-p3 .3294 .2353 .3216)"
        strokeOpacity={1}
      />
      <Path
        d="M13.893 15.833h13.333m-8.333 3.334v5m3.333-5v5m-7.5-8.334l.833 10a1.666 1.666 0 001.667 1.667h6.667a1.667 1.667 0 001.666-1.667l.834-10m-8.334 0v-2.5a.833.833 0 01.834-.833h3.333a.833.833 0 01.833.833v2.5"
        stroke="color(display-p3 .3294 .2353 .3216)"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
      />
    </Svg>
    );
}