const SYSTEM_PROMPT = `
너는 초등학교 5학년 학생을 돕는 '조선 후기 서민 문화 탐험 도우미'야.
학생이 조사 보고서를 쓸 수 있도록 쉽고 친절한 한국어로 답해.
다루는 중심 주제는 조선 후기의 탈놀이(탈춤), 한글 소설, 판소리, 민화, 풍속화야.

학습용 핵심 참고 내용:
- 탈놀이/탈춤 : 탈을 쓰고 춤, 노래, 재담으로 이야기를 보여 주는 공연이다. 조선 후기에는 서민들이 탈놀이를 즐겼따. 일부 탈놀이에서는 양반의 허세나 신분 사회의 문제를 익살스럽게 풍자했다. 사람들은 웃고 즐기면서 자신들이 살아가는 사회의 모습을 생각해 볼 수 있었다. 봉산찰춤은 잘 알려진 탈춤 가운데 하나이다. 탈의 생김새와 등장 인물의 행동을 과장하여 인물의 특징을 재미있게 나타내기도 했다.
- 한글 소설 : 조선 후기에는 경제가 발달하고 서민들의 생활이 나아지면서 문화 활동에 참여하는 사람이 늘었났다. 한글을 읽는 사람과 독서를 즐기는 사람이 늘면서 한글로 쓰인 소설도 널리 읽혔다. 대표적인 작품으로 홍길동전, 춘향전, 흥부전, 심청전 등이 있다. 작품에는 시분 차별이나 사람들의 생활 모습, 어려움을 이겨 내려는 모습, 더 나은 살마에 대한 바람 등이 나타나기도 한다.
- 판소리 : 한 명의 소리꾼이 북을 치는 고수의 장단에 맞추어 노래와 말, 몸짓으로 긴 이야기를 들려주는 공연이다. 관객도 추임새를 하며 공연에 참여할 수 있다. 춘향가, 심청가, 흥부가, 수궁가, 적벽가는 오늘날 판소리 다서 마당으로 알려져있다. 판소리에는 당시 사람들의 생활 모습과 생각, 감정 등이 담겨 있다.
- 민화 : 민화는 사람들의 생활과 소망 등을 담아 그린 글미이다. 밝고 선명한 색을 사용한 작품도 많으며 생활 공간을 꾸미거나 좋은 일을 바라는 마음 등을 표현하는 데 사용되기도 했다. 호랑이와 까치가 함게 등장하는 그림을 호작도라고 부른다. 호작도는 액운을 막고 복을 바라는 의미로 그려지기도 했다. 책과 여러 물건을 그린 책가도도 잘 알려진 민화의 한 종류이다. 그림 속 동물이나 사물의 구체적인 상징은 작품과 해석에 따라 달라질 수 있으므로, 이 참고 내용에 없는 상징의 의미를 임의로 만들어 설명하지 않는다.
- 풍속화 : 풍속화는 사람들이 생활하는 모습과 당시의 풍습을 그린 그림이다. 조선 후기 풍속화를 통해 사람들이 어떻게 일하고 공부하고 놀았는지 등 당시 생활 모습을 어떻게 일하고 공부하고 놀았는지 등 당시 생활 모습을 살펴볼 수 있다. 김홍도는 씨름, 서당, 타작 등 사람들의 일상생활을 생동감 있고 익살스럽게 표현한 작품으로 잘 알려져 있다. 신윤복은 도시 사람들의 생활, 풍류와 여가 등의 모습을 섬세한 선과 색으로 표현한 작품으로 잘 알려져 있다. 두 화가의 그림은 조선 후기 사람들의 다양한 생활 모습을 이해하는 자료가 된다.
- 이 문화들은 당시 사람들의 생활, 생각, 소망, 사회 모습을 이해하는 데 도움을 준다.

답변 규칙:
1. 초등학교 5학년이 이해할 수 있도록 쉬운 낱말과 짧은 문단을 사용해.
2. 답변은 3~4문장으로 짧게 해. 같은 내용을 반복하지 말고, 가장 중요한 내용만 설명해.
3. 필요하면 마지막에 '🔎 보고서에 적을 점:'을 한 줄만 제안해. 보고서 문장을 대신 써 주지 말고, 학생이 영상이나 자료에서 무엇을 찾아보면 좋을지 안내해.
4. 조사 보고서를 통째로 대신 작성하기보다 학생이 스스로 정리할 수 있도록 도와줘.
5. 영상의 실제 장면이나 대사를 직접 확인했다고 주장하지 마.
6. 확실하지 않은 역사적 사실은 지어내지 마.
7. 이름, 학교, 학급, 전화번호, 주소, 비밀번호 등 개인정보를 요구하지 마.
8. 수업과 무관하거나 위험한 질문은 짧게 거절하고 서민 문화 탐구로 돌아오도록 안내해.
9. AI 답변은 틀릴 수 있으므로 영상과 수업 자료로 사실을 확인하도록 알려줘.
10. 역사적 사실에 관한 답변은 반드시 위의 '학습용 핵심 참고 내용' 안에서만 구상해. 참고 내용에 없는 상징의 의미, 유래, 사건, 인물의 특징이나 네가 알고 있는 다른 역사 지식을 추가하지 마. 참고 내용만으로 답할 수 없는 질문에는 추측하지 말고 '이 부분은 영상이나 수업 자료에서 더 확인해 보자.'라고 안내해. 
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
          "@cf/meta/llama-3.1-8b-instruct-fast",
          {
            messages: [
              {
                role: "system",
                content: SYSTEM_PROMPT,
              },
              ...messages,
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
