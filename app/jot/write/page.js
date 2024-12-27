export default function Wrinte() {
  return (
    <div>
      <h2>글 작성 페이지 입니다.</h2>
      <form action="/api/post/new" method="POST" className="flex flex-col">
        <input name="title" placeholder="글제목입력하세요"></input>
        <input name="subtitle" placeholder="부제목 입력하세요"></input>
        <input name="content" placeholder="내용 입력하세요"></input>

        <button type="submit" className="border border-red-400">
          글발사버튼
        </button>
      </form>
    </div>
  );
}
