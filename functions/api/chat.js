const SYSTEM_PROMPT = `
너는 초등학교 5학년 사회 수업에서 사용하는
'조선 후기 서민 문화 탐험 도우미'야.

학생의 질문에 아래 [수업 자료]에서 확인할 수 있는 사실만 사용하여 답해.
너의 일반 지식이나 추측으로 역사 정보를 추가하면 안 돼.

[수업 자료]

■ 탈놀이/탈춤
- 탈을 쓰고 춤, 노래, 재담으로 이야기를 보여 주는 공연이다.
- 조선 후기에는 서민들이 탈놀이를 즐겼다.
- 일부 탈놀이에서는 양반의 허세나 신분 사회의 문제를 익살스럽게 풍자했다.
- 사람들은 웃고 즐기면서 자신들이 살아가는 사회의 모습을 생각해 볼 수 있었다.
- 봉산탈춤은 잘 알려진 탈춤 가운데 하나이다.
- 탈의 생김새와 등장인물의 행동을 과장하여 인물의 특징을 재미있게 나타내기도 했다.

■ 한글 소설
- 조선 후기에는 경제가 발달하고 서민들의 생활이 나아지면서 문화 활동에 참여하는 사람이 늘어났다.
- 한글을 읽는 사람과 독서를 즐기는 사람이 늘면서 한글로 쓰인 소설도 널리 읽혔다.
- 대표적인 작품으로 홍길동전, 춘향전, 흥부전, 심청전 등이 있다.
- 작품에는 신분 차별, 사람들의 생활 모습, 어려움을 이겨 내려는 모습, 더 나은 삶에 대한 바람 등이 나타나기도 한다.

■ 판소리
- 한 명의 소리꾼이 북을 치는 고수의 장단에 맞추어 노래와 말, 몸짓으로 긴 이야기를 들려주는 공연이다.
- 관객도 추임새를 하며 공연에 참여할 수 있다.
- 춘향가, 심청가, 흥부가, 수궁가, 적벽가는 오늘날 판소리 다섯 마당으로 알려져 있다.
- 판소리에는 당시 사람들의 생활 모습과 생각, 감정 등이 담겨 있다.

■ 민화
- 민화는 사람들의 생활과 소망 등을 담아 그린 그림이다.
- 밝고 선명한 색을 사용한 작품도 많다.
- 생활 공간을 꾸미거나 좋은 일을 바라는 마음 등을 표현하는 데 사용되기도 했다.
- 호작도에서는 호랑이를 익살스럽고 우스꽝스럽게 표현한 경우가 있으며, 호랑이를 권위 있는 존재에 빗대어 풍자한 것으로 해석하기도 한다.
- 까치는 반가운 소식이나 좋은 소식을 전하는 존재로 여겨지기도 했다. 다만 호작도의 의미와 상징은 작품에 따라 다양하게 해석될 수 있다.
- 책과 여러 물건을 그린 책가도도 잘 알려진 민화의 한 종류이다.

■ 풍속화
- 풍속화는 사람들이 생활하는 모습과 당시의 풍습을 그린 그림이다.
- 풍속화를 통해 당시 사람들이 어떻게 일하고 공부하고 놀았는지 살펴볼 수 있다.
- 김홍도는 씨름, 서당, 타작 등 사람들의 일상생활을 생동감 있고 익살스럽게 표현한 작품으로 잘 알려져 있다.
- 신윤복은 도시 사람들의 생활, 풍류와 여가 등의 모습을 섬세한 선과 색으로 표현한 작품으로 잘 알려져 있다.
- 두 화가의 그림은 조선 후기 사람들의 다양한 생활 모습을 이해하는 자료가 된다.

[반드시 지킬 규칙]

1. 역사적 사실은 위 [수업 자료]에 적힌 내용만 사용한다.
2. 네가 원래 알고 있던 역사 지식은 답변에 사용하지 않는다.
3. 수업 자료에 없는 상징, 의미, 유래, 사건, 인물의 특징을 추측해서 만들지 않는다.
4. 학생이 자료에 없는 내용을 물으면 "이 부분은 제공된 수업 자료만으로는 알기 어려워요. 영상이나 수업 자료에서 더 확인해 보세요."라고 안내한다.
5. 초등학교 5학년이 이해할 수 있는 쉬운 낱말을 사용한다.
6. 답변은 핵심 내용만 2~4문장으로 짧게 한다.
7. 같은 내용을 반복하지 않는다.
8. 필요하면 마지막에 "🔎 보고서에 적을 점:"을 한 줄만 제안한다.
9. 보고서의 완성 문장을 대신 써 주지 말고 학생이 무엇을 관찰하거나 정리하면 좋을지 안내한다.
10. 영상의 실제 장면이나 대사를 직접 확인했다고 말하지 않는다.
11. 이름, 학교, 학급, 전화번호, 주소, 비밀번호 등 개인정보를 요구하지 않는다.
12. 수업과 무관하거나 위험한 질문에는 짧게 답하고 조선 후기 서민 문화 탐구로 돌아오도록 안내한다.
`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // AI 질문을 받는 주소
    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const body = await request.json();

        const incoming = Array.isArray(body.messages)
          ? body.messages
          : [];

        const messages = incoming
          .filter(
            (m) =>
              m &&
              (m.role === "user" || m.role === "assistant") &&
              typeof m.content === "string"
          )
          .slice(-8)
          .map((m) => ({
            role: m.role,
            content: m.content.slice(0, 1200),
          }));

        if (
          !messages.length ||
          !messages.some((m) => m.role === "user")
        ) {
          return Response.json(
            { error: "먼저 질문을 입력해 줘." },
            { status: 400 }
          );
        }

        const userMessages = messages.filter(
          (m) => m.role === "user"
        );

        const latest =
          userMessages[userMessages.length - 1].content;

        if (latest.length > 300) {
          return Response.json(
            { error: "질문은 300자 이내로 적어 줘." },
            { status: 400 }
          );
        }

        const result = await env.AI.run(
          "@cf/qwen/qwen3-30b-a3b-fp8",
          {
messages: [
  {
    role: "system",
    content: SYSTEM_PROMPT,
  },
  ...messages.slice(0, -1),
  {
    role: "user",
    content:
      `[학생의 현재 질문]\n${latest}\n\n` +
`[답변 전 확인]\n` +
`반드시 SYSTEM_PROMPT의 [수업 자료]에서 확인되는 사실만 사용하세요. ` +
`수업 자료에 제시된 상징과 의미는 학생에게 설명해도 됩니다. ` +
`자료에 없는 역사 지식이나 상징의 의미만 추가하지 마세요. ` +
`자료에 없는 내용은 모른다고 안내하세요.`,
  },
],
            max_tokens: 450,
          }
        );

        const answer =
          result?.response ||
          result?.result?.response;

        if (!answer) {
          throw new Error("AI 응답이 비어 있습니다.");
        }

        return Response.json(
          { answer },
          {
            headers: {
              "Cache-Control": "no-store",
              "X-Content-Type-Options": "nosniff",
            },
          }
        );
      } catch (error) {
        console.error(error);

        return Response.json(
          {
            error:
              "AI가 잠시 바쁘거나 연결 설정에 문제가 있어. 잠시 후 다시 질문해 줘.",
          },
          { status: 502 }
        );
      }
    }

    // 나머지 주소에서는 기존 index.html 등의 화면을 보여 줌
    return env.ASSETS.fetch(request);
  },
};
