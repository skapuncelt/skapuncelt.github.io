/* =========================
   要素
========================= */

const passwordScreen =
  document.getElementById("password-screen");

const loadingScreen =
  document.getElementById("loading-screen");

const desktopScreen =
  document.getElementById("desktop-screen");

const passwordInput =
  document.getElementById("password-input");

const passwordButton =
  document.getElementById("password-button");

const passwordError =
  document.getElementById("password-error");

const loadingBar =
  document.getElementById("loading-bar");


/* =========================
   パスワード
========================= */

const CORRECT_PASSWORD = "ninja";


/* =========================
   パスワード判定
========================= */

function checkPassword() {

  const password =
    passwordInput.value;


  if (password === CORRECT_PASSWORD) {

    startAuthentication();

  } else {

    passwordError.textContent =
      "パスワードが違います。";

    passwordInput.value = "";

  }

}


/* =========================
   認証開始
========================= */

function startAuthentication() {

  passwordScreen.classList.add("hidden");

  loadingScreen.classList.remove("hidden");

  runLoadingAnimation();

}


/* =========================
   ローディング演出
========================= */

function runLoadingAnimation() {

  let progress = 0;

  const interval =
    setInterval(() => {

      progress += 5;

      loadingBar.textContent =
        "████████████████████ " +
        progress +
        "%";


      if (progress >= 100) {

        clearInterval(interval);

        setTimeout(() => {

          loadingScreen.classList.add("hidden");

          desktopScreen.classList.remove("hidden");

        }, 500);

      }

    }, 100);

}


/* =========================
   ENTERキー
========================= */

passwordInput.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Enter") {

      checkPassword();

    }

  }
);


passwordButton.addEventListener(
  "click",
  checkPassword
);


/* =========================
   デスクトップアイコン
========================= */

document
  .querySelectorAll(".system-file")
  .forEach(file => {

    file.addEventListener(
      "click",
      function() {

        const windowId =
          this.dataset.window;

        const targetWindow =
          document.getElementById(windowId);

        if (!targetWindow) return;

        targetWindow.classList.remove("hidden");

      }
    );

  });

/* =========================
   SYSTEM WINDOWS
========================= */

let activeWindowZIndex = 20;


/* ファイルをクリックしてウィンドウを開く */

document
  .querySelectorAll(".system-file")
  .forEach(file => {

    file.addEventListener("click", function() {

      const windowId = this.dataset.window;
      const targetWindow = document.getElementById(windowId);

      if (!targetWindow) return;

      targetWindow.classList.remove("hidden");

      bringWindowToFront(targetWindow);
    });

  });


/* ウィンドウを前面へ */

function bringWindowToFront(targetWindow) {

  activeWindowZIndex++;

  targetWindow.style.zIndex = activeWindowZIndex;

  document
    .querySelectorAll(".desktop-window")
    .forEach(window => {
      window.classList.remove("active-window");
    });

  targetWindow.classList.add("active-window");
}


/* ウィンドウをクリックしたら前面へ */

document
  .querySelectorAll(".desktop-window")
  .forEach(window => {

    window.addEventListener("mousedown", function() {
      bringWindowToFront(this);
    });

  });


/* 最小化 */

document
  .querySelectorAll(".window-minimize")
  .forEach(button => {

    button.addEventListener("click", function(event) {

      event.stopPropagation();

      const window = this.closest(".desktop-window");

      if (!window) return;

      window.classList.toggle("minimized");

    });

  });


/* 最大化 */

document
  .querySelectorAll(".window-maximize")
  .forEach(button => {

    button.addEventListener("click", function(event) {

      event.stopPropagation();

      const window = this.closest(".desktop-window");

      if (!window) return;

      window.classList.toggle("maximized");

      window.classList.remove("minimized");

      bringWindowToFront(window);

    });

  });


/* 閉じる */

document
  .querySelectorAll(".window-close")
  .forEach(button => {

    button.addEventListener("click", function(event) {

      event.stopPropagation();

      const window = this.closest(".desktop-window");

      if (!window) return;

      window.classList.add("hidden");

      window.classList.remove("minimized");
      window.classList.remove("maximized");

    });

  });

/* =========================
   TO-DO SYSTEM
========================= */

const todoItems = document.querySelectorAll(".todo-item");
const todoCompleted = document.getElementById("todo-completed");
const todoTotal = document.getElementById("todo-total");
const todoProgressBar = document.getElementById("todo-progress-bar");
const todoStatus = document.getElementById("todo-status");


function updateTodoStatus() {

  const total = todoItems.length;

  const completed =
    document.querySelectorAll(".todo-item.completed").length;

  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);


  /* 件数 */

  todoCompleted.textContent = completed;
  todoTotal.textContent = total;


  /* プログレスバー */

  todoProgressBar.style.width =
    percentage + "%";


  /* ステータス */

  if (percentage === 100) {

    todoStatus.textContent =
      "ALL TASKS COMPLETE";

  } else if (percentage >= 70) {

    todoStatus.textContent =
      "ALMOST DONE";

  } else {

    todoStatus.textContent =
      "WORK IN PROGRESS";

  }

}


/* タスククリック */

todoItems.forEach(item => {

  item.addEventListener("click", function() {

    this.classList.toggle("completed");


    const checkbox =
      this.querySelector(".todo-checkbox");


    if (this.classList.contains("completed")) {

      checkbox.textContent = "[✓]";

    } else {

      checkbox.textContent = "[ ]";

    }


    updateTodoStatus();

  });

});


/* 初期状態 */

updateTodoStatus();




const wallPhotos = document.querySelectorAll(".wall-photo");
const photoViewer = document.getElementById("photo-viewer");
const photoViewerImage = document.getElementById("photo-viewer-image");
const photoViewerEvent = document.getElementById("photo-viewer-event");
const photoViewerCaption = document.getElementById("photo-viewer-caption");
const photoFlip = document.getElementById("photo-flip");
const photoViewerClose = document.getElementById("photo-viewer-close");

let currentPhoto = null;
let showingBack = false;

wallPhotos.forEach(photo => {
  photo.addEventListener("click", function(event) {
    event.stopPropagation();

    currentPhoto = this;
    showingBack = false;

    openPhotoViewer();
  });
});


function openPhotoViewer() {
  if (!currentPhoto) return;

  photoViewerImage.src = currentPhoto.dataset.front;
  photoViewerImage.alt = currentPhoto.dataset.title;

  photoViewerEvent.textContent =
    currentPhoto.dataset.title;

  photoViewerCaption.textContent =
    "SkaPunCelt / LIVE";

  photoFlip.textContent =
    "裏面を見る";

  photoViewer.classList.remove("hidden");
}


photoFlip.addEventListener("click", function() {
  if (!currentPhoto) return;

  showingBack = !showingBack;

  if (showingBack) {

    photoViewerImage.src =
      currentPhoto.dataset.back;

    photoFlip.textContent =
      "表面を見る";

  } else {

    photoViewerImage.src =
      currentPhoto.dataset.front;

    photoFlip.textContent =
      "裏面を見る";
  }
});


photoViewerClose.addEventListener("click", function() {
  photoViewer.classList.add("hidden");

  currentPhoto = null;
  showingBack = false;
});


photoViewer.addEventListener("click", function(event) {
  if (event.target === photoViewer) {
    photoViewer.classList.add("hidden");

    currentPhoto = null;
    showingBack = false;
  }
});





const runNote = document.getElementById("run-note");

if (runNote) {
  runNote.addEventListener("click", function() {
    const front = this.querySelector(".note-front");
    const back = this.querySelector(".note-back");

    const showingBack = !back.classList.contains("hidden");

    if (showingBack) {
      back.classList.add("hidden");
      front.classList.remove("hidden");
      this.classList.remove("flipped");
    } else {
      front.classList.add("hidden");
      back.classList.remove("hidden");
      this.classList.add("flipped");
    }
  });
}

const ninjaNote = document.getElementById("ninja-note");

if (ninjaNote) {
  ninjaNote.addEventListener("click", function() {
    const front = this.querySelector(".note-front");
    const back = this.querySelector(".note-back");

    const showingBack = !back.classList.contains("hidden");

    if (showingBack) {
      back.classList.add("hidden");
      front.classList.remove("hidden");
      this.classList.remove("flipped");
    } else {
      front.classList.add("hidden");
      back.classList.remove("hidden");
      this.classList.add("flipped");
    }
  });
}


const practiceNote = document.getElementById("practice-note");

if (practiceNote) {
  practiceNote.addEventListener("click", function() {
    const front = this.querySelector(".note-front");
    const back = this.querySelector(".note-back");

    if (!front || !back) return;

    if (back.classList.contains("hidden")) {
      front.classList.add("hidden");
      back.classList.remove("hidden");
      this.classList.add("flipped");
    } else {
      back.classList.add("hidden");
      front.classList.remove("hidden");
      this.classList.remove("flipped");
    }
  });
}



/* =========================================
   触るな.txt
========================================= */

const touchWindow = document.getElementById("touch-window");
const touchDialog = document.getElementById("touch-dialog");
const touchLine1 = document.getElementById("touch-line-1");
const touchLine2 = document.getElementById("touch-line-2");
const touchExitButton = document.getElementById("touch-exit-button");

const touchFirstLines = [
  "……なんでここにおるん？",
  "ここ、関係者以外立ち入り禁止なんやけど。",
  "……まさかここまで入ってくるとは思わんかったわ。",
  "ここ、勝手に入ってきたらあかんで。",
  "……いつの間に入ってきたん？",
  "いや、ここデジタル大臣室やで？",
  "君、ここ見つけたん？",
  "……ここ、関係者以外入ったらあかんねんけど。",
  "……この部屋見つかると思ってなかったわ",
  "……ここまで来るとは思わんかった。",
  "ここ、普通の部屋ちゃうからな？",
  "……なんでそこまで探してんねん。"
];

const touchSpecialLine =
  "あれ、誰かいるん？ 邪魔すんなら帰って〜。……って、まじでなんでおるん。";

const touchSecondLines = [
  "……社外秘とか、見てないよな？",
  "……開発資料とか、見てないよな？",
  "……変なファイルとか開いてないよな？",
  "……机の上とか、見てないよな？",
  "社外秘の資料とか、見てないよな？",
  "……見られたら困るもん、なかったよな？",
  "……変な資料とか見てないやろな？",
  "……ほんまに何も見てないよな？",
  "……開発資料、勝手に見てないよな？",
  "……社外秘だけは見てないよな？",
  "……ふだんはもっときれいにしてるのに。",
  "……まさか秘密の資料とか見てないよな？"
];

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function showTouchDialog() {
  if (!touchWindow || !touchDialog) return;

  /*
   * 低確率で特殊な第一声。
   * それ以外は通常の第一声。
   */
  const firstLine =
    Math.random() < 0.08
      ? touchSpecialLine
      : randomItem(touchFirstLines);

  const secondLine = randomItem(touchSecondLines);
   
touchLine1.textContent = `セーラ「${firstLine}」`;
touchLine2.textContent = `セーラ「(${secondLine})」`;

  touchDialog.classList.remove("hidden");
}

document.querySelectorAll(
  '.system-file[data-window="touch-window"]'
).forEach(file => {
  file.addEventListener("click", function() {
    showTouchDialog();
  });
});

if (touchExitButton) {
  touchExitButton.addEventListener("click", function() {

    /*
     * 触るな.txtを閉じる
     */
    if (touchWindow) {
      touchWindow.classList.add("hidden");
      touchWindow.classList.remove("minimized");
      touchWindow.classList.remove("maximized");
    }

    /*
     * デスクトップを終了
     */
    const desktopScreen = document.getElementById("desktop-screen");
    const passwordScreen = document.getElementById("password-screen");

    if (desktopScreen) {
      desktopScreen.classList.add("hidden");
    }

    /*
     * パスワード画面へ戻す
     */
    if (passwordScreen) {
      passwordScreen.classList.remove("hidden");
    }

    /*
     * 触るな.txtの内容もリセット
     */
    if (touchDialog) {
      touchDialog.classList.add("hidden");
    }

    if (touchLine1) {
      touchLine1.textContent = "";
    }

    if (touchLine2) {
      touchLine2.textContent = "";
    }

    /*
     * 開いていた他のウィンドウも閉じる
     */
    document.querySelectorAll(".desktop-window").forEach(window => {
      window.classList.add("hidden");
      window.classList.remove("minimized");
      window.classList.remove("maximized");
    });
  });
}

