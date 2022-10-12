# Let's Chat!
### Firebase Auth, Storage, Firestore를 활용한 리얼타임 채팅 웹앱

## [**Let's Chat 구경하기!**](https://letschat-f85f0.web.app/)

```
git clone https://github.com/letminjae/Chat_App.git
npm install
npm start
```

## 프로젝트 기간
2022/09/22 ~ 2022/10/04 (13일, 개인 프로젝트)

## 핵심기능 및 시연 영상

- 회원가입
<br />
<img src="https://user-images.githubusercontent.com/96935557/195411063-382efc20-cab0-43dd-afc4-ba7c3278d802.gif" width="80%">

- 로그인
<br />
<img src="https://user-images.githubusercontent.com/96935557/195411132-91752f9d-37b7-4d51-b071-ce43b573c984.gif" width="80%">


- 유저 검색
<br />
<img src="https://user-images.githubusercontent.com/96935557/195410972-dc3208f7-a5fe-48de-a4a8-bcf1e88ecaa6.gif" width="80%">

- 리얼타임 채팅
<br />
<img src="https://user-images.githubusercontent.com/96935557/195411108-24b56bd7-4d9e-4774-a87e-6fdfe23e1f8e.gif" width="80%">

- 채팅 중 이미지 업로드
<br />
<img src="https://user-images.githubusercontent.com/96935557/195410991-dd84789a-76f9-4612-8c10-a66ba171f3a1.gif" width="80%">

## 기술스택
- FrontEnd Stack : `Typescript`, `React(+context API)`, `Styled-components`
- Auth : `Firebase Auth`
- Storage : `Firebase Storage`
- Database : `Firestore`
- deploy : `Firebase CLI Hosting Service`
- CI/CD : `Github Action`

## 트러블 슈팅
> Firebase Storage 이미지 업로드 시 유저 접근 권한 에러
```
FirebaseError: Firebase Storage: User does not have permission to access
```
- 해결법 : Storage의 Rules에서 read/write 모두 auth가 있는 경우에만 storage를 허용. read를 분리하여 허용하고, write는 기존 권한을 유지시켜 해결하였다.
```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
     allow read;
     allow write: if request.auth != null;
    }
  }
}
```
