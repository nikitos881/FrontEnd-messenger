import * as React from "react"
import Svg, { Rect, Path, SvgProps } from "react-native-svg"
import { COLORS } from "../../constants"

export function AddIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 40 40" 
    fill={COLORS.plum}
    {...props}>
      <Path d="M26.49 21.08h-5.408v5.409a1.082 1.082 0 11-2.164 0V21.08H13.51a1.082 1.082 0 010-2.163h5.41v-5.409a1.082 1.082 0 012.163 0v5.409h5.408a1.082 1.082 0 010 2.163z"/>
    </Svg>
  )
}

