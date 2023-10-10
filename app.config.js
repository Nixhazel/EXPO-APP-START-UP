module.exports = ({ config }) =>{
	// console.log(config.name);
	// prints 'My App'
	return {
		...config
	};
};

// if (process.env.MY_ENVIRONMENT === "production") {
// 	return {
		/* your production config */
// 	};
// } else {
// 	return {
		/* your development config */
// 	};
// }

// TYPESCRIPT 
// import { ExpoConfig, ConfigContext } from "expo/config";

// export default ({ config }: ConfigContext): ExpoConfig => ({
// 	...config,
// 	slug: "my-app",
// 	name: "My App"
// });

