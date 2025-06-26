import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function ImageIcon(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M1 5a3.333 3.333 0 013.333-3.333h10A3.334 3.334 0 0117.667 5v10a3.333 3.333 0 01-3.334 3.333h-10A3.333 3.333 0 011 15V5z"
        stroke="black"
        fill="none"
        strokeWidth={1.66667}
      />
      <Path
        d="M6.417 9.167a2.083 2.083 0 100-4.167 2.083 2.083 0 000 4.167zM11.438 10.518l-7.105 7.815h10.111a3.223 3.223 0 003.223-3.222V15c0-.39-.146-.538-.409-.826L13.9 10.513a1.665 1.665 0 00-2.462.005z"
        stroke="black"
        fill="none"
        strokeWidth={1.66667}
      />
    </Svg>
  )
}


