// 1. 데이터 (고난이도: 사자성어 및 고급 어휘 위주)
const wordData = [
    { word: "고진감래", hint: "고생 끝에 낙이 온다" },
    { word: "과유불급", hint: "지나친 것은 미치지 못한 것과 같다" },
    { word: "구조조정", hint: "조직을 개편하여 효율을 높임" },
    { word: "권선징악", hint: "착한 일을 권하고 악한 일을 벌함" },
    { word: "금의환향", hint: "비단옷 입고 고향에 돌아옴 (성공)" },
    { word: "기회비용", hint: "포기한 것 중 가장 큰 가치" },
    { word: "동문서답", hint: "묻는 말에 엉뚱한 대답" },
    { word: "동상이몽", hint: "같은 자리에 자면서 다른 꿈을 꿈" },
    { word: "마이동풍", hint: "남의 말을 귀담아듣지 않음" },
    { word: "복지부동", hint: "땅에 엎드려 움직이지 않음 (몸 사림)" },
    { word: "부화뇌동", hint: "줏대 없이 남의 의견에 따라 움직임" },
    { word: "사면초가", hint: "주위가 모두 적으로 둘러싸임" },
    { word: "산전수전", hint: "온갖 고생을 다 겪음" },
    { word: "살신성인", hint: "자기 몸을 희생하여 인을 이룸" },
    { word: "새옹지마", hint: "인생의 길흉화복은 예측하기 어렵다" },
    { word: "선견지명", hint: "앞을 내다보는 안목" },
    { word: "설상가상", hint: "눈 위에 서리가 내림 (엎친 데 덮친 격)" },
    { word: "심사숙고", hint: "깊이 생각하고 신중하게 함" },
    { word: "아전인수", hint: "자기에게 유리한 대로만 생각함" },
    { word: "양해각서", hint: "정식 계약 전 합의 문서 (MOU)" },
    { word: "어부지리", hint: "두 사람이 싸우는 틈에 엉뚱한 사람이 이익 봄" },
    { word: "오비이락", hint: "까마귀 날자 배 떨어진다 (우연한 오해)" },
    { word: "용두사미", hint: "시작은 거창하나 끝이 흐지부지함" },
    { word: "우유부단", hint: "망설이기만 하고 결단을 내리지 못함" },
    { word: "유비무환", hint: "미리 준비하면 근심이 없다" },
    { word: "이율배반", hint: "서로 모순되어 양립할 수 없음" },
    { word: "일취월장", hint: "나날이 다달이 발전함" },
    { word: "임기응변", hint: "그때그때 처지에 맞춰 처리함" },
    { word: "전화위복", hint: "화가 바뀌어 오히려 복이 됨" },
    { word: "주객전도", hint: "주인과 손님의 처지가 뒤바뀜" },
    { word: "진퇴양난", hint: "나아갈 수도 물러설 수도 없는 상황" },
    { word: "천재일우", hint: "천 년에 한 번 만날 기회" },
    { word: "청천벽력", hint: "맑은 하늘에 날벼락" },
    { word: "타산지석", hint: "남의 잘못도 나의 교훈이 된다" },
    { word: "토사구팽", hint: "필요할 때 쓰고 필요 없으면 버림" },
    { word: "표리부동", hint: "겉과 속이 다름" },
    { word: "풍전등화", hint: "바람 앞의 등불 (매우 위태로움)" },
    { word: "호가호위", hint: "남의 권세를 빌려 위세를 부림" },
    { word: "환골탈태", hint: "뼈를 바꾸고 태를 벗다 (완전히 달라짐)" },
    { word: "희노애락", hint: "기쁨, 노여움, 슬픔, 즐거움" }
];

// 훼방꾼 글자 모음 (오답 유도용 - 비슷한 글자 포함)
const dummyChars = "가각간갈감갑강개객거건걸검겁게격견결겸경계고곡곤골공과곽관광괴교구국군굴궁권궐귀규균극근금급기긴길김나낙난날남납낭내녀년념녕노농뇌누눈뉴능니다단달담답당대덕도독돈돌동두둔득등라락란람랑래랭량려력련렬례로록론롱뢰료룡루류륙륜률륭르리린림마막만말망매맥맹면멸명모목몰몽묘무묵문물미민박반발방배백번벌범법벽변별병보복본봉부북분불붕비빈빙사삭산살삼상새색생서석선설섬섭성세소속손송수숙순술숭슬승시식신실심십쌍씨아악안알암압앙애액야약양어억언엄업에여역연열염엽영예오옥온올옹와완왕외요욕용우운울웅원월위유육윤율융은을음읍응의이익인일임입잉자작잔잠잡장재쟁저적전절점접정제조족존졸종좌죄주죽준중즉증지직진질집징차착찬찰참창채책처척천철첨첩청체초촉촌총최추축춘출충취측층치칙친칠침칭쾌타탁탄탈탐탑태택토통퇴투파판팔패팽편평폐포폭표품풍피필하학한할함합항해핵행향허헌험혁현혈혐협형혜호혹혼홀홍화확환활황회획횡효후훈훌휘휴휼흉흑흡흥희힐";

// 2. 상태 변수
let currentScore = 0;
let currentQuestionIndex = 0;
let currentQuestion = null;
let userInputs = [];
let timeLeft = 60; 
let timerInterval = null;

// 3. DOM 요소
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
// 힌트 버튼 관련 요소 제거, 텍스트만 남김
const hintText = document.getElementById("hint-text");
const answerZone = document.getElementById("answer-zone");
const scrambleZone = document.getElementById("scramble-zone");
const messageArea = document.getElementById("message-area");
const resultModal = document.getElementById("result-modal");
const finalScoreEl = document.getElementById("final-score");
const rankCommentEl = document.getElementById("rank-comment");

// 4. 게임 초기화
function initGame() {
    wordData.sort(() => Math.random() - 0.5); 
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
        if (timeLeft <= 10) timerEl.style.color = "red"; 
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// 6. 문제 로드
function loadQuestion() {
    if (currentQuestionIndex >= wordData.length) {
        endGame(); 
        return;
    }

    currentQuestion = wordData[currentQuestionIndex];
    userInputs = [];
    
    // 힌트 즉시 보여주기
    hintText.textContent = `💡 힌트: ${currentQuestion.hint}`;
    hintText.classList.remove("hidden");
    
    messageArea.className = "hidden";
    renderBoard();
}

// 7. 화면 그리기 (난이도 상향 로직)
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
            tile.style.backgroundColor = "#e9ecef"; 
        }
        answerZone.appendChild(tile);
    }

    // B. 타일 섞기 (정답 + 가짜 타일 대거 투입)
    let mixChars = currentQuestion.word.split("");
    
    userInputs.forEach(char => {
        const idx = mixChars.indexOf(char);
        if (idx > -1) mixChars.splice(idx, 1);
    });

    // *** 난이도 조절 핵심: 가짜 타일 6개 추가 ***
    // (정답이 4글자면 총 10개가 화면에 뜹니다)
    const distractorCount = 6; 
    
    if (userInputs.length < totalLength) {
        for(let k=0; k < distractorCount; k++) {
            const randomChar = dummyChars.charAt(Math.floor(Math.random() * dummyChars.length));
            mixChars.push(randomChar);
        }
    }

    // 무작위 섞기
    mixChars.sort(() => Math.random() - 0.5);

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
    
    if (currentWord === currentQuestion.word) {
        currentScore += 10;
        timeLeft += 3; // 정답 시 3초 추가
        
        messageArea.textContent = "⭕ 정답!";
        messageArea.classList.remove("hidden");
        messageArea.style.color = "#28a745";
        updateStatus();

        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 500); // 반응 속도 빠르게 (0.5초)
    } else if (userInputs.length === currentQuestion.word.length) {
        messageArea.textContent = "❌ 다시!";
        messageArea.classList.remove("hidden");
        messageArea.style.color = "#dc3545";
    }
}

function updateStatus() {
    scoreEl.textContent = currentScore;
    timerEl.textContent = timeLeft;
}

function endGame() {
    clearInterval(timerInterval);
    finalScoreEl.textContent = currentScore;
    
    // 점수별 멘트 (상향 조정)
    let comment = "";
    if (currentScore >= 200) comment = "매니저니이임~~~ 나이스! 퇴근하십시오! (신 등급)";
    else if (currentScore >= 100) comment = "매니저님 뇌가 아주 건강합니다! 정시퇴근~ (우수 등급)";
    else comment = "조금 더 연습이 필요해요! 야근야근열매 드세요~ (분발 요망)";
    
    rankCommentEl.textContent = comment;
    resultModal.classList.remove("hidden");
}

initGame();