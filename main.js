var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
  {
    q : "Herr S. tritt Anderen gegenüber sehr bestimmt und manchmal auch recht ruppig auf. Welche Möglichkeiten haben Sie, um zu intervenieren?",
    o : [
      "Keine",
      "Kolleg:innen vorwarnen",
      "Herrn S. isolieren",
      "klare Ansagen machen und konkrete Aufgaben vergeben"
    ],
    a : 3 // arrays start with 0, so answer is 70 meters
  },
  {
    q : "Frau B. ist sehr akribisch und genau. Ihre Dokumente sind immer optimiert und sie hat eine Vorliebe für Statistiken. Allerdings reagiert sie sehr heftig, als Sie einheitliche Layouts für Materialien verlangen. Wie können Sie auf Frau B. reagieren?",
    o : [
      "Am besten gar nicht",
      "Frau B. langfristig auf die Änderungen vorbereiten",
      "das Layout von Frau B. für alle verbindlich machen",
      "klare Ansagen machen und konkrete Aufgaben vergeben"
    ],
    a : 1
  },
  {
    q : "Herr F. sorgt regelmäßig für ein Wechselbad der Gefühle. Es gibt Tage, an denen er hoch motiviert und engagiert durch die Flure schreitet. Und dann gibt es Tage, an denen er unzuverlässig und gereizt unterwegs ist. Wie können Sie mit Herrn F. verfahren?",
    o : [
      "das Gespräch mit der Frau von Herrn F. suchen",
      "die Schulpsychologin einschalten",
      "Aufgaben vergeben, die Struktur und Planung erfordern",
      "Herrn F. an schlechten Tagen aus dem Weg gehen"
    ],
    a : 2
  },
  {
    q : "Frau M. kann man nichts recht machen. Sie hat an allen Vorschlägen etwas auszusetzen und malt für jedes Vorhaben die denkbar schlechtesten Verläufe aus. Insbesondere die Kolleg:inen reagieren dann sehr genervt. Was tun Sie?",
    o : [
      "zuhören und lösungsorientiert arbeiten",
      "Frau M. möglichst rasch das Wort abschneiden",
      "Frau M. über wichtige Sitzungen nicht informieren",
      "Augen zu und durch"
    ],
    a : 0
  },
  {
    q : "Herr V. neigt zu cholerischen Anfällen und ist im Kollegium und auch bei den Schülerinnen und Schülern deshalb gefürchtet. Was können Sie tun?",
    o : [
      "vielleicht doch noch einmal die Schulpsychologin holen",
      "ein Anti-Aggresssionstraining für alle einberaumen",
      "Stragien mit Herrn V. entwickeln",
      "Herrn V. möglichst aus dem Weg gehen"
    ],
    a : 2
  }
  ],

  // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score

  // (B) INIT QUIZ HTML
  init: () => {
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: () => {
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => { quiz.select(label); });
      quiz.hAns.appendChild(label);
    }
  },

  // (D) OPTION SELECTED
  select: (option) => {
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) { quiz.draw(); }
      else {
        quiz.hQn.innerHTML = `Sie haben ${quiz.score} von ${quiz.data.length} Lösungen gefunden.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },

  // (E) RESTART QUIZ
  reset : () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};
window.addEventListener("load", quiz.init);