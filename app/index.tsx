import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { router } from "expo-router";

const examples = [
	{
		id: "animated-square",
		title: "Animated Square Canvas",
		description: "A simple animated square with Skia Canvas",
	},
];

const Home = () => {
	const renderExample = ({ item }: { item: typeof examples[0] }) => (
		<TouchableOpacity
			style={styles.exampleItem}
			onPress={() => router.push(`/examples/${item.id}`)}
		>
			<Text style={styles.exampleTitle}>{item.title}</Text>
			<Text style={styles.exampleDescription}>{item.description}</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Skia Examples</Text>
			<FlatList
				data={examples}
				renderItem={renderExample}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.listContent}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 20,
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
		paddingHorizontal: 20,
	},
	listContent: {
		paddingHorizontal: 20,
	},
	exampleItem: {
		backgroundColor: "#f5f5f5",
		padding: 15,
		marginBottom: 10,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#e0e0e0",
	},
	exampleTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 5,
	},
	exampleDescription: {
		fontSize: 14,
		color: "#666",
	},
});

export default Home;
