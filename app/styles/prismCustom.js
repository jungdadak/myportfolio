// styles/prismCustom.js
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";

const customOkaidia = {
	...okaidia,
	'code[class*="language-"]': {
		...okaidia['code[class*="language-"]'],
		background: "#2d2d2d", // 원하는 배경색으로 변경 (예: 짙은 남색)
	},
	'pre[class*="language-"]': {
		...okaidia['pre[class*="language-"]'],
		background: "#2d2d2d", // 원하는 배경색으로 변경
	},
};

export default customOkaidia;
