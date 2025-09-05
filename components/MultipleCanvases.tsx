import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Canvas, Fill } from "@shopify/react-native-skia";

const getRandomColor = () => {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	return `rgb(${r}, ${g}, ${b})`;
};

const MultipleCanvases = () => {
	const canvases = Array.from({ length: 20 }, (_, index) => ({
		id: index,
		color: getRandomColor(),
	}));

	return (
		<ScrollView style={styles.container}>
			<View style={styles.grid}>
				{canvases.map((canvas) => (
					<View key={canvas.id} style={styles.canvasWrapper}>
						<Canvas style={styles.canvas} __webAnimations={false}>
							<Fill color={canvas.color} />
						</Canvas>
					</View>
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		padding: 10,
		justifyContent: "space-around",
	},
	canvasWrapper: {
		width: 200,
		height: 200,
		margin: 5,
		borderRadius: 8,
		overflow: "hidden",
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	canvas: {
		flex: 1,
	},
});

export default MultipleCanvases;