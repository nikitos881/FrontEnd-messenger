import * as React from "react"
import Svg, { Rect, Path, SvgProps } from "react-native-svg"
import { COLORS } from "../../constants"

export function LeftArrow(props: SvgProps) {
  return (
    <Svg
      // viewBox="0 0 8 14"
      viewBox="0 0 8 14"
      fill="none"
      {...props}
    >
      <Path
      fill="#81818D"
      fillRule="evenodd"
      d="M6.997 13.004a.992.992 0 0 1-1.402 0l-5.29-5.29a.992.992 0 0 1 0-1.402l5.29-5.29a.992.992 0 1 1 1.402 1.402l-4.59 4.589 4.59 4.589a.992.992 0 0 1 0 1.402Z"
      clipRule="evenodd"
      fillOpacity={1}
      />
    </Svg>
  )
}

