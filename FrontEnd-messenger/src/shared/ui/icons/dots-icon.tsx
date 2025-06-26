import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function DotsIcon(props: SvgProps) {
  return (
    <Svg 
      viewBox="0 0 20 20"
      {...props}
    >
      <Path
        d="M12.188 10a2.187 2.187 0 11-4.375 0 2.187 2.187 0 014.375 0zM10 5.937a2.187 2.187 0 100-4.374 2.187 2.187 0 000 4.375zm0 8.125a2.187 2.187 0 100 4.375 2.187 2.187 0 000-4.375z"
        fill="#81818D"
        fillOpacity={1}
      />
    </Svg>
  )
}
