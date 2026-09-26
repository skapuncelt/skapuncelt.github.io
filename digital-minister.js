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
