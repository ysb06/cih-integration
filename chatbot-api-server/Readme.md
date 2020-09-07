# Chatbot Express API Server

Chatbot Express Server는 Dialogflow 서버와 클라이언트 간 연결을 위한 서버입니다.

## 서버 실행 전 준비

기본적으로 서버 구동을 위해서는 다음 문서를 참조하세요.

https://cloud.google.com/dialogflow/docs/quick/api

요약하자면 서버 구동에 반드시 필요한 사항은 다음과 같습니다.
1. Dialogflow 에이전트 생성
    - 참조: https://cloud.google.com/dialogflow/docs/agents-overview
    - 에이전트 생성 시 프로젝트가 자동으로 생성됨
2. GCP(Google Cloud Platform)에서 생성된 프로젝트 설정
    1. 결제 사용 설정
        - 참조: https://cloud.google.com/billing/docs/how-to/modify-project
    2. Dialogflow API 사용 설정
        - 참조:  https://cloud.google.com/service-usage/docs/enable-disable
        - Dialogflow API를 선택하고 사용 설정
    3. 인증 설정
        - Dialogflow API 서비스 계정의 JSON으로 된 계정 키를 다운로드 (보통 Dialogflow Integration이라는 이름으로 되어 있음)
        - 서버 내 키를 저장하고 GOOGLE_APPLICATION_CREDENTIALS 환경 변수를 해당 키 경로로 설정
            * Linux: export GOOGLE_APPLICATION_CREDENTIALS="[PATH]"
            * Windows(PowerShell): $env:GOOGLE_APPLICATION_CREDENTIALS="[PATH]"
                + 주의: 환경변수가 세팅이 안 되는 경우 고급 시스템 설정-환경변수에서 시도해 볼 것
    4. npm install로 패키지 설치
