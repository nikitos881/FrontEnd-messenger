import {
	launchImageLibraryAsync,
	requestMediaLibraryPermissionsAsync,
	ImagePickerOptions,
} from "expo-image-picker";

export async function pickImage(options?: ImagePickerOptions) {
	const result = await requestMediaLibraryPermissionsAsync();

	if (result.status === "granted") {
		const res = await launchImageLibraryAsync(options);
		if (res.canceled) {
			return null;
		}
		return res.assets;
	}
}
