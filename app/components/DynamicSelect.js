// components/DynamicSelect.jsx

import dynamic from "next/dynamic";

// react-select를 동적으로 임포트하고, 서버 사이드 렌더링 비활성화
const DynamicSelect = dynamic(() => import("react-select"), { ssr: false });

export default DynamicSelect;
