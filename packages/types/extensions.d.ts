/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.png';
declare module '*.webp';
declare module '*.jpg';
declare module '*.gif';
declare module '*.webp';
declare module '*.svg' {
	/**
	 * Use `any` to avoid conflicts with
	 * `@svgr/webpack` plugin or
	 * `babel-plugin-inline-react-svg` plugin.
	 */
	const content: any;

	export default content;
}
declare module '*.scss' {
	interface IClassNames {
		[className: string]: string;
	}
	const classNames: IClassNames;
	export = classNames;
}
