// 1. 게임 데이터 (앞서 만든 30개 데이터)
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

// 2. 게임 상태 변수
let currentScore = 0;
let currentQuestionIndex = 0;
let currentQuestion = null;
let userInputs = []; // 사용자가 입력한 글자들

// 3. DOM 요소 가져오기
const scoreEl = document.getElementById("score");
const filesLeftEl = document.getElementById("files-left");
const hintEl = document.getElementById("hint-box");
const answerZone = document.getElementById("answer-zone");
const scrambleZone = document.getElementById("scramble-zone");
const messageArea = document.getElementById("message-area");
const resultModal = document.getElementById("result-modal");
const finalScoreEl = document.getElementById("final-score");

// 4. 게임 초기화 및 시작
function initGame() {
    // 문제를 무작위로 섞음 (매번 다른 순서)
    wordData.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    currentScore = 0;
    updateStatus();
    loadQuestion();
}

// 5. 문제 로드 함수
function loadQuestion() {
    // 모든 문제를 다 풀었으면 종료
    if (currentQuestionIndex >= wordData.length) {
        endGame();
        return;
    }

    currentQuestion = wordData[currentQuestionIndex];
    userInputs = []; // 입력 초기화
    
    // 화면 업데이트
    hintEl.textContent = `💡 힌트: ${currentQuestion.hint}`;
    messageArea.className = "hidden";
    updateStatus();
    
    renderBoard();
}

// 6. 화면 그리기 (핵심 로직)
function renderBoard() {
    answerZone.innerHTML = "";
    scrambleZone.innerHTML = "";

    // A. 정답 칸 만들기 (빈 칸 or 사용자가 채운 칸)
    const totalLength = currentQuestion.word.length;
    for (let i = 0; i < totalLength; i++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        if (userInputs[i]) {
            tile.textContent = userInputs[i];
            tile.classList.add("placed");
            // 클릭하면 다시 내려가도록 (수정 기능)
            tile.onclick = () => removeInput(i);
        } else {
            tile.style.backgroundColor = "#e0e0e0"; // 빈칸 표시
        }
        answerZone.appendChild(tile);
    }

    // B. 섞인 글자들 만들기
    // 사용자가 아직 입력하지 않은 글자들만 아래에 표시
    const currentWordArr = currentQuestion.word.split("");
    // 이미 입력된 글자는 제거하는 로직 (간단히 구현하기 위해 매번 다시 그림)
    // 원본 글자 리스트에서 userInputs에 있는 글자들을 하나씩 뺌
    let remainingChars = [...currentWordArr];
    userInputs.forEach(char => {
        const idx = remainingChars.indexOf(char);
        if (idx > -1) remainingChars.splice(idx, 1);
    });

    // 남은 글자들을 섞어서 보여줌 (단, 시각적 혼란을 줄이기 위해 단순 나열)
    // 실제 게임성을 위해 여기서 remainingChars를 shuffle 해도 됨.
    // 여기서는 사용자가 쉽게 찾도록 그냥 둠 (또는 sort로 무작위)
    remainingChars.sort(() => Math.random() - 0.5);

    remainingChars.forEach(char => {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.textContent = char;
        tile.onclick = () => addInput(char);
        scrambleZone.appendChild(tile);
    });
}

// 7. 사용자 인터랙션 처리
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

// 8. 정답 확인
function checkAnswer() {
    const currentWord = userInputs.join("");
    if (currentWord === currentQuestion.word) {
        // 정답!
        currentScore += 10;
        messageArea.textContent = "⭕ 결재 완료!";
        messageArea.classList.remove("hidden");
        messageArea.style.color = "#28a745";
        
        // 1초 뒤 다음 문제
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1000);
    } else if (userInputs.length === currentQuestion.word.length) {
        // 글자 수는 맞는데 틀림
        messageArea.textContent = "❌ 반려! 다시 확인하세요.";
        messageArea.classList.remove("hidden");
        messageArea.style.color = "#dc3545";
    }
}

function updateStatus() {
    scoreEl.textContent = currentScore;
    filesLeftEl.textContent = wordData.length - currentQuestionIndex;
}

function endGame() {
    finalScoreEl.textContent = currentScore;
    resultModal.classList.remove("hidden");
}

// 게임 시작
initGame();