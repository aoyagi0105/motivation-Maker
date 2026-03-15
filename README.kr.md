# motivation-Maker
motivation-Maker는 사용자가 의미있다고 생각한 동기부여 문구를 다시 볼 수 있도록 설계한
모바일 애플리케이션입니다.
단순히 새로운 문구를 계속 소비하는 것이 아니라,
사용자별로 문구를 저장하고 재확인하는 경험에 초점을 두었습니다.

# Differentiation
대부분의 동기부여 앱은 무한히 새로운 문구를 제공하지만,
그로 인해 사용자가 인상 깊었던 문구를 다시 찾기 어려운 문제가 있다고 생각했습니다.

motivation-Maker는 이 문제를 해결하기 위해
문구의 수를 의도적으로 제한하고, 사용자가 이전에 보았던 문구를 다시 마주할 수 있는 구조로 설계했습니다.
이를 통해 사용자는 의미 있었던 문구를 다시 선택하고 저장하는 경험을 할 수 있습니다.

문구 데이터는 일정 기간마다 업데이트되어, 반복성과 신선함을 동시에 유지하도록 구성했습니다.

## Features
- 로그인 / 회원가입 UI
- 모티베이션 문구 조회
- 즐겨찾기 추가/ 제거
- API 통신 및 상태 관리
- 사용자별 즐겨찾기 관리
- 다국어 지원 (번역 기능)

## Tech Stack
- Frontend: React Native(Expo), React Navigation
- State Management: Redux Toolkit
- Network: Axios
- Language: TypeScript, JavaScript

## Troubleshooting
문제 : acceess token 만료시 axios interceptor에서 401 Unauthorized 에러를 확인하고 access token 재발급 요청을 보내는데,
refresh token 도 만료되어 있을 경우 똑같이 401 Unauthorized 에러가 나기때문에 refresh token을 무한히 재발급 요청하게되는 에러가 있었습니다.

해결 : axios interceptor에 retry flag를 추가하여 한 번 access token 재발급 요청을 보낸 경우에는 재발급 요청을 보내지 않도록 수정하였습니다.

## Screenshot
**로그인 / 회원가입**

<img width="250" height="555" alt="Screenshot_1770083168" src="https://github.com/user-attachments/assets/3d21d57d-1af1-4976-b572-47488c15f8b3" />
<img width="250" height="555" alt="Screenshot_1770083178" src="https://github.com/user-attachments/assets/288de32f-6c4d-431e-a932-e15a32544e30" />

회원가입 화면에서 언어를 설정할수있다. 


**모티베이션 문구 화면**

<img width="250" height="555" alt="Screenshot_1770082302" src="https://github.com/user-attachments/assets/7a0fb9f1-a6e4-4605-b1bb-7746dccc71c7" />

**언어 변경**

<img width="250" height="555" alt="Screenshot_1770082487" src="https://github.com/user-attachments/assets/2a1a95c8-f64c-4cd0-a8c6-f1e34cf7eddd" />

언어 선택시 곧바로 다른 언어로 변경된다

**즐겨찾기 화면**

<img width="250" height="555" alt="Screenshot_1770082581" src="https://github.com/user-attachments/assets/080b16c6-700a-422d-ab61-c3bed43cb0c1" />

즐겨찾기 화면에서 즐겨찾기 등록된 문구를 볼수있다

## Related Repositories
- Backend API: https://github.com/aoyagi0105/motivation-Maker-backend.git

## Installation
```bash
yarn install

