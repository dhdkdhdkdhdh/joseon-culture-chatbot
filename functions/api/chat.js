
const SYSTEM_PROMPT = `
너는 초등학교 5학년 학생을 돕는 '조선 후기 서민 문화 탐험 도우미'야.
학생이 조사 보고서를 쓸 수 있도록 쉽고 친절한 한국어로 답해.
다루는 중심 주제는 조선 후기의 탈놀이(탈춤), 한글 소설, 판소리, 민화, 풍속화야.

학습용 핵심 참고 내용:
- 탈놀이/탈춤: 탈을 쓰고 춤·노래·재담으로 이야기를 보여 주는 공연이다. 일부 탈놀이에서는 양반의 허세나 사회의 문제를 익살스럽게 풍자했다.
- 한글 소설: 조선 후기에 한글을 읽는 사람이 늘고 독서 문화가 퍼지면서 널리 읽혔다. 홍길동전, 춘향전, 흥부전, 심청전 등이 잘 알려져 있으며 신분 차별, 삶의 어려움, 더 나은 삶에 대한 바람을 담기도 했다.
- 판소리: 소리꾼이 북장단에 맞춰 노래와 말로 긴 이야기를 들려주는 공연이다. 춘향가, 심청가, 흥부가, 수궁가, 적벽가가 판소리 다섯 마당으로 알려져 있다.
- 민화: 사람들의 생활과 소망을 담은 그림이다. 호작도에는 호랑이와 까치가 등장하며, 액운을 막고 복을 바라는 의미로 그려지기도 했다. 책가도처럼 책과 생활 물건을 그린 그림도 있다.
- 풍속화: 사람들의 생활 모습과 풍습을 그린 그림이다. 김홍도는 씨름, 서당 등 일상의 장면을 해학적으로 그린 작품으로 잘 알려져 있다. 신윤복은 도시의 인물과 풍류, 생활 모습을 섬세하게 표현한 작품으로 잘 알려져 있다.
- 이 문화들은 당시 사람들의 생활, 생각, 소망, 사회 모습을 이해하는 데 도움을 준다.

답변 규칙:
1. 초등학교 5학년이 이해할 수 있도록 쉬운 낱말과 짧은 문단을 사용해.
2. 보통 2~5문장으로 답하고, 필요하면 마지막에 '보고서에 적을 점'을 한 가지 제안해.
3. 학생이 조사 보고서를 대신 써 달라고 하면 완성본을 통째로 주기보다 핵심 내용을 정리하고 학생 자신의 생각을 덧붙이게 도와줘.
4. 영상의 실제 장면이나 대사를 확인했다고 주장하지 마. 이 시스템은 영상 파일이나 전체 대본을 직접 읽지 않았어. 영상에서만 알 수 있는 구체적인 질문에는 학생에게 영상을 다시 확인해 보라고 안내해.
5. 확실하지 않은 역사적 사실은 지어내지 말고, 모른다고 솔직히 말해.
6. 학생에게 이름, 학교, 학급, 전화번호, 주소, 비밀번호 등 개인정보를 입력하지 말라고 알려줘. 학생이 개인정보를 쓰면 답변에서 되풀이하지 말고 지우고 다시 질문하라고 해.
7. 질문이 수업 주제와 무관하거나 위험한 내용이면 짧게 정중히 거절하고, 서민 문화 탐구로 돌아오도록 안내해.
8. AI 답변은 틀릴 수 있으므로 영상과 수업 자료로 사실을 확인하라고 알려줘.
`;

export async function onRequestPost(context) {
  const { request, env } = context;
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "질문 내용을 읽지 못했어. 다시 입력해 줘." }, { status: 400 });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const messages = incoming
    .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-8)
    .map(m => ({ role: m.role, content: m.content.slice(0, 1200) }));

  if (!messages.length || !messages.some(m => m.role === "user")) {
    return Response.json({ error: "먼저 질문을 입력해 줘." }, { status: 400 });
  }
  const latest = messages.filter(m => m.role === "user").at(-1).content;
  if (latest.length > 300) {
    return Response.json({ error: "질문은 300자 이내로 적어 줘." }, { status: 400 });
  }

  try {
    const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ],
      max_tokens: 450
    });
    const answer = result?.response || result?.result?.response;
    if (!answer) throw new Error("Empty AI response");
    return Response.json({ answer }, {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff"
      }
    });
  } catch (error) {
    return Response.json({
      error: "AI가 잠시 바쁘거나 연결 설정이 아직 끝나지 않았어. 선생님에게 알려 줘."
    }, { status: 502 });
  }
}
