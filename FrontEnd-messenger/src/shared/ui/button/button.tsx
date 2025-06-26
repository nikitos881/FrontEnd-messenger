import { TouchableOpacity, Text } from "react-native";
import { IButtonProps } from "./button.types";
import { styles } from "./button.styles";
import { COLORS } from "../../constants";

export function Button(props: IButtonProps) {
	const { label, disabled, ...touchableOpacityProps } = props;
	return (
		<TouchableOpacity
			{...touchableOpacityProps}
			disabled={disabled}
			style={[disabled ? styles.disabled : null, styles.button]}
		>
			<Text style={{color: COLORS.white}}>{label}</Text>
		</TouchableOpacity>
	);
}
