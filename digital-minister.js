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
  .querySelectorAll(".desktop-icon")
  .forEach(icon => {

    icon.addEventListener(
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
   ウィンドウを閉じる
========================= */

document
  .querySelectorAll(".window-close")
  .forEach(button => {

    button.addEventListener(
      "click",
      function() {

        const window =
          this.closest(".desktop-window");

        window.classList.add("hidden");

      }
    );

  });
