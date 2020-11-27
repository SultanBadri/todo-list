!(function (e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return r;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 0));
})([
  function (e, t, n) {
    "use strict";
    n.r(t),
      n.d(t, "lists", function () {
        return S;
      }),
      n.d(t, "selectedListId", function () {
        return g;
      }),
      n.d(t, "clearElement", function () {
        return T;
      }),
      n.d(t, "listsContainer", function () {
        return r;
      }),
      n.d(t, "renderLists", function () {
        return M;
      }),
      n.d(t, "listDisplayContainer", function () {
        return l;
      }),
      n.d(t, "listTitleElement", function () {
        return i;
      }),
      n.d(t, "tasksContainer", function () {
        return d;
      }),
      n.d(t, "taskTemplate", function () {
        return u;
      }),
      n.d(t, "editTask", function () {
        return I;
      });
    document.querySelector("#searchBar").addEventListener("keyup", (e) => {
      const t = S.find((e) => e.id === g),
        n = e.target.value.toLowerCase();
      !(function (e) {
        T(r), M();
        const t = S.find((e) => e.id === g);
        null === g
          ? ((document.querySelector(".todo-lister").style.display = "none"),
            (l.style.background = "red"))
          : ((l.style.display = ""),
            (i.innerHTML = '<i class="fas fa-tasks"></i> ' + t.name),
            T(d),
            (function (e) {
              e.forEach((e) => {
                const t = document.importNode(u.content, !0),
                  n = t.querySelector("input");
                (n.id = e.id), (n.checked = e.complete);
                const r = t.querySelector("label");
                r.htmlFor = e.id;
                const o = document.createElement("br");
                r.append(e.name, ", ", e.date, o, e.description);
                const a = document.createElement("p");
                (a.innerHTML = '<i class="far fa-edit"></i>'),
                  a.classList.add("edit"),
                  a.addEventListener("click", () => I(e, r)),
                  t.querySelector(".task").append(a),
                  d.appendChild(t);
              });
            })(e),
            (function (e) {
              const t = [...document.querySelectorAll(".todo")],
                n = [...document.querySelectorAll(".checkbox")];
              for (let r = 0; r < t.length; r++)
                for (let t = 0; t < e.length; t++)
                  "High" === e[t].priority
                    ? (n[t].style.border = "2px solid #ed1250")
                    : "Medium" === e[t].priority
                    ? (n[t].style.border = "2px solid #d3d00f")
                    : (n[t].style.border = "2px solid #0fc53d");
            })(e));
      })(
        t.tasks.filter(
          (e) =>
            e.name.toLowerCase().includes(n) ||
            e.description.toLowerCase().includes(n)
        )
      );
    });
    const r = document.querySelector("[data-lists]"),
      o = document.querySelector("[data-new-list-form]"),
      a = document.querySelector("[data-new-list-input]"),
      s = document.querySelector("[data-delete-list-button]"),
      l = document.querySelector("[data-list-display-container]"),
      i = document.querySelector("[data-list-title"),
      c = document.querySelector("[data-list-count"),
      d = document.querySelector("[data-tasks"),
      u = document.querySelector("#task-template"),
      y = document.querySelector("[data-new-task-form]"),
      m = document.querySelector("[data-new-task-input]"),
      p = document.querySelector("#due-date"),
      f = document.querySelector("#priority"),
      k = document.querySelector("#description"),
      v = document.querySelector("[data-clear-complete-tasks-button]");
    let S = JSON.parse(localStorage.getItem("task.lists")) || [],
      g = localStorage.getItem("task.selectedListId");
    const b = document.querySelector("#overlay"),
      q = document.querySelector(".container"),
      h = document.querySelector(".close"),
      L = document.querySelector(".add-btn"),
      E = document.querySelector(".hamburger");
    let x = !1;
    function C() {
      w(),
        localStorage.setItem("task.lists", JSON.stringify(S)),
        localStorage.setItem("task.selectedListId", g);
    }
    function T(e) {
      for (; e.firstChild; ) e.removeChild(e.firstChild);
    }
    function w() {
      T(r), M();
      const e = S.find((e) => e.id === g);
      null === g
        ? (l.style.display = "none")
        : ((l.style.display = ""),
          (i.innerHTML = '<i class="fas fa-tasks"></i> ' + e.name),
          (function (e) {
            const t = e.tasks.filter((e) => !e.complete).length,
              n = 1 === t ? "task" : "tasks";
            c.innerText = `${t} ${n} remaining`;
          })(e),
          T(d),
          (function (e) {
            0 === e.tasks.length
              ? ((l.style.background =
                  "url(./images/tasks.svg) center no-repeat"),
                (l.style.backgroundSize = "35%"))
              : (l.style.background = "");
            e.tasks.forEach((e) => {
              const t = document.importNode(u.content, !0),
                n = t.querySelector("input");
              (n.id = e.id), (n.checked = e.complete);
              const r = t.querySelector("label");
              r.htmlFor = e.id;
              const o = document.createElement("br");
              r.append(e.name, ", ", e.date, o, e.description);
              const a = document.createElement("p");
              (a.innerHTML = '<i class="far fa-edit"></i>'),
                a.classList.add("edit"),
                a.addEventListener("click", () => I(e, r));
              t.querySelector(".task").append(a), d.appendChild(t);
            });
          })(e),
          (function (e) {
            const t = [...document.querySelectorAll(".todo")],
              n = [...document.querySelectorAll(".checkbox")];
            for (let r = 0; r < t.length; r++)
              for (let t = 0; t < e.tasks.length; t++)
                "High" === e.tasks[t].priority
                  ? (n[t].style.border = "2px solid #ed1250")
                  : "Medium" === e.tasks[t].priority
                  ? (n[t].style.border = "2px solid #d3d00f")
                  : (n[t].style.border = "2px solid #0fc53d");
          })(e));
    }
    function M() {
      S.forEach((e) => {
        const t = document.createElement("li");
        (t.innerText = e.name),
          (t.dataset.listId = e.id),
          e.id === g && t.classList.add("active-list"),
          r.appendChild(t);
      });
    }
    function I(e, t) {
      !(function () {
        const e = document.querySelector(".container h2"),
          t = document.querySelector('input[type="submit"]');
        x
          ? ((q.style.pointerEvents = "none"),
            (q.style.transform = "scale(0)"),
            (b.style.opacity = 0),
            (x = !1))
          : ((e.textContent = "Update Task"),
            (t.value = "Update"),
            (q.style.pointerEvents = "auto"),
            (q.style.transform = "scale(1)"),
            (b.style.opacity = 1),
            (x = !0));
      })(),
        (m.value = e.name),
        (p.value = e.date),
        (f.value = e.priority),
        (k.value = e.description),
        y.addEventListener("submit", () => {
          console.log("daw"),
            (e.name = m.value),
            (e.date = p.value),
            (e.priority = f.value),
            (e.description = k.value),
            (t.innerHTML = `<span class="checkbox"></span>${e.name}<br>${e.date}<br>${e.description}`),
            C();
        });
    }
    function O() {
      const e = document.querySelector(".container h2"),
        t = document.querySelector('input[type="submit"]');
      x
        ? ((q.style.pointerEvents = "none"),
          (q.style.transform = "scale(0)"),
          (b.style.opacity = 0),
          (x = !1))
        : ((e.textContent = "New Task"),
          (t.value = "Submit"),
          (q.style.pointerEvents = "auto"),
          (q.style.transform = "scale(1)"),
          (b.style.opacity = 1),
          (x = !0));
    }
    o.addEventListener("submit", (e) => {
      e.preventDefault();
      const t = a.value;
      if (null === t || "" === t) return;
      const n = { id: Date.now().toString(), name: a.value, tasks: [] };
      (a.value = null), S.push(n), C();
    }),
      y.addEventListener("submit", (e) => {
        e.preventDefault();
        const t = m.value;
        if (
          "Update Task" === document.querySelector(".container h2").textContent
        )
          return;
        if (null === t || "" === t) return;
        const n = {
          id: Date.now().toString(),
          name: m.value,
          date: p.value,
          priority: f.value,
          description: k.value,
          complete: !1,
        };
        m.value = null;
        S.find((e) => e.id === g).tasks.push(n), C();
      }),
      s.addEventListener("click", (e) => {
        (S = S.filter((e) => e.id !== g)), (g = null), C();
      }),
      v.addEventListener("click", (e) => {
        const t = S.find((e) => e.id === g);
        (t.tasks = t.tasks.filter((e) => !e.complete)), C();
      }),
      r.addEventListener("click", (e) => {
        "li" === e.target.tagName.toLowerCase() &&
          ((g = e.target.dataset.listId), C());
      }),
      d.addEventListener("click", (e) => {
        if ("input" === e.target.tagName.toLowerCase()) {
          (S.find((e) => e.id === g).tasks.find(
            (t) => t.id === e.target.id
          ).complete = e.target.checked),
            C();
        }
      }),
      L.addEventListener("click", () => {
        y.reset(),
          O(),
          x
            ? ((L.style.background = "#2185d5"),
              (L.style.transform = "rotate(45deg)"))
            : ((L.style.background = "transparent"),
              (L.style.transform = "rotate(0)"));
      }),
      h.addEventListener("click", () => {
        (q.style.transform = "scale(0)"),
          (b.style.opacity = 0),
          (x = !1),
          (L.style.background = "transparent"),
          (L.style.transform = "rotate(0)");
      }),
      q.addEventListener("submit", (e) => {
        e.preventDefault(),
          O(),
          (L.style.background = "transparent"),
          (L.style.transform = "rotate(0)"),
          (x = !1);
      }),
      E.addEventListener("click", () => {
        document.querySelector("#sidebar").classList.toggle("active"),
          E.classList.toggle("clicked");
      }),
      w();
  },
]);
