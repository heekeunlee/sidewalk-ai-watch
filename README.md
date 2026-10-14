# sidewalk-ai-watch

보도블럭 비평탄화(들뜸·침하·파손·물고임)를 AI로 자동 감지하고 보수 우선순위를 제안하는 사회문제 해결 챌린지 기획안입니다.

- 배포 사이트: https://heekeunlee.github.io/sidewalk-ai-watch/ (비밀번호 필요)
- 본문은 비밀번호로 AES-GCM 암호화되어 `docs/index.html`에 포함됩니다. 원문(`content/`)은 저장소에 올리지 않습니다.

## 다시 빌드

```bash
SITE_PASSWORD=비밀번호 node build.mjs
```

`content/plan.html`(원문)과 `template.html`(페이지 틀)을 읽어 `docs/index.html`을 만듭니다.
