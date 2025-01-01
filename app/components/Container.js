// components/Container.js
export default function Container({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* 좌측 여백 */}
      <div className="hidden md:block md:col-span-1"></div>
      {/* 메인 콘텐츠 */}
      <div className="col-span-1 md:col-span-4">{children}</div>
    </div>
  );
}
