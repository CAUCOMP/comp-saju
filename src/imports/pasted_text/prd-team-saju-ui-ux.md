다음 PRD를 기반으로 대학교 동아리 박람회용 웹서비스의 UI/UX 화면을 설계해주세요.

# 프로젝트명

팀플 사주 (TEAM SAJU)

# 서비스 개요

사용자가 이름, 생년월일, 태어난 시간을 입력하면 만세력 데이터를 기반으로 OpenAI API를 통해 오늘의 팀플 운세를 생성하고, 포춘쿠키 형식의 인터랙션을 거쳐 결과를 보여주는 간단한 웹서비스입니다.

대학교 웹개발 동아리 박람회 부스에서 사용할 예정이며, 한 사용자의 전체 체험 시간은 약 1~2분을 목표로 합니다.

로그인, 회원가입, 마이페이지, 데이터 저장 기능은 없습니다.

---

# 기술 스택

실제 구현 가능한 화면을 전제로 디자인해주세요.

Frontend
- React
- Vite
- TypeScript

Styling
- Tailwind CSS

Animation
- Framer Motion 사용 가능

Deploy
- Vercel

API
- OpenAI API
- 만세력 API 또는 만세력 계산 로직
- Vercel Serverless Function을 API Proxy 용도로 사용

DB
- 사용하지 않음

Authentication
- 사용하지 않음

React 컴포넌트 단위로 구현하기 쉬운 구조를 고려하여 디자인해주세요.

---

# 핵심 사용자 Flow

Landing / Input
↓
사용자 정보 입력
↓
운세 생성
↓
포춘쿠키 화면
↓
포춘쿠키 클릭
↓
결과 공개
↓
다른 사람 운세 보기

전체 플로우가 매우 짧고 직관적이어야 합니다.

사용자가 별도의 설명을 읽지 않아도 바로 사용할 수 있도록 설계해주세요.

---

# 주요 타겟

대학교 동아리 박람회를 방문한 대학생

개발에 관심 없는 사람도 쉽게 사용할 수 있어야 합니다.

친구와 함께 부스를 방문한 사람이 결과를 보고 웃거나 서로 보여주고 싶어지는 분위기를 목표로 합니다.

---

# 디자인 컨셉

전체적으로

- 재미있는
- 가벼운
- 대학생 대상
- 포춘쿠키
- 오늘의 운세
- 팀플 밈

이라는 느낌이 살아야 합니다.

전통적인 사주 사이트처럼 무겁거나 고전적인 디자인은 피해주세요.

지나치게 신비주의적인 검정색/금색 중심 디자인도 피해주세요.

현대적인 웹서비스 느낌과 포춘쿠키의 재미를 결합해주세요.

예를 들어

- 따뜻한 아이보리 / 크림 계열 배경
- 오렌지 또는 브라운 계열 포춘쿠키 포인트
- 카드 기반 UI
- 부드러운 그림자
- 둥근 Radius
- 귀여운 아이콘
- 적절한 이모지

등을 활용할 수 있습니다.

단, 너무 유아틱하지 않고 대학생이 사용해도 자연스러운 스타일로 만들어주세요.

---

# 중요한 UX 원칙

대학교 박람회 현장에서 사용하는 서비스이므로

1. 화면을 보자마자 무엇을 해야 하는지 알아야 합니다.
2. 입력 항목이 많아 보이면 안 됩니다.
3. 버튼은 크고 명확해야 합니다.
4. 결과 화면은 한눈에 읽혀야 합니다.
5. 긴 텍스트는 사용하지 않습니다.
6. 중요한 내용은 카드 단위로 구분합니다.
7. 한 손으로 스마트폰을 사용하기 쉬워야 합니다.
8. 태블릿으로도 사용할 수 있어야 합니다.
9. 전체 이용 시간이 1~2분을 넘지 않도록 설계합니다.

---

# Responsive

Mobile First로 설계해주세요.

Primary

- iPhone / Android 스마트폰
- 약 375px ~ 430px Width

Secondary

- 동아리 부스용 Tablet
- 약 768px Width

Desktop에서도 깨지지 않아야 하지만 모바일 경험을 가장 중요하게 생각해주세요.

---

# 필요한 화면

총 4개의 주요 상태/화면을 디자인해주세요.

## Screen 1. Landing + User Input

서비스 첫 화면입니다.

상단에 서비스 Branding을 배치합니다.

예시

TEAM SAJU

또는

🥠 팀플 사주

메인 카피

"오늘 나는 팀플에서
어떤 사람이 될까?"

서브 카피

"생년월일을 입력하고
오늘의 팀플 운세를 확인해보세요."

입력 항목

1. 이름
2. 생년월일
3. 태어난 시간

예시

이름
[ 임도현 ]

생년월일
[ 2002. 03. 14 ]

태어난 시간
[ 15 : 30 ]

태어난 시간을 모르는 사용자를 위해

[ 태어난 시간을 몰라요 ]

옵션도 고려해주세요.

CTA 버튼

[ 🥠 오늘의 팀플 운세 보기 ]

CTA 버튼은 화면에서 가장 눈에 띄어야 합니다.

페이지 하단에는 아주 작게

"본 서비스는 재미를 위한 콘텐츠입니다."

문구를 배치해주세요.

---

# Screen 2. Loading / Fortune Ready

OpenAI와 만세력 데이터를 처리하는 동안 보여주는 화면입니다.

단순 Spinner보다는 서비스 컨셉을 살려주세요.

중앙에 큰 포춘쿠키 그래픽을 배치합니다.

예시 문구

"오늘의 팀플 운명을
불러오는 중..."

또는

"당신의 팀플 기운을
분석하고 있어요."

작은 로딩 애니메이션을 추가해주세요.

예

🥠
...
✨

이 화면은 약 1~3초 정도 노출되는 것을 전제로 합니다.

---

# Screen 3. Fortune Cookie Interaction

결과가 준비되었지만 바로 보여주지 않고 사용자가 포춘쿠키를 직접 눌러야 합니다.

화면 중앙에 큰 포춘쿠키를 배치해주세요.

문구

"오늘의 팀플 운명이 도착했습니다."

"쿠키를 눌러 확인하세요."

포춘쿠키는 클릭 가능한 Interactive Object처럼 보여야 합니다.

CTA를 별도로 만들기보다는 포춘쿠키 자체를 클릭하게 만들어도 좋습니다.

클릭하면 Framer Motion을 이용하여 구현할 수 있는

- 쿠키 흔들림
- Scale 변화
- 쿠키 깨짐
- 종이가 펼쳐지는 느낌

의 애니메이션을 고려해주세요.

Figma Prototype에서도 해당 인터랙션의 흐름을 표현해주세요.

---

# Screen 4. Result

가장 중요한 화면입니다.

사용자가 한눈에 결과를 확인할 수 있도록 Card UI로 구성해주세요.

상단

👥 오늘의 팀플 운세

"임도현님의 오늘은?"

팀플운

★★☆☆☆

별점이 시각적으로 가장 먼저 보이도록 디자인합니다.

그 아래에 총 4개의 결과 영역을 보여줍니다.

---

## Result Card 1

🙋 오늘 당신의 역할

"결국 내가 다 하는 사람"

해당 문장이 결과 화면에서 가장 재미있는 요소 중 하나이므로 강조해주세요.

---

## Result Card 2

⚠️ 주의해야 할 유형

"자료조사 맡고 잠수타는 사람"

경고 카드 느낌은 주되 너무 공격적이거나 심각한 디자인은 피해주세요.

---

## Result Card 3

💡 오늘의 팀플 조언

"회의할 때 반드시 역할을 문서화하세요."

실제로 도움이 되는 Tip처럼 보여주세요.

---

## Result Card 4

🍀 행운의 한마디

"그러면 일정부터 정할까요?"

포춘쿠키에서 나온 문구처럼 강조해주세요.

Quotation 스타일을 활용해도 좋습니다.

---

# Result 화면 하단

짧은 마무리 문구

"오늘도 무사히 제출하시길."

또는

"오늘의 팀플도 살아남으세요."

CTA

[ 🔮 다른 사람 운세 보기 ]

버튼을 클릭하면 처음 입력 화면으로 이동합니다.

Optional CTA

[ 결과 공유하기 ]

공유 기능은 MVP 이후 기능이므로 Primary CTA보다 약하게 표현해주세요.

---

# 동아리 Branding

이 서비스는 동아리 박람회에서 동아리 홍보 목적으로 사용합니다.

따라서 결과 페이지 하단에 자연스럽게

Made by OOO 웹개발 동아리

를 표시해주세요.

단, 광고 배너처럼 과도하게 강조하지 말고 서비스 제작자를 보여주는 Footer 형태로 표현해주세요.

가능하다면

"이런 서비스를 직접 만들어보고 싶다면?"

OOO 웹개발 동아리

형태의 작은 CTA 영역도 결과 하단에 추가해주세요.

---

# Component 기반으로 설계

React 구현을 고려하여 다음 요소는 재사용 가능한 Component로 분리할 수 있도록 디자인해주세요.

예상 Components

- Logo
- InputField
- DatePicker
- TimePicker
- PrimaryButton
- FortuneCookie
- LoadingIndicator
- FortuneScore
- FortuneResultCard
- ResultHeader
- Footer
- ClubPromotionCard

특히 Result Card는 동일한 Component에서

icon
title
content

값만 변경하여 재사용할 수 있게 통일된 디자인을 사용해주세요.

---

# 상태 디자인

다음 상태도 함께 고려해주세요.

Input Field

- Default
- Focus
- Filled
- Error
- Disabled

Button

- Default
- Hover
- Pressed
- Disabled
- Loading

Fortune Cookie

- Default
- Hover
- Clicked
- Broken

---

# 입력 Validation

다음 Error State도 디자인해주세요.

이름 미입력

"이름을 입력해주세요."

생년월일 미입력

"생년월일을 선택해주세요."

태어난 시간 미입력

"태어난 시간을 선택하거나 '시간을 몰라요'를 선택해주세요."

---

# API Error 화면

OpenAI API 또는 만세력 API 호출에 실패할 경우를 위한 간단한 Error State도 필요합니다.

예시

🥠💦

"운세 쿠키가 잠시 깨졌어요."

"다시 한 번 시도해주세요."

[ 다시 시도하기 ]

박람회 서비스이므로 기술적인 Error Message는 노출하지 않습니다.

---

# 디자인 결과물 요구사항

다음 화면을 하나의 Figma Page 안에 순서대로 구성해주세요.

1. Landing / Input
2. Input Error State
3. Loading
4. Fortune Cookie Ready
5. Fortune Cookie Clicked
6. Result
7. API Error
8. Tablet Result Layout

각 화면 사이의 사용자 Flow도 Prototype Connection으로 연결해주세요.

---

# Prototype Flow

Input

"오늘의 팀플 운세 보기"

↓

Loading

↓

Fortune Cookie Ready

↓

포춘쿠키 클릭

↓

Fortune Cookie Breaking Animation

↓

Result

↓

"다른 사람 운세 보기"

↓

Input

이 흐름을 Figma Prototype으로 확인할 수 있도록 구성해주세요.

---

# 구현 현실성

중요합니다.

단순 Concept UI가 아니라 실제 React + Tailwind CSS로 구현할 예정입니다.

따라서

- 지나치게 복잡한 SVG
- 구현하기 어려운 3D Graphic
- 복잡한 Particle Effect
- 과도한 Blur
- 무거운 Animation

은 피해주세요.

CSS와 Framer Motion 정도로 구현 가능한 UI를 우선해주세요.

포춘쿠키 Graphic 또한 가능하면

- SVG
- PNG
- 간단한 Illustration

형태로 사용할 수 있도록 설계해주세요.

---

# 최종적으로 원하는 사용자 경험

사용자가 부스를 지나가다가 QR을 찍는다.

↓

"팀플 사주?"

라는 호기심으로 정보를 입력한다.

↓

포춘쿠키가 나오고 직접 눌러본다.

↓

재미있는 팀플 운세를 확인한다.

↓

친구에게

"야 나 오늘 결국 내가 다 하는 사람이래 ㅋㅋ"

라고 보여준다.

↓

페이지 하단에서 이 서비스를 웹개발 동아리에서 직접 만들었다는 사실을 자연스럽게 인지한다.

이 전체 경험을 중심으로 디자인해주세요.