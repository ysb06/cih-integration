import React from 'react';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-title">
        <h1>챗봇 테스트 페이지</h1>
      </div>
      <div className="app-content">
        <div className="site-introduction">
          <h2>요약</h2>
          <p>본 챗 봇은 Dialogflow 기반의 간단한 챗봇 입니다.</p>
          <p>현재는 간단한 잡담과 날씨 정도 묻는 것이 가능합니다. 추후에 좀 더 실용적이고 유용한 기능들을 추가할 예정입니다.</p>
          <p>혹시 제안이 있을 경우 <span style={{ fontWeight: "bold" }}>"기능 제안을 하고 싶어"</span>라고 챗봇에 문의해 주세요.</p>
        </div>
        <div className="main-content">
          <div className="chatbot-container">
            <Chatbot name="Test" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
