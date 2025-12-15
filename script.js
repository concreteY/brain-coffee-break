// 1. 데이터: 회사 솔루션 기반 (30개)
// 전략: Hint에 제품명을 노출하고, Word에 핵심 가치를 담아 학습 효과 증대
const wordData = [
    // 1. BIX (Business Intelligence eXperience)
    { word: "의사결정", hint: "[BIX] 경영진이 올바른 판단을 내리도록 지원합니다" },
    { word: "통합관리", hint: "[BIX] 흩어진 데이터를 한곳에 모아 관리합니다" },
    { word: "자연어질의", hint: "[BIX] 복잡한 SQL 없이 말하듯 질문하여 분석합니다" },
    { word: "자동생성", hint: "[BIX] AI Agent가 분석 리포트를 스스로 만듭니다" },
    { word: "경영정보", hint: "[BIX] 살아있는 기업의 데이터를 다룹니다" },

    // 2. A.Biz (AI Business Assistant)
    { word: "업무비서", hint: "[A.Biz] 전사 구성원을 위한 1인 1 AI입니다" },
    { word: "회의록", hint: "[A.Biz] 음성을 텍스트로 변환하고 요약합니다" },
    { word: "보안유지", hint: "[A.Biz] 기업 내부 데이터 유출 걱정 없이 사용합니다" },
    { word: "생산성", hint: "[A.Biz] 반복 업무를 줄여 업무 효율을 높입니다" },
    { word: "소버린", hint: "[A.Biz] 데이터 주권을 지키는 AI 전략입니다" },

    // 3. Talent AX
    { word: "채용혁신", hint: "[Talent AX] AI 면접으로 우수 인재를 선별합니다" },
    { word: "성장경로", hint: "[Talent AX] 구성원의 커리어 로드맵을 제안합니다" },
    { word: "인재양성", hint: "[Talent AX] 데이터 기반으로 직원 역량을 키웁니다" },
    { word: "성과관리", hint: "[Talent AX] 객관적인 데이터로 성과를 피드백합니다" },
    { word: "자동처리", hint: "[Talent AX] 휴가, 복리후생 등 행정 업무를 돕습니다" },

    // 4. 명장AI (Myungjang AI)
    { word: "지식자산", hint: "[명장AI] 전문가의 암묵지를 디지털화합니다" },
    { word: "기술전수", hint: "[명장AI] 은퇴자의 노하우가 끊기지 않게 합니다" },
    { word: "현장해결", hint: "[명장AI] 설비 고장 시 조치 방법을 알려줍니다" },
    { word: "정확한답변", hint: "[명장AI] 사내 문서를 기반으로 팩트만 말합니다" },
    { word: "환각최소화", hint: "[명장AI] RAG 기술로 거짓 정보를 줄였습니다" },

    // 5. MI (Market Intelligence)
    { word: "시장예측", hint: "[MI] 글로벌 시장 변동성을 미리 내다봅니다" },
    { word: "원가절감", hint: "[MI] 원자재 구매 최적 시기를 알려줍니다" },
    { word: "리스크대응", hint: "[MI] 전쟁, 환율 등 외부 요인을 분석합니다" },
    { word: "통합분석", hint: "[MI] 내부 데이터와 외부 뉴스 정보를 합칩니다" },
    { word: "파급효과", hint: "[MI] 특정 사건이 우리에게 미칠 영향을 봅니다" },

    // 6. 물성예측 AI (Property Prediction AI)
    { word: "가상실험", hint: "[물성예측] 실제 실험 없이 결과를 미리 봅니다" },
    { word: "시행착오", hint: "[물성예측] 반복적인 실패 비용을 줄여줍니다" },
    { word: "신소재", hint: "[물성예측] 반도체, 배터리 등 첨단 소재를 개발합니다" },
    { word: "구독형", hint: "[물성예측] 설치 없이 웹에서 바로 씁니다 (SaaS)" },
    { word: "연구개발", hint: "[물성예측] R&D 속도를 획기적으로 높입니다" }
];

// 2. 훼방꾼 글자 모음 (오답 유도용)
// 비즈니스/IT 용어와 유사하거나 시각적으로 헷갈리는 글자들 배치
const dummyChars = "가각간개객거건게격견경계고공과관광교구국권규근급기기술기김나낙난내노논뇌누다단담답당대도독동두라락란람량력련렬로록론루류리린림마막만망매맥면명모목무문물미민바박반발방배백법변별보복본부분불비사산살상서석선설성세소속수순시신실심아안압앙애야약양어억언업에여역연영예오온와완외요용우운원유육윤율은의이익인일임입자작장재저적전점정제조종주준지직진차착창채책처천철청체초총최추출충측치타탁태토통투파판패편평포표품하학한함합항해핵행향현형혜호화확환황회효휴";

// 3. 상태 변수
let currentScore = 0;
let currentQuestionIndex = 0;
let currentQuestion = null;
let userInputs = [];
let timeLeft = 60; 
let timerInterval = null;

// 4. DOM 요소 가져오기
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const hintText = document.getElementById("hint-text");
const answerZone = document.getElementById("answer-zone");
const scrambleZone = document.getElementById("scramble-zone");
const messageArea = document.getElementById("message-area");
const resultModal = document.getElementById("result-modal");
const finalScoreEl = document.getElementById("final-score");
const rankCommentEl = document.getElementById("rank-comment");

// 5. 게임 초기화
function initGame() {
    // 문제를 무작위로 섞음
    wordData.sort(() => Math.random() - 0.5); 
    currentQuestionIndex = 0;
    currentScore = 0;
    timeLeft = 60; // 60초 타임어택
    
    updateStatus();
    startTimer();
    loadQuestion();
}

// 6. 타이머 로직
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        
        // 10초 이하일 때 빨간색으로 경고
        if (timeLeft <= 10) {
            timerEl.style.color = "#dc3545"; 
        } else {
            timerEl.style.color = "#d9534f";
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// 7. 문제 로드
function loadQuestion() {
    if (currentQuestionIndex >= wordData.length) {
        endGame(); 
        return;
    }

    currentQuestion = wordData[currentQuestionIndex];
    userInputs = [];
    
    // 힌트 즉시 보여주기 (버튼 없이)
    hintText.textContent = `💡 ${currentQuestion.hint}`;
    hintText.classList.remove("hidden");
    
    messageArea.className = "hidden";
    renderBoard();
}

// 8. 화면 그리기 (핵심 로직)
function renderBoard() {
    answerZone.innerHTML = "";
    scrambleZone.innerHTML = "";

    // A. 정답 칸 생성
    const totalLength = currentQuestion.word.length;
    for (let i = 0; i < totalLength; i++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        if (userInputs[i]) {
            tile.textContent = userInputs[i];
            tile.classList.add("placed");
            // 클릭하면 다시 내려가도록 (취소 기능)
            tile.onclick = () => removeInput(i);
        } else {
            tile.style.backgroundColor = "#e9ecef"; // 빈칸
        }
        answerZone.appendChild(tile);
    }

    // B. 타일 준비 (정답 글자 + 훼방꾼 글자)
    let mixChars = currentQuestion.word.split("");
    
    // 이미 입력된 글자는 하단 목록에서 제외
    userInputs.forEach(char => {
        const idx = mixChars.indexOf(char);
        if (idx > -1) mixChars.splice(idx, 1);
    });

    // *** 난이도 조절: 가짜 타일(Distractor) 6개 추가 ***
    const distractorCount = 6; 
    
    // 빈칸이 남았을 때만 가짜 타일을 섞어서 보여줌
    if (userInputs.length < totalLength) {
        for(let k=0; k < distractorCount; k++) {
            const randomChar = dummyChars.charAt(Math.floor(Math.random() * dummyChars.length));
            mixChars.push(randomChar);
        }
    }

    // 무작위 섞기
    mixChars.sort(() => Math.random() - 0.5);

    // 하단에 타일 뿌리기
    mixChars.forEach(char => {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.textContent = char;
        
        // 정답 타일인지 훼방꾼인지 구분 없이 클릭 이벤트 연결
        tile.onclick = () => addInput(char);
        scrambleZone.appendChild(tile);
    });
}

// 9. 사용자 입력 처리
function addInput(char) {
    if (userInputs.length < currentQuestion.word.length) {
        userInputs.push(char);
        renderBoard();
        checkAnswer();
    }
}

function removeInput(index) {
    userInputs.splice(index, 1);
    renderBoard();
}

// 10. 정답 체크
function checkAnswer() {
    const currentWord = userInputs.join("");
    
    if (currentWord === currentQuestion.word) {
        // 정답!
        currentScore += 10;
        timeLeft += 3; // 보너스 시간 3초
        
        messageArea.textContent = "⭕ 정답입니다!";
        messageArea.classList.remove("hidden");
        messageArea.style.color = "#28a745";
        
        updateStatus();

        // 0.5초 뒤 다음 문제로 자동 이동
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 500);
        
    } else if (userInputs.length === currentQuestion.word.length) {
        // 글자 수는 맞는데 틀린 경우
        messageArea.textContent = "❌ 다시 생각해보세요!";
        messageArea.classList.remove("hidden");
        messageArea.style.color = "#dc3545";
    }
}

function updateStatus() {
    scoreEl.textContent = currentScore;
    timerEl.textContent = timeLeft;
}

// 11. 게임 종료 처리
function endGame() {
    clearInterval(timerInterval);
    finalScoreEl.textContent = currentScore;
    
    // 점수별 피드백 (회사 분위기 반영)
    let comment = "";
    if (currentScore >= 200) comment = "🏆 당신은 우리 회사의 핵심 인재! (임원급)";
    else if (currentScore >= 100) comment = "🥇 솔루션 마스터시군요! (팀장급)";
    else if (currentScore >= 50) comment = "🥈 아주 좋습니다! 조금만 더 힘내세요. (책임급)";
    else comment = "🥉 솔루션 학습이 좀 더 필요해요! (신입급)";
    
    rankCommentEl.textContent = comment;
    resultModal.classList.remove("hidden");
}

// 게임 시작 실행
initGame();