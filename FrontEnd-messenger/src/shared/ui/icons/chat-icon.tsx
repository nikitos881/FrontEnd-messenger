import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function ChatIcon(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 17 18"
      fill="none"
      {...props}
    >
      <Path
        d="M.985 9a7.515 7.515 0 0115.03 0v4.782c0 .796 0 1.193-.118 1.511a1.88 1.88 0 01-1.104 1.104c-.318.118-.716.118-1.511.118H8.5A7.515 7.515 0 01.985 9z"
        stroke="black"
        strokeWidth={1.66667}
        strokeOpacity={1}
        fill="none"
      />
      <Path
        d="M5.682 8.06h5.636M8.5 11.819h2.818"
        stroke="black"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
        fill="none"
      />
    </Svg>
  )
}

