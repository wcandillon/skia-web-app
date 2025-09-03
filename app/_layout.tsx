import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen 
				name="index" 
				options={{ 
					title: "Skia Examples",
					headerStyle: {
						backgroundColor: "#fff",
					},
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}} 
			/>
			<Stack.Screen 
				name="examples/[id]" 
				options={{ 
					title: "Example",
					headerStyle: {
						backgroundColor: "#fff",
					},
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}} 
			/>
		</Stack>
	);
}
