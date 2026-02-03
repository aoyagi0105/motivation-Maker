# motivation-Maker
이 앱은 zenquotes.io API를 이용해 모티베이션 문구를 제공하고 즐겨찾기 기능을 지원하는 모바일 애플리케이션입니다.
백엔드 REST API와 통신하여 데이터를 조회하고, 즐겨찾기 기능을 제공합니다.

# Differentiation
다른 앱과 다르게 이 앱은 즐겨찾기 기능을 지원하여, 자신의 마음에 드는 문구를 저장하여 돌려볼수있습니다.
그리고 다른 앱은 무한히 새로운 문구를 보여주는데 반해, 이 앱은 한정된 문구를 돌려볼수있어 이전에 자신이 마음에 들었지만 
즐겨찾기 등록을하지못한 문구를 다시금 등록할수있게 됩니다.
문구는 기간마다 업데이트 되어 새로운 문구를 볼수있습니다.

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

## Screenshot
<img width="250" height="555" alt="Screenshot_1770083168" src="https://github.com/user-attachments/assets/3d21d57d-1af1-4976-b572-47488c15f8b3" />
<img width="250" height="555" alt="Screenshot_1770083178" src="https://github.com/user-attachments/assets/288de32f-6c4d-431e-a932-e15a32544e30" />

로그인 / 회원가입 화면. 회원가입 화면에서 언어를 설정할수있다. 

<img width="250" height="555" alt="Screenshot_1770082302" src="https://github.com/user-attachments/assets/7a0fb9f1-a6e4-4605-b1bb-7746dccc71c7" />

동기부여 문구 화면.

<img width="250" height="555" alt="Screenshot_1770082487" src="https://github.com/user-attachments/assets/2a1a95c8-f64c-4cd0-a8c6-f1e34cf7eddd" />

언어 선택시 곧바로 다른 언어로 변경된다

<img width="250" height="555" alt="Screenshot_1770082581" src="https://github.com/user-attachments/assets/080b16c6-700a-422d-ab61-c3bed43cb0c1" />

즐겨찾기 화면에서 즐겨찾기 등록된 문구를 볼수있다

## Related Repositories
- Backend API: https://github.com/aoyagi0105/motivation-Maker-backend.git

## Installation
```bash
yarn install

