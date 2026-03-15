[한국어](./README.kr.md) | [日本語](./README.jp.md)

# motivation-Maker
motivation-Maker is a mobile application designed to help users revisit and internalize motivational quotes that truly resonate with them.

Rather than constantly consuming new content, the app focuses on a personalized experience where users can save and repeatedly encounter meaningful messages to create a lasting impact.

# Differentiation
Most motivational apps provide an infinite stream of new quotes, making it difficult for users to find and reflect on the ones that actually moved them.

To solve this, motivation-Maker intentionally limits the number of quotes and uses a structure that allows users to encounter previous quotes again. This encourages a more mindful experience of selecting and saving meaningful content.

Quote data is updated periodically to maintain a perfect balance between familiarity (repetition) and freshness.

## Features
- Login & Sign-up UI
- Browse and discover high-quality motivational content
- Add or remove quotes from your personal collection
- Robust data handling and real-time UI synchronization
- Seamlessly switch between languages (English, Korean, Japanese)

## Tech Stack
- Frontend: React Native(Expo), React Navigation
- State Management: Redux Toolkit
- Network: Axios
- Language: TypeScript, JavaScript

## Troubleshooting
Problem : When an Access Token expires, the Axios interceptor catches the 401 Unauthorized error and sends a request to reissue the token. However, if the Refresh Token was also expired, it returned another 401 error, causing an infinite loop of reissue requests.

Solution: Added a _retry flag to the Axios interceptor logic. If a token reissue has already been attempted once, the interceptor prevents further attempts and handles the session expiration (e.g., redirecting to login), effectively breaking the loop.

## Screenshot
**Login & Sign-up**

<img width="250" height="555" alt="Screenshot_1770083168" src="https://github.com/user-attachments/assets/3d21d57d-1af1-4976-b572-47488c15f8b3" />
<img width="250" height="555" alt="Screenshot_1770083178" src="https://github.com/user-attachments/assets/288de32f-6c4d-431e-a932-e15a32544e30" />

You can set the language on the membership screen.


**Motivation Screen**

<img width="250" height="555" alt="Screenshot_1770082302" src="https://github.com/user-attachments/assets/7a0fb9f1-a6e4-4605-b1bb-7746dccc71c7" />

**Language Change**

<img width="250" height="555" alt="Screenshot_1770082487" src="https://github.com/user-attachments/assets/2a1a95c8-f64c-4cd0-a8c6-f1e34cf7eddd" />

When selecting a language, it is immediately changed to another language.

**Favorite Screen**

<img width="250" height="555" alt="Screenshot_1770082581" src="https://github.com/user-attachments/assets/080b16c6-700a-422d-ab61-c3bed43cb0c1" />

You can see the phrase registered as a favorite on the favorite screen

## Related Repositories
- Backend API: https://github.com/aoyagi0105/motivation-Maker-backend.git

## Installation
```bash
yarn install

