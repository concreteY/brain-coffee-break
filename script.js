// 1. 데이터 (기존과 동일)
const wordData = [
    { word: "결재", hint: "부장님의 도장이 필요해요" },
    { word: "회의", hint: "다 같이 모여서 의논해요" },
    { word: "출장", hint: "외부로 업무 보러 가요" },
    { word: "기획", hint: "새로운 일을 구상해요" },
    { word: "승진", hint: "직급이 올라갔어요!" },
    { word: "성과", hint: "일한 결과물이에요" },
    { word: "월급", hint: "통장이 잠시 스쳐가요" },
    { word: "회식", hint: "오늘 저녁에 삼겹살?" },
    { word: "휴가", hint: "며칠 쉬다 올게요" },
    { word: "정년", hint: "직장 생활의 명예로운 끝" },
    { word: "보고서", hint: "상사에게 제출하는 문서" },
    { word: "워크숍", hint: "1박 2일로 떠나는 연수" },
    { word: "탕비실", hint: "커피 믹스 타 먹는 곳" },
    { word: "야유회", hint: "봄가을에 떠나는 소풍" },
    { word: "경위서", hint: "잘못된 일을 설명해요" },
    { word: "송년회", hint: "연말 모임" },
    { word: "시무식", hint: "새해 첫 출근 행사" },
    { word: "인건비", hint: "사람에게 들어가는 비용" },
    { word: "업무일지", hint: "매일매일 쓰는 기록" },
    { word: "벤치마킹", hint: "잘하는 곳을 따라 배워요" },
    { word: "인센티브", hint: "성과급 보너스" },
    { word: "고진감래", hint: "쓴 것이 다하면 단 것이 와요" },
    { word: "유비무환", hint: "미리 준비하면 걱정이 없죠" },
    { word: "대기만성", hint: "큰 사람은 늦게 성공해요" },
    { word: "솔선수범", hint: "남보다 앞장서서 모범을 보여요" },
    { word: "일취월장", hint: "실력이 날마다 늘어요" },
    { word: "역지사지", hint: "입장을 바꿔서 생각해보세요" },
    { word: "다다익선", hint: "많으면 많을수록 좋아요" },
    { word: "전화위복", hint: "화가 바뀌어 오히려 복이 돼요" },
    { word: "토사구팽", hint: "필요할 때 쓰고 버려요" }
];

// 훼방꾼 글자 모음 (오답 유도용)
const dummyChars = "가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허구누두루무부수우주추쿠투푸후기니디리미비시이지치키티피히";

// 2. 상태 변수
let currentScore = 0;
let currentQuestionIndex = 0;
let currentQuestion = null;
let userInputs = [];
let timeLeft = 60; // 60초 타임어택
let timerInterval = null;

// 3. DOM 요소
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const hintBtn = document.getElementById("hint-btn");
const hintText = document.getElementById("hint-text");
const answerZone = document.getElementById("answer-zone");
const scrambleZone = document.getElementById("scramble-zone");
const messageArea = document.getElementById("message-area");
const resultModal = document.getElementById("result-modal");
const finalScoreEl = document.getElementById("final-score");
const rankCommentEl = document.getElementById("rank-comment");

// 4. 게임 초기화
function initGame() {
    wordData.sort(() => Math.random() - 0.5); // 문제 섞기
    currentQuestionIndex = 0;
    currentScore = 0;
    timeLeft = 60;
    
    updateStatus();
    startTimer();
    loadQuestion();
}

// 5. 타이머 로직
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 10) timerEl.style.color = "red"; // 임박 시 빨간색
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// 6. 문제 로드
function loadQuestion() {
    if (currentQuestionIndex >= wordData.length) {
        // 모든 문제 소진 시 (시간 남았어도 종료)
        endGame(); 
        return;
    }

    currentQuestion = wordData[currentQuestionIndex];
    userInputs = [];
    
    // 힌트 초기화
    hintText.classList.add("hidden");
    hintBtn.style.display = "inline-block";
    
    messageArea.className = "hidden";
    renderBoard();
}

// 힌트 보기 기능
window.showHint = function() {
    hintText.textContent = currentQuestion.hint;
    hintText.classList.remove("hidden");
    hintBtn.style.display = "none";
    // 힌트 보면 5점 감점? (선택사항 - 지금은 감점 없음)
};

// 7. 화면 그리기 (가짜 글자 섞기 로직 포함)
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
            tile.onclick = () => removeInput(i);
        } else {
            tile.style.backgroundColor = "#e9ecef"; // 빈칸
        }
        answerZone.appendChild(tile);
    }

    // B. 오답(훼방꾼) 타일 섞기
    // 정답 글자들
    let mixChars = currentQuestion.word.split("");
    
    // 이미 입력된 글자는 목록에서 뺌 (화면 하단에서 사라짐)
    userInputs.forEach(char => {
        const idx = mixChars.indexOf(char);
        if (idx > -1) mixChars.splice(idx, 1);
    });

    // 훼방꾼 글자 추가 (정답 길이만큼 추가하되, 이미 입력된 상태면 줄어듦)
    // 난이도 조절: 항상 3개의 가짜 글자를 섞음
    if (userInputs.length < totalLength) {
        for(let k=0; k<3; k++) {
            const randomChar = dummyChars.charAt(Math.floor(Math.random() * dummyChars.length));
            mixChars.push(randomChar);
        }
    }

    // 섞기
    mixChars.sort(() => Math.random() - 0.5);

    // 하단에 뿌리기
    mixChars.forEach(char => {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.textContent = char;
        tile.onclick = () => addInput(char);
        scrambleZone.appendChild(tile);
    });
}

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

function checkAnswer() {
    const currentWord = userInputs.join("");
    // 정답 체크
    if (currentWord === currentQuestion.word) {
        currentScore += 10;
        // 추가 시간 보너스 (정답 맞추면 3초 추가)
        timeLeft += 3; 
        
        messageArea.textContent = "⭕ 결재 완료! (+3초)";
        messageArea.classList.remove("hidden");
        messageArea.style.color = "#28a745";
        updateStatus();

        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 800);
    } else if (userInputs.length === currentQuestion.word.length) {
        // 길이는 맞는데 틀림
        messageArea.textContent = "❌ 다시 확인하세요!";
        messageArea.classList.remove("hidden");
        messageArea.style.color = "#dc3545";
        
        // 틀렸을 때 약간의 페널티 (타일 초기화는 너무 가혹하니 그냥 둠)
    }
}

function updateStatus() {
    scoreEl.textContent = currentScore;
    timerEl.textContent = timeLeft;
}

function endGame() {
    clearInterval(timerInterval);
    finalScoreEl.textContent = currentScore;
    
    // 점수별 멘트
    let comment = "";
    if (currentScore >= 150) comment = "매니저님, 역시 최고이십니다! (신 등급)";
    else if (currentScore >= 100) comment = "아직 감이 살아있으시네요! (금손 등급)";
    else comment = "조금 더 분발하셔야겠어요! (노력 요망)";
    
    rankCommentEl.textContent = comment;
    resultModal.classList.remove("hidden");
}

// 게임 시작
initGame();