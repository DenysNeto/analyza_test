/* ajv 8.12.0 (ajv7): Another JSON Schema Validator */
!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    ("undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : this
    ).ajv7 = e();
  }
})(function () {
  return (function e(t, r, o) {
    function s(n, i) {
      if (!r[n]) {
        if (!t[n]) {
          var c = "function" == typeof require && require;
          if (!i && c) return c(n, !0);
          if (a) return a(n, !0);
          var l = new Error("Cannot find module '" + n + "'");
          throw ((l.code = "MODULE_NOT_FOUND"), l);
        }
        var d = (r[n] = {
          exports: {},
        });
        t[n][0].call(
          d.exports,
          function (e) {
            return s(t[n][1][e] || e);
          },
          d,
          d.exports,
          e,
          t,
          r,
          o
        );
      }
      return r[n].exports;
    }
    for (
      var a = "function" == typeof require && require, n = 0;
      n < o.length;
      n++
    )
      s(o[n]);
    return s;
  })(
    {
      1: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.regexpCode =
              r.getEsmExportName =
              r.getProperty =
              r.safeStringify =
              r.stringify =
              r.strConcat =
              r.addCodeArg =
              r.str =
              r._ =
              r.nil =
              r._Code =
              r.Name =
              r.IDENTIFIER =
              r._CodeOrName =
                void 0);
          class o {}
          (r._CodeOrName = o), (r.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i);
          class s extends o {
            constructor(e) {
              if ((super(), !r.IDENTIFIER.test(e)))
                throw new Error("CodeGen: name must be a valid identifier");
              this.str = e;
            }
            toString() {
              return this.str;
            }
            emptyStr() {
              return !1;
            }
            get names() {
              return {
                [this.str]: 1,
              };
            }
          }
          r.Name = s;
          class a extends o {
            constructor(e) {
              super(), (this._items = "string" == typeof e ? [e] : e);
            }
            toString() {
              return this.str;
            }
            emptyStr() {
              if (this._items.length > 1) return !1;
              const e = this._items[0];
              return "" === e || '""' === e;
            }
            get str() {
              var e;
              return null !== (e = this._str) && void 0 !== e
                ? e
                : (this._str = this._items.reduce((e, t) => `${e}${t}`, ""));
            }
            get names() {
              var e;
              return null !== (e = this._names) && void 0 !== e
                ? e
                : (this._names = this._items.reduce(
                    (e, t) => (
                      t instanceof s && (e[t.str] = (e[t.str] || 0) + 1), e
                    ),
                    {}
                  ));
            }
          }
          function n(e, ...t) {
            const r = [e[0]];
            let o = 0;
            for (; o < t.length; ) l(r, t[o]), r.push(e[++o]);
            return new a(r);
          }
          (r._Code = a), (r.nil = new a("")), (r._ = n);
          const i = new a("+");
          function c(e, ...t) {
            const r = [u(e[0])];
            let o = 0;
            for (; o < t.length; ) r.push(i), l(r, t[o]), r.push(i, u(e[++o]));
            return (
              (function (e) {
                let t = 1;
                for (; t < e.length - 1; ) {
                  if (e[t] === i) {
                    const r = d(e[t - 1], e[t + 1]);
                    if (void 0 !== r) {
                      e.splice(t - 1, 3, r);
                      continue;
                    }
                    e[t++] = "+";
                  }
                  t++;
                }
              })(r),
              new a(r)
            );
          }
          function l(e, t) {
            var r;
            t instanceof a
              ? e.push(...t._items)
              : e.push(
                  t instanceof s
                    ? t
                    : "number" == typeof (r = t) ||
                      "boolean" == typeof r ||
                      null === r
                    ? r
                    : u(Array.isArray(r) ? r.join(",") : r)
                );
          }
          function d(e, t) {
            if ('""' === t) return e;
            if ('""' === e) return t;
            if ("string" == typeof e) {
              if (t instanceof s || '"' !== e[e.length - 1]) return;
              return "string" != typeof t
                ? `${e.slice(0, -1)}${t}"`
                : '"' === t[0]
                ? e.slice(0, -1) + t.slice(1)
                : void 0;
            }
            return "string" != typeof t || '"' !== t[0] || e instanceof s
              ? void 0
              : `"${e}${t.slice(1)}`;
          }
          function u(e) {
            return JSON.stringify(e)
              .replace(/\u2028/g, "\\u2028")
              .replace(/\u2029/g, "\\u2029");
          }
          (r.str = c),
            (r.addCodeArg = l),
            (r.strConcat = function (e, t) {
              return t.emptyStr() ? e : e.emptyStr() ? t : c`${e}${t}`;
            }),
            (r.stringify = function (e) {
              return new a(u(e));
            }),
            (r.safeStringify = u),
            (r.getProperty = function (e) {
              return "string" == typeof e && r.IDENTIFIER.test(e)
                ? new a(`.${e}`)
                : n`[${e}]`;
            }),
            (r.getEsmExportName = function (e) {
              if ("string" == typeof e && r.IDENTIFIER.test(e))
                return new a(`${e}`);
              throw new Error(
                `CodeGen: invalid export name: ${e}, use explicit $id name mapping`
              );
            }),
            (r.regexpCode = function (e) {
              return new a(e.toString());
            });
        },
        {},
      ],
      2: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.or =
              r.and =
              r.not =
              r.CodeGen =
              r.operators =
              r.varKinds =
              r.ValueScopeName =
              r.ValueScope =
              r.Scope =
              r.Name =
              r.regexpCode =
              r.stringify =
              r.getProperty =
              r.nil =
              r.strConcat =
              r.str =
              r._ =
                void 0);
          const o = e("./code"),
            s = e("./scope");
          var a = e("./code");
          Object.defineProperty(r, "_", {
            enumerable: !0,
            get() {
              return a._;
            },
          }),
            Object.defineProperty(r, "str", {
              enumerable: !0,
              get() {
                return a.str;
              },
            }),
            Object.defineProperty(r, "strConcat", {
              enumerable: !0,
              get() {
                return a.strConcat;
              },
            }),
            Object.defineProperty(r, "nil", {
              enumerable: !0,
              get() {
                return a.nil;
              },
            }),
            Object.defineProperty(r, "getProperty", {
              enumerable: !0,
              get() {
                return a.getProperty;
              },
            }),
            Object.defineProperty(r, "stringify", {
              enumerable: !0,
              get() {
                return a.stringify;
              },
            }),
            Object.defineProperty(r, "regexpCode", {
              enumerable: !0,
              get() {
                return a.regexpCode;
              },
            }),
            Object.defineProperty(r, "Name", {
              enumerable: !0,
              get() {
                return a.Name;
              },
            });
          var n = e("./scope");
          Object.defineProperty(r, "Scope", {
            enumerable: !0,
            get() {
              return n.Scope;
            },
          }),
            Object.defineProperty(r, "ValueScope", {
              enumerable: !0,
              get() {
                return n.ValueScope;
              },
            }),
            Object.defineProperty(r, "ValueScopeName", {
              enumerable: !0,
              get() {
                return n.ValueScopeName;
              },
            }),
            Object.defineProperty(r, "varKinds", {
              enumerable: !0,
              get() {
                return n.varKinds;
              },
            }),
            (r.operators = {
              GT: new o._Code(">"),
              GTE: new o._Code(">="),
              LT: new o._Code("<"),
              LTE: new o._Code("<="),
              EQ: new o._Code("==="),
              NEQ: new o._Code("!=="),
              NOT: new o._Code("!"),
              OR: new o._Code("||"),
              AND: new o._Code("&&"),
              ADD: new o._Code("+"),
            });
          class i {
            optimizeNodes() {
              return this;
            }
            optimizeNames(e, t) {
              return this;
            }
          }
          class c extends i {
            constructor(e, t, r) {
              super(), (this.varKind = e), (this.name = t), (this.rhs = r);
            }
            render({ es5: e, _n: t }) {
              return (
                `${e ? s.varKinds.var : this.varKind} ${this.name}${
                  void 0 === this.rhs ? "" : ` = ${this.rhs}`
                };` + t
              );
            }
            optimizeNames(e, t) {
              if (e[this.name.str])
                return this.rhs && (this.rhs = x(this.rhs, e, t)), this;
            }
            get names() {
              return this.rhs instanceof o._CodeOrName ? this.rhs.names : {};
            }
          }
          class l extends i {
            constructor(e, t, r) {
              super(), (this.lhs = e), (this.rhs = t), (this.sideEffects = r);
            }
            render({ _n: e }) {
              return `${this.lhs} = ${this.rhs};` + e;
            }
            optimizeNames(e, t) {
              if (
                !(this.lhs instanceof o.Name) ||
                e[this.lhs.str] ||
                this.sideEffects
              )
                return (this.rhs = x(this.rhs, e, t)), this;
            }
            get names() {
              return O(
                this.lhs instanceof o.Name
                  ? {}
                  : {
                      ...this.lhs.names,
                    },
                this.rhs
              );
            }
          }
          class d extends l {
            constructor(e, t, r, o) {
              super(e, r, o), (this.op = t);
            }
            render({ _n: e }) {
              return `${this.lhs} ${this.op}= ${this.rhs};` + e;
            }
          }
          class u extends i {
            constructor(e) {
              super(), (this.label = e), (this.names = {});
            }
            render({ _n: e }) {
              return `${this.label}:` + e;
            }
          }
          class f extends i {
            constructor(e) {
              super(), (this.label = e), (this.names = {});
            }
            render({ _n: e }) {
              return `break ${this.label ? ` ${this.label}` : ""};` + e;
            }
          }
          class p extends i {
            constructor(e) {
              super(), (this.error = e);
            }
            render({ _n: e }) {
              return `throw ${this.error};` + e;
            }
            get names() {
              return this.error.names;
            }
          }
          class m extends i {
            constructor(e) {
              super(), (this.code = e);
            }
            render({ _n: e }) {
              return `${this.code};` + e;
            }
            optimizeNodes() {
              return `${this.code}` ? this : void 0;
            }
            optimizeNames(e, t) {
              return (this.code = x(this.code, e, t)), this;
            }
            get names() {
              return this.code instanceof o._CodeOrName ? this.code.names : {};
            }
          }
          class h extends i {
            constructor(e = []) {
              super(), (this.nodes = e);
            }
            render(e) {
              return this.nodes.reduce((t, r) => t + r.render(e), "");
            }
            optimizeNodes() {
              const { nodes: e } = this;
              let t = e.length;
              for (; t--; ) {
                const r = e[t].optimizeNodes();
                Array.isArray(r)
                  ? e.splice(t, 1, ...r)
                  : r
                  ? (e[t] = r)
                  : e.splice(t, 1);
              }
              return e.length > 0 ? this : void 0;
            }
            optimizeNames(e, t) {
              const { nodes: r } = this;
              let o = r.length;
              for (; o--; ) {
                const s = r[o];
                s.optimizeNames(e, t) || (T(e, s.names), r.splice(o, 1));
              }
              return r.length > 0 ? this : void 0;
            }
            get names() {
              return this.nodes.reduce((e, t) => C(e, t.names), {});
            }
          }
          class y extends h {
            render(e) {
              return "{" + e._n + super.render(e) + "}" + e._n;
            }
          }
          class v extends h {}
          class g extends y {}
          g.kind = "else";
          class $ extends y {
            constructor(e, t) {
              super(t), (this.condition = e);
            }
            render(e) {
              let t = `if(${this.condition})` + super.render(e);
              return this.else && (t += "else " + this.else.render(e)), t;
            }
            optimizeNodes() {
              super.optimizeNodes();
              const e = this.condition;
              if (!0 === e) return this.nodes;
              let t = this.else;
              if (t) {
                const e = t.optimizeNodes();
                t = this.else = Array.isArray(e) ? new g(e) : e;
              }
              return t
                ? !1 === e
                  ? t instanceof $
                    ? t
                    : t.nodes
                  : this.nodes.length
                  ? this
                  : new $(I(e), t instanceof $ ? [t] : t.nodes)
                : !1 !== e && this.nodes.length
                ? this
                : void 0;
            }
            optimizeNames(e, t) {
              var r;
              if (
                ((this.else =
                  null === (r = this.else) || void 0 === r
                    ? void 0
                    : r.optimizeNames(e, t)),
                super.optimizeNames(e, t) || this.else)
              )
                return (this.condition = x(this.condition, e, t)), this;
            }
            get names() {
              const e = super.names;
              return (
                O(e, this.condition), this.else && C(e, this.else.names), e
              );
            }
          }
          $.kind = "if";
          class _ extends y {}
          _.kind = "for";
          class w extends _ {
            constructor(e) {
              super(), (this.iteration = e);
            }
            render(e) {
              return `for(${this.iteration})` + super.render(e);
            }
            optimizeNames(e, t) {
              if (super.optimizeNames(e, t))
                return (this.iteration = x(this.iteration, e, t)), this;
            }
            get names() {
              return C(super.names, this.iteration.names);
            }
          }
          class b extends _ {
            constructor(e, t, r, o) {
              super(),
                (this.varKind = e),
                (this.name = t),
                (this.from = r),
                (this.to = o);
            }
            render(e) {
              const t = e.es5 ? s.varKinds.var : this.varKind,
                { name: r, from: o, to: a } = this;
              return `for(${t} ${r}=${o}; ${r}<${a}; ${r}++)` + super.render(e);
            }
            get names() {
              const e = O(super.names, this.from);
              return O(e, this.to);
            }
          }
          class E extends _ {
            constructor(e, t, r, o) {
              super(),
                (this.loop = e),
                (this.varKind = t),
                (this.name = r),
                (this.iterable = o);
            }
            render(e) {
              return (
                `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` +
                super.render(e)
              );
            }
            optimizeNames(e, t) {
              if (super.optimizeNames(e, t))
                return (this.iterable = x(this.iterable, e, t)), this;
            }
            get names() {
              return C(super.names, this.iterable.names);
            }
          }
          class P extends y {
            constructor(e, t, r) {
              super(), (this.name = e), (this.args = t), (this.async = r);
            }
            render(e) {
              return (
                `${this.async ? "async " : ""}function ${this.name}(${
                  this.args
                })` + super.render(e)
              );
            }
          }
          P.kind = "func";
          class S extends h {
            render(e) {
              return "return " + super.render(e);
            }
          }
          S.kind = "return";
          class N extends y {
            render(e) {
              let t = "try" + super.render(e);
              return (
                this.catch && (t += this.catch.render(e)),
                this.finally && (t += this.finally.render(e)),
                t
              );
            }
            optimizeNodes() {
              var e, t;
              return (
                super.optimizeNodes(),
                null === (e = this.catch) || void 0 === e || e.optimizeNodes(),
                null === (t = this.finally) ||
                  void 0 === t ||
                  t.optimizeNodes(),
                this
              );
            }
            optimizeNames(e, t) {
              var r, o;
              return (
                super.optimizeNames(e, t),
                null === (r = this.catch) ||
                  void 0 === r ||
                  r.optimizeNames(e, t),
                null === (o = this.finally) ||
                  void 0 === o ||
                  o.optimizeNames(e, t),
                this
              );
            }
            get names() {
              const e = super.names;
              return (
                this.catch && C(e, this.catch.names),
                this.finally && C(e, this.finally.names),
                e
              );
            }
          }
          class k extends y {
            constructor(e) {
              super(), (this.error = e);
            }
            render(e) {
              return `catch(${this.error})` + super.render(e);
            }
          }
          k.kind = "catch";
          class j extends y {
            render(e) {
              return "finally" + super.render(e);
            }
          }
          j.kind = "finally";
          function C(e, t) {
            for (const r in t) e[r] = (e[r] || 0) + (t[r] || 0);
            return e;
          }
          function O(e, t) {
            return t instanceof o._CodeOrName ? C(e, t.names) : e;
          }
          function x(e, t, r) {
            return e instanceof o.Name
              ? a(e)
              : (s = e) instanceof o._Code &&
                s._items.some(
                  (e) =>
                    e instanceof o.Name && 1 === t[e.str] && void 0 !== r[e.str]
                )
              ? new o._Code(
                  e._items.reduce(
                    (e, t) => (
                      t instanceof o.Name && (t = a(t)),
                      t instanceof o._Code ? e.push(...t._items) : e.push(t),
                      e
                    ),
                    []
                  )
                )
              : e;
            var s;
            function a(e) {
              const o = r[e.str];
              return void 0 === o || 1 !== t[e.str] ? e : (delete t[e.str], o);
            }
          }
          function T(e, t) {
            for (const r in t) e[r] = (e[r] || 0) - (t[r] || 0);
          }
          function I(e) {
            return "boolean" == typeof e || "number" == typeof e || null === e
              ? !e
              : o._`!${M(e)}`;
          }
          (r.CodeGen = class {
            constructor(e, t = {}) {
              (this._values = {}),
                (this._blockStarts = []),
                (this._constants = {}),
                (this.opts = {
                  ...t,
                  _n: t.lines ? "\n" : "",
                }),
                (this._extScope = e),
                (this._scope = new s.Scope({
                  parent: e,
                })),
                (this._nodes = [new v()]);
            }
            toString() {
              return this._root.render(this.opts);
            }
            name(e) {
              return this._scope.name(e);
            }
            scopeName(e) {
              return this._extScope.name(e);
            }
            scopeValue(e, t) {
              const r = this._extScope.value(e, t);
              return (
                (
                  this._values[r.prefix] || (this._values[r.prefix] = new Set())
                ).add(r),
                r
              );
            }
            getScopeValue(e, t) {
              return this._extScope.getValue(e, t);
            }
            scopeRefs(e) {
              return this._extScope.scopeRefs(e, this._values);
            }
            scopeCode() {
              return this._extScope.scopeCode(this._values);
            }
            _def(e, t, r, o) {
              const s = this._scope.toName(t);
              return (
                void 0 !== r && o && (this._constants[s.str] = r),
                this._leafNode(new c(e, s, r)),
                s
              );
            }
            const(e, t, r) {
              return this._def(s.varKinds.const, e, t, r);
            }
            let(e, t, r) {
              return this._def(s.varKinds.let, e, t, r);
            }
            var(e, t, r) {
              return this._def(s.varKinds.var, e, t, r);
            }
            assign(e, t, r) {
              return this._leafNode(new l(e, t, r));
            }
            add(e, t) {
              return this._leafNode(new d(e, r.operators.ADD, t));
            }
            code(e) {
              return (
                "function" == typeof e
                  ? e()
                  : e !== o.nil && this._leafNode(new m(e)),
                this
              );
            }
            object(...e) {
              const t = ["{"];
              for (const [r, s] of e)
                t.length > 1 && t.push(","),
                  t.push(r),
                  (r !== s || this.opts.es5) &&
                    (t.push(":"), (0, o.addCodeArg)(t, s));
              return t.push("}"), new o._Code(t);
            }
            if(e, t, r) {
              if ((this._blockNode(new $(e)), t && r))
                this.code(t).else().code(r).endIf();
              else if (t) this.code(t).endIf();
              else if (r)
                throw new Error('CodeGen: "else" body without "then" body');
              return this;
            }
            elseIf(e) {
              return this._elseNode(new $(e));
            }
            else() {
              return this._elseNode(new g());
            }
            endIf() {
              return this._endBlockNode($, g);
            }
            _for(e, t) {
              return this._blockNode(e), t && this.code(t).endFor(), this;
            }
            for(e, t) {
              return this._for(new w(e), t);
            }
            forRange(
              e,
              t,
              r,
              o,
              a = this.opts.es5 ? s.varKinds.var : s.varKinds.let
            ) {
              const n = this._scope.toName(e);
              return this._for(new b(a, n, t, r), () => o(n));
            }
            forOf(e, t, r, a = s.varKinds.const) {
              const n = this._scope.toName(e);
              if (this.opts.es5) {
                const e = t instanceof o.Name ? t : this.var("_arr", t);
                return this.forRange("_i", 0, o._`${e}.length`, (t) => {
                  this.var(n, o._`${e}[${t}]`), r(n);
                });
              }
              return this._for(new E("of", a, n, t), () => r(n));
            }
            forIn(
              e,
              t,
              r,
              a = this.opts.es5 ? s.varKinds.var : s.varKinds.const
            ) {
              if (this.opts.ownProperties)
                return this.forOf(e, o._`Object.keys(${t})`, r);
              const n = this._scope.toName(e);
              return this._for(new E("in", a, n, t), () => r(n));
            }
            endFor() {
              return this._endBlockNode(_);
            }
            label(e) {
              return this._leafNode(new u(e));
            }
            break(e) {
              return this._leafNode(new f(e));
            }
            return(e) {
              const t = new S();
              if ((this._blockNode(t), this.code(e), 1 !== t.nodes.length))
                throw new Error('CodeGen: "return" should have one node');
              return this._endBlockNode(S);
            }
            try(e, t, r) {
              if (!t && !r)
                throw new Error('CodeGen: "try" without "catch" and "finally"');
              const o = new N();
              if ((this._blockNode(o), this.code(e), t)) {
                const e = this.name("e");
                (this._currNode = o.catch = new k(e)), t(e);
              }
              return (
                r && ((this._currNode = o.finally = new j()), this.code(r)),
                this._endBlockNode(k, j)
              );
            }
            throw(e) {
              return this._leafNode(new p(e));
            }
            block(e, t) {
              return (
                this._blockStarts.push(this._nodes.length),
                e && this.code(e).endBlock(t),
                this
              );
            }
            endBlock(e) {
              const t = this._blockStarts.pop();
              if (void 0 === t)
                throw new Error("CodeGen: not in self-balancing block");
              const r = this._nodes.length - t;
              if (r < 0 || (void 0 !== e && r !== e))
                throw new Error(
                  `CodeGen: wrong number of nodes: ${r} vs ${e} expected`
                );
              return (this._nodes.length = t), this;
            }
            func(e, t = o.nil, r, s) {
              return (
                this._blockNode(new P(e, t, r)),
                s && this.code(s).endFunc(),
                this
              );
            }
            endFunc() {
              return this._endBlockNode(P);
            }
            optimize(e = 1) {
              for (; e-- > 0; )
                this._root.optimizeNodes(),
                  this._root.optimizeNames(this._root.names, this._constants);
            }
            _leafNode(e) {
              return this._currNode.nodes.push(e), this;
            }
            _blockNode(e) {
              this._currNode.nodes.push(e), this._nodes.push(e);
            }
            _endBlockNode(e, t) {
              const r = this._currNode;
              if (r instanceof e || (t && r instanceof t))
                return this._nodes.pop(), this;
              throw new Error(
                `CodeGen: not in block "${t ? `${e.kind}/${t.kind}` : e.kind}"`
              );
            }
            _elseNode(e) {
              const t = this._currNode;
              if (!(t instanceof $))
                throw new Error('CodeGen: "else" without "if"');
              return (this._currNode = t.else = e), this;
            }
            get _root() {
              return this._nodes[0];
            }
            get _currNode() {
              const e = this._nodes;
              return e[e.length - 1];
            }
            set _currNode(e) {
              const t = this._nodes;
              t[t.length - 1] = e;
            }
          }),
            (r.not = I);
          const R = A(r.operators.AND);
          r.and = function (...e) {
            return e.reduce(R);
          };
          const D = A(r.operators.OR);
          function A(e) {
            return (t, r) =>
              t === o.nil ? r : r === o.nil ? t : o._`${M(t)} ${e} ${M(r)}`;
          }
          function M(e) {
            return e instanceof o.Name ? e : o._`(${e})`;
          }
          r.or = function (...e) {
            return e.reduce(D);
          };
        },
        {
          "./code": 1,
          "./scope": 3,
        },
      ],
      3: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.ValueScope =
              r.ValueScopeName =
              r.Scope =
              r.varKinds =
              r.UsedValueState =
                void 0);
          const o = e("./code");
          class s extends Error {
            constructor(e) {
              super(`CodeGen: "code" for ${e} not defined`),
                (this.value = e.value);
            }
          }
          var a;
          !(function (e) {
            (e[(e.Started = 0)] = "Started"),
              (e[(e.Completed = 1)] = "Completed");
          })((a = r.UsedValueState || (r.UsedValueState = {}))),
            (r.varKinds = {
              const: new o.Name("const"),
              let: new o.Name("let"),
              var: new o.Name("var"),
            });
          class n {
            constructor({ prefixes: e, parent: t } = {}) {
              (this._names = {}), (this._prefixes = e), (this._parent = t);
            }
            toName(e) {
              return e instanceof o.Name ? e : this.name(e);
            }
            name(e) {
              return new o.Name(this._newName(e));
            }
            _newName(e) {
              return `${e}${(this._names[e] || this._nameGroup(e)).index++}`;
            }
            _nameGroup(e) {
              var t, r;
              if (
                (null ===
                  (r =
                    null === (t = this._parent) || void 0 === t
                      ? void 0
                      : t._prefixes) || void 0 === r
                  ? void 0
                  : r.has(e)) ||
                (this._prefixes && !this._prefixes.has(e))
              )
                throw new Error(
                  `CodeGen: prefix "${e}" is not allowed in this scope`
                );
              return (this._names[e] = {
                prefix: e,
                index: 0,
              });
            }
          }
          r.Scope = n;
          class i extends o.Name {
            constructor(e, t) {
              super(t), (this.prefix = e);
            }
            setValue(e, { property: t, itemIndex: r }) {
              (this.value = e), (this.scopePath = o._`.${new o.Name(t)}[${r}]`);
            }
          }
          r.ValueScopeName = i;
          const c = o._`\n`;
          r.ValueScope = class extends n {
            constructor(e) {
              super(e),
                (this._values = {}),
                (this._scope = e.scope),
                (this.opts = {
                  ...e,
                  _n: e.lines ? c : o.nil,
                });
            }
            get() {
              return this._scope;
            }
            name(e) {
              return new i(e, this._newName(e));
            }
            value(e, t) {
              var r;
              if (void 0 === t.ref)
                throw new Error("CodeGen: ref must be passed in value");
              const o = this.toName(e),
                { prefix: s } = o,
                a = null !== (r = t.key) && void 0 !== r ? r : t.ref;
              let n = this._values[s];
              if (n) {
                const e = n.get(a);
                if (e) return e;
              } else n = this._values[s] = new Map();
              n.set(a, o);
              const i = this._scope[s] || (this._scope[s] = []),
                c = i.length;
              return (
                (i[c] = t.ref),
                o.setValue(t, {
                  property: s,
                  itemIndex: c,
                }),
                o
              );
            }
            getValue(e, t) {
              const r = this._values[e];
              if (r) return r.get(t);
            }
            scopeRefs(e, t = this._values) {
              return this._reduceValues(t, (t) => {
                if (void 0 === t.scopePath)
                  throw new Error(`CodeGen: name "${t}" has no value`);
                return o._`${e}${t.scopePath}`;
              });
            }
            scopeCode(e = this._values, t, r) {
              return this._reduceValues(
                e,
                (e) => {
                  if (void 0 === e.value)
                    throw new Error(`CodeGen: name "${e}" has no value`);
                  return e.value.code;
                },
                t,
                r
              );
            }
            _reduceValues(e, t, n = {}, i) {
              let c = o.nil;
              for (const l in e) {
                const d = e[l];
                if (!d) continue;
                const u = (n[l] = n[l] || new Map());
                d.forEach((e) => {
                  if (u.has(e)) return;
                  u.set(e, a.Started);
                  let n = t(e);
                  if (n) {
                    c = o._`${c}${
                      this.opts.es5 ? r.varKinds.var : r.varKinds.const
                    } ${e} = ${n};${this.opts._n}`;
                  } else {
                    if (!(n = null == i ? void 0 : i(e))) throw new s(e);
                    c = o._`${c}${n}${this.opts._n}`;
                  }
                  u.set(e, a.Completed);
                });
              }
              return c;
            }
          };
        },
        {
          "./code": 1,
        },
      ],
      4: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.extendErrors =
              r.resetErrorsCount =
              r.reportExtraError =
              r.reportError =
              r.keyword$DataError =
              r.keywordError =
                void 0);
          const o = e("./codegen"),
            s = e("./util"),
            a = e("./names");
          function n(e, t) {
            const r = e.const("err", t);
            e.if(
              o._`${a.default.vErrors} === null`,
              () => e.assign(a.default.vErrors, o._`[${r}]`),
              o._`${a.default.vErrors}.push(${r})`
            ),
              e.code(o._`${a.default.errors}++`);
          }
          function i(e, t) {
            const { gen: r, validateName: s, schemaEnv: a } = e;
            a.$async
              ? r.throw(o._`new ${e.ValidationError}(${t})`)
              : (r.assign(o._`${s}.errors`, t), r.return(!1));
          }
          (r.keywordError = {
            message({ keyword: e }) {
              return o.str`must pass "${e}" keyword validation`;
            },
          }),
            (r.keyword$DataError = {
              message({ keyword: e, schemaType: t }) {
                return t
                  ? o.str`"${e}" keyword must be ${t} ($data)`
                  : o.str`"${e}" keyword is invalid ($data)`;
              },
            }),
            (r.reportError = function (e, t = r.keywordError, s, a) {
              const { it: c } = e,
                { gen: d, compositeRule: u, allErrors: f } = c,
                p = l(e, t, s);
              (null != a ? a : u || f) ? n(d, p) : i(c, o._`[${p}]`);
            }),
            (r.reportExtraError = function (e, t = r.keywordError, o) {
              const { it: s } = e,
                { gen: c, compositeRule: d, allErrors: u } = s;
              n(c, l(e, t, o)), d || u || i(s, a.default.vErrors);
            }),
            (r.resetErrorsCount = function (e, t) {
              e.assign(a.default.errors, t),
                e.if(o._`${a.default.vErrors} !== null`, () =>
                  e.if(
                    t,
                    () => e.assign(o._`${a.default.vErrors}.length`, t),
                    () => e.assign(a.default.vErrors, null)
                  )
                );
            }),
            (r.extendErrors = function ({
              gen: e,
              keyword: t,
              schemaValue: r,
              data: s,
              errsCount: n,
              it: i,
            }) {
              if (void 0 === n) throw new Error("ajv implementation error");
              const c = e.name("err");
              e.forRange("i", n, a.default.errors, (n) => {
                e.const(c, o._`${a.default.vErrors}[${n}]`),
                  e.if(o._`${c}.instancePath === undefined`, () =>
                    e.assign(
                      o._`${c}.instancePath`,
                      (0, o.strConcat)(a.default.instancePath, i.errorPath)
                    )
                  ),
                  e.assign(
                    o._`${c}.schemaPath`,
                    o.str`${i.errSchemaPath}/${t}`
                  ),
                  i.opts.verbose &&
                    (e.assign(o._`${c}.schema`, r),
                    e.assign(o._`${c}.data`, s));
              });
            });
          const c = {
            keyword: new o.Name("keyword"),
            schemaPath: new o.Name("schemaPath"),
            params: new o.Name("params"),
            propertyName: new o.Name("propertyName"),
            message: new o.Name("message"),
            schema: new o.Name("schema"),
            parentSchema: new o.Name("parentSchema"),
          };
          function l(e, t, r) {
            const { createErrors: s } = e.it;
            return !1 === s
              ? o._`{}`
              : (function (e, t, r = {}) {
                  const { gen: s, it: n } = e,
                    i = [d(n, r), u(e, r)];
                  return (
                    (function (e, { params: t, message: r }, s) {
                      const { keyword: n, data: i, schemaValue: l, it: d } = e,
                        {
                          opts: u,
                          propertyName: f,
                          topSchemaRef: p,
                          schemaPath: m,
                        } = d;
                      s.push(
                        [c.keyword, n],
                        [c.params, "function" == typeof t ? t(e) : t || o._`{}`]
                      ),
                        u.messages &&
                          s.push([
                            c.message,
                            "function" == typeof r ? r(e) : r,
                          ]);
                      u.verbose &&
                        s.push(
                          [c.schema, l],
                          [c.parentSchema, o._`${p}${m}`],
                          [a.default.data, i]
                        );
                      f && s.push([c.propertyName, f]);
                    })(e, t, i),
                    s.object(...i)
                  );
                })(e, t, r);
          }
          function d({ errorPath: e }, { instancePath: t }) {
            const r = t ? o.str`${e}${(0, s.getErrorPath)(t, s.Type.Str)}` : e;
            return [
              a.default.instancePath,
              (0, o.strConcat)(a.default.instancePath, r),
            ];
          }
          function u(
            { keyword: e, it: { errSchemaPath: t } },
            { schemaPath: r, parentSchema: a }
          ) {
            let n = a ? t : o.str`${t}/${e}`;
            return (
              r && (n = o.str`${n}${(0, s.getErrorPath)(r, s.Type.Str)}`),
              [c.schemaPath, n]
            );
          }
        },
        {
          "./codegen": 2,
          "./names": 6,
          "./util": 10,
        },
      ],
      5: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.resolveSchema =
              r.getCompilingSchema =
              r.resolveRef =
              r.compileSchema =
              r.SchemaEnv =
                void 0);
          const o = e("./codegen"),
            s = e("../runtime/validation_error"),
            a = e("./names"),
            n = e("./resolve"),
            i = e("./util"),
            c = e("./validate");
          class l {
            constructor(e) {
              var t;
              let r;
              (this.refs = {}),
                (this.dynamicAnchors = {}),
                "object" == typeof e.schema && (r = e.schema),
                (this.schema = e.schema),
                (this.schemaId = e.schemaId),
                (this.root = e.root || this),
                (this.baseId =
                  null !== (t = e.baseId) && void 0 !== t
                    ? t
                    : (0, n.normalizeId)(
                        null == r ? void 0 : r[e.schemaId || "$id"]
                      )),
                (this.schemaPath = e.schemaPath),
                (this.localRefs = e.localRefs),
                (this.meta = e.meta),
                (this.$async = null == r ? void 0 : r.$async),
                (this.refs = {});
            }
          }
          function d(e) {
            const t = f.call(this, e);
            if (t) return t;
            const r = (0, n.getFullPath)(this.opts.uriResolver, e.root.baseId),
              { es5: i, lines: l } = this.opts.code,
              { ownProperties: d } = this.opts,
              u = new o.CodeGen(this.scope, {
                es5: i,
                lines: l,
                ownProperties: d,
              });
            let p;
            e.$async &&
              (p = u.scopeValue("Error", {
                ref: s.default,
                code: o._`require("ajv/dist/runtime/validation_error").default`,
              }));
            const m = u.scopeName("validate");
            e.validateName = m;
            const h = {
              gen: u,
              allErrors: this.opts.allErrors,
              data: a.default.data,
              parentData: a.default.parentData,
              parentDataProperty: a.default.parentDataProperty,
              dataNames: [a.default.data],
              dataPathArr: [o.nil],
              dataLevel: 0,
              dataTypes: [],
              definedProperties: new Set(),
              topSchemaRef: u.scopeValue(
                "schema",
                !0 === this.opts.code.source
                  ? {
                      ref: e.schema,
                      code: (0, o.stringify)(e.schema),
                    }
                  : {
                      ref: e.schema,
                    }
              ),
              validateName: m,
              ValidationError: p,
              schema: e.schema,
              schemaEnv: e,
              rootId: r,
              baseId: e.baseId || r,
              schemaPath: o.nil,
              errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
              errorPath: o._`""`,
              opts: this.opts,
              self: this,
            };
            let y;
            try {
              this._compilations.add(e),
                (0, c.validateFunctionCode)(h),
                u.optimize(this.opts.code.optimize);
              const t = u.toString();
              (y = `${u.scopeRefs(a.default.scope)}return ${t}`),
                this.opts.code.process && (y = this.opts.code.process(y, e));
              const r = new Function(
                `${a.default.self}`,
                `${a.default.scope}`,
                y
              )(this, this.scope.get());
              if (
                (this.scope.value(m, {
                  ref: r,
                }),
                (r.errors = null),
                (r.schema = e.schema),
                (r.schemaEnv = e),
                e.$async && (r.$async = !0),
                !0 === this.opts.code.source &&
                  (r.source = {
                    validateName: m,
                    validateCode: t,
                    scopeValues: u._values,
                  }),
                this.opts.unevaluated)
              ) {
                const { props: e, items: t } = h;
                (r.evaluated = {
                  props: e instanceof o.Name ? void 0 : e,
                  items: t instanceof o.Name ? void 0 : t,
                  dynamicProps: e instanceof o.Name,
                  dynamicItems: t instanceof o.Name,
                }),
                  r.source &&
                    (r.source.evaluated = (0, o.stringify)(r.evaluated));
              }
              return (e.validate = r), e;
            } catch (t) {
              throw (
                (delete e.validate,
                delete e.validateName,
                y &&
                  this.logger.error(
                    "Error compiling schema, function code:",
                    y
                  ),
                t)
              );
            } finally {
              this._compilations.delete(e);
            }
          }
          function u(e) {
            return (0, n.inlineRef)(e.schema, this.opts.inlineRefs)
              ? e.schema
              : e.validate
              ? e
              : d.call(this, e);
          }
          function f(e) {
            for (const o of this._compilations)
              if (
                (t = o).schema === (r = e).schema &&
                t.root === r.root &&
                t.baseId === r.baseId
              )
                return o;
            var t, r;
          }
          function p(e, t) {
            let r;
            for (; "string" == typeof (r = this.refs[t]); ) t = r;
            return r || this.schemas[t] || m.call(this, e, t);
          }
          function m(e, t) {
            const r = this.opts.uriResolver.parse(t),
              o = (0, n._getFullPath)(this.opts.uriResolver, r);
            let s = (0, n.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
            if (Object.keys(e.schema).length > 0 && o === s)
              return y.call(this, r, e);
            const a = (0, n.normalizeId)(o),
              i = this.refs[a] || this.schemas[a];
            if ("string" == typeof i) {
              const t = m.call(this, e, i);
              if ("object" != typeof (null == t ? void 0 : t.schema)) return;
              return y.call(this, r, t);
            }
            if ("object" == typeof (null == i ? void 0 : i.schema)) {
              if (
                (i.validate || d.call(this, i), a === (0, n.normalizeId)(t))
              ) {
                const { schema: t } = i,
                  { schemaId: r } = this.opts,
                  o = t[r];
                return (
                  o && (s = (0, n.resolveUrl)(this.opts.uriResolver, s, o)),
                  new l({
                    schema: t,
                    schemaId: r,
                    root: e,
                    baseId: s,
                  })
                );
              }
              return y.call(this, r, i);
            }
          }
          (r.SchemaEnv = l),
            (r.compileSchema = d),
            (r.resolveRef = function (e, t, r) {
              var o;
              r = (0, n.resolveUrl)(this.opts.uriResolver, t, r);
              const s = e.refs[r];
              if (s) return s;
              let a = p.call(this, e, r);
              if (void 0 === a) {
                const s =
                    null === (o = e.localRefs) || void 0 === o ? void 0 : o[r],
                  { schemaId: n } = this.opts;
                s &&
                  (a = new l({
                    schema: s,
                    schemaId: n,
                    root: e,
                    baseId: t,
                  }));
              }
              return void 0 !== a ? (e.refs[r] = u.call(this, a)) : void 0;
            }),
            (r.getCompilingSchema = f),
            (r.resolveSchema = m);
          const h = new Set([
            "properties",
            "patternProperties",
            "enum",
            "dependencies",
            "definitions",
          ]);
          function y(e, { baseId: t, schema: r, root: o }) {
            var s;
            if (
              "/" !==
              (null === (s = e.fragment) || void 0 === s ? void 0 : s[0])
            )
              return;
            for (const o of e.fragment.slice(1).split("/")) {
              if ("boolean" == typeof r) return;
              const e = r[(0, i.unescapeFragment)(o)];
              if (void 0 === e) return;
              const s = "object" == typeof (r = e) && r[this.opts.schemaId];
              !h.has(o) &&
                s &&
                (t = (0, n.resolveUrl)(this.opts.uriResolver, t, s));
            }
            let a;
            if (
              "boolean" != typeof r &&
              r.$ref &&
              !(0, i.schemaHasRulesButRef)(r, this.RULES)
            ) {
              const e = (0, n.resolveUrl)(this.opts.uriResolver, t, r.$ref);
              a = m.call(this, o, e);
            }
            const { schemaId: c } = this.opts;
            return (
              (a =
                a ||
                new l({
                  schema: r,
                  schemaId: c,
                  root: o,
                  baseId: t,
                })),
              a.schema !== a.root.schema ? a : void 0
            );
          }
        },
        {
          "../runtime/validation_error": 24,
          "./codegen": 2,
          "./names": 6,
          "./resolve": 8,
          "./util": 10,
          "./validate": 15,
        },
      ],
      6: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("./codegen"),
            s = {
              data: new o.Name("data"),
              valCxt: new o.Name("valCxt"),
              instancePath: new o.Name("instancePath"),
              parentData: new o.Name("parentData"),
              parentDataProperty: new o.Name("parentDataProperty"),
              rootData: new o.Name("rootData"),
              dynamicAnchors: new o.Name("dynamicAnchors"),
              vErrors: new o.Name("vErrors"),
              errors: new o.Name("errors"),
              this: new o.Name("this"),
              self: new o.Name("self"),
              scope: new o.Name("scope"),
              json: new o.Name("json"),
              jsonPos: new o.Name("jsonPos"),
              jsonLen: new o.Name("jsonLen"),
              jsonPart: new o.Name("jsonPart"),
            };
          r.default = s;
        },
        {
          "./codegen": 2,
        },
      ],
      7: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("./resolve");
          class s extends Error {
            constructor(e, t, r, s) {
              super(s || `can't resolve reference ${r} from id ${t}`),
                (this.missingRef = (0, o.resolveUrl)(e, t, r)),
                (this.missingSchema = (0, o.normalizeId)(
                  (0, o.getFullPath)(e, this.missingRef)
                ));
            }
          }
          r.default = s;
        },
        {
          "./resolve": 8,
        },
      ],
      8: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.getSchemaRefs =
              r.resolveUrl =
              r.normalizeId =
              r._getFullPath =
              r.getFullPath =
              r.inlineRef =
                void 0);
          const o = e("./util"),
            s = e("fast-deep-equal"),
            a = e("json-schema-traverse"),
            n = new Set([
              "type",
              "format",
              "pattern",
              "maxLength",
              "minLength",
              "maxProperties",
              "minProperties",
              "maxItems",
              "minItems",
              "maximum",
              "minimum",
              "uniqueItems",
              "multipleOf",
              "required",
              "enum",
              "const",
            ]);
          r.inlineRef = function (e, t = !0) {
            return (
              "boolean" == typeof e || (!0 === t ? !c(e) : !!t && l(e) <= t)
            );
          };
          const i = new Set([
            "$ref",
            "$recursiveRef",
            "$recursiveAnchor",
            "$dynamicRef",
            "$dynamicAnchor",
          ]);
          function c(e) {
            for (const t in e) {
              if (i.has(t)) return !0;
              const r = e[t];
              if (Array.isArray(r) && r.some(c)) return !0;
              if ("object" == typeof r && c(r)) return !0;
            }
            return !1;
          }
          function l(e) {
            let t = 0;
            for (const r in e) {
              if ("$ref" === r) return Infinity;
              if (
                (t++,
                !n.has(r) &&
                  ("object" == typeof e[r] &&
                    (0, o.eachItem)(e[r], (e) => (t += l(e))),
                  Infinity === t))
              )
                return Infinity;
            }
            return t;
          }
          function d(e, t = "", r) {
            !1 !== r && (t = p(t));
            const o = e.parse(t);
            return u(e, o);
          }
          function u(e, t) {
            return e.serialize(t).split("#")[0] + "#";
          }
          (r.getFullPath = d), (r._getFullPath = u);
          const f = /#\/?$/;
          function p(e) {
            return e ? e.replace(f, "") : "";
          }
          (r.normalizeId = p),
            (r.resolveUrl = function (e, t, r) {
              return (r = p(r)), e.resolve(t, r);
            });
          const m = /^[a-z_][-a-z0-9._]*$/i;
          r.getSchemaRefs = function (e, t) {
            if ("boolean" == typeof e) return {};
            const { schemaId: r, uriResolver: o } = this.opts,
              n = p(e[r] || t),
              i = {
                "": n,
              },
              c = d(o, n, !1),
              l = {},
              u = new Set();
            return (
              a(
                e,
                {
                  allKeys: !0,
                },
                (e, t, o, s) => {
                  if (void 0 === s) return;
                  const a = c + t;
                  let n = i[s];
                  function d(t) {
                    if (
                      ((t = p(
                        n ? (0, this.opts.uriResolver.resolve)(n, t) : t
                      )),
                      u.has(t))
                    )
                      throw h(t);
                    u.add(t);
                    let r = this.refs[t];
                    return (
                      "string" == typeof r && (r = this.refs[r]),
                      "object" == typeof r
                        ? f(e, r.schema, t)
                        : t !== p(a) &&
                          ("#" === t[0]
                            ? (f(e, l[t], t), (l[t] = e))
                            : (this.refs[t] = a)),
                      t
                    );
                  }
                  function y(e) {
                    if ("string" == typeof e) {
                      if (!m.test(e)) throw new Error(`invalid anchor "${e}"`);
                      d.call(this, `#${e}`);
                    }
                  }
                  "string" == typeof e[r] && (n = d.call(this, e[r])),
                    y.call(this, e.$anchor),
                    y.call(this, e.$dynamicAnchor),
                    (i[t] = n);
                }
              ),
              l
            );
            function f(e, t, r) {
              if (void 0 !== t && !s(e, t)) throw h(r);
            }
            function h(e) {
              return new Error(
                `reference "${e}" resolves to more than one schema`
              );
            }
          };
        },
        {
          "./util": 10,
          "fast-deep-equal": 63,
          "json-schema-traverse": 64,
        },
      ],
      9: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.getRules = r.isJSONType = void 0);
          const o = new Set([
            "string",
            "number",
            "integer",
            "boolean",
            "null",
            "object",
            "array",
          ]);
          (r.isJSONType = function (e) {
            return "string" == typeof e && o.has(e);
          }),
            (r.getRules = function () {
              const e = {
                number: {
                  type: "number",
                  rules: [],
                },
                string: {
                  type: "string",
                  rules: [],
                },
                array: {
                  type: "array",
                  rules: [],
                },
                object: {
                  type: "object",
                  rules: [],
                },
              };
              return {
                types: {
                  ...e,
                  integer: !0,
                  boolean: !0,
                  null: !0,
                },
                rules: [
                  {
                    rules: [],
                  },
                  e.number,
                  e.string,
                  e.array,
                  e.object,
                ],
                post: {
                  rules: [],
                },
                all: {},
                keywords: {},
              };
            });
        },
        {},
      ],
      10: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.checkStrictMode =
              r.getErrorPath =
              r.Type =
              r.useFunc =
              r.setEvaluated =
              r.evaluatedPropsToName =
              r.mergeEvaluated =
              r.eachItem =
              r.unescapeJsonPointer =
              r.escapeJsonPointer =
              r.escapeFragment =
              r.unescapeFragment =
              r.schemaRefOrVal =
              r.schemaHasRulesButRef =
              r.schemaHasRules =
              r.checkUnknownRules =
              r.alwaysValidSchema =
              r.toHash =
                void 0);
          const o = e("./codegen"),
            s = e("./codegen/code");
          function a(e, t = e.schema) {
            const { opts: r, self: o } = e;
            if (!r.strictSchema) return;
            if ("boolean" == typeof t) return;
            const s = o.RULES.keywords;
            for (const r in t) s[r] || m(e, `unknown keyword: "${r}"`);
          }
          function n(e, t) {
            if ("boolean" == typeof e) return !e;
            for (const r in e) if (t[r]) return !0;
            return !1;
          }
          function i(e) {
            return "number" == typeof e
              ? `${e}`
              : e.replace(/~/g, "~0").replace(/\//g, "~1");
          }
          function c(e) {
            return e.replace(/~1/g, "/").replace(/~0/g, "~");
          }
          function l({
            mergeNames: e,
            mergeToName: t,
            mergeValues: r,
            resultToName: s,
          }) {
            return (a, n, i, c) => {
              const l =
                void 0 === i
                  ? n
                  : i instanceof o.Name
                  ? (n instanceof o.Name ? e(a, n, i) : t(a, n, i), i)
                  : n instanceof o.Name
                  ? (t(a, i, n), n)
                  : r(n, i);
              return c !== o.Name || l instanceof o.Name ? l : s(a, l);
            };
          }
          function d(e, t) {
            if (!0 === t) return e.var("props", !0);
            const r = e.var("props", o._`{}`);
            return void 0 !== t && u(e, r, t), r;
          }
          function u(e, t, r) {
            Object.keys(r).forEach((r) =>
              e.assign(o._`${t}${(0, o.getProperty)(r)}`, !0)
            );
          }
          (r.toHash = function (e) {
            const t = {};
            for (const r of e) t[r] = !0;
            return t;
          }),
            (r.alwaysValidSchema = function (e, t) {
              return "boolean" == typeof t
                ? t
                : 0 === Object.keys(t).length ||
                    (a(e, t), !n(t, e.self.RULES.all));
            }),
            (r.checkUnknownRules = a),
            (r.schemaHasRules = n),
            (r.schemaHasRulesButRef = function (e, t) {
              if ("boolean" == typeof e) return !e;
              for (const r in e) if ("$ref" !== r && t.all[r]) return !0;
              return !1;
            }),
            (r.schemaRefOrVal = function (
              { topSchemaRef: e, schemaPath: t },
              r,
              s,
              a
            ) {
              if (!a) {
                if ("number" == typeof r || "boolean" == typeof r) return r;
                if ("string" == typeof r) return o._`${r}`;
              }
              return o._`${e}${t}${(0, o.getProperty)(s)}`;
            }),
            (r.unescapeFragment = function (e) {
              return c(decodeURIComponent(e));
            }),
            (r.escapeFragment = function (e) {
              return encodeURIComponent(i(e));
            }),
            (r.escapeJsonPointer = i),
            (r.unescapeJsonPointer = c),
            (r.eachItem = function (e, t) {
              if (Array.isArray(e)) for (const r of e) t(r);
              else t(e);
            }),
            (r.mergeEvaluated = {
              props: l({
                mergeNames(e, t, r) {
                  return e.if(o._`${r} !== true && ${t} !== undefined`, () => {
                    e.if(
                      o._`${t} === true`,
                      () => e.assign(r, !0),
                      () =>
                        e
                          .assign(r, o._`${r} || {}`)
                          .code(o._`Object.assign(${r}, ${t})`)
                    );
                  });
                },
                mergeToName(e, t, r) {
                  return e.if(o._`${r} !== true`, () => {
                    !0 === t
                      ? e.assign(r, !0)
                      : (e.assign(r, o._`${r} || {}`), u(e, r, t));
                  });
                },
                mergeValues(e, t) {
                  return (
                    !0 === e || {
                      ...e,
                      ...t,
                    }
                  );
                },
                resultToName: d,
              }),
              items: l({
                mergeNames(e, t, r) {
                  return e.if(o._`${r} !== true && ${t} !== undefined`, () =>
                    e.assign(
                      r,
                      o._`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`
                    )
                  );
                },
                mergeToName(e, t, r) {
                  return e.if(o._`${r} !== true`, () =>
                    e.assign(r, !0 === t || o._`${r} > ${t} ? ${r} : ${t}`)
                  );
                },
                mergeValues(e, t) {
                  return !0 === e || Math.max(e, t);
                },
                resultToName(e, t) {
                  return e.var("items", t);
                },
              }),
            }),
            (r.evaluatedPropsToName = d),
            (r.setEvaluated = u);
          const f = {};
          var p;
          function m(e, t, r = e.opts.strictSchema) {
            if (r) {
              if (((t = `strict mode: ${t}`), !0 === r)) throw new Error(t);
              e.self.logger.warn(t);
            }
          }
          (r.useFunc = function (e, t) {
            return e.scopeValue("func", {
              ref: t,
              code: f[t.code] || (f[t.code] = new s._Code(t.code)),
            });
          }),
            (function (e) {
              (e[(e.Num = 0)] = "Num"), (e[(e.Str = 1)] = "Str");
            })((p = r.Type || (r.Type = {}))),
            (r.getErrorPath = function (e, t, r) {
              if (e instanceof o.Name) {
                const s = t === p.Num;
                return r
                  ? s
                    ? o._`"[" + ${e} + "]"`
                    : o._`"['" + ${e} + "']"`
                  : s
                  ? o._`"/" + ${e}`
                  : o._`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
              }
              return r ? (0, o.getProperty)(e).toString() : "/" + i(e);
            }),
            (r.checkStrictMode = m);
        },
        {
          "./codegen": 2,
          "./codegen/code": 1,
        },
      ],
      11: [
        function (e, t, r) {
          "use strict";
          function o(e, t) {
            return t.rules.some((t) => s(e, t));
          }
          function s(e, t) {
            var r;
            return (
              void 0 !== e[t.keyword] ||
              (null === (r = t.definition.implements) || void 0 === r
                ? void 0
                : r.some((t) => void 0 !== e[t]))
            );
          }
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.shouldUseRule =
              r.shouldUseGroup =
              r.schemaHasRulesForType =
                void 0),
            (r.schemaHasRulesForType = function ({ schema: e, self: t }, r) {
              const s = t.RULES.types[r];
              return s && !0 !== s && o(e, s);
            }),
            (r.shouldUseGroup = o),
            (r.shouldUseRule = s);
        },
        {},
      ],
      12: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.boolOrEmptySchema = r.topBoolOrEmptySchema = void 0);
          const o = e("../errors"),
            s = e("../codegen"),
            a = e("../names"),
            n = {
              message: "boolean schema is false",
            };
          function i(e, t) {
            const { gen: r, data: s } = e;
            (0, o.reportError)(
              {
                gen: r,
                keyword: "false schema",
                data: s,
                schema: !1,
                schemaCode: !1,
                schemaValue: !1,
                params: {},
                it: e,
              },
              n,
              void 0,
              t
            );
          }
          (r.topBoolOrEmptySchema = function (e) {
            const { gen: t, schema: r, validateName: o } = e;
            !1 === r
              ? i(e, !1)
              : "object" == typeof r && !0 === r.$async
              ? t.return(a.default.data)
              : (t.assign(s._`${o}.errors`, null), t.return(!0));
          }),
            (r.boolOrEmptySchema = function (e, t) {
              const { gen: r, schema: o } = e;
              !1 === o ? (r.var(t, !1), i(e)) : r.var(t, !0);
            });
        },
        {
          "../codegen": 2,
          "../errors": 4,
          "../names": 6,
        },
      ],
      13: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.reportTypeError =
              r.checkDataTypes =
              r.checkDataType =
              r.coerceAndCheckDataType =
              r.getJSONTypes =
              r.getSchemaTypes =
              r.DataType =
                void 0);
          const o = e("../rules"),
            s = e("./applicability"),
            a = e("../errors"),
            n = e("../codegen"),
            i = e("../util");
          var c;
          function l(e) {
            const t = Array.isArray(e) ? e : e ? [e] : [];
            if (t.every(o.isJSONType)) return t;
            throw new Error(
              "type must be JSONType or JSONType[]: " + t.join(",")
            );
          }
          !(function (e) {
            (e[(e.Correct = 0)] = "Correct"), (e[(e.Wrong = 1)] = "Wrong");
          })((c = r.DataType || (r.DataType = {}))),
            (r.getSchemaTypes = function (e) {
              const t = l(e.type);
              if (t.includes("null")) {
                if (!1 === e.nullable)
                  throw new Error("type: null contradicts nullable: false");
              } else {
                if (!t.length && void 0 !== e.nullable)
                  throw new Error('"nullable" cannot be used without "type"');
                !0 === e.nullable && t.push("null");
              }
              return t;
            }),
            (r.getJSONTypes = l),
            (r.coerceAndCheckDataType = function (e, t) {
              const { gen: r, data: o, opts: a } = e,
                i = (function (e, t) {
                  return t
                    ? e.filter(
                        (e) => d.has(e) || ("array" === t && "array" === e)
                      )
                    : [];
                })(t, a.coerceTypes),
                l =
                  t.length > 0 &&
                  !(
                    0 === i.length &&
                    1 === t.length &&
                    (0, s.schemaHasRulesForType)(e, t[0])
                  );
              if (l) {
                const s = f(t, o, a.strictNumbers, c.Wrong);
                r.if(s, () => {
                  i.length
                    ? (function (e, t, r) {
                        const { gen: o, data: s, opts: a } = e,
                          i = o.let("dataType", n._`typeof ${s}`),
                          c = o.let("coerced", n._`undefined`);
                        "array" === a.coerceTypes &&
                          o.if(
                            n._`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`,
                            () =>
                              o
                                .assign(s, n._`${s}[0]`)
                                .assign(i, n._`typeof ${s}`)
                                .if(f(t, s, a.strictNumbers), () =>
                                  o.assign(c, s)
                                )
                          );
                        o.if(n._`${c} !== undefined`);
                        for (const e of r)
                          (d.has(e) ||
                            ("array" === e && "array" === a.coerceTypes)) &&
                            l(e);
                        function l(e) {
                          switch (e) {
                            case "string":
                              return void o
                                .elseIf(
                                  n._`${i} == "number" || ${i} == "boolean"`
                                )
                                .assign(c, n._`"" + ${s}`)
                                .elseIf(n._`${s} === null`)
                                .assign(c, n._`""`);
                            case "number":
                              return void o
                                .elseIf(
                                  n._`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`
                                )
                                .assign(c, n._`+${s}`);
                            case "integer":
                              return void o
                                .elseIf(
                                  n._`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`
                                )
                                .assign(c, n._`+${s}`);
                            case "boolean":
                              return void o
                                .elseIf(
                                  n._`${s} === "false" || ${s} === 0 || ${s} === null`
                                )
                                .assign(c, !1)
                                .elseIf(n._`${s} === "true" || ${s} === 1`)
                                .assign(c, !0);
                            case "null":
                              return (
                                o.elseIf(
                                  n._`${s} === "" || ${s} === 0 || ${s} === false`
                                ),
                                void o.assign(c, null)
                              );
                            case "array":
                              o.elseIf(
                                n._`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`
                              ).assign(c, n._`[${s}]`);
                          }
                        }
                        o.else(),
                          m(e),
                          o.endIf(),
                          o.if(n._`${c} !== undefined`, () => {
                            o.assign(s, c),
                              (function (
                                {
                                  gen: e,
                                  parentData: t,
                                  parentDataProperty: r,
                                },
                                o
                              ) {
                                e.if(n._`${t} !== undefined`, () =>
                                  e.assign(n._`${t}[${r}]`, o)
                                );
                              })(e, c);
                          });
                      })(e, t, i)
                    : m(e);
                });
              }
              return l;
            });
          const d = new Set(["string", "number", "integer", "boolean", "null"]);
          function u(e, t, r, o = c.Correct) {
            const s = o === c.Correct ? n.operators.EQ : n.operators.NEQ;
            let a;
            switch (e) {
              case "null":
                return n._`${t} ${s} null`;
              case "array":
                a = n._`Array.isArray(${t})`;
                break;
              case "object":
                a = n._`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
                break;
              case "integer":
                a = i(n._`!(${t} % 1) && !isNaN(${t})`);
                break;
              case "number":
                a = i();
                break;
              default:
                return n._`typeof ${t} ${s} ${e}`;
            }
            return o === c.Correct ? a : (0, n.not)(a);
            function i(e = n.nil) {
              return (0, n.and)(
                n._`typeof ${t} == "number"`,
                e,
                r ? n._`isFinite(${t})` : n.nil
              );
            }
          }
          function f(e, t, r, o) {
            if (1 === e.length) return u(e[0], t, r, o);
            let s;
            const a = (0, i.toHash)(e);
            if (a.array && a.object) {
              const e = n._`typeof ${t} != "object"`;
              (s = a.null ? e : n._`!${t} || ${e}`),
                delete a.null,
                delete a.array,
                delete a.object;
            } else s = n.nil;
            a.number && delete a.integer;
            for (const e in a) s = (0, n.and)(s, u(e, t, r, o));
            return s;
          }
          (r.checkDataType = u), (r.checkDataTypes = f);
          const p = {
            message({ schema: e }) {
              return `must be ${e}`;
            },
            params({ schema: e, schemaValue: t }) {
              return "string" == typeof e
                ? n._`{type: ${e}}`
                : n._`{type: ${t}}`;
            },
          };
          function m(e) {
            const t = (function (e) {
              const { gen: t, data: r, schema: o } = e,
                s = (0, i.schemaRefOrVal)(e, o, "type");
              return {
                gen: t,
                keyword: "type",
                data: r,
                schema: o.type,
                schemaCode: s,
                schemaValue: s,
                parentSchema: o,
                params: {},
                it: e,
              };
            })(e);
            (0, a.reportError)(t, p);
          }
          r.reportTypeError = m;
        },
        {
          "../codegen": 2,
          "../errors": 4,
          "../rules": 9,
          "../util": 10,
          "./applicability": 11,
        },
      ],
      14: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.assignDefaults = void 0);
          const o = e("../codegen"),
            s = e("../util");
          function a(e, t, r) {
            const { gen: a, compositeRule: n, data: i, opts: c } = e;
            if (void 0 === r) return;
            const l = o._`${i}${(0, o.getProperty)(t)}`;
            if (n)
              return void (0, s.checkStrictMode)(
                e,
                `default is ignored for: ${l}`
              );
            let d = o._`${l} === undefined`;
            "empty" === c.useDefaults &&
              (d = o._`${d} || ${l} === null || ${l} === ""`),
              a.if(d, o._`${l} = ${(0, o.stringify)(r)}`);
          }
          r.assignDefaults = function (e, t) {
            const { properties: r, items: o } = e.schema;
            if ("object" === t && r) for (const t in r) a(e, t, r[t].default);
            else
              "array" === t &&
                Array.isArray(o) &&
                o.forEach((t, r) => a(e, r, t.default));
          };
        },
        {
          "../codegen": 2,
          "../util": 10,
        },
      ],
      15: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.getData = r.KeywordCxt = r.validateFunctionCode = void 0);
          const o = e("./boolSchema"),
            s = e("./dataType"),
            a = e("./applicability"),
            n = e("./dataType"),
            i = e("./defaults"),
            c = e("./keyword"),
            l = e("./subschema"),
            d = e("../codegen"),
            u = e("../names"),
            f = e("../resolve"),
            p = e("../util"),
            m = e("../errors");
          function h(
            { gen: e, validateName: t, schema: r, schemaEnv: o, opts: s },
            a
          ) {
            s.code.es5
              ? e.func(
                  t,
                  d._`${u.default.data}, ${u.default.valCxt}`,
                  o.$async,
                  () => {
                    e.code(d._`"use strict"; ${y(r, s)}`),
                      (function (e, t) {
                        e.if(
                          u.default.valCxt,
                          () => {
                            e.var(
                              u.default.instancePath,
                              d._`${u.default.valCxt}.${u.default.instancePath}`
                            ),
                              e.var(
                                u.default.parentData,
                                d._`${u.default.valCxt}.${u.default.parentData}`
                              ),
                              e.var(
                                u.default.parentDataProperty,
                                d._`${u.default.valCxt}.${u.default.parentDataProperty}`
                              ),
                              e.var(
                                u.default.rootData,
                                d._`${u.default.valCxt}.${u.default.rootData}`
                              ),
                              t.dynamicRef &&
                                e.var(
                                  u.default.dynamicAnchors,
                                  d._`${u.default.valCxt}.${u.default.dynamicAnchors}`
                                );
                          },
                          () => {
                            e.var(u.default.instancePath, d._`""`),
                              e.var(u.default.parentData, d._`undefined`),
                              e.var(
                                u.default.parentDataProperty,
                                d._`undefined`
                              ),
                              e.var(u.default.rootData, u.default.data),
                              t.dynamicRef &&
                                e.var(u.default.dynamicAnchors, d._`{}`);
                          }
                        );
                      })(e, s),
                      e.code(a);
                  }
                )
              : e.func(
                  t,
                  d._`${u.default.data}, ${(function (e) {
                    return d._`{${u.default.instancePath}="", ${
                      u.default.parentData
                    }, ${u.default.parentDataProperty}, ${u.default.rootData}=${
                      u.default.data
                    }${
                      e.dynamicRef
                        ? d._`, ${u.default.dynamicAnchors}={}`
                        : d.nil
                    }}={}`;
                  })(s)}`,
                  o.$async,
                  () => e.code(y(r, s)).code(a)
                );
          }
          function y(e, t) {
            const r = "object" == typeof e && e[t.schemaId];
            return r && (t.code.source || t.code.process)
              ? d._`/*# sourceURL=${r} */`
              : d.nil;
          }
          function v(e, t) {
            $(e) && (_(e), g(e))
              ? (function (e, t) {
                  const { schema: r, gen: o, opts: s } = e;
                  s.$comment && r.$comment && b(e);
                  (function (e) {
                    const t = e.schema[e.opts.schemaId];
                    t &&
                      (e.baseId = (0, f.resolveUrl)(
                        e.opts.uriResolver,
                        e.baseId,
                        t
                      ));
                  })(e),
                    (function (e) {
                      if (e.schema.$async && !e.schemaEnv.$async)
                        throw new Error("async schema in sync schema");
                    })(e);
                  const a = o.const("_errs", u.default.errors);
                  w(e, a), o.var(t, d._`${a} === ${u.default.errors}`);
                })(e, t)
              : (0, o.boolOrEmptySchema)(e, t);
          }
          function g({ schema: e, self: t }) {
            if ("boolean" == typeof e) return !e;
            for (const r in e) if (t.RULES.all[r]) return !0;
            return !1;
          }
          function $(e) {
            return "boolean" != typeof e.schema;
          }
          function _(e) {
            (0, p.checkUnknownRules)(e),
              (function (e) {
                const { schema: t, errSchemaPath: r, opts: o, self: s } = e;
                t.$ref &&
                  o.ignoreKeywordsWithRef &&
                  (0, p.schemaHasRulesButRef)(t, s.RULES) &&
                  s.logger.warn(
                    `$ref: keywords ignored in schema at path "${r}"`
                  );
              })(e);
          }
          function w(e, t) {
            if (e.opts.jtd) return E(e, [], !1, t);
            const r = (0, s.getSchemaTypes)(e.schema);
            E(e, r, !(0, s.coerceAndCheckDataType)(e, r), t);
          }
          function b({
            gen: e,
            schemaEnv: t,
            schema: r,
            errSchemaPath: o,
            opts: s,
          }) {
            const a = r.$comment;
            if (!0 === s.$comment)
              e.code(d._`${u.default.self}.logger.log(${a})`);
            else if ("function" == typeof s.$comment) {
              const r = d.str`${o}/$comment`,
                s = e.scopeValue("root", {
                  ref: t.root,
                });
              e.code(
                d._`${u.default.self}.opts.$comment(${a}, ${r}, ${s}.schema)`
              );
            }
          }
          function E(e, t, r, o) {
            const {
                gen: s,
                schema: i,
                data: c,
                allErrors: l,
                opts: f,
                self: m,
              } = e,
              { RULES: h } = m;
            function y(p) {
              (0, a.shouldUseGroup)(i, p) &&
                (p.type
                  ? (s.if((0, n.checkDataType)(p.type, c, f.strictNumbers)),
                    P(e, p),
                    1 === t.length &&
                      t[0] === p.type &&
                      r &&
                      (s.else(), (0, n.reportTypeError)(e)),
                    s.endIf())
                  : P(e, p),
                l || s.if(d._`${u.default.errors} === ${o || 0}`));
            }
            !i.$ref ||
            (!f.ignoreKeywordsWithRef && (0, p.schemaHasRulesButRef)(i, h))
              ? (f.jtd ||
                  (function (e, t) {
                    if (e.schemaEnv.meta || !e.opts.strictTypes) return;
                    (function (e, t) {
                      if (!t.length) return;
                      if (!e.dataTypes.length) return void (e.dataTypes = t);
                      t.forEach((t) => {
                        N(e.dataTypes, t) ||
                          k(
                            e,
                            `type "${t}" not allowed by context "${e.dataTypes.join(
                              ","
                            )}"`
                          );
                      }),
                        (function (e, t) {
                          const r = [];
                          for (const o of e.dataTypes)
                            N(t, o)
                              ? r.push(o)
                              : t.includes("integer") &&
                                "number" === o &&
                                r.push("integer");
                          e.dataTypes = r;
                        })(e, t);
                    })(e, t),
                      e.opts.allowUnionTypes ||
                        (function (e, t) {
                          t.length > 1 &&
                            (2 !== t.length || !t.includes("null")) &&
                            k(
                              e,
                              "use allowUnionTypes to allow union type keyword"
                            );
                        })(e, t);
                    !(function (e, t) {
                      const r = e.self.RULES.all;
                      for (const o in r) {
                        const s = r[o];
                        if (
                          "object" == typeof s &&
                          (0, a.shouldUseRule)(e.schema, s)
                        ) {
                          const { type: r } = s.definition;
                          r.length &&
                            !r.some((e) => S(t, e)) &&
                            k(
                              e,
                              `missing type "${r.join(",")}" for keyword "${o}"`
                            );
                        }
                      }
                    })(e, e.dataTypes);
                  })(e, t),
                s.block(() => {
                  for (const e of h.rules) y(e);
                  y(h.post);
                }))
              : s.block(() => C(e, "$ref", h.all.$ref.definition));
          }
          function P(e, t) {
            const {
              gen: r,
              schema: o,
              opts: { useDefaults: s },
            } = e;
            s && (0, i.assignDefaults)(e, t.type),
              r.block(() => {
                for (const r of t.rules)
                  (0, a.shouldUseRule)(o, r) &&
                    C(e, r.keyword, r.definition, t.type);
              });
          }
          function S(e, t) {
            return e.includes(t) || ("number" === t && e.includes("integer"));
          }
          function N(e, t) {
            return e.includes(t) || ("integer" === t && e.includes("number"));
          }
          function k(e, t) {
            (0, p.checkStrictMode)(
              e,
              (t += ` at "${
                e.schemaEnv.baseId + e.errSchemaPath
              }" (strictTypes)`),
              e.opts.strictTypes
            );
          }
          r.validateFunctionCode = function (e) {
            $(e) && (_(e), g(e))
              ? (function (e) {
                  const { schema: t, opts: r, gen: o } = e;
                  h(e, () => {
                    r.$comment && t.$comment && b(e),
                      (function (e) {
                        const { schema: t, opts: r } = e;
                        void 0 !== t.default &&
                          r.useDefaults &&
                          r.strictSchema &&
                          (0, p.checkStrictMode)(
                            e,
                            "default is ignored in the schema root"
                          );
                      })(e),
                      o.let(u.default.vErrors, null),
                      o.let(u.default.errors, 0),
                      r.unevaluated &&
                        (function (e) {
                          const { gen: t, validateName: r } = e;
                          (e.evaluated = t.const(
                            "evaluated",
                            d._`${r}.evaluated`
                          )),
                            t.if(d._`${e.evaluated}.dynamicProps`, () =>
                              t.assign(
                                d._`${e.evaluated}.props`,
                                d._`undefined`
                              )
                            ),
                            t.if(d._`${e.evaluated}.dynamicItems`, () =>
                              t.assign(
                                d._`${e.evaluated}.items`,
                                d._`undefined`
                              )
                            );
                        })(e),
                      w(e),
                      (function (e) {
                        const {
                          gen: t,
                          schemaEnv: r,
                          validateName: o,
                          ValidationError: s,
                          opts: a,
                        } = e;
                        r.$async
                          ? t.if(
                              d._`${u.default.errors} === 0`,
                              () => t.return(u.default.data),
                              () => t.throw(d._`new ${s}(${u.default.vErrors})`)
                            )
                          : (t.assign(d._`${o}.errors`, u.default.vErrors),
                            a.unevaluated &&
                              (function ({
                                gen: e,
                                evaluated: t,
                                props: r,
                                items: o,
                              }) {
                                r instanceof d.Name &&
                                  e.assign(d._`${t}.props`, r);
                                o instanceof d.Name &&
                                  e.assign(d._`${t}.items`, o);
                              })(e),
                            t.return(d._`${u.default.errors} === 0`));
                      })(e);
                  });
                })(e)
              : h(e, () => (0, o.topBoolOrEmptySchema)(e));
          };
          class j {
            constructor(e, t, r) {
              if (
                ((0, c.validateKeywordUsage)(e, t, r),
                (this.gen = e.gen),
                (this.allErrors = e.allErrors),
                (this.keyword = r),
                (this.data = e.data),
                (this.schema = e.schema[r]),
                (this.$data =
                  t.$data && e.opts.$data && this.schema && this.schema.$data),
                (this.schemaValue = (0, p.schemaRefOrVal)(
                  e,
                  this.schema,
                  r,
                  this.$data
                )),
                (this.schemaType = t.schemaType),
                (this.parentSchema = e.schema),
                (this.params = {}),
                (this.it = e),
                (this.def = t),
                this.$data)
              )
                this.schemaCode = e.gen.const("vSchema", T(this.$data, e));
              else if (
                ((this.schemaCode = this.schemaValue),
                !(0, c.validSchemaType)(
                  this.schema,
                  t.schemaType,
                  t.allowUndefined
                ))
              )
                throw new Error(
                  `${r} value must be ${JSON.stringify(t.schemaType)}`
                );
              ("code" in t ? t.trackErrors : !1 !== t.errors) &&
                (this.errsCount = e.gen.const("_errs", u.default.errors));
            }
            result(e, t, r) {
              this.failResult((0, d.not)(e), t, r);
            }
            failResult(e, t, r) {
              this.gen.if(e),
                r ? r() : this.error(),
                t
                  ? (this.gen.else(), t(), this.allErrors && this.gen.endIf())
                  : this.allErrors
                  ? this.gen.endIf()
                  : this.gen.else();
            }
            pass(e, t) {
              this.failResult((0, d.not)(e), void 0, t);
            }
            fail(e) {
              if (void 0 === e)
                return this.error(), void (this.allErrors || this.gen.if(!1));
              this.gen.if(e),
                this.error(),
                this.allErrors ? this.gen.endIf() : this.gen.else();
            }
            fail$data(e) {
              if (!this.$data) return this.fail(e);
              const { schemaCode: t } = this;
              this.fail(
                d._`${t} !== undefined && (${(0, d.or)(
                  this.invalid$data(),
                  e
                )})`
              );
            }
            error(e, t, r) {
              if (t)
                return (
                  this.setParams(t), this._error(e, r), void this.setParams({})
                );
              this._error(e, r);
            }
            _error(e, t) {
              (e ? m.reportExtraError : m.reportError)(this, this.def.error, t);
            }
            $dataError() {
              (0, m.reportError)(
                this,
                this.def.$dataError || m.keyword$DataError
              );
            }
            reset() {
              if (void 0 === this.errsCount)
                throw new Error('add "trackErrors" to keyword definition');
              (0, m.resetErrorsCount)(this.gen, this.errsCount);
            }
            ok(e) {
              this.allErrors || this.gen.if(e);
            }
            setParams(e, t) {
              t ? Object.assign(this.params, e) : (this.params = e);
            }
            block$data(e, t, r = d.nil) {
              this.gen.block(() => {
                this.check$data(e, r), t();
              });
            }
            check$data(e = d.nil, t = d.nil) {
              if (!this.$data) return;
              const { gen: r, schemaCode: o, schemaType: s, def: a } = this;
              r.if((0, d.or)(d._`${o} === undefined`, t)),
                e !== d.nil && r.assign(e, !0),
                (s.length || a.validateSchema) &&
                  (r.elseIf(this.invalid$data()),
                  this.$dataError(),
                  e !== d.nil && r.assign(e, !1)),
                r.else();
            }
            invalid$data() {
              const {
                gen: e,
                schemaCode: t,
                schemaType: r,
                def: o,
                it: s,
              } = this;
              return (0, d.or)(
                (function () {
                  if (r.length) {
                    if (!(t instanceof d.Name))
                      throw new Error("ajv implementation error");
                    const e = Array.isArray(r) ? r : [r];
                    return d._`${(0, n.checkDataTypes)(
                      e,
                      t,
                      s.opts.strictNumbers,
                      n.DataType.Wrong
                    )}`;
                  }
                  return d.nil;
                })(),
                (function () {
                  if (o.validateSchema) {
                    const r = e.scopeValue("validate$data", {
                      ref: o.validateSchema,
                    });
                    return d._`!${r}(${t})`;
                  }
                  return d.nil;
                })()
              );
            }
            subschema(e, t) {
              const r = (0, l.getSubschema)(this.it, e);
              (0, l.extendSubschemaData)(r, this.it, e),
                (0, l.extendSubschemaMode)(r, e);
              const o = {
                ...this.it,
                ...r,
                items: void 0,
                props: void 0,
              };
              return v(o, t), o;
            }
            mergeEvaluated(e, t) {
              const { it: r, gen: o } = this;
              r.opts.unevaluated &&
                (!0 !== r.props &&
                  void 0 !== e.props &&
                  (r.props = p.mergeEvaluated.props(o, e.props, r.props, t)),
                !0 !== r.items &&
                  void 0 !== e.items &&
                  (r.items = p.mergeEvaluated.items(o, e.items, r.items, t)));
            }
            mergeValidEvaluated(e, t) {
              const { it: r, gen: o } = this;
              if (r.opts.unevaluated && (!0 !== r.props || !0 !== r.items))
                return o.if(t, () => this.mergeEvaluated(e, d.Name)), !0;
            }
          }
          function C(e, t, r, o) {
            const s = new j(e, r, t);
            "code" in r
              ? r.code(s, o)
              : s.$data && r.validate
              ? (0, c.funcKeywordCode)(s, r)
              : "macro" in r
              ? (0, c.macroKeywordCode)(s, r)
              : (r.compile || r.validate) && (0, c.funcKeywordCode)(s, r);
          }
          r.KeywordCxt = j;
          const O = /^\/(?:[^~]|~0|~1)*$/,
            x = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
          function T(e, { dataLevel: t, dataNames: r, dataPathArr: o }) {
            let s, a;
            if ("" === e) return u.default.rootData;
            if ("/" === e[0]) {
              if (!O.test(e)) throw new Error(`Invalid JSON-pointer: ${e}`);
              (s = e), (a = u.default.rootData);
            } else {
              const n = x.exec(e);
              if (!n) throw new Error(`Invalid JSON-pointer: ${e}`);
              const i = +n[1];
              if (((s = n[2]), "#" === s)) {
                if (i >= t) throw new Error(c("property/index", i));
                return o[t - i];
              }
              if (i > t) throw new Error(c("data", i));
              if (((a = r[t - i]), !s)) return a;
            }
            let n = a;
            const i = s.split("/");
            for (const e of i)
              e &&
                ((a = d._`${a}${(0, d.getProperty)(
                  (0, p.unescapeJsonPointer)(e)
                )}`),
                (n = d._`${n} && ${a}`));
            return n;
            function c(e, r) {
              return `Cannot access ${e} ${r} levels up, current level is ${t}`;
            }
          }
          r.getData = T;
        },
        {
          "../codegen": 2,
          "../errors": 4,
          "../names": 6,
          "../resolve": 8,
          "../util": 10,
          "./applicability": 11,
          "./boolSchema": 12,
          "./dataType": 13,
          "./defaults": 14,
          "./keyword": 16,
          "./subschema": 17,
        },
      ],
      16: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.validateKeywordUsage =
              r.validSchemaType =
              r.funcKeywordCode =
              r.macroKeywordCode =
                void 0);
          const o = e("../codegen"),
            s = e("../names"),
            a = e("../../vocabularies/code"),
            n = e("../errors");
          function i(e) {
            const { gen: t, data: r, it: s } = e;
            t.if(s.parentData, () =>
              t.assign(r, o._`${s.parentData}[${s.parentDataProperty}]`)
            );
          }
          function c(e, t, r) {
            if (void 0 === r)
              throw new Error(`keyword "${t}" failed to compile`);
            return e.scopeValue(
              "keyword",
              "function" == typeof r
                ? {
                    ref: r,
                  }
                : {
                    ref: r,
                    code: (0, o.stringify)(r),
                  }
            );
          }
          (r.macroKeywordCode = function (e, t) {
            const { gen: r, keyword: s, schema: a, parentSchema: n, it: i } = e,
              l = t.macro.call(i.self, a, n, i),
              d = c(r, s, l);
            !1 !== i.opts.validateSchema && i.self.validateSchema(l, !0);
            const u = r.name("valid");
            e.subschema(
              {
                schema: l,
                schemaPath: o.nil,
                errSchemaPath: `${i.errSchemaPath}/${s}`,
                topSchemaRef: d,
                compositeRule: !0,
              },
              u
            ),
              e.pass(u, () => e.error(!0));
          }),
            (r.funcKeywordCode = function (e, t) {
              var r;
              const {
                gen: l,
                keyword: d,
                schema: u,
                parentSchema: f,
                $data: p,
                it: m,
              } = e;
              !(function ({ schemaEnv: e }, t) {
                if (t.async && !e.$async)
                  throw new Error("async keyword in sync schema");
              })(m, t);
              const h =
                  !p && t.compile
                    ? t.compile.call(m.self, u, f, m)
                    : t.validate,
                y = c(l, d, h),
                v = l.let("valid");
              function g(r = t.async ? o._`await ` : o.nil) {
                l.assign(
                  v,
                  o._`${r}${(0, a.callValidateCode)(
                    e,
                    y,
                    m.opts.passContext ? s.default.this : s.default.self,
                    !(("compile" in t && !p) || !1 === t.schema)
                  )}`,
                  t.modifying
                );
              }
              function $(e) {
                var r;
                l.if(
                  (0, o.not)(null !== (r = t.valid) && void 0 !== r ? r : v),
                  e
                );
              }
              e.block$data(v, function () {
                if (!1 === t.errors)
                  g(), t.modifying && i(e), $(() => e.error());
                else {
                  const r = t.async
                    ? (function () {
                        const e = l.let("ruleErrs", null);
                        return (
                          l.try(
                            () => g(o._`await `),
                            (t) =>
                              l.assign(v, !1).if(
                                o._`${t} instanceof ${m.ValidationError}`,
                                () => l.assign(e, o._`${t}.errors`),
                                () => l.throw(t)
                              )
                          ),
                          e
                        );
                      })()
                    : (function () {
                        const e = o._`${y}.errors`;
                        return l.assign(e, null), g(o.nil), e;
                      })();
                  t.modifying && i(e),
                    $(() =>
                      (function (e, t) {
                        const { gen: r } = e;
                        r.if(
                          o._`Array.isArray(${t})`,
                          () => {
                            r
                              .assign(
                                s.default.vErrors,
                                o._`${s.default.vErrors} === null ? ${t} : ${s.default.vErrors}.concat(${t})`
                              )
                              .assign(
                                s.default.errors,
                                o._`${s.default.vErrors}.length`
                              ),
                              (0, n.extendErrors)(e);
                          },
                          () => e.error()
                        );
                      })(e, r)
                    );
                }
              }),
                e.ok(null !== (r = t.valid) && void 0 !== r ? r : v);
            }),
            (r.validSchemaType = function (e, t, r = !1) {
              return (
                !t.length ||
                t.some((t) =>
                  "array" === t
                    ? Array.isArray(e)
                    : "object" === t
                    ? e && "object" == typeof e && !Array.isArray(e)
                    : typeof e == t || (r && void 0 === e)
                )
              );
            }),
            (r.validateKeywordUsage = function (
              { schema: e, opts: t, self: r, errSchemaPath: o },
              s,
              a
            ) {
              if (
                Array.isArray(s.keyword)
                  ? !s.keyword.includes(a)
                  : s.keyword !== a
              )
                throw new Error("ajv implementation error");
              const n = s.dependencies;
              if (
                null == n
                  ? void 0
                  : n.some((t) => !Object.prototype.hasOwnProperty.call(e, t))
              )
                throw new Error(
                  `parent schema must have dependencies of ${a}: ${n.join(",")}`
                );
              if (s.validateSchema) {
                if (!s.validateSchema(e[a])) {
                  const e =
                    `keyword "${a}" value is invalid at path "${o}": ` +
                    r.errorsText(s.validateSchema.errors);
                  if ("log" !== t.validateSchema) throw new Error(e);
                  r.logger.error(e);
                }
              }
            });
        },
        {
          "../../vocabularies/code": 42,
          "../codegen": 2,
          "../errors": 4,
          "../names": 6,
        },
      ],
      17: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.extendSubschemaMode =
              r.extendSubschemaData =
              r.getSubschema =
                void 0);
          const o = e("../codegen"),
            s = e("../util");
          (r.getSubschema = function (
            e,
            {
              keyword: t,
              schemaProp: r,
              schema: a,
              schemaPath: n,
              errSchemaPath: i,
              topSchemaRef: c,
            }
          ) {
            if (void 0 !== t && void 0 !== a)
              throw new Error(
                'both "keyword" and "schema" passed, only one allowed'
              );
            if (void 0 !== t) {
              const a = e.schema[t];
              return void 0 === r
                ? {
                    schema: a,
                    schemaPath: o._`${e.schemaPath}${(0, o.getProperty)(t)}`,
                    errSchemaPath: `${e.errSchemaPath}/${t}`,
                  }
                : {
                    schema: a[r],
                    schemaPath: o._`${e.schemaPath}${(0, o.getProperty)(t)}${(0,
                    o.getProperty)(r)}`,
                    errSchemaPath: `${e.errSchemaPath}/${t}/${(0,
                    s.escapeFragment)(r)}`,
                  };
            }
            if (void 0 !== a) {
              if (void 0 === n || void 0 === i || void 0 === c)
                throw new Error(
                  '"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"'
                );
              return {
                schema: a,
                schemaPath: n,
                topSchemaRef: c,
                errSchemaPath: i,
              };
            }
            throw new Error('either "keyword" or "schema" must be passed');
          }),
            (r.extendSubschemaData = function (
              e,
              t,
              {
                dataProp: r,
                dataPropType: a,
                data: n,
                dataTypes: i,
                propertyName: c,
              }
            ) {
              if (void 0 !== n && void 0 !== r)
                throw new Error(
                  'both "data" and "dataProp" passed, only one allowed'
                );
              const { gen: l } = t;
              if (void 0 !== r) {
                const { errorPath: n, dataPathArr: i, opts: c } = t;
                d(l.let("data", o._`${t.data}${(0, o.getProperty)(r)}`, !0)),
                  (e.errorPath = o.str`${n}${(0, s.getErrorPath)(
                    r,
                    a,
                    c.jsPropertySyntax
                  )}`),
                  (e.parentDataProperty = o._`${r}`),
                  (e.dataPathArr = [...i, e.parentDataProperty]);
              }
              if (void 0 !== n) {
                d(n instanceof o.Name ? n : l.let("data", n, !0)),
                  void 0 !== c && (e.propertyName = c);
              }
              function d(r) {
                (e.data = r),
                  (e.dataLevel = t.dataLevel + 1),
                  (e.dataTypes = []),
                  (t.definedProperties = new Set()),
                  (e.parentData = t.data),
                  (e.dataNames = [...t.dataNames, r]);
              }
              i && (e.dataTypes = i);
            }),
            (r.extendSubschemaMode = function (
              e,
              {
                jtdDiscriminator: t,
                jtdMetadata: r,
                compositeRule: o,
                createErrors: s,
                allErrors: a,
              }
            ) {
              void 0 !== o && (e.compositeRule = o),
                void 0 !== s && (e.createErrors = s),
                void 0 !== a && (e.allErrors = a),
                (e.jtdDiscriminator = t),
                (e.jtdMetadata = r);
            });
        },
        {
          "../codegen": 2,
          "../util": 10,
        },
      ],
      18: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.CodeGen =
              r.Name =
              r.nil =
              r.stringify =
              r.str =
              r._ =
              r.KeywordCxt =
                void 0);
          var o = e("./compile/validate");
          Object.defineProperty(r, "KeywordCxt", {
            enumerable: !0,
            get() {
              return o.KeywordCxt;
            },
          });
          var s = e("./compile/codegen");
          Object.defineProperty(r, "_", {
            enumerable: !0,
            get() {
              return s._;
            },
          }),
            Object.defineProperty(r, "str", {
              enumerable: !0,
              get() {
                return s.str;
              },
            }),
            Object.defineProperty(r, "stringify", {
              enumerable: !0,
              get() {
                return s.stringify;
              },
            }),
            Object.defineProperty(r, "nil", {
              enumerable: !0,
              get() {
                return s.nil;
              },
            }),
            Object.defineProperty(r, "Name", {
              enumerable: !0,
              get() {
                return s.Name;
              },
            }),
            Object.defineProperty(r, "CodeGen", {
              enumerable: !0,
              get() {
                return s.CodeGen;
              },
            });
          const a = e("./runtime/validation_error"),
            n = e("./compile/ref_error"),
            i = e("./compile/rules"),
            c = e("./compile"),
            l = e("./compile/codegen"),
            d = e("./compile/resolve"),
            u = e("./compile/validate/dataType"),
            f = e("./compile/util"),
            p = e("./refs/data.json"),
            m = e("./runtime/uri"),
            h = (e, t) => new RegExp(e, t);
          h.code = "new RegExp";
          const y = ["removeAdditional", "useDefaults", "coerceTypes"],
            v = new Set([
              "validate",
              "serialize",
              "parse",
              "wrapper",
              "root",
              "schema",
              "keyword",
              "pattern",
              "formats",
              "validate$data",
              "func",
              "obj",
              "Error",
            ]),
            g = {
              errorDataPath: "",
              format: "`validateFormats: false` can be used instead.",
              nullable: '"nullable" keyword is supported by default.',
              jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
              extendRefs:
                "Deprecated ignoreKeywordsWithRef can be used instead.",
              missingRefs:
                "Pass empty schema with $id that should be ignored to ajv.addSchema.",
              processCode:
                "Use option `code: {process: (code, schemaEnv: object) => string}`",
              sourceCode: "Use option `code: {source: true}`",
              strictDefaults: "It is default now, see option `strict`.",
              strictKeywords: "It is default now, see option `strict`.",
              uniqueItems: '"uniqueItems" keyword is always validated.',
              unknownFormats:
                "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
              cache: "Map is used as cache, schema object as key.",
              serialize: "Map is used as cache, schema object as key.",
              ajvErrors: "It is default now.",
            },
            $ = {
              ignoreKeywordsWithRef: "",
              jsPropertySyntax: "",
              unicode:
                '"minLength"/"maxLength" account for unicode characters by default.',
            };
          function _(e) {
            var t,
              r,
              o,
              s,
              a,
              n,
              i,
              c,
              l,
              d,
              u,
              f,
              p,
              y,
              v,
              g,
              $,
              _,
              w,
              b,
              E,
              P,
              S,
              N,
              k;
            const j = e.strict,
              C = null === (t = e.code) || void 0 === t ? void 0 : t.optimize,
              O = !0 === C || void 0 === C ? 1 : C || 0,
              x =
                null !==
                  (o =
                    null === (r = e.code) || void 0 === r
                      ? void 0
                      : r.regExp) && void 0 !== o
                  ? o
                  : h,
              T = null !== (s = e.uriResolver) && void 0 !== s ? s : m.default;
            return {
              strictSchema:
                null ===
                  (n = null !== (a = e.strictSchema) && void 0 !== a ? a : j) ||
                void 0 === n ||
                n,
              strictNumbers:
                null ===
                  (c =
                    null !== (i = e.strictNumbers) && void 0 !== i ? i : j) ||
                void 0 === c ||
                c,
              strictTypes:
                null !==
                  (d = null !== (l = e.strictTypes) && void 0 !== l ? l : j) &&
                void 0 !== d
                  ? d
                  : "log",
              strictTuples:
                null !==
                  (f = null !== (u = e.strictTuples) && void 0 !== u ? u : j) &&
                void 0 !== f
                  ? f
                  : "log",
              strictRequired:
                null !==
                  (y =
                    null !== (p = e.strictRequired) && void 0 !== p ? p : j) &&
                void 0 !== y &&
                y,
              code: e.code
                ? {
                    ...e.code,
                    optimize: O,
                    regExp: x,
                  }
                : {
                    optimize: O,
                    regExp: x,
                  },
              loopRequired:
                null !== (v = e.loopRequired) && void 0 !== v ? v : 200,
              loopEnum: null !== (g = e.loopEnum) && void 0 !== g ? g : 200,
              meta: null === ($ = e.meta) || void 0 === $ || $,
              messages: null === (_ = e.messages) || void 0 === _ || _,
              inlineRefs: null === (w = e.inlineRefs) || void 0 === w || w,
              schemaId: null !== (b = e.schemaId) && void 0 !== b ? b : "$id",
              addUsedSchema:
                null === (E = e.addUsedSchema) || void 0 === E || E,
              validateSchema:
                null === (P = e.validateSchema) || void 0 === P || P,
              validateFormats:
                null === (S = e.validateFormats) || void 0 === S || S,
              unicodeRegExp:
                null === (N = e.unicodeRegExp) || void 0 === N || N,
              int32range: null === (k = e.int32range) || void 0 === k || k,
              uriResolver: T,
            };
          }
          class w {
            constructor(e = {}) {
              (this.schemas = {}),
                (this.refs = {}),
                (this.formats = {}),
                (this._compilations = new Set()),
                (this._loading = {}),
                (this._cache = new Map()),
                (e = this.opts =
                  {
                    ...e,
                    ..._(e),
                  });
              const { es5: t, lines: r } = this.opts.code;
              (this.scope = new l.ValueScope({
                scope: {},
                prefixes: v,
                es5: t,
                lines: r,
              })),
                (this.logger = (function (e) {
                  if (!1 === e) return j;
                  if (void 0 === e) return console;
                  if (e.log && e.warn && e.error) return e;
                  throw new Error(
                    "logger must implement log, warn and error methods"
                  );
                })(e.logger));
              const o = e.validateFormats;
              (e.validateFormats = !1),
                (this.RULES = (0, i.getRules)()),
                b.call(this, g, e, "NOT SUPPORTED"),
                b.call(this, $, e, "DEPRECATED", "warn"),
                (this._metaOpts = k.call(this)),
                e.formats && S.call(this),
                this._addVocabularies(),
                this._addDefaultMetaSchema(),
                e.keywords && N.call(this, e.keywords),
                "object" == typeof e.meta && this.addMetaSchema(e.meta),
                P.call(this),
                (e.validateFormats = o);
            }
            _addVocabularies() {
              this.addKeyword("$async");
            }
            _addDefaultMetaSchema() {
              const { $data: e, meta: t, schemaId: r } = this.opts;
              let o = p;
              "id" === r &&
                ((o = {
                  ...p,
                }),
                (o.id = o.$id),
                delete o.$id),
                t && e && this.addMetaSchema(o, o[r], !1);
            }
            defaultMeta() {
              const { meta: e, schemaId: t } = this.opts;
              return (this.opts.defaultMeta =
                "object" == typeof e ? e[t] || e : void 0);
            }
            validate(e, t) {
              let r;
              if ("string" == typeof e) {
                if (((r = this.getSchema(e)), !r))
                  throw new Error(`no schema with key or ref "${e}"`);
              } else r = this.compile(e);
              const o = r(t);
              return "$async" in r || (this.errors = r.errors), o;
            }
            compile(e, t) {
              const r = this._addSchema(e, t);
              return r.validate || this._compileSchemaEnv(r);
            }
            compileAsync(e, t) {
              if ("function" != typeof this.opts.loadSchema)
                throw new Error("options.loadSchema should be a function");
              const { loadSchema: r } = this.opts;
              return o.call(this, e, t);
              async function o(e, t) {
                await s.call(this, e.$schema);
                const r = this._addSchema(e, t);
                return r.validate || a.call(this, r);
              }
              async function s(e) {
                e &&
                  !this.getSchema(e) &&
                  (await o.call(
                    this,
                    {
                      $ref: e,
                    },
                    !0
                  ));
              }
              async function a(e) {
                try {
                  return this._compileSchemaEnv(e);
                } catch (t) {
                  if (!(t instanceof n.default)) throw t;
                  return (
                    i.call(this, t),
                    await c.call(this, t.missingSchema),
                    a.call(this, e)
                  );
                }
              }
              function i({ missingSchema: e, missingRef: t }) {
                if (this.refs[e])
                  throw new Error(
                    `AnySchema ${e} is loaded but ${t} cannot be resolved`
                  );
              }
              async function c(e) {
                const r = await l.call(this, e);
                this.refs[e] || (await s.call(this, r.$schema)),
                  this.refs[e] || this.addSchema(r, e, t);
              }
              async function l(e) {
                const t = this._loading[e];
                if (t) return t;
                try {
                  return await (this._loading[e] = r(e));
                } finally {
                  delete this._loading[e];
                }
              }
            }
            addSchema(e, t, r, o = this.opts.validateSchema) {
              if (Array.isArray(e)) {
                for (const t of e) this.addSchema(t, void 0, r, o);
                return this;
              }
              let s;
              if ("object" == typeof e) {
                const { schemaId: t } = this.opts;
                if (((s = e[t]), void 0 !== s && "string" != typeof s))
                  throw new Error(`schema ${t} must be string`);
              }
              return (
                (t = (0, d.normalizeId)(t || s)),
                this._checkUnique(t),
                (this.schemas[t] = this._addSchema(e, r, t, o, !0)),
                this
              );
            }
            addMetaSchema(e, t, r = this.opts.validateSchema) {
              return this.addSchema(e, t, !0, r), this;
            }
            validateSchema(e, t) {
              if ("boolean" == typeof e) return !0;
              let r;
              if (((r = e.$schema), void 0 !== r && "string" != typeof r))
                throw new Error("$schema must be a string");
              if (((r = r || this.opts.defaultMeta || this.defaultMeta()), !r))
                return (
                  this.logger.warn("meta-schema not available"),
                  (this.errors = null),
                  !0
                );
              const o = this.validate(r, e);
              if (!o && t) {
                const e = "schema is invalid: " + this.errorsText();
                if ("log" !== this.opts.validateSchema) throw new Error(e);
                this.logger.error(e);
              }
              return o;
            }
            getSchema(e) {
              let t;
              for (; "string" == typeof (t = E.call(this, e)); ) e = t;
              if (void 0 === t) {
                const { schemaId: r } = this.opts,
                  o = new c.SchemaEnv({
                    schema: {},
                    schemaId: r,
                  });
                if (((t = c.resolveSchema.call(this, o, e)), !t)) return;
                this.refs[e] = t;
              }
              return t.validate || this._compileSchemaEnv(t);
            }
            removeSchema(e) {
              if (e instanceof RegExp)
                return (
                  this._removeAllSchemas(this.schemas, e),
                  this._removeAllSchemas(this.refs, e),
                  this
                );
              switch (typeof e) {
                case "undefined":
                  return (
                    this._removeAllSchemas(this.schemas),
                    this._removeAllSchemas(this.refs),
                    this._cache.clear(),
                    this
                  );
                case "string": {
                  const t = E.call(this, e);
                  return (
                    "object" == typeof t && this._cache.delete(t.schema),
                    delete this.schemas[e],
                    delete this.refs[e],
                    this
                  );
                }
                case "object": {
                  this._cache.delete(e);
                  let t = e[this.opts.schemaId];
                  return (
                    t &&
                      ((t = (0, d.normalizeId)(t)),
                      delete this.schemas[t],
                      delete this.refs[t]),
                    this
                  );
                }
                default:
                  throw new Error("ajv.removeSchema: invalid parameter");
              }
            }
            addVocabulary(e) {
              for (const t of e) this.addKeyword(t);
              return this;
            }
            addKeyword(e, t) {
              let r;
              if ("string" == typeof e)
                (r = e),
                  "object" == typeof t &&
                    (this.logger.warn(
                      "these parameters are deprecated, see docs for addKeyword"
                    ),
                    (t.keyword = r));
              else {
                if ("object" != typeof e || void 0 !== t)
                  throw new Error("invalid addKeywords parameters");
                if (((r = (t = e).keyword), Array.isArray(r) && !r.length))
                  throw new Error(
                    "addKeywords: keyword must be string or non-empty array"
                  );
              }
              if ((O.call(this, r, t), !t))
                return (0, f.eachItem)(r, (e) => x.call(this, e)), this;
              I.call(this, t);
              const o = {
                ...t,
                type: (0, u.getJSONTypes)(t.type),
                schemaType: (0, u.getJSONTypes)(t.schemaType),
              };
              return (
                (0, f.eachItem)(
                  r,
                  0 === o.type.length
                    ? (e) => x.call(this, e, o)
                    : (e) => o.type.forEach((t) => x.call(this, e, o, t))
                ),
                this
              );
            }
            getKeyword(e) {
              const t = this.RULES.all[e];
              return "object" == typeof t ? t.definition : !!t;
            }
            removeKeyword(e) {
              const { RULES: t } = this;
              delete t.keywords[e], delete t.all[e];
              for (const r of t.rules) {
                const t = r.rules.findIndex((t) => t.keyword === e);
                t >= 0 && r.rules.splice(t, 1);
              }
              return this;
            }
            addFormat(e, t) {
              return (
                "string" == typeof t && (t = new RegExp(t)),
                (this.formats[e] = t),
                this
              );
            }
            errorsText(
              e = this.errors,
              { separator: t = ", ", dataVar: r = "data" } = {}
            ) {
              return e && 0 !== e.length
                ? e
                    .map((e) => `${r}${e.instancePath} ${e.message}`)
                    .reduce((e, r) => e + t + r)
                : "No errors";
            }
            $dataMetaSchema(e, t) {
              const r = this.RULES.all;
              e = JSON.parse(JSON.stringify(e));
              for (const o of t) {
                const t = o.split("/").slice(1);
                let s = e;
                for (const e of t) s = s[e];
                for (const e in r) {
                  const t = r[e];
                  if ("object" != typeof t) continue;
                  const { $data: o } = t.definition,
                    a = s[e];
                  o && a && (s[e] = D(a));
                }
              }
              return e;
            }
            _removeAllSchemas(e, t) {
              for (const r in e) {
                const o = e[r];
                (t && !t.test(r)) ||
                  ("string" == typeof o
                    ? delete e[r]
                    : o &&
                      !o.meta &&
                      (this._cache.delete(o.schema), delete e[r]));
              }
            }
            _addSchema(
              e,
              t,
              r,
              o = this.opts.validateSchema,
              s = this.opts.addUsedSchema
            ) {
              let a;
              const { schemaId: n } = this.opts;
              if ("object" == typeof e) a = e[n];
              else {
                if (this.opts.jtd) throw new Error("schema must be object");
                if ("boolean" != typeof e)
                  throw new Error("schema must be object or boolean");
              }
              let i = this._cache.get(e);
              if (void 0 !== i) return i;
              r = (0, d.normalizeId)(a || r);
              const l = d.getSchemaRefs.call(this, e, r);
              return (
                (i = new c.SchemaEnv({
                  schema: e,
                  schemaId: n,
                  meta: t,
                  baseId: r,
                  localRefs: l,
                })),
                this._cache.set(i.schema, i),
                s &&
                  !r.startsWith("#") &&
                  (r && this._checkUnique(r), (this.refs[r] = i)),
                o && this.validateSchema(e, !0),
                i
              );
            }
            _checkUnique(e) {
              if (this.schemas[e] || this.refs[e])
                throw new Error(`schema with key or id "${e}" already exists`);
            }
            _compileSchemaEnv(e) {
              if (
                (e.meta
                  ? this._compileMetaSchema(e)
                  : c.compileSchema.call(this, e),
                !e.validate)
              )
                throw new Error("ajv implementation error");
              return e.validate;
            }
            _compileMetaSchema(e) {
              const t = this.opts;
              this.opts = this._metaOpts;
              try {
                c.compileSchema.call(this, e);
              } finally {
                this.opts = t;
              }
            }
          }
          function b(e, t, r, o = "error") {
            for (const s in e) {
              s in t && this.logger[o](`${r}: option ${s}. ${e[s]}`);
            }
          }
          function E(e) {
            return (e = (0, d.normalizeId)(e)), this.schemas[e] || this.refs[e];
          }
          function P() {
            const e = this.opts.schemas;
            if (e)
              if (Array.isArray(e)) this.addSchema(e);
              else for (const t in e) this.addSchema(e[t], t);
          }
          function S() {
            for (const e in this.opts.formats) {
              const t = this.opts.formats[e];
              t && this.addFormat(e, t);
            }
          }
          function N(e) {
            if (Array.isArray(e)) this.addVocabulary(e);
            else {
              this.logger.warn(
                "keywords option as map is deprecated, pass array"
              );
              for (const t in e) {
                const r = e[t];
                r.keyword || (r.keyword = t), this.addKeyword(r);
              }
            }
          }
          function k() {
            const e = {
              ...this.opts,
            };
            for (const t of y) delete e[t];
            return e;
          }
          (r.default = w),
            (w.ValidationError = a.default),
            (w.MissingRefError = n.default);
          const j = {
            log() {},
            warn() {},
            error() {},
          };
          const C = /^[a-z_$][a-z0-9_$:-]*$/i;
          function O(e, t) {
            const { RULES: r } = this;
            if (
              ((0, f.eachItem)(e, (e) => {
                if (r.keywords[e])
                  throw new Error(`Keyword ${e} is already defined`);
                if (!C.test(e))
                  throw new Error(`Keyword ${e} has invalid name`);
              }),
              t && t.$data && !("code" in t) && !("validate" in t))
            )
              throw new Error(
                '$data keyword must have "code" or "validate" function'
              );
          }
          function x(e, t, r) {
            var o;
            const s = null == t ? void 0 : t.post;
            if (r && s)
              throw new Error('keyword with "post" flag cannot have "type"');
            const { RULES: a } = this;
            let n = s ? a.post : a.rules.find(({ type: e }) => e === r);
            if (
              (n ||
                ((n = {
                  type: r,
                  rules: [],
                }),
                a.rules.push(n)),
              (a.keywords[e] = !0),
              !t)
            )
              return;
            const i = {
              keyword: e,
              definition: {
                ...t,
                type: (0, u.getJSONTypes)(t.type),
                schemaType: (0, u.getJSONTypes)(t.schemaType),
              },
            };
            t.before ? T.call(this, n, i, t.before) : n.rules.push(i),
              (a.all[e] = i),
              null === (o = t.implements) ||
                void 0 === o ||
                o.forEach((e) => this.addKeyword(e));
          }
          function T(e, t, r) {
            const o = e.rules.findIndex((e) => e.keyword === r);
            o >= 0
              ? e.rules.splice(o, 0, t)
              : (e.rules.push(t), this.logger.warn(`rule ${r} is not defined`));
          }
          function I(e) {
            let { metaSchema: t } = e;
            void 0 !== t &&
              (e.$data && this.opts.$data && (t = D(t)),
              (e.validateSchema = this.compile(t, !0)));
          }
          const R = {
            $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
          };
          function D(e) {
            return {
              anyOf: [e, R],
            };
          }
        },
        {
          "./compile": 5,
          "./compile/codegen": 2,
          "./compile/ref_error": 7,
          "./compile/resolve": 8,
          "./compile/rules": 9,
          "./compile/util": 10,
          "./compile/validate": 15,
          "./compile/validate/dataType": 13,
          "./refs/data.json": 19,
          "./runtime/uri": 23,
          "./runtime/validation_error": 24,
        },
      ],
      19: [
        function (e, t, r) {
          t.exports = {
            $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
            description:
              "Meta-schema for $data reference (JSON AnySchema extension proposal)",
            type: "object",
            required: ["$data"],
            properties: {
              $data: {
                type: "string",
                anyOf: [
                  {
                    format: "relative-json-pointer",
                  },
                  {
                    format: "json-pointer",
                  },
                ],
              },
            },
            additionalProperties: !1,
          };
        },
        {},
      ],
      20: [
        function (e, t, r) {
          t.exports = {
            $schema: "http://json-schema.org/draft-07/schema#",
            $id: "http://json-schema.org/draft-07/schema#",
            title: "Core schema meta-schema",
            definitions: {
              schemaArray: {
                type: "array",
                minItems: 1,
                items: {
                  $ref: "#",
                },
              },
              nonNegativeInteger: {
                type: "integer",
                minimum: 0,
              },
              nonNegativeIntegerDefault0: {
                allOf: [
                  {
                    $ref: "#/definitions/nonNegativeInteger",
                  },
                  {
                    default: 0,
                  },
                ],
              },
              simpleTypes: {
                enum: [
                  "array",
                  "boolean",
                  "integer",
                  "null",
                  "number",
                  "object",
                  "string",
                ],
              },
              stringArray: {
                type: "array",
                items: {
                  type: "string",
                },
                uniqueItems: !0,
                default: [],
              },
            },
            type: ["object", "boolean"],
            properties: {
              $id: {
                type: "string",
                format: "uri-reference",
              },
              $schema: {
                type: "string",
                format: "uri",
              },
              $ref: {
                type: "string",
                format: "uri-reference",
              },
              $comment: {
                type: "string",
              },
              title: {
                type: "string",
              },
              description: {
                type: "string",
              },
              default: !0,
              readOnly: {
                type: "boolean",
                default: !1,
              },
              examples: {
                type: "array",
                items: !0,
              },
              multipleOf: {
                type: "number",
                exclusiveMinimum: 0,
              },
              maximum: {
                type: "number",
              },
              exclusiveMaximum: {
                type: "number",
              },
              minimum: {
                type: "number",
              },
              exclusiveMinimum: {
                type: "number",
              },
              maxLength: {
                $ref: "#/definitions/nonNegativeInteger",
              },
              minLength: {
                $ref: "#/definitions/nonNegativeIntegerDefault0",
              },
              pattern: {
                type: "string",
                format: "regex",
              },
              additionalItems: {
                $ref: "#",
              },
              items: {
                anyOf: [
                  {
                    $ref: "#",
                  },
                  {
                    $ref: "#/definitions/schemaArray",
                  },
                ],
                default: !0,
              },
              maxItems: {
                $ref: "#/definitions/nonNegativeInteger",
              },
              minItems: {
                $ref: "#/definitions/nonNegativeIntegerDefault0",
              },
              uniqueItems: {
                type: "boolean",
                default: !1,
              },
              contains: {
                $ref: "#",
              },
              maxProperties: {
                $ref: "#/definitions/nonNegativeInteger",
              },
              minProperties: {
                $ref: "#/definitions/nonNegativeIntegerDefault0",
              },
              required: {
                $ref: "#/definitions/stringArray",
              },
              additionalProperties: {
                $ref: "#",
              },
              definitions: {
                type: "object",
                additionalProperties: {
                  $ref: "#",
                },
                default: {},
              },
              properties: {
                type: "object",
                additionalProperties: {
                  $ref: "#",
                },
                default: {},
              },
              patternProperties: {
                type: "object",
                additionalProperties: {
                  $ref: "#",
                },
                propertyNames: {
                  format: "regex",
                },
                default: {},
              },
              dependencies: {
                type: "object",
                additionalProperties: {
                  anyOf: [
                    {
                      $ref: "#",
                    },
                    {
                      $ref: "#/definitions/stringArray",
                    },
                  ],
                },
              },
              propertyNames: {
                $ref: "#",
              },
              const: !0,
              enum: {
                type: "array",
                items: !0,
                minItems: 1,
                uniqueItems: !0,
              },
              type: {
                anyOf: [
                  {
                    $ref: "#/definitions/simpleTypes",
                  },
                  {
                    type: "array",
                    items: {
                      $ref: "#/definitions/simpleTypes",
                    },
                    minItems: 1,
                    uniqueItems: !0,
                  },
                ],
              },
              format: {
                type: "string",
              },
              contentMediaType: {
                type: "string",
              },
              contentEncoding: {
                type: "string",
              },
              if: {
                $ref: "#",
              },
              then: {
                $ref: "#",
              },
              else: {
                $ref: "#",
              },
              allOf: {
                $ref: "#/definitions/schemaArray",
              },
              anyOf: {
                $ref: "#/definitions/schemaArray",
              },
              oneOf: {
                $ref: "#/definitions/schemaArray",
              },
              not: {
                $ref: "#",
              },
            },
            default: !0,
          };
        },
        {},
      ],
      21: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("fast-deep-equal");
          (o.code = 'require("ajv/dist/runtime/equal").default'),
            (r.default = o);
        },
        {
          "fast-deep-equal": 63,
        },
      ],
      22: [
        function (e, t, r) {
          "use strict";
          function o(e) {
            const t = e.length;
            let r,
              o = 0,
              s = 0;
            for (; s < t; )
              o++,
                (r = e.charCodeAt(s++)),
                r >= 55296 &&
                  r <= 56319 &&
                  s < t &&
                  ((r = e.charCodeAt(s)), 56320 == (64512 & r) && s++);
            return o;
          }
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.default = o),
            (o.code = 'require("ajv/dist/runtime/ucs2length").default');
        },
        {},
      ],
      23: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("uri-js");
          (o.code = 'require("ajv/dist/runtime/uri").default'), (r.default = o);
        },
        {
          "uri-js": 65,
        },
      ],
      24: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          class o extends Error {
            constructor(e) {
              super("validation failed"),
                (this.errors = e),
                (this.ajv = this.validation = !0);
            }
          }
          r.default = o;
        },
        {},
      ],
      25: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.validateAdditionalItems = void 0);
          const o = e("../../compile/codegen"),
            s = e("../../compile/util"),
            a = {
              keyword: "additionalItems",
              type: "array",
              schemaType: ["boolean", "object"],
              before: "uniqueItems",
              error: {
                message({ params: { len: e } }) {
                  return o.str`must NOT have more than ${e} items`;
                },
                params({ params: { len: e } }) {
                  return o._`{limit: ${e}}`;
                },
              },
              code(e) {
                const { parentSchema: t, it: r } = e,
                  { items: o } = t;
                Array.isArray(o)
                  ? n(e, o)
                  : (0, s.checkStrictMode)(
                      r,
                      '"additionalItems" is ignored when "items" is not an array of schemas'
                    );
              },
            };
          function n(e, t) {
            const { gen: r, schema: a, data: n, keyword: i, it: c } = e;
            c.items = !0;
            const l = r.const("len", o._`${n}.length`);
            if (!1 === a)
              e.setParams({
                len: t.length,
              }),
                e.pass(o._`${l} <= ${t.length}`);
            else if ("object" == typeof a && !(0, s.alwaysValidSchema)(c, a)) {
              const a = r.var("valid", o._`${l} <= ${t.length}`);
              r.if((0, o.not)(a), () =>
                (function (a) {
                  r.forRange("i", t.length, l, (t) => {
                    e.subschema(
                      {
                        keyword: i,
                        dataProp: t,
                        dataPropType: s.Type.Num,
                      },
                      a
                    ),
                      c.allErrors || r.if((0, o.not)(a), () => r.break());
                  });
                })(a)
              ),
                e.ok(a);
            }
          }
          (r.validateAdditionalItems = n), (r.default = a);
        },
        {
          "../../compile/codegen": 2,
          "../../compile/util": 10,
        },
      ],
      26: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../code"),
            s = e("../../compile/codegen"),
            a = e("../../compile/names"),
            n = e("../../compile/util");
          r.default = {
            keyword: "additionalProperties",
            type: ["object"],
            schemaType: ["boolean", "object"],
            allowUndefined: !0,
            trackErrors: !0,
            error: {
              message: "must NOT have additional properties",
              params({ params: e }) {
                return s._`{additionalProperty: ${e.additionalProperty}}`;
              },
            },
            code(e) {
              const {
                gen: t,
                schema: r,
                parentSchema: i,
                data: c,
                errsCount: l,
                it: d,
              } = e;
              if (!l) throw new Error("ajv implementation error");
              const { allErrors: u, opts: f } = d;
              if (
                ((d.props = !0),
                "all" !== f.removeAdditional && (0, n.alwaysValidSchema)(d, r))
              )
                return;
              const p = (0, o.allSchemaProperties)(i.properties),
                m = (0, o.allSchemaProperties)(i.patternProperties);
              function h(e) {
                t.code(s._`delete ${c}[${e}]`);
              }
              function y(o) {
                if (
                  "all" === f.removeAdditional ||
                  (f.removeAdditional && !1 === r)
                )
                  h(o);
                else {
                  if (!1 === r)
                    return (
                      e.setParams({
                        additionalProperty: o,
                      }),
                      e.error(),
                      void (u || t.break())
                    );
                  if ("object" == typeof r && !(0, n.alwaysValidSchema)(d, r)) {
                    const r = t.name("valid");
                    "failing" === f.removeAdditional
                      ? (v(o, r, !1),
                        t.if((0, s.not)(r), () => {
                          e.reset(), h(o);
                        }))
                      : (v(o, r), u || t.if((0, s.not)(r), () => t.break()));
                  }
                }
              }
              function v(t, r, o) {
                const s = {
                  keyword: "additionalProperties",
                  dataProp: t,
                  dataPropType: n.Type.Str,
                };
                !1 === o &&
                  Object.assign(s, {
                    compositeRule: !0,
                    createErrors: !1,
                    allErrors: !1,
                  }),
                  e.subschema(s, r);
              }
              t.forIn("key", c, (r) => {
                p.length || m.length
                  ? t.if(
                      (function (r) {
                        let a;
                        if (p.length > 8) {
                          const e = (0, n.schemaRefOrVal)(
                            d,
                            i.properties,
                            "properties"
                          );
                          a = (0, o.isOwnProperty)(t, e, r);
                        } else
                          a = p.length
                            ? (0, s.or)(...p.map((e) => s._`${r} === ${e}`))
                            : s.nil;
                        return (
                          m.length &&
                            (a = (0, s.or)(
                              a,
                              ...m.map(
                                (t) =>
                                  s._`${(0, o.usePattern)(e, t)}.test(${r})`
                              )
                            )),
                          (0, s.not)(a)
                        );
                      })(r),
                      () => y(r)
                    )
                  : y(r);
              }),
                e.ok(s._`${l} === ${a.default.errors}`);
            },
          };
        },
        {
          "../../compile/codegen": 2,
          "../../compile/names": 6,
          "../../compile/util": 10,
          "../code": 42,
        },
      ],
      27: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/util");
          r.default = {
            keyword: "allOf",
            schemaType: "array",
            code(e) {
              const { gen: t, schema: r, it: s } = e;
              if (!Array.isArray(r))
                throw new Error("ajv implementation error");
              const a = t.name("valid");
              r.forEach((t, r) => {
                if ((0, o.alwaysValidSchema)(s, t)) return;
                const n = e.subschema(
                  {
                    keyword: "allOf",
                    schemaProp: r,
                  },
                  a
                );
                e.ok(a), e.mergeEvaluated(n);
              });
            },
          };
        },
        {
          "../../compile/util": 10,
        },
      ],
      28: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../code");
          r.default = {
            keyword: "anyOf",
            schemaType: "array",
            trackErrors: !0,
            code: o.validateUnion,
            error: {
              message: "must match a schema in anyOf",
            },
          };
        },
        {
          "../code": 42,
        },
      ],
      29: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/codegen"),
            s = e("../../compile/util");
          r.default = {
            keyword: "contains",
            type: "array",
            schemaType: ["object", "boolean"],
            before: "uniqueItems",
            trackErrors: !0,
            error: {
              message({ params: { min: e, max: t } }) {
                return void 0 === t
                  ? o.str`must contain at least ${e} valid item(s)`
                  : o.str`must contain at least ${e} and no more than ${t} valid item(s)`;
              },
              params({ params: { min: e, max: t } }) {
                return void 0 === t
                  ? o._`{minContains: ${e}}`
                  : o._`{minContains: ${e}, maxContains: ${t}}`;
              },
            },
            code(e) {
              const { gen: t, schema: r, parentSchema: a, data: n, it: i } = e;
              let c, l;
              const { minContains: d, maxContains: u } = a;
              i.opts.next ? ((c = void 0 === d ? 1 : d), (l = u)) : (c = 1);
              const f = t.const("len", o._`${n}.length`);
              if (
                (e.setParams({
                  min: c,
                  max: l,
                }),
                void 0 === l && 0 === c)
              )
                return void (0, s.checkStrictMode)(
                  i,
                  '"minContains" == 0 without "maxContains": "contains" keyword ignored'
                );
              if (void 0 !== l && c > l)
                return (
                  (0, s.checkStrictMode)(
                    i,
                    '"minContains" > "maxContains" is always invalid'
                  ),
                  void e.fail()
                );
              if ((0, s.alwaysValidSchema)(i, r)) {
                let t = o._`${f} >= ${c}`;
                return (
                  void 0 !== l && (t = o._`${t} && ${f} <= ${l}`),
                  void e.pass(t)
                );
              }
              i.items = !0;
              const p = t.name("valid");
              function m() {
                const e = t.name("_valid"),
                  r = t.let("count", 0);
                h(e, () =>
                  t.if(e, () =>
                    (function (e) {
                      t.code(o._`${e}++`),
                        void 0 === l
                          ? t.if(o._`${e} >= ${c}`, () =>
                              t.assign(p, !0).break()
                            )
                          : (t.if(o._`${e} > ${l}`, () =>
                              t.assign(p, !1).break()
                            ),
                            1 === c
                              ? t.assign(p, !0)
                              : t.if(o._`${e} >= ${c}`, () => t.assign(p, !0)));
                    })(r)
                  )
                );
              }
              function h(r, o) {
                t.forRange("i", 0, f, (t) => {
                  e.subschema(
                    {
                      keyword: "contains",
                      dataProp: t,
                      dataPropType: s.Type.Num,
                      compositeRule: !0,
                    },
                    r
                  ),
                    o();
                });
              }
              void 0 === l && 1 === c
                ? h(p, () => t.if(p, () => t.break()))
                : 0 === c
                ? (t.let(p, !0), void 0 !== l && t.if(o._`${n}.length > 0`, m))
                : (t.let(p, !1), m()),
                e.result(p, () => e.reset());
            },
          };
        },
        {
          "../../compile/codegen": 2,
          "../../compile/util": 10,
        },
      ],
      30: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.validateSchemaDeps = r.validatePropertyDeps = r.error = void 0);
          const o = e("../../compile/codegen"),
            s = e("../../compile/util"),
            a = e("../code");
          r.error = {
            message({ params: { property: e, depsCount: t, deps: r } }) {
              return o.str`must have ${
                1 === t ? "property" : "properties"
              } ${r} when property ${e} is present`;
            },
            params({
              params: {
                property: e,
                depsCount: t,
                deps: r,
                missingProperty: s,
              },
            }) {
              return o._`{property: ${e},
    missingProperty: ${s},
    depsCount: ${t},
    deps: ${r}}`;
            },
          };
          const n = {
            keyword: "dependencies",
            type: "object",
            schemaType: "object",
            error: r.error,
            code(e) {
              const [t, r] = (function ({ schema: e }) {
                const t = {},
                  r = {};
                for (const o in e) {
                  if ("__proto__" === o) continue;
                  (Array.isArray(e[o]) ? t : r)[o] = e[o];
                }
                return [t, r];
              })(e);
              i(e, t), c(e, r);
            },
          };
          function i(e, t = e.schema) {
            const { gen: r, data: s, it: n } = e;
            if (0 === Object.keys(t).length) return;
            const i = r.let("missing");
            for (const c in t) {
              const l = t[c];
              if (0 === l.length) continue;
              const d = (0, a.propertyInData)(r, s, c, n.opts.ownProperties);
              e.setParams({
                property: c,
                depsCount: l.length,
                deps: l.join(", "),
              }),
                n.allErrors
                  ? r.if(d, () => {
                      for (const t of l) (0, a.checkReportMissingProp)(e, t);
                    })
                  : (r.if(o._`${d} && (${(0, a.checkMissingProp)(e, l, i)})`),
                    (0, a.reportMissingProp)(e, i),
                    r.else());
            }
          }
          function c(e, t = e.schema) {
            const { gen: r, data: o, keyword: n, it: i } = e,
              c = r.name("valid");
            for (const l in t)
              (0, s.alwaysValidSchema)(i, t[l]) ||
                (r.if(
                  (0, a.propertyInData)(r, o, l, i.opts.ownProperties),
                  () => {
                    const t = e.subschema(
                      {
                        keyword: n,
                        schemaProp: l,
                      },
                      c
                    );
                    e.mergeValidEvaluated(t, c);
                  },
                  () => r.var(c, !0)
                ),
                e.ok(c));
          }
          (r.validatePropertyDeps = i),
            (r.validateSchemaDeps = c),
            (r.default = n);
        },
        {
          "../../compile/codegen": 2,
          "../../compile/util": 10,
          "../code": 42,
        },
      ],
      31: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/codegen"),
            s = e("../../compile/util");
          function a(e, t) {
            const r = e.schema[t];
            return void 0 !== r && !(0, s.alwaysValidSchema)(e, r);
          }
          r.default = {
            keyword: "if",
            schemaType: ["object", "boolean"],
            trackErrors: !0,
            error: {
              message({ params: e }) {
                return o.str`must match "${e.ifClause}" schema`;
              },
              params({ params: e }) {
                return o._`{failingKeyword: ${e.ifClause}}`;
              },
            },
            code(e) {
              const { gen: t, parentSchema: r, it: n } = e;
              void 0 === r.then &&
                void 0 === r.else &&
                (0, s.checkStrictMode)(
                  n,
                  '"if" without "then" and "else" is ignored'
                );
              const i = a(n, "then"),
                c = a(n, "else");
              if (!i && !c) return;
              const l = t.let("valid", !0),
                d = t.name("_valid");
              if (
                ((function () {
                  const t = e.subschema(
                    {
                      keyword: "if",
                      compositeRule: !0,
                      createErrors: !1,
                      allErrors: !1,
                    },
                    d
                  );
                  e.mergeEvaluated(t);
                })(),
                e.reset(),
                i && c)
              ) {
                const r = t.let("ifClause");
                e.setParams({
                  ifClause: r,
                }),
                  t.if(d, u("then", r), u("else", r));
              } else i ? t.if(d, u("then")) : t.if((0, o.not)(d), u("else"));
              function u(r, s) {
                return () => {
                  const a = e.subschema(
                    {
                      keyword: r,
                    },
                    d
                  );
                  t.assign(l, d),
                    e.mergeValidEvaluated(a, l),
                    s
                      ? t.assign(s, o._`${r}`)
                      : e.setParams({
                          ifClause: r,
                        });
                };
              }
              e.pass(l, () => e.error(!0));
            },
          };
        },
        {
          "../../compile/codegen": 2,
          "../../compile/util": 10,
        },
      ],
      32: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("./additionalItems"),
            s = e("./prefixItems"),
            a = e("./items"),
            n = e("./items2020"),
            i = e("./contains"),
            c = e("./dependencies"),
            l = e("./propertyNames"),
            d = e("./additionalProperties"),
            u = e("./properties"),
            f = e("./patternProperties"),
            p = e("./not"),
            m = e("./anyOf"),
            h = e("./oneOf"),
            y = e("./allOf"),
            v = e("./if"),
            g = e("./thenElse");
          r.default = function (e = !1) {
            const t = [
              p.default,
              m.default,
              h.default,
              y.default,
              v.default,
              g.default,
              l.default,
              d.default,
              c.default,
              u.default,
              f.default,
            ];
            return (
              e ? t.push(s.default, n.default) : t.push(o.default, a.default),
              t.push(i.default),
              t
            );
          };
        },
        {
          "./additionalItems": 25,
          "./additionalProperties": 26,
          "./allOf": 27,
          "./anyOf": 28,
          "./contains": 29,
          "./dependencies": 30,
          "./if": 31,
          "./items": 33,
          "./items2020": 34,
          "./not": 35,
          "./oneOf": 36,
          "./patternProperties": 37,
          "./prefixItems": 38,
          "./properties": 39,
          "./propertyNames": 40,
          "./thenElse": 41,
        },
      ],
      33: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.validateTuple = void 0);
          const o = e("../../compile/codegen"),
            s = e("../../compile/util"),
            a = e("../code"),
            n = {
              keyword: "items",
              type: "array",
              schemaType: ["object", "array", "boolean"],
              before: "uniqueItems",
              code(e) {
                const { schema: t, it: r } = e;
                if (Array.isArray(t)) return i(e, "additionalItems", t);
                (r.items = !0),
                  (0, s.alwaysValidSchema)(r, t) ||
                    e.ok((0, a.validateArray)(e));
              },
            };
          function i(e, t, r = e.schema) {
            const { gen: a, parentSchema: n, data: i, keyword: c, it: l } = e;
            !(function (e) {
              const { opts: o, errSchemaPath: a } = l,
                n = r.length,
                i = n === e.minItems && (n === e.maxItems || !1 === e[t]);
              if (o.strictTuples && !i) {
                (0, s.checkStrictMode)(
                  l,
                  `"${c}" is ${n}-tuple, but minItems or maxItems/${t} are not specified or different at path "${a}"`,
                  o.strictTuples
                );
              }
            })(n),
              l.opts.unevaluated &&
                r.length &&
                !0 !== l.items &&
                (l.items = s.mergeEvaluated.items(a, r.length, l.items));
            const d = a.name("valid"),
              u = a.const("len", o._`${i}.length`);
            r.forEach((t, r) => {
              (0, s.alwaysValidSchema)(l, t) ||
                (a.if(o._`${u} > ${r}`, () =>
                  e.subschema(
                    {
                      keyword: c,
                      schemaProp: r,
                      dataProp: r,
                    },
                    d
                  )
                ),
                e.ok(d));
            });
          }
          (r.validateTuple = i), (r.default = n);
        },
        {
          "../../compile/codegen": 2,
          "../../compile/util": 10,
          "../code": 42,
        },
      ],
      34: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/codegen"),
            s = e("../../compile/util"),
            a = e("../code"),
            n = e("./additionalItems");
          r.default = {
            keyword: "items",
            type: "array",
            schemaType: ["object", "boolean"],
            before: "uniqueItems",
            error: {
              message({ params: { len: e } }) {
                return o.str`must NOT have more than ${e} items`;
              },
              params({ params: { len: e } }) {
                return o._`{limit: ${e}}`;
              },
            },
            code(e) {
              const { schema: t, parentSchema: r, it: o } = e,
                { prefixItems: i } = r;
              (o.items = !0),
                (0, s.alwaysValidSchema)(o, t) ||
                  (i
                    ? (0, n.validateAdditionalItems)(e, i)
                    : e.ok((0, a.validateArray)(e)));
            },
          };
        },
        {
          "../../compile/codegen": 2,
          "../../compile/util": 10,
          "../code": 42,
          "./additionalItems": 25,
        },
      ],
      35: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/util");
          r.default = {
            keyword: "not",
            schemaType: ["object", "boolean"],
            trackErrors: !0,
            code(e) {
              const { gen: t, schema: r, it: s } = e;
              if ((0, o.alwaysValidSchema)(s, r)) return void e.fail();
              const a = t.name("valid");
              e.subschema(
                {
                  keyword: "not",
                  compositeRule: !0,
                  createErrors: !1,
                  allErrors: !1,
                },
                a
              ),
                e.failResult(
                  a,
                  () => e.reset(),
                  () => e.error()
                );
            },
            error: {
              message: "must NOT be valid",
            },
          };
        },
        {
          "../../compile/util": 10,
        },
      ],
      36: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/codegen"),
            s = e("../../compile/util");
          r.default = {
            keyword: "oneOf",
            schemaType: "array",
            trackErrors: !0,
            error: {
              message: "must match exactly one schema in oneOf",
              params({ params: e }) {
                return o._`{passingSchemas: ${e.passing}}`;
              },
            },
            code(e) {
              const { gen: t, schema: r, parentSchema: a, it: n } = e;
              if (!Array.isArray(r))
                throw new Error("ajv implementation error");
              if (n.opts.discriminator && a.discriminator) return;
              const i = r,
                c = t.let("valid", !1),
                l = t.let("passing", null),
                d = t.name("_valid");
              e.setParams({
                passing: l,
              }),
                t.block(function () {
                  i.forEach((r, a) => {
                    let i;
                    (0, s.alwaysValidSchema)(n, r)
                      ? t.var(d, !0)
                      : (i = e.subschema(
                          {
                            keyword: "oneOf",
                            schemaProp: a,
                            compositeRule: !0,
                          },
                          d
                        )),
                      a > 0 &&
                        t
                          .if(o._`${d} && ${c}`)
                          .assign(c, !1)
                          .assign(l, o._`[${l}, ${a}]`)
                          .else(),
                      t.if(d, () => {
                        t.assign(c, !0),
                          t.assign(l, a),
                          i && e.mergeEvaluated(i, o.Name);
                      });
                  });
                }),
                e.result(
                  c,
                  () => e.reset(),
                  () => e.error(!0)
                );
            },
          };
        },
        {
          "../../compile/codegen": 2,
          "../../compile/util": 10,
        },
      ],
      37: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../code"),
            s = e("../../compile/codegen"),
            a = e("../../compile/util"),
            n = e("../../compile/util");
          r.default = {
            keyword: "patternProperties",
            type: "object",
            schemaType: "object",
            code(e) {
              const { gen: t, schema: r, data: i, parentSchema: c, it: l } = e,
                { opts: d } = l,
                u = (0, o.allSchemaProperties)(r),
                f = u.filter((e) => (0, a.alwaysValidSchema)(l, r[e]));
              if (
                0 === u.length ||
                (f.length === u.length &&
                  (!l.opts.unevaluated || !0 === l.props))
              )
                return;
              const p =
                  d.strictSchema && !d.allowMatchingProperties && c.properties,
                m = t.name("valid");
              !0 === l.props ||
                l.props instanceof s.Name ||
                (l.props = (0, n.evaluatedPropsToName)(t, l.props));
              const { props: h } = l;
              function y(e) {
                for (const t in p)
                  new RegExp(e).test(t) &&
                    (0, a.checkStrictMode)(
                      l,
                      `property ${t} matches pattern ${e} (use allowMatchingProperties)`
                    );
              }
              function v(r) {
                t.forIn("key", i, (a) => {
                  t.if(s._`${(0, o.usePattern)(e, r)}.test(${a})`, () => {
                    const o = f.includes(r);
                    o ||
                      e.subschema(
                        {
                          keyword: "patternProperties",
                          schemaProp: r,
                          dataProp: a,
                          dataPropType: n.Type.Str,
                        },
                        m
                      ),
                      l.opts.unevaluated && !0 !== h
                        ? t.assign(s._`${h}[${a}]`, !0)
                        : o ||
                          l.allErrors ||
                          t.if((0, s.not)(m), () => t.break());
                  });
                });
              }
              !(function () {
                for (const e of u)
                  p && y(e), l.allErrors ? v(e) : (t.var(m, !0), v(e), t.if(m));
              })();
            },
          };
        },
        {
          "../../compile/codegen": 2,
          "../../compile/util": 10,
          "../code": 42,
        },
      ],
      38: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("./items");
          r.default = {
            keyword: "prefixItems",
            type: "array",
            schemaType: ["array"],
            before: "uniqueItems",
            code(e) {
              return (0, o.validateTuple)(e, "items");
            },
          };
        },
        {
          "./items": 33,
        },
      ],
      39: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/validate"),
            s = e("../code"),
            a = e("../../compile/util"),
            n = e("./additionalProperties");
          r.default = {
            keyword: "properties",
            type: "object",
            schemaType: "object",
            code(e) {
              const { gen: t, schema: r, parentSchema: i, data: c, it: l } = e;
              "all" === l.opts.removeAdditional &&
                void 0 === i.additionalProperties &&
                n.default.code(
                  new o.KeywordCxt(l, n.default, "additionalProperties")
                );
              const d = (0, s.allSchemaProperties)(r);
              for (const e of d) l.definedProperties.add(e);
              l.opts.unevaluated &&
                d.length &&
                !0 !== l.props &&
                (l.props = a.mergeEvaluated.props(
                  t,
                  (0, a.toHash)(d),
                  l.props
                ));
              const u = d.filter((e) => !(0, a.alwaysValidSchema)(l, r[e]));
              if (0 === u.length) return;
              const f = t.name("valid");
              for (const r of u)
                p(r)
                  ? m(r)
                  : (t.if((0, s.propertyInData)(t, c, r, l.opts.ownProperties)),
                    m(r),
                    l.allErrors || t.else().var(f, !0),
                    t.endIf()),
                  e.it.definedProperties.add(r),
                  e.ok(f);
              function p(e) {
                return (
                  l.opts.useDefaults &&
                  !l.compositeRule &&
                  void 0 !== r[e].default
                );
              }
              function m(t) {
                e.subschema(
                  {
                    keyword: "properties",
                    schemaProp: t,
                    dataProp: t,
                  },
                  f
                );
              }
            },
          };
        },
        {
          "../../compile/util": 10,
          "../../compile/validate": 15,
          "../code": 42,
          "./additionalProperties": 26,
        },
      ],
      40: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/codegen"),
            s = e("../../compile/util");
          r.default = {
            keyword: "propertyNames",
            type: "object",
            schemaType: ["object", "boolean"],
            error: {
              message: "property name must be valid",
              params({ params: e }) {
                return o._`{propertyName: ${e.propertyName}}`;
              },
            },
            code(e) {
              const { gen: t, schema: r, data: a, it: n } = e;
              if ((0, s.alwaysValidSchema)(n, r)) return;
              const i = t.name("valid");
              t.forIn("key", a, (r) => {
                e.setParams({
                  propertyName: r,
                }),
                  e.subschema(
                    {
                      keyword: "propertyNames",
                      data: r,
                      dataTypes: ["string"],
                      propertyName: r,
                      compositeRule: !0,
                    },
                    i
                  ),
                  t.if((0, o.not)(i), () => {
                    e.error(!0), n.allErrors || t.break();
                  });
              }),
                e.ok(i);
            },
          };
        },
        {
          "../../compile/codegen": 2,
          "../../compile/util": 10,
        },
      ],
      41: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/util");
          r.default = {
            keyword: ["then", "else"],
            schemaType: ["object", "boolean"],
            code({ keyword: e, parentSchema: t, it: r }) {
              void 0 === t.if &&
                (0, o.checkStrictMode)(r, `"${e}" without "if" is ignored`);
            },
          };
        },
        {
          "../../compile/util": 10,
        },
      ],
      42: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.validateUnion =
              r.validateArray =
              r.usePattern =
              r.callValidateCode =
              r.schemaProperties =
              r.allSchemaProperties =
              r.noPropertyInData =
              r.propertyInData =
              r.isOwnProperty =
              r.hasPropFunc =
              r.reportMissingProp =
              r.checkMissingProp =
              r.checkReportMissingProp =
                void 0);
          const o = e("../compile/codegen"),
            s = e("../compile/util"),
            a = e("../compile/names"),
            n = e("../compile/util");
          function i(e) {
            return e.scopeValue("func", {
              ref: Object.prototype.hasOwnProperty,
              code: o._`Object.prototype.hasOwnProperty`,
            });
          }
          function c(e, t, r) {
            return o._`${i(e)}.call(${t}, ${r})`;
          }
          function l(e, t, r, s) {
            const a = o._`${t}${(0, o.getProperty)(r)} === undefined`;
            return s ? (0, o.or)(a, (0, o.not)(c(e, t, r))) : a;
          }
          function d(e) {
            return e ? Object.keys(e).filter((e) => "__proto__" !== e) : [];
          }
          (r.checkReportMissingProp = function (e, t) {
            const { gen: r, data: s, it: a } = e;
            r.if(l(r, s, t, a.opts.ownProperties), () => {
              e.setParams(
                {
                  missingProperty: o._`${t}`,
                },
                !0
              ),
                e.error();
            });
          }),
            (r.checkMissingProp = function (
              { gen: e, data: t, it: { opts: r } },
              s,
              a
            ) {
              return (0, o.or)(
                ...s.map((s) =>
                  (0, o.and)(l(e, t, s, r.ownProperties), o._`${a} = ${s}`)
                )
              );
            }),
            (r.reportMissingProp = function (e, t) {
              e.setParams(
                {
                  missingProperty: t,
                },
                !0
              ),
                e.error();
            }),
            (r.hasPropFunc = i),
            (r.isOwnProperty = c),
            (r.propertyInData = function (e, t, r, s) {
              const a = o._`${t}${(0, o.getProperty)(r)} !== undefined`;
              return s ? o._`${a} && ${c(e, t, r)}` : a;
            }),
            (r.noPropertyInData = l),
            (r.allSchemaProperties = d),
            (r.schemaProperties = function (e, t) {
              return d(t).filter((r) => !(0, s.alwaysValidSchema)(e, t[r]));
            }),
            (r.callValidateCode = function (
              {
                schemaCode: e,
                data: t,
                it: { gen: r, topSchemaRef: s, schemaPath: n, errorPath: i },
                it: c,
              },
              l,
              d,
              u
            ) {
              const f = u ? o._`${e}, ${t}, ${s}${n}` : t,
                p = [
                  [
                    a.default.instancePath,
                    (0, o.strConcat)(a.default.instancePath, i),
                  ],
                  [a.default.parentData, c.parentData],
                  [a.default.parentDataProperty, c.parentDataProperty],
                  [a.default.rootData, a.default.rootData],
                ];
              c.opts.dynamicRef &&
                p.push([a.default.dynamicAnchors, a.default.dynamicAnchors]);
              const m = o._`${f}, ${r.object(...p)}`;
              return d !== o.nil ? o._`${l}.call(${d}, ${m})` : o._`${l}(${m})`;
            });
          const u = o._`new RegExp`;
          (r.usePattern = function ({ gen: e, it: { opts: t } }, r) {
            const s = t.unicodeRegExp ? "u" : "",
              { regExp: a } = t.code,
              i = a(r, s);
            return e.scopeValue("pattern", {
              key: i.toString(),
              ref: i,
              code: o._`${
                "new RegExp" === a.code ? u : (0, n.useFunc)(e, a)
              }(${r}, ${s})`,
            });
          }),
            (r.validateArray = function (e) {
              const { gen: t, data: r, keyword: a, it: n } = e,
                i = t.name("valid");
              if (n.allErrors) {
                const e = t.let("valid", !0);
                return c(() => t.assign(e, !1)), e;
              }
              return t.var(i, !0), c(() => t.break()), i;
              function c(n) {
                const c = t.const("len", o._`${r}.length`);
                t.forRange("i", 0, c, (r) => {
                  e.subschema(
                    {
                      keyword: a,
                      dataProp: r,
                      dataPropType: s.Type.Num,
                    },
                    i
                  ),
                    t.if((0, o.not)(i), n);
                });
              }
            }),
            (r.validateUnion = function (e) {
              const { gen: t, schema: r, keyword: a, it: n } = e;
              if (!Array.isArray(r))
                throw new Error("ajv implementation error");
              if (
                r.some((e) => (0, s.alwaysValidSchema)(n, e)) &&
                !n.opts.unevaluated
              )
                return;
              const i = t.let("valid", !1),
                c = t.name("_valid");
              t.block(() =>
                r.forEach((r, s) => {
                  const n = e.subschema(
                    {
                      keyword: a,
                      schemaProp: s,
                      compositeRule: !0,
                    },
                    c
                  );
                  t.assign(i, o._`${i} || ${c}`);
                  e.mergeValidEvaluated(n, c) || t.if((0, o.not)(i));
                })
              ),
                e.result(
                  i,
                  () => e.reset(),
                  () => e.error(!0)
                );
            });
        },
        {
          "../compile/codegen": 2,
          "../compile/names": 6,
          "../compile/util": 10,
        },
      ],
      43: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          r.default = {
            keyword: "id",
            code() {
              throw new Error(
                'NOT SUPPORTED: keyword "id", use "$id" for schema ID'
              );
            },
          };
        },
        {},
      ],
      44: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("./id"),
            s = e("./ref");
          r.default = [
            "$schema",
            "$id",
            "$defs",
            "$vocabulary",
            {
              keyword: "$comment",
            },
            "definitions",
            o.default,
            s.default,
          ];
        },
        {
          "./id": 43,
          "./ref": 45,
        },
      ],
      45: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.callRef = r.getValidate = void 0);
          const o = e("../../compile/ref_error"),
            s = e("../code"),
            a = e("../../compile/codegen"),
            n = e("../../compile/names"),
            i = e("../../compile"),
            c = e("../../compile/util"),
            l = {
              keyword: "$ref",
              schemaType: "string",
              code(e) {
                const { gen: t, schema: r, it: s } = e,
                  {
                    baseId: n,
                    schemaEnv: c,
                    validateName: l,
                    opts: f,
                    self: p,
                  } = s,
                  { root: m } = c;
                if (("#" === r || "#/" === r) && n === m.baseId)
                  return (function () {
                    if (c === m) return u(e, l, c, c.$async);
                    const r = t.scopeValue("root", {
                      ref: m,
                    });
                    return u(e, a._`${r}.validate`, m, m.$async);
                  })();
                const h = i.resolveRef.call(p, m, n, r);
                if (void 0 === h) throw new o.default(s.opts.uriResolver, n, r);
                return h instanceof i.SchemaEnv
                  ? (function (t) {
                      const r = d(e, t);
                      u(e, r, t, t.$async);
                    })(h)
                  : (function (o) {
                      const s = t.scopeValue(
                          "schema",
                          !0 === f.code.source
                            ? {
                                ref: o,
                                code: (0, a.stringify)(o),
                              }
                            : {
                                ref: o,
                              }
                        ),
                        n = t.name("valid"),
                        i = e.subschema(
                          {
                            schema: o,
                            dataTypes: [],
                            schemaPath: a.nil,
                            topSchemaRef: s,
                            errSchemaPath: r,
                          },
                          n
                        );
                      e.mergeEvaluated(i), e.ok(n);
                    })(h);
              },
            };
          function d(e, t) {
            const { gen: r } = e;
            return t.validate
              ? r.scopeValue("validate", {
                  ref: t.validate,
                })
              : a._`${r.scopeValue("wrapper", {
                  ref: t,
                })}.validate`;
          }
          function u(e, t, r, o) {
            const { gen: i, it: l } = e,
              { allErrors: d, schemaEnv: u, opts: f } = l,
              p = f.passContext ? n.default.this : a.nil;
            function m(e) {
              const t = a._`${e}.errors`;
              i.assign(
                n.default.vErrors,
                a._`${n.default.vErrors} === null ? ${t} : ${n.default.vErrors}.concat(${t})`
              ),
                i.assign(n.default.errors, a._`${n.default.vErrors}.length`);
            }
            function h(e) {
              var t;
              if (!l.opts.unevaluated) return;
              const o =
                null === (t = null == r ? void 0 : r.validate) || void 0 === t
                  ? void 0
                  : t.evaluated;
              if (!0 !== l.props)
                if (o && !o.dynamicProps)
                  void 0 !== o.props &&
                    (l.props = c.mergeEvaluated.props(i, o.props, l.props));
                else {
                  const t = i.var("props", a._`${e}.evaluated.props`);
                  l.props = c.mergeEvaluated.props(i, t, l.props, a.Name);
                }
              if (!0 !== l.items)
                if (o && !o.dynamicItems)
                  void 0 !== o.items &&
                    (l.items = c.mergeEvaluated.items(i, o.items, l.items));
                else {
                  const t = i.var("items", a._`${e}.evaluated.items`);
                  l.items = c.mergeEvaluated.items(i, t, l.items, a.Name);
                }
            }
            o
              ? (function () {
                  if (!u.$async)
                    throw new Error("async schema referenced by sync schema");
                  const r = i.let("valid");
                  i.try(
                    () => {
                      i.code(a._`await ${(0, s.callValidateCode)(e, t, p)}`),
                        h(t),
                        d || i.assign(r, !0);
                    },
                    (e) => {
                      i.if(a._`!(${e} instanceof ${l.ValidationError})`, () =>
                        i.throw(e)
                      ),
                        m(e),
                        d || i.assign(r, !1);
                    }
                  ),
                    e.ok(r);
                })()
              : e.result(
                  (0, s.callValidateCode)(e, t, p),
                  () => h(t),
                  () => m(t)
                );
          }
          (r.getValidate = d), (r.callRef = u), (r.default = l);
        },
        {
          "../../compile": 5,
          "../../compile/codegen": 2,
          "../../compile/names": 6,
          "../../compile/ref_error": 7,
          "../../compile/util": 10,
          "../code": 42,
        },
      ],
      46: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/codegen"),
            s = e("../discriminator/types"),
            a = e("../../compile"),
            n = e("../../compile/util");
          r.default = {
            keyword: "discriminator",
            type: "object",
            schemaType: "object",
            error: {
              message({ params: { discrError: e, tagName: t } }) {
                return e === s.DiscrError.Tag
                  ? `tag "${t}" must be string`
                  : `value of tag "${t}" must be in oneOf`;
              },
              params({ params: { discrError: e, tag: t, tagName: r } }) {
                return o._`{error: ${e}, tag: ${r}, tagValue: ${t}}`;
              },
            },
            code(e) {
              const { gen: t, data: r, schema: i, parentSchema: c, it: l } = e,
                { oneOf: d } = c;
              if (!l.opts.discriminator)
                throw new Error("discriminator: requires discriminator option");
              const u = i.propertyName;
              if ("string" != typeof u)
                throw new Error("discriminator: requires propertyName");
              if (i.mapping)
                throw new Error("discriminator: mapping is not supported");
              if (!d) throw new Error("discriminator: requires oneOf keyword");
              const f = t.let("valid", !1),
                p = t.const("tag", o._`${r}${(0, o.getProperty)(u)}`);
              function m(r) {
                const s = t.name("valid"),
                  a = e.subschema(
                    {
                      keyword: "oneOf",
                      schemaProp: r,
                    },
                    s
                  );
                return e.mergeEvaluated(a, o.Name), s;
              }
              t.if(
                o._`typeof ${p} == "string"`,
                () =>
                  (function () {
                    const r = (function () {
                      var e;
                      const t = {},
                        r = s(c);
                      let o = !0;
                      for (let t = 0; t < d.length; t++) {
                        let c = d[t];
                        (null == c ? void 0 : c.$ref) &&
                          !(0, n.schemaHasRulesButRef)(c, l.self.RULES) &&
                          ((c = a.resolveRef.call(
                            l.self,
                            l.schemaEnv.root,
                            l.baseId,
                            null == c ? void 0 : c.$ref
                          )),
                          c instanceof a.SchemaEnv && (c = c.schema));
                        const f =
                          null === (e = null == c ? void 0 : c.properties) ||
                          void 0 === e
                            ? void 0
                            : e[u];
                        if ("object" != typeof f)
                          throw new Error(
                            `discriminator: oneOf subschemas (or referenced schemas) must have "properties/${u}"`
                          );
                        (o = o && (r || s(c))), i(f, t);
                      }
                      if (!o)
                        throw new Error(
                          `discriminator: "${u}" must be required`
                        );
                      return t;
                      function s({ required: e }) {
                        return Array.isArray(e) && e.includes(u);
                      }
                      function i(e, t) {
                        if (e.const) f(e.const, t);
                        else {
                          if (!e.enum)
                            throw new Error(
                              `discriminator: "properties/${u}" must have "const" or "enum"`
                            );
                          for (const r of e.enum) f(r, t);
                        }
                      }
                      function f(e, r) {
                        if ("string" != typeof e || e in t)
                          throw new Error(
                            `discriminator: "${u}" values must be unique strings`
                          );
                        t[e] = r;
                      }
                    })();
                    t.if(!1);
                    for (const e in r)
                      t.elseIf(o._`${p} === ${e}`), t.assign(f, m(r[e]));
                    t.else(),
                      e.error(!1, {
                        discrError: s.DiscrError.Mapping,
                        tag: p,
                        tagName: u,
                      }),
                      t.endIf();
                  })(),
                () =>
                  e.error(!1, {
                    discrError: s.DiscrError.Tag,
                    tag: p,
                    tagName: u,
                  })
              ),
                e.ok(f);
            },
          };
        },
        {
          "../../compile": 5,
          "../../compile/codegen": 2,
          "../../compile/util": 10,
          "../discriminator/types": 47,
        },
      ],
      47: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.DiscrError = void 0),
            (function (e) {
              (e.Tag = "tag"), (e.Mapping = "mapping");
            })(r.DiscrError || (r.DiscrError = {}));
        },
        {},
      ],
      48: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("./core"),
            s = e("./validation"),
            a = e("./applicator"),
            n = e("./format"),
            i = e("./metadata"),
            c = [
              o.default,
              s.default,
              (0, a.default)(),
              n.default,
              i.metadataVocabulary,
              i.contentVocabulary,
            ];
          r.default = c;
        },
        {
          "./applicator": 32,
          "./core": 44,
          "./format": 50,
          "./metadata": 51,
          "./validation": 54,
        },
      ],
      49: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/codegen");
          r.default = {
            keyword: "format",
            type: ["number", "string"],
            schemaType: "string",
            $data: !0,
            error: {
              message({ schemaCode: e }) {
                return o.str`must match format "${e}"`;
              },
              params({ schemaCode: e }) {
                return o._`{format: ${e}}`;
              },
            },
            code(e, t) {
              const {
                  gen: r,
                  data: s,
                  $data: a,
                  schema: n,
                  schemaCode: i,
                  it: c,
                } = e,
                { opts: l, errSchemaPath: d, schemaEnv: u, self: f } = c;
              l.validateFormats &&
                (a
                  ? (function () {
                      const a = r.scopeValue("formats", {
                          ref: f.formats,
                          code: l.code.formats,
                        }),
                        n = r.const("fDef", o._`${a}[${i}]`),
                        c = r.let("fType"),
                        d = r.let("format");
                      r.if(
                        o._`typeof ${n} == "object" && !(${n} instanceof RegExp)`,
                        () =>
                          r
                            .assign(c, o._`${n}.type || "string"`)
                            .assign(d, o._`${n}.validate`),
                        () => r.assign(c, o._`"string"`).assign(d, n)
                      ),
                        e.fail$data(
                          (0, o.or)(
                            !1 === l.strictSchema ? o.nil : o._`${i} && !${d}`,
                            (function () {
                              const e = u.$async
                                  ? o._`(${n}.async ? await ${d}(${s}) : ${d}(${s}))`
                                  : o._`${d}(${s})`,
                                r = o._`(typeof ${d} == "function" ? ${e} : ${d}.test(${s}))`;
                              return o._`${d} && ${d} !== true && ${c} === ${t} && !${r}`;
                            })()
                          )
                        );
                    })()
                  : (function () {
                      const a = f.formats[n];
                      if (!a)
                        return void (function () {
                          if (!1 === l.strictSchema)
                            return void f.logger.warn(e());
                          throw new Error(e());
                          function e() {
                            return `unknown format "${n}" ignored in schema at path "${d}"`;
                          }
                        })();
                      if (!0 === a) return;
                      const [i, c, p] = (function (e) {
                        const t =
                            e instanceof RegExp
                              ? (0, o.regexpCode)(e)
                              : l.code.formats
                              ? o._`${l.code.formats}${(0, o.getProperty)(n)}`
                              : void 0,
                          s = r.scopeValue("formats", {
                            key: n,
                            ref: e,
                            code: t,
                          });
                        if ("object" == typeof e && !(e instanceof RegExp))
                          return [
                            e.type || "string",
                            e.validate,
                            o._`${s}.validate`,
                          ];
                        return ["string", e, s];
                      })(a);
                      i === t &&
                        e.pass(
                          (function () {
                            if (
                              "object" == typeof a &&
                              !(a instanceof RegExp) &&
                              a.async
                            ) {
                              if (!u.$async)
                                throw new Error("async format in sync schema");
                              return o._`await ${p}(${s})`;
                            }
                            return "function" == typeof c
                              ? o._`${p}(${s})`
                              : o._`${p}.test(${s})`;
                          })()
                        );
                    })());
            },
          };
        },
        {
          "../../compile/codegen": 2,
        },
      ],
      50: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("./format");
          r.default = [o.default];
        },
        {
          "./format": 49,
        },
      ],
      51: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.contentVocabulary = r.metadataVocabulary = void 0),
            (r.metadataVocabulary = [
              "title",
              "description",
              "default",
              "deprecated",
              "readOnly",
              "writeOnly",
              "examples",
            ]),
            (r.contentVocabulary = [
              "contentMediaType",
              "contentEncoding",
              "contentSchema",
            ]);
        },
        {},
      ],
      52: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/codegen"),
            s = e("../../compile/util"),
            a = e("../../runtime/equal");
          r.default = {
            keyword: "const",
            $data: !0,
            error: {
              message: "must be equal to constant",
              params({ schemaCode: e }) {
                return o._`{allowedValue: ${e}}`;
              },
            },
            code(e) {
              const { gen: t, data: r, $data: n, schemaCode: i, schema: c } = e;
              n || (c && "object" == typeof c)
                ? e.fail$data(o._`!${(0, s.useFunc)(t, a.default)}(${r}, ${i})`)
                : e.fail(o._`${c} !== ${r}`);
            },
          };
        },
        {
          "../../compile/codegen": 2,
          "../../compile/util": 10,
          "../../runtime/equal": 21,
        },
      ],
      53: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/codegen"),
            s = e("../../compile/util"),
            a = e("../../runtime/equal");
          r.default = {
            keyword: "enum",
            schemaType: "array",
            $data: !0,
            error: {
              message: "must be equal to one of the allowed values",
              params({ schemaCode: e }) {
                return o._`{allowedValues: ${e}}`;
              },
            },
            code(e) {
              const {
                gen: t,
                data: r,
                $data: n,
                schema: i,
                schemaCode: c,
                it: l,
              } = e;
              if (!n && 0 === i.length)
                throw new Error("enum must have non-empty array");
              let d;
              const u = () =>
                null != d ? d : (d = (0, s.useFunc)(t, a.default));
              let f;
              if (i.length >= l.opts.loopEnum || n)
                (f = t.let("valid")),
                  e.block$data(f, function () {
                    t.assign(f, !1),
                      t.forOf("v", c, (e) =>
                        t.if(o._`${u()}(${r}, ${e})`, () =>
                          t.assign(f, !0).break()
                        )
                      );
                  });
              else {
                if (!Array.isArray(i))
                  throw new Error("ajv implementation error");
                const e = t.const("vSchema", c);
                f = (0, o.or)(
                  ...i.map((t, s) =>
                    (function (e, t) {
                      const s = i[t];
                      return "object" == typeof s && null !== s
                        ? o._`${u()}(${r}, ${e}[${t}])`
                        : o._`${r} === ${s}`;
                    })(e, s)
                  )
                );
              }
              e.pass(f);
            },
          };
        },
        {
          "../../compile/codegen": 2,
          "../../compile/util": 10,
          "../../runtime/equal": 21,
        },
      ],
      54: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("./limitNumber"),
            s = e("./multipleOf"),
            a = e("./limitLength"),
            n = e("./pattern"),
            i = e("./limitProperties"),
            c = e("./required"),
            l = e("./limitItems"),
            d = e("./uniqueItems"),
            u = e("./const"),
            f = e("./enum");
          r.default = [
            o.default,
            s.default,
            a.default,
            n.default,
            i.default,
            c.default,
            l.default,
            d.default,
            {
              keyword: "type",
              schemaType: ["string", "array"],
            },
            {
              keyword: "nullable",
              schemaType: "boolean",
            },
            u.default,
            f.default,
          ];
        },
        {
          "./const": 52,
          "./enum": 53,
          "./limitItems": 55,
          "./limitLength": 56,
          "./limitNumber": 57,
          "./limitProperties": 58,
          "./multipleOf": 59,
          "./pattern": 60,
          "./required": 61,
          "./uniqueItems": 62,
        },
      ],
      55: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/codegen");
          r.default = {
            keyword: ["maxItems", "minItems"],
            type: "array",
            schemaType: "number",
            $data: !0,
            error: {
              message: ({ keyword: e, schemaCode: t }) =>
                o.str`must NOT have ${
                  "maxItems" === e ? "more" : "fewer"
                } than ${t} items`,
              params({ schemaCode: e }) {
                return o._`{limit: ${e}}`;
              },
            },
            code(e) {
              const { keyword: t, data: r, schemaCode: s } = e;
              e.fail$data(
                o._`${r}.length ${
                  "maxItems" === t ? o.operators.GT : o.operators.LT
                } ${s}`
              );
            },
          };
        },
        {
          "../../compile/codegen": 2,
        },
      ],
      56: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/codegen"),
            s = e("../../compile/util"),
            a = e("../../runtime/ucs2length");
          r.default = {
            keyword: ["maxLength", "minLength"],
            type: "string",
            schemaType: "number",
            $data: !0,
            error: {
              message: ({ keyword: e, schemaCode: t }) =>
                o.str`must NOT have ${
                  "maxLength" === e ? "more" : "fewer"
                } than ${t} characters`,
              params({ schemaCode: e }) {
                return o._`{limit: ${e}}`;
              },
            },
            code(e) {
              const { keyword: t, data: r, schemaCode: n, it: i } = e,
                c = "maxLength" === t ? o.operators.GT : o.operators.LT,
                l =
                  !1 === i.opts.unicode
                    ? o._`${r}.length`
                    : o._`${(0, s.useFunc)(e.gen, a.default)}(${r})`;
              e.fail$data(o._`${l} ${c} ${n}`);
            },
          };
        },
        {
          "../../compile/codegen": 2,
          "../../compile/util": 10,
          "../../runtime/ucs2length": 22,
        },
      ],
      57: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/codegen"),
            s = o.operators,
            a = {
              maximum: {
                okStr: "<=",
                ok: s.LTE,
                fail: s.GT,
              },
              minimum: {
                okStr: ">=",
                ok: s.GTE,
                fail: s.LT,
              },
              exclusiveMaximum: {
                okStr: "<",
                ok: s.LT,
                fail: s.GTE,
              },
              exclusiveMinimum: {
                okStr: ">",
                ok: s.GT,
                fail: s.LTE,
              },
            },
            n = {
              message({ keyword: e, schemaCode: t }) {
                return o.str`must be ${a[e].okStr} ${t}`;
              },
              params({ keyword: e, schemaCode: t }) {
                return o._`{comparison: ${a[e].okStr}, limit: ${t}}`;
              },
            },
            i = {
              keyword: Object.keys(a),
              type: "number",
              schemaType: "number",
              $data: !0,
              error: n,
              code(e) {
                const { keyword: t, data: r, schemaCode: s } = e;
                e.fail$data(o._`${r} ${a[t].fail} ${s} || isNaN(${r})`);
              },
            };
          r.default = i;
        },
        {
          "../../compile/codegen": 2,
        },
      ],
      58: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/codegen");
          r.default = {
            keyword: ["maxProperties", "minProperties"],
            type: "object",
            schemaType: "number",
            $data: !0,
            error: {
              message: ({ keyword: e, schemaCode: t }) =>
                o.str`must NOT have ${
                  "maxProperties" === e ? "more" : "fewer"
                } than ${t} properties`,
              params({ schemaCode: e }) {
                return o._`{limit: ${e}}`;
              },
            },
            code(e) {
              const { keyword: t, data: r, schemaCode: s } = e;
              e.fail$data(
                o._`Object.keys(${r}).length ${
                  "maxProperties" === t ? o.operators.GT : o.operators.LT
                } ${s}`
              );
            },
          };
        },
        {
          "../../compile/codegen": 2,
        },
      ],
      59: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/codegen");
          r.default = {
            keyword: "multipleOf",
            type: "number",
            schemaType: "number",
            $data: !0,
            error: {
              message({ schemaCode: e }) {
                return o.str`must be multiple of ${e}`;
              },
              params({ schemaCode: e }) {
                return o._`{multipleOf: ${e}}`;
              },
            },
            code(e) {
              const { gen: t, data: r, schemaCode: s, it: a } = e,
                n = a.opts.multipleOfPrecision,
                i = t.let("res"),
                c = n
                  ? o._`Math.abs(Math.round(${i}) - ${i}) > 1e-${n}`
                  : o._`${i} !== parseInt(${i})`;
              e.fail$data(o._`(${s} === 0 || (${i} = ${r}/${s}, ${c}))`);
            },
          };
        },
        {
          "../../compile/codegen": 2,
        },
      ],
      60: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../code"),
            s = e("../../compile/codegen");
          r.default = {
            keyword: "pattern",
            type: "string",
            schemaType: "string",
            $data: !0,
            error: {
              message({ schemaCode: e }) {
                return s.str`must match pattern "${e}"`;
              },
              params({ schemaCode: e }) {
                return s._`{pattern: ${e}}`;
              },
            },
            code(e) {
              const { data: t, $data: r, schema: a, schemaCode: n, it: i } = e,
                c = r
                  ? s._`(new RegExp(${n}, ${i.opts.unicodeRegExp ? "u" : ""}))`
                  : (0, o.usePattern)(e, a);
              e.fail$data(s._`!${c}.test(${t})`);
            },
          };
        },
        {
          "../../compile/codegen": 2,
          "../code": 42,
        },
      ],
      61: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../code"),
            s = e("../../compile/codegen"),
            a = e("../../compile/util");
          r.default = {
            keyword: "required",
            type: "object",
            schemaType: "array",
            $data: !0,
            error: {
              message({ params: { missingProperty: e } }) {
                return s.str`must have required property '${e}'`;
              },
              params({ params: { missingProperty: e } }) {
                return s._`{missingProperty: ${e}}`;
              },
            },
            code(e) {
              const {
                  gen: t,
                  schema: r,
                  schemaCode: n,
                  data: i,
                  $data: c,
                  it: l,
                } = e,
                { opts: d } = l;
              if (!c && 0 === r.length) return;
              const u = r.length >= d.loopRequired;
              if (
                (l.allErrors
                  ? (function () {
                      if (u || c) e.block$data(s.nil, f);
                      else
                        for (const t of r) (0, o.checkReportMissingProp)(e, t);
                    })()
                  : (function () {
                      const a = t.let("missing");
                      if (u || c) {
                        const r = t.let("valid", !0);
                        e.block$data(r, () =>
                          (function (r, a) {
                            e.setParams({
                              missingProperty: r,
                            }),
                              t.forOf(
                                r,
                                n,
                                () => {
                                  t.assign(
                                    a,
                                    (0, o.propertyInData)(
                                      t,
                                      i,
                                      r,
                                      d.ownProperties
                                    )
                                  ),
                                    t.if((0, s.not)(a), () => {
                                      e.error(), t.break();
                                    });
                                },
                                s.nil
                              );
                          })(a, r)
                        ),
                          e.ok(r);
                      } else
                        t.if((0, o.checkMissingProp)(e, r, a)),
                          (0, o.reportMissingProp)(e, a),
                          t.else();
                    })(),
                d.strictRequired)
              ) {
                const t = e.parentSchema.properties,
                  { definedProperties: o } = e.it;
                for (const e of r)
                  if (void 0 === (null == t ? void 0 : t[e]) && !o.has(e)) {
                    (0, a.checkStrictMode)(
                      l,
                      `required property "${e}" is not defined at "${
                        l.schemaEnv.baseId + l.errSchemaPath
                      }" (strictRequired)`,
                      l.opts.strictRequired
                    );
                  }
              }
              function f() {
                t.forOf("prop", n, (r) => {
                  e.setParams({
                    missingProperty: r,
                  }),
                    t.if(
                      (0, o.noPropertyInData)(t, i, r, d.ownProperties),
                      () => e.error()
                    );
                });
              }
            },
          };
        },
        {
          "../../compile/codegen": 2,
          "../../compile/util": 10,
          "../code": 42,
        },
      ],
      62: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          });
          const o = e("../../compile/validate/dataType"),
            s = e("../../compile/codegen"),
            a = e("../../compile/util"),
            n = e("../../runtime/equal");
          r.default = {
            keyword: "uniqueItems",
            type: "array",
            schemaType: "boolean",
            $data: !0,
            error: {
              message({ params: { i: e, j: t } }) {
                return s.str`must NOT have duplicate items (items ## ${t} and ${e} are identical)`;
              },
              params({ params: { i: e, j: t } }) {
                return s._`{i: ${e}, j: ${t}}`;
              },
            },
            code(e) {
              const {
                gen: t,
                data: r,
                $data: i,
                schema: c,
                parentSchema: l,
                schemaCode: d,
                it: u,
              } = e;
              if (!i && !c) return;
              const f = t.let("valid"),
                p = l.items ? (0, o.getSchemaTypes)(l.items) : [];
              function m(a, n) {
                const i = t.name("item"),
                  c = (0, o.checkDataTypes)(
                    p,
                    i,
                    u.opts.strictNumbers,
                    o.DataType.Wrong
                  ),
                  l = t.const("indices", s._`{}`);
                t.for(s._`;${a}--;`, () => {
                  t.let(i, s._`${r}[${a}]`),
                    t.if(c, s._`continue`),
                    p.length > 1 &&
                      t.if(s._`typeof ${i} == "string"`, s._`${i} += "_"`),
                    t
                      .if(s._`typeof ${l}[${i}] == "number"`, () => {
                        t.assign(n, s._`${l}[${i}]`),
                          e.error(),
                          t.assign(f, !1).break();
                      })
                      .code(s._`${l}[${i}] = ${a}`);
                });
              }
              function h(o, i) {
                const c = (0, a.useFunc)(t, n.default),
                  l = t.name("outer");
                t.label(l).for(s._`;${o}--;`, () =>
                  t.for(s._`${i} = ${o}; ${i}--;`, () =>
                    t.if(s._`${c}(${r}[${o}], ${r}[${i}])`, () => {
                      e.error(), t.assign(f, !1).break(l);
                    })
                  )
                );
              }
              e.block$data(
                f,
                function () {
                  const o = t.let("i", s._`${r}.length`),
                    a = t.let("j");
                  e.setParams({
                    i: o,
                    j: a,
                  }),
                    t.assign(f, !0),
                    t.if(s._`${o} > 1`, () =>
                      (p.length > 0 &&
                        !p.some((e) => "object" === e || "array" === e)
                        ? m
                        : h)(o, a)
                    );
                },
                s._`${d} === false`
              ),
                e.ok(f);
            },
          };
        },
        {
          "../../compile/codegen": 2,
          "../../compile/util": 10,
          "../../compile/validate/dataType": 13,
          "../../runtime/equal": 21,
        },
      ],
      63: [
        function (e, t, r) {
          "use strict";
          t.exports = function e(t, r) {
            if (t === r) return !0;
            if (t && r && "object" == typeof t && "object" == typeof r) {
              if (t.constructor !== r.constructor) return !1;
              var o, s, a;
              if (Array.isArray(t)) {
                if ((o = t.length) != r.length) return !1;
                for (s = o; 0 != s--; ) if (!e(t[s], r[s])) return !1;
                return !0;
              }
              if (t.constructor === RegExp)
                return t.source === r.source && t.flags === r.flags;
              if (t.valueOf !== Object.prototype.valueOf)
                return t.valueOf() === r.valueOf();
              if (t.toString !== Object.prototype.toString)
                return t.toString() === r.toString();
              if ((o = (a = Object.keys(t)).length) !== Object.keys(r).length)
                return !1;
              for (s = o; 0 != s--; )
                if (!Object.prototype.hasOwnProperty.call(r, a[s])) return !1;
              for (s = o; 0 != s--; ) {
                var n = a[s];
                if (!e(t[n], r[n])) return !1;
              }
              return !0;
            }
            return t != t && r != r;
          };
        },
        {},
      ],
      64: [
        function (e, t, r) {
          "use strict";
          var o = (t.exports = function (e, t, r) {
            "function" == typeof t && ((r = t), (t = {})),
              s(
                t,
                "function" == typeof (r = t.cb || r)
                  ? r
                  : r.pre || function () {},
                r.post || function () {},
                e,
                "",
                e
              );
          });
          function s(e, t, r, a, n, i, c, l, d, u) {
            if (a && "object" == typeof a && !Array.isArray(a)) {
              for (var f in (t(a, n, i, c, l, d, u), a)) {
                var p = a[f];
                if (Array.isArray(p)) {
                  if (f in o.arrayKeywords)
                    for (var m = 0; m < p.length; m++)
                      s(e, t, r, p[m], n + "/" + f + "/" + m, i, n, f, a, m);
                } else if (f in o.propsKeywords) {
                  if (p && "object" == typeof p)
                    for (var h in p)
                      s(
                        e,
                        t,
                        r,
                        p[h],
                        n +
                          "/" +
                          f +
                          "/" +
                          h.replace(/~/g, "~0").replace(/\//g, "~1"),
                        i,
                        n,
                        f,
                        a,
                        h
                      );
                } else
                  (f in o.keywords || (e.allKeys && !(f in o.skipKeywords))) &&
                    s(e, t, r, p, n + "/" + f, i, n, f, a);
              }
              r(a, n, i, c, l, d, u);
            }
          }
          (o.keywords = {
            additionalItems: !0,
            items: !0,
            contains: !0,
            additionalProperties: !0,
            propertyNames: !0,
            not: !0,
            if: !0,
            then: !0,
            else: !0,
          }),
            (o.arrayKeywords = {
              items: !0,
              allOf: !0,
              anyOf: !0,
              oneOf: !0,
            }),
            (o.propsKeywords = {
              $defs: !0,
              definitions: !0,
              properties: !0,
              patternProperties: !0,
              dependencies: !0,
            }),
            (o.skipKeywords = {
              default: !0,
              enum: !0,
              const: !0,
              required: !0,
              maximum: !0,
              minimum: !0,
              exclusiveMaximum: !0,
              exclusiveMinimum: !0,
              multipleOf: !0,
              maxLength: !0,
              minLength: !0,
              pattern: !0,
              format: !0,
              maxItems: !0,
              minItems: !0,
              uniqueItems: !0,
              maxProperties: !0,
              minProperties: !0,
            });
        },
        {},
      ],
      65: [
        function (e, t, r) {
          /** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
          !(function (e, o) {
            o("object" == typeof r && void 0 !== t ? r : (e.URI = e.URI || {}));
          })(this, function (e) {
            "use strict";
            function t() {
              for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
                t[r] = arguments[r];
              if (t.length > 1) {
                t[0] = t[0].slice(0, -1);
                for (var o = t.length - 1, s = 1; s < o; ++s)
                  t[s] = t[s].slice(1, -1);
                return (t[o] = t[o].slice(1)), t.join("");
              }
              return t[0];
            }
            function r(e) {
              return "(?:" + e + ")";
            }
            function o(e) {
              return void 0 === e
                ? "undefined"
                : null === e
                ? "null"
                : Object.prototype.toString
                    .call(e)
                    .split(" ")
                    .pop()
                    .split("]")
                    .shift()
                    .toLowerCase();
            }
            function s(e) {
              return e.toUpperCase();
            }
            function a(e) {
              var o = "[A-Za-z]",
                s = "[0-9]",
                a = t(s, "[A-Fa-f]"),
                n = r(
                  r("%[EFef]" + a + "%" + a + a + "%" + a + a) +
                    "|" +
                    r("%[89A-Fa-f]" + a + "%" + a + a) +
                    "|" +
                    r("%" + a + a)
                ),
                i = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
                c = t("[\\:\\/\\?\\#\\[\\]\\@]", i),
                l = e ? "[\\uE000-\\uF8FF]" : "[]",
                d = t(
                  o,
                  s,
                  "[\\-\\.\\_\\~]",
                  e
                    ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]"
                    : "[]"
                ),
                u = r(o + t(o, s, "[\\+\\-\\.]") + "*"),
                f = r(r(n + "|" + t(d, i, "[\\:]")) + "*"),
                p =
                  (r(
                    r("25[0-5]") +
                      "|" +
                      r("2[0-4]" + s) +
                      "|" +
                      r("1" + s + s) +
                      "|" +
                      r("[1-9]" + s) +
                      "|" +
                      s
                  ),
                  r(
                    r("25[0-5]") +
                      "|" +
                      r("2[0-4]" + s) +
                      "|" +
                      r("1" + s + s) +
                      "|" +
                      r("0?[1-9]" + s) +
                      "|0?0?" +
                      s
                  )),
                m = r(p + "\\." + p + "\\." + p + "\\." + p),
                h = r(a + "{1,4}"),
                y = r(r(h + "\\:" + h) + "|" + m),
                v = r(r(h + "\\:") + "{6}" + y),
                g = r("\\:\\:" + r(h + "\\:") + "{5}" + y),
                $ = r(r(h) + "?\\:\\:" + r(h + "\\:") + "{4}" + y),
                _ = r(
                  r(r(h + "\\:") + "{0,1}" + h) +
                    "?\\:\\:" +
                    r(h + "\\:") +
                    "{3}" +
                    y
                ),
                w = r(
                  r(r(h + "\\:") + "{0,2}" + h) +
                    "?\\:\\:" +
                    r(h + "\\:") +
                    "{2}" +
                    y
                ),
                b = r(
                  r(r(h + "\\:") + "{0,3}" + h) + "?\\:\\:" + h + "\\:" + y
                ),
                E = r(r(r(h + "\\:") + "{0,4}" + h) + "?\\:\\:" + y),
                P = r(r(r(h + "\\:") + "{0,5}" + h) + "?\\:\\:" + h),
                S = r(r(r(h + "\\:") + "{0,6}" + h) + "?\\:\\:"),
                N = r([v, g, $, _, w, b, E, P, S].join("|")),
                k = r(r(d + "|" + n) + "+"),
                j =
                  (r(N + "\\%25" + k),
                  r(N + r("\\%25|\\%(?!" + a + "{2})") + k)),
                C = r("[vV]" + a + "+\\." + t(d, i, "[\\:]") + "+"),
                O = r("\\[" + r(j + "|" + N + "|" + C) + "\\]"),
                x = r(r(n + "|" + t(d, i)) + "*"),
                T = r(O + "|" + m + "(?!" + x + ")|" + x),
                I = r(s + "*"),
                R = r(r(f + "@") + "?" + T + r("\\:" + I) + "?"),
                D = r(n + "|" + t(d, i, "[\\:\\@]")),
                A = r(D + "*"),
                M = r(D + "+"),
                V = r(r(n + "|" + t(d, i, "[\\@]")) + "+"),
                F = r(r("\\/" + A) + "*"),
                q = r("\\/" + r(M + F) + "?"),
                U = r(V + F),
                z = r(M + F),
                K = "(?!" + D + ")",
                L =
                  (r(F + "|" + q + "|" + U + "|" + z + "|" + K),
                  r(r(D + "|" + t("[\\/\\?]", l)) + "*")),
                H = r(r(D + "|[\\/\\?]") + "*"),
                G = r(r("\\/\\/" + R + F) + "|" + q + "|" + z + "|" + K),
                J = r(u + "\\:" + G + r("\\?" + L) + "?" + r("\\#" + H) + "?"),
                B = r(r("\\/\\/" + R + F) + "|" + q + "|" + U + "|" + K),
                W = r(B + r("\\?" + L) + "?" + r("\\#" + H) + "?");
              r(J + "|" + W),
                r(u + "\\:" + G + r("\\?" + L) + "?"),
                r(
                  r(
                    "\\/\\/(" +
                      r("(" + f + ")@") +
                      "?(" +
                      T +
                      ")" +
                      r("\\:(" + I + ")") +
                      "?)"
                  ) +
                    "?(" +
                    F +
                    "|" +
                    q +
                    "|" +
                    z +
                    "|" +
                    K +
                    ")"
                ),
                r("\\?(" + L + ")"),
                r("\\#(" + H + ")"),
                r(
                  r(
                    "\\/\\/(" +
                      r("(" + f + ")@") +
                      "?(" +
                      T +
                      ")" +
                      r("\\:(" + I + ")") +
                      "?)"
                  ) +
                    "?(" +
                    F +
                    "|" +
                    q +
                    "|" +
                    U +
                    "|" +
                    K +
                    ")"
                ),
                r("\\?(" + L + ")"),
                r("\\#(" + H + ")"),
                r(
                  r(
                    "\\/\\/(" +
                      r("(" + f + ")@") +
                      "?(" +
                      T +
                      ")" +
                      r("\\:(" + I + ")") +
                      "?)"
                  ) +
                    "?(" +
                    F +
                    "|" +
                    q +
                    "|" +
                    z +
                    "|" +
                    K +
                    ")"
                ),
                r("\\?(" + L + ")"),
                r("\\#(" + H + ")"),
                r("(" + f + ")@"),
                r("\\:(" + I + ")");
              return {
                NOT_SCHEME: new RegExp(t("[^]", o, s, "[\\+\\-\\.]"), "g"),
                NOT_USERINFO: new RegExp(t("[^\\%\\:]", d, i), "g"),
                NOT_HOST: new RegExp(t("[^\\%\\[\\]\\:]", d, i), "g"),
                NOT_PATH: new RegExp(t("[^\\%\\/\\:\\@]", d, i), "g"),
                NOT_PATH_NOSCHEME: new RegExp(t("[^\\%\\/\\@]", d, i), "g"),
                NOT_QUERY: new RegExp(
                  t("[^\\%]", d, i, "[\\:\\@\\/\\?]", l),
                  "g"
                ),
                NOT_FRAGMENT: new RegExp(
                  t("[^\\%]", d, i, "[\\:\\@\\/\\?]"),
                  "g"
                ),
                ESCAPE: new RegExp(t("[^]", d, i), "g"),
                UNRESERVED: new RegExp(d, "g"),
                OTHER_CHARS: new RegExp(t("[^\\%]", d, c), "g"),
                PCT_ENCODED: new RegExp(n, "g"),
                IPV4ADDRESS: new RegExp("^(" + m + ")$"),
                IPV6ADDRESS: new RegExp(
                  "^\\[?(" +
                    N +
                    ")" +
                    r(r("\\%25|\\%(?!" + a + "{2})") + "(" + k + ")") +
                    "?\\]?$"
                ),
              };
            }
            var n = a(!1),
              i = a(!0),
              c = function (e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e))
                  return (function (e, t) {
                    var r = [],
                      o = !0,
                      s = !1,
                      a = void 0;
                    try {
                      for (
                        var n, i = e[Symbol.iterator]();
                        !(o = (n = i.next()).done) &&
                        (r.push(n.value), !t || r.length !== t);
                        o = !0
                      );
                    } catch (e) {
                      (s = !0), (a = e);
                    } finally {
                      try {
                        !o && i.return && i.return();
                      } finally {
                        if (s) throw a;
                      }
                    }
                    return r;
                  })(e, t);
                throw new TypeError(
                  "Invalid attempt to destructure non-iterable instance"
                );
              },
              l = 2147483647,
              d = 36,
              u = /^xn--/,
              f = /[^\0-\x7E]/,
              p = /[\x2E\u3002\uFF0E\uFF61]/g,
              m = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input",
              },
              h = Math.floor,
              y = String.fromCharCode;
            function v(e) {
              throw new RangeError(m[e]);
            }
            function g(e, t) {
              var r = e.split("@"),
                o = "";
              r.length > 1 && ((o = r[0] + "@"), (e = r[1]));
              var s = (function (e, t) {
                for (var r = [], o = e.length; o--; ) r[o] = t(e[o]);
                return r;
              })((e = e.replace(p, ".")).split("."), t).join(".");
              return o + s;
            }
            function $(e) {
              for (var t = [], r = 0, o = e.length; r < o; ) {
                var s = e.charCodeAt(r++);
                if (s >= 55296 && s <= 56319 && r < o) {
                  var a = e.charCodeAt(r++);
                  56320 == (64512 & a)
                    ? t.push(((1023 & s) << 10) + (1023 & a) + 65536)
                    : (t.push(s), r--);
                } else t.push(s);
              }
              return t;
            }
            var _ = function (e, t) {
                return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
              },
              w = function (e, t, r) {
                var o = 0;
                for (
                  e = r ? h(e / 700) : e >> 1, e += h(e / t);
                  e > 455;
                  o += d
                )
                  e = h(e / 35);
                return h(o + (36 * e) / (e + 38));
              },
              b = function (e) {
                var t,
                  r = [],
                  o = e.length,
                  s = 0,
                  a = 128,
                  n = 72,
                  i = e.lastIndexOf("-");
                i < 0 && (i = 0);
                for (var c = 0; c < i; ++c)
                  e.charCodeAt(c) >= 128 && v("not-basic"),
                    r.push(e.charCodeAt(c));
                for (var u = i > 0 ? i + 1 : 0; u < o; ) {
                  for (var f = s, p = 1, m = d; ; m += d) {
                    u >= o && v("invalid-input");
                    var y =
                      (t = e.charCodeAt(u++)) - 48 < 10
                        ? t - 22
                        : t - 65 < 26
                        ? t - 65
                        : t - 97 < 26
                        ? t - 97
                        : d;
                    (y >= d || y > h((l - s) / p)) && v("overflow"),
                      (s += y * p);
                    var g = m <= n ? 1 : m >= n + 26 ? 26 : m - n;
                    if (y < g) break;
                    var $ = d - g;
                    p > h(l / $) && v("overflow"), (p *= $);
                  }
                  var _ = r.length + 1;
                  (n = w(s - f, _, 0 == f)),
                    h(s / _) > l - a && v("overflow"),
                    (a += h(s / _)),
                    (s %= _),
                    r.splice(s++, 0, a);
                }
                return String.fromCodePoint.apply(String, r);
              },
              E = function (e) {
                var t = [],
                  r = (e = $(e)).length,
                  o = 128,
                  s = 0,
                  a = 72,
                  n = !0,
                  i = !1,
                  c = void 0;
                try {
                  for (
                    var u, f = e[Symbol.iterator]();
                    !(n = (u = f.next()).done);
                    n = !0
                  ) {
                    var p = u.value;
                    p < 128 && t.push(y(p));
                  }
                } catch (e) {
                  (i = !0), (c = e);
                } finally {
                  try {
                    !n && f.return && f.return();
                  } finally {
                    if (i) throw c;
                  }
                }
                var m = t.length,
                  g = m;
                for (m && t.push("-"); g < r; ) {
                  var b = l,
                    E = !0,
                    P = !1,
                    S = void 0;
                  try {
                    for (
                      var N, k = e[Symbol.iterator]();
                      !(E = (N = k.next()).done);
                      E = !0
                    ) {
                      var j = N.value;
                      j >= o && j < b && (b = j);
                    }
                  } catch (e) {
                    (P = !0), (S = e);
                  } finally {
                    try {
                      !E && k.return && k.return();
                    } finally {
                      if (P) throw S;
                    }
                  }
                  var C = g + 1;
                  b - o > h((l - s) / C) && v("overflow"),
                    (s += (b - o) * C),
                    (o = b);
                  var O = !0,
                    x = !1,
                    T = void 0;
                  try {
                    for (
                      var I, R = e[Symbol.iterator]();
                      !(O = (I = R.next()).done);
                      O = !0
                    ) {
                      var D = I.value;
                      if ((D < o && ++s > l && v("overflow"), D == o)) {
                        for (var A = s, M = d; ; M += d) {
                          var V = M <= a ? 1 : M >= a + 26 ? 26 : M - a;
                          if (A < V) break;
                          var F = A - V,
                            q = d - V;
                          t.push(y(_(V + (F % q), 0))), (A = h(F / q));
                        }
                        t.push(y(_(A, 0))), (a = w(s, C, g == m)), (s = 0), ++g;
                      }
                    }
                  } catch (e) {
                    (x = !0), (T = e);
                  } finally {
                    try {
                      !O && R.return && R.return();
                    } finally {
                      if (x) throw T;
                    }
                  }
                  ++s, ++o;
                }
                return t.join("");
              },
              P = function (e) {
                return g(e, function (e) {
                  return f.test(e) ? "xn--" + E(e) : e;
                });
              },
              S = function (e) {
                return g(e, function (e) {
                  return u.test(e) ? b(e.slice(4).toLowerCase()) : e;
                });
              },
              N = {};
            function k(e) {
              var t = e.charCodeAt(0);
              return t < 16
                ? "%0" + t.toString(16).toUpperCase()
                : t < 128
                ? "%" + t.toString(16).toUpperCase()
                : t < 2048
                ? "%" +
                  ((t >> 6) | 192).toString(16).toUpperCase() +
                  "%" +
                  ((63 & t) | 128).toString(16).toUpperCase()
                : "%" +
                  ((t >> 12) | 224).toString(16).toUpperCase() +
                  "%" +
                  (((t >> 6) & 63) | 128).toString(16).toUpperCase() +
                  "%" +
                  ((63 & t) | 128).toString(16).toUpperCase();
            }
            function j(e) {
              for (var t = "", r = 0, o = e.length; r < o; ) {
                var s = parseInt(e.substr(r + 1, 2), 16);
                if (s < 128) (t += String.fromCharCode(s)), (r += 3);
                else if (s >= 194 && s < 224) {
                  if (o - r >= 6) {
                    var a = parseInt(e.substr(r + 4, 2), 16);
                    t += String.fromCharCode(((31 & s) << 6) | (63 & a));
                  } else t += e.substr(r, 6);
                  r += 6;
                } else if (s >= 224) {
                  if (o - r >= 9) {
                    var n = parseInt(e.substr(r + 4, 2), 16),
                      i = parseInt(e.substr(r + 7, 2), 16);
                    t += String.fromCharCode(
                      ((15 & s) << 12) | ((63 & n) << 6) | (63 & i)
                    );
                  } else t += e.substr(r, 9);
                  r += 9;
                } else (t += e.substr(r, 3)), (r += 3);
              }
              return t;
            }
            function C(e, t) {
              function r(e) {
                var r = j(e);
                return r.match(t.UNRESERVED) ? r : e;
              }
              return (
                e.scheme &&
                  (e.scheme = String(e.scheme)
                    .replace(t.PCT_ENCODED, r)
                    .toLowerCase()
                    .replace(t.NOT_SCHEME, "")),
                void 0 !== e.userinfo &&
                  (e.userinfo = String(e.userinfo)
                    .replace(t.PCT_ENCODED, r)
                    .replace(t.NOT_USERINFO, k)
                    .replace(t.PCT_ENCODED, s)),
                void 0 !== e.host &&
                  (e.host = String(e.host)
                    .replace(t.PCT_ENCODED, r)
                    .toLowerCase()
                    .replace(t.NOT_HOST, k)
                    .replace(t.PCT_ENCODED, s)),
                void 0 !== e.path &&
                  (e.path = String(e.path)
                    .replace(t.PCT_ENCODED, r)
                    .replace(e.scheme ? t.NOT_PATH : t.NOT_PATH_NOSCHEME, k)
                    .replace(t.PCT_ENCODED, s)),
                void 0 !== e.query &&
                  (e.query = String(e.query)
                    .replace(t.PCT_ENCODED, r)
                    .replace(t.NOT_QUERY, k)
                    .replace(t.PCT_ENCODED, s)),
                void 0 !== e.fragment &&
                  (e.fragment = String(e.fragment)
                    .replace(t.PCT_ENCODED, r)
                    .replace(t.NOT_FRAGMENT, k)
                    .replace(t.PCT_ENCODED, s)),
                e
              );
            }
            function O(e) {
              return e.replace(/^0*(.*)/, "$1") || "0";
            }
            function x(e, t) {
              var r = e.match(t.IPV4ADDRESS) || [],
                o = c(r, 2)[1];
              return o ? o.split(".").map(O).join(".") : e;
            }
            function T(e, t) {
              var r = e.match(t.IPV6ADDRESS) || [],
                o = c(r, 3),
                s = o[1],
                a = o[2];
              if (s) {
                for (
                  var n = s.toLowerCase().split("::").reverse(),
                    i = c(n, 2),
                    l = i[0],
                    d = i[1],
                    u = d ? d.split(":").map(O) : [],
                    f = l.split(":").map(O),
                    p = t.IPV4ADDRESS.test(f[f.length - 1]),
                    m = p ? 7 : 8,
                    h = f.length - m,
                    y = Array(m),
                    v = 0;
                  v < m;
                  ++v
                )
                  y[v] = u[v] || f[h + v] || "";
                p && (y[m - 1] = x(y[m - 1], t));
                var g = y
                    .reduce(function (e, t, r) {
                      if (!t || "0" === t) {
                        var o = e[e.length - 1];
                        o && o.index + o.length === r
                          ? o.length++
                          : e.push({
                              index: r,
                              length: 1,
                            });
                      }
                      return e;
                    }, [])
                    .sort(function (e, t) {
                      return t.length - e.length;
                    })[0],
                  $ = void 0;
                if (g && g.length > 1) {
                  var _ = y.slice(0, g.index),
                    w = y.slice(g.index + g.length);
                  $ = _.join(":") + "::" + w.join(":");
                } else $ = y.join(":");
                return a && ($ += "%" + a), $;
              }
              return e;
            }
            var I =
                /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i,
              R = void 0 === "".match(/(){0}/)[1];
            function D(e) {
              var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                r = {},
                o = !1 !== t.iri ? i : n;
              "suffix" === t.reference &&
                (e = (t.scheme ? t.scheme + ":" : "") + "//" + e);
              var s = e.match(I);
              if (s) {
                R
                  ? ((r.scheme = s[1]),
                    (r.userinfo = s[3]),
                    (r.host = s[4]),
                    (r.port = parseInt(s[5], 10)),
                    (r.path = s[6] || ""),
                    (r.query = s[7]),
                    (r.fragment = s[8]),
                    isNaN(r.port) && (r.port = s[5]))
                  : ((r.scheme = s[1] || void 0),
                    (r.userinfo = -1 !== e.indexOf("@") ? s[3] : void 0),
                    (r.host = -1 !== e.indexOf("//") ? s[4] : void 0),
                    (r.port = parseInt(s[5], 10)),
                    (r.path = s[6] || ""),
                    (r.query = -1 !== e.indexOf("?") ? s[7] : void 0),
                    (r.fragment = -1 !== e.indexOf("#") ? s[8] : void 0),
                    isNaN(r.port) &&
                      (r.port = e.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/)
                        ? s[4]
                        : void 0)),
                  r.host && (r.host = T(x(r.host, o), o)),
                  (r.reference =
                    void 0 !== r.scheme ||
                    void 0 !== r.userinfo ||
                    void 0 !== r.host ||
                    void 0 !== r.port ||
                    r.path ||
                    void 0 !== r.query
                      ? void 0 === r.scheme
                        ? "relative"
                        : void 0 === r.fragment
                        ? "absolute"
                        : "uri"
                      : "same-document"),
                  t.reference &&
                    "suffix" !== t.reference &&
                    t.reference !== r.reference &&
                    (r.error =
                      r.error || "URI is not a " + t.reference + " reference.");
                var a = N[(t.scheme || r.scheme || "").toLowerCase()];
                if (t.unicodeSupport || (a && a.unicodeSupport)) C(r, o);
                else {
                  if (r.host && (t.domainHost || (a && a.domainHost)))
                    try {
                      r.host = P(
                        r.host.replace(o.PCT_ENCODED, j).toLowerCase()
                      );
                    } catch (e) {
                      r.error =
                        r.error ||
                        "Host's domain name can not be converted to ASCII via punycode: " +
                          e;
                    }
                  C(r, n);
                }
                a && a.parse && a.parse(r, t);
              } else r.error = r.error || "URI can not be parsed.";
              return r;
            }
            function A(e, t) {
              var r = !1 !== t.iri ? i : n,
                o = [];
              return (
                void 0 !== e.userinfo && (o.push(e.userinfo), o.push("@")),
                void 0 !== e.host &&
                  o.push(
                    T(x(String(e.host), r), r).replace(
                      r.IPV6ADDRESS,
                      function (e, t, r) {
                        return "[" + t + (r ? "%25" + r : "") + "]";
                      }
                    )
                  ),
                ("number" != typeof e.port && "string" != typeof e.port) ||
                  (o.push(":"), o.push(String(e.port))),
                o.length ? o.join("") : void 0
              );
            }
            var M = /^\.\.?\//,
              V = /^\/\.(\/|$)/,
              F = /^\/\.\.(\/|$)/,
              q = /^\/?(?:.|\n)*?(?=\/|$)/;
            function U(e) {
              for (var t = []; e.length; )
                if (e.match(M)) e = e.replace(M, "");
                else if (e.match(V)) e = e.replace(V, "/");
                else if (e.match(F)) (e = e.replace(F, "/")), t.pop();
                else if ("." === e || ".." === e) e = "";
                else {
                  var r = e.match(q);
                  if (!r) throw new Error("Unexpected dot segment condition");
                  var o = r[0];
                  (e = e.slice(o.length)), t.push(o);
                }
              return t.join("");
            }
            function z(e) {
              var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                r = t.iri ? i : n,
                o = [],
                s = N[(t.scheme || e.scheme || "").toLowerCase()];
              if ((s && s.serialize && s.serialize(e, t), e.host))
                if (r.IPV6ADDRESS.test(e.host));
                else if (t.domainHost || (s && s.domainHost))
                  try {
                    e.host = t.iri
                      ? S(e.host)
                      : P(e.host.replace(r.PCT_ENCODED, j).toLowerCase());
                  } catch (r) {
                    e.error =
                      e.error ||
                      "Host's domain name can not be converted to " +
                        (t.iri ? "Unicode" : "ASCII") +
                        " via punycode: " +
                        r;
                  }
              C(e, r),
                "suffix" !== t.reference &&
                  e.scheme &&
                  (o.push(e.scheme), o.push(":"));
              var a = A(e, t);
              if (
                (void 0 !== a &&
                  ("suffix" !== t.reference && o.push("//"),
                  o.push(a),
                  e.path && "/" !== e.path.charAt(0) && o.push("/")),
                void 0 !== e.path)
              ) {
                var c = e.path;
                t.absolutePath || (s && s.absolutePath) || (c = U(c)),
                  void 0 === a && (c = c.replace(/^\/\//, "/%2F")),
                  o.push(c);
              }
              return (
                void 0 !== e.query && (o.push("?"), o.push(e.query)),
                void 0 !== e.fragment && (o.push("#"), o.push(e.fragment)),
                o.join("")
              );
            }
            function K(e, t) {
              var r =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {},
                o = arguments[3],
                s = {};
              return (
                o || ((e = D(z(e, r), r)), (t = D(z(t, r), r))),
                !(r = r || {}).tolerant && t.scheme
                  ? ((s.scheme = t.scheme),
                    (s.userinfo = t.userinfo),
                    (s.host = t.host),
                    (s.port = t.port),
                    (s.path = U(t.path || "")),
                    (s.query = t.query))
                  : (void 0 !== t.userinfo ||
                    void 0 !== t.host ||
                    void 0 !== t.port
                      ? ((s.userinfo = t.userinfo),
                        (s.host = t.host),
                        (s.port = t.port),
                        (s.path = U(t.path || "")),
                        (s.query = t.query))
                      : (t.path
                          ? ("/" === t.path.charAt(0)
                              ? (s.path = U(t.path))
                              : ((s.path =
                                  (void 0 === e.userinfo &&
                                    void 0 === e.host &&
                                    void 0 === e.port) ||
                                  e.path
                                    ? e.path
                                      ? e.path.slice(
                                          0,
                                          e.path.lastIndexOf("/") + 1
                                        ) + t.path
                                      : t.path
                                    : "/" + t.path),
                                (s.path = U(s.path))),
                            (s.query = t.query))
                          : ((s.path = e.path),
                            (s.query = void 0 !== t.query ? t.query : e.query)),
                        (s.userinfo = e.userinfo),
                        (s.host = e.host),
                        (s.port = e.port)),
                    (s.scheme = e.scheme)),
                (s.fragment = t.fragment),
                s
              );
            }
            function L(e, t) {
              return (
                e &&
                e
                  .toString()
                  .replace(t && t.iri ? i.PCT_ENCODED : n.PCT_ENCODED, j)
              );
            }
            var H = {
                scheme: "http",
                domainHost: !0,
                parse(e, t) {
                  return (
                    e.host ||
                      (e.error = e.error || "HTTP URIs must have a host."),
                    e
                  );
                },
                serialize(e, t) {
                  var r = "https" === String(e.scheme).toLowerCase();
                  return (
                    (e.port !== (r ? 443 : 80) && "" !== e.port) ||
                      (e.port = void 0),
                    e.path || (e.path = "/"),
                    e
                  );
                },
              },
              G = {
                scheme: "https",
                domainHost: H.domainHost,
                parse: H.parse,
                serialize: H.serialize,
              };
            function J(e) {
              return "boolean" == typeof e.secure
                ? e.secure
                : "wss" === String(e.scheme).toLowerCase();
            }
            var B = {
                scheme: "ws",
                domainHost: !0,
                parse(e, t) {
                  var r = e;
                  return (
                    (r.secure = J(r)),
                    (r.resourceName =
                      (r.path || "/") + (r.query ? "?" + r.query : "")),
                    (r.path = void 0),
                    (r.query = void 0),
                    r
                  );
                },
                serialize(e, t) {
                  if (
                    ((e.port !== (J(e) ? 443 : 80) && "" !== e.port) ||
                      (e.port = void 0),
                    "boolean" == typeof e.secure &&
                      ((e.scheme = e.secure ? "wss" : "ws"),
                      (e.secure = void 0)),
                    e.resourceName)
                  ) {
                    var r = e.resourceName.split("?"),
                      o = c(r, 2),
                      s = o[0],
                      a = o[1];
                    (e.path = s && "/" !== s ? s : void 0),
                      (e.query = a),
                      (e.resourceName = void 0);
                  }
                  return (e.fragment = void 0), e;
                },
              },
              W = {
                scheme: "wss",
                domainHost: B.domainHost,
                parse: B.parse,
                serialize: B.serialize,
              },
              Q = {},
              Z =
                "[A-Za-z0-9\\-\\.\\_\\~\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]",
              Y = "[0-9A-Fa-f]",
              X = r(
                r("%[EFef]" + Y + "%" + Y + Y + "%" + Y + Y) +
                  "|" +
                  r("%[89A-Fa-f]" + Y + "%" + Y + Y) +
                  "|" +
                  r("%" + Y + Y)
              ),
              ee = t(
                "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]",
                '[\\"\\\\]'
              ),
              te = new RegExp(Z, "g"),
              re = new RegExp(X, "g"),
              oe = new RegExp(
                t(
                  "[^]",
                  "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]",
                  "[\\.]",
                  '[\\"]',
                  ee
                ),
                "g"
              ),
              se = new RegExp(
                t("[^]", Z, "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]"),
                "g"
              ),
              ae = se;
            function ne(e) {
              var t = j(e);
              return t.match(te) ? t : e;
            }
            var ie = {
                scheme: "mailto",
                parse(e, t) {
                  var r = e,
                    o = (r.to = r.path ? r.path.split(",") : []);
                  if (((r.path = void 0), r.query)) {
                    for (
                      var s = !1,
                        a = {},
                        n = r.query.split("&"),
                        i = 0,
                        c = n.length;
                      i < c;
                      ++i
                    ) {
                      var l = n[i].split("=");
                      switch (l[0]) {
                        case "to":
                          for (
                            var d = l[1].split(","), u = 0, f = d.length;
                            u < f;
                            ++u
                          )
                            o.push(d[u]);
                          break;
                        case "subject":
                          r.subject = L(l[1], t);
                          break;
                        case "body":
                          r.body = L(l[1], t);
                          break;
                        default:
                          (s = !0), (a[L(l[0], t)] = L(l[1], t));
                      }
                    }
                    s && (r.headers = a);
                  }
                  r.query = void 0;
                  for (var p = 0, m = o.length; p < m; ++p) {
                    var h = o[p].split("@");
                    if (((h[0] = L(h[0])), t.unicodeSupport))
                      h[1] = L(h[1], t).toLowerCase();
                    else
                      try {
                        h[1] = P(L(h[1], t).toLowerCase());
                      } catch (e) {
                        r.error =
                          r.error ||
                          "Email address's domain name can not be converted to ASCII via punycode: " +
                            e;
                      }
                    o[p] = h.join("@");
                  }
                  return r;
                },
                serialize(e, t) {
                  var r,
                    o = e,
                    a =
                      null != (r = e.to)
                        ? r instanceof Array
                          ? r
                          : "number" != typeof r.length ||
                            r.split ||
                            r.setInterval ||
                            r.call
                          ? [r]
                          : Array.prototype.slice.call(r)
                        : [];
                  if (a) {
                    for (var n = 0, i = a.length; n < i; ++n) {
                      var c = String(a[n]),
                        l = c.lastIndexOf("@"),
                        d = c
                          .slice(0, l)
                          .replace(re, ne)
                          .replace(re, s)
                          .replace(oe, k),
                        u = c.slice(l + 1);
                      try {
                        u = t.iri ? S(u) : P(L(u, t).toLowerCase());
                      } catch (e) {
                        o.error =
                          o.error ||
                          "Email address's domain name can not be converted to " +
                            (t.iri ? "Unicode" : "ASCII") +
                            " via punycode: " +
                            e;
                      }
                      a[n] = d + "@" + u;
                    }
                    o.path = a.join(",");
                  }
                  var f = (e.headers = e.headers || {});
                  e.subject && (f.subject = e.subject),
                    e.body && (f.body = e.body);
                  var p = [];
                  for (var m in f)
                    f[m] !== Q[m] &&
                      p.push(
                        m.replace(re, ne).replace(re, s).replace(se, k) +
                          "=" +
                          f[m].replace(re, ne).replace(re, s).replace(ae, k)
                      );
                  return p.length && (o.query = p.join("&")), o;
                },
              },
              ce = /^([^\:]+)\:(.*)/,
              le = {
                scheme: "urn",
                parse(e, t) {
                  var r = e.path && e.path.match(ce),
                    o = e;
                  if (r) {
                    var s = t.scheme || o.scheme || "urn",
                      a = r[1].toLowerCase(),
                      n = r[2],
                      i = N[s + ":" + (t.nid || a)];
                    (o.nid = a),
                      (o.nss = n),
                      (o.path = void 0),
                      i && (o = i.parse(o, t));
                  } else o.error = o.error || "URN can not be parsed.";
                  return o;
                },
                serialize(e, t) {
                  var r = e.nid,
                    o = N[(t.scheme || e.scheme || "urn") + ":" + (t.nid || r)];
                  o && (e = o.serialize(e, t));
                  var s = e;
                  return (s.path = (r || t.nid) + ":" + e.nss), s;
                },
              },
              de = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/,
              ue = {
                scheme: "urn:uuid",
                parse(e, t) {
                  var r = e;
                  return (
                    (r.uuid = r.nss),
                    (r.nss = void 0),
                    t.tolerant ||
                      (r.uuid && r.uuid.match(de)) ||
                      (r.error = r.error || "UUID is not valid."),
                    r
                  );
                },
                serialize(e, t) {
                  var r = e;
                  return (r.nss = (e.uuid || "").toLowerCase()), r;
                },
              };
            (N[H.scheme] = H),
              (N[G.scheme] = G),
              (N[B.scheme] = B),
              (N[W.scheme] = W),
              (N[ie.scheme] = ie),
              (N[le.scheme] = le),
              (N[ue.scheme] = ue),
              (e.SCHEMES = N),
              (e.pctEncChar = k),
              (e.pctDecChars = j),
              (e.parse = D),
              (e.removeDotSegments = U),
              (e.serialize = z),
              (e.resolveComponents = K),
              (e.resolve = function (e, t, r) {
                var o = (function (e, t) {
                  var r = e;
                  if (t) for (var o in t) r[o] = t[o];
                  return r;
                })(
                  {
                    scheme: "null",
                  },
                  r
                );
                return z(K(D(e, o), D(t, o), o, !0), o);
              }),
              (e.normalize = function (e, t) {
                return (
                  "string" == typeof e
                    ? (e = z(D(e, t), t))
                    : "object" === o(e) && (e = D(z(e, t), t)),
                  e
                );
              }),
              (e.equal = function (e, t, r) {
                return (
                  "string" == typeof e
                    ? (e = z(D(e, r), r))
                    : "object" === o(e) && (e = z(e, r)),
                  "string" == typeof t
                    ? (t = z(D(t, r), r))
                    : "object" === o(t) && (t = z(t, r)),
                  e === t
                );
              }),
              (e.escapeComponent = function (e, t) {
                return (
                  e && e.toString().replace(t && t.iri ? i.ESCAPE : n.ESCAPE, k)
                );
              }),
              (e.unescapeComponent = L),
              Object.defineProperty(e, "__esModule", {
                value: !0,
              });
          });
        },
        {},
      ],
      ajv: [
        function (e, t, r) {
          "use strict";
          Object.defineProperty(r, "__esModule", {
            value: !0,
          }),
            (r.MissingRefError =
              r.ValidationError =
              r.CodeGen =
              r.Name =
              r.nil =
              r.stringify =
              r.str =
              r._ =
              r.KeywordCxt =
                void 0);
          const o = e("./core"),
            s = e("./vocabularies/draft7"),
            a = e("./vocabularies/discriminator"),
            n = e("./refs/json-schema-draft-07.json"),
            i = ["/properties"],
            c = "http://json-schema.org/draft-07/schema";
          class l extends o.default {
            _addVocabularies() {
              super._addVocabularies(),
                s.default.forEach((e) => this.addVocabulary(e)),
                this.opts.discriminator && this.addKeyword(a.default);
            }
            _addDefaultMetaSchema() {
              if ((super._addDefaultMetaSchema(), !this.opts.meta)) return;
              const e = this.opts.$data ? this.$dataMetaSchema(n, i) : n;
              this.addMetaSchema(e, c, !1),
                (this.refs["http://json-schema.org/schema"] = c);
            }
            defaultMeta() {
              return (this.opts.defaultMeta =
                super.defaultMeta() || (this.getSchema(c) ? c : void 0));
            }
          }
          (t.exports = r = l),
            Object.defineProperty(r, "__esModule", {
              value: !0,
            }),
            (r.default = l);
          var d = e("./compile/validate");
          Object.defineProperty(r, "KeywordCxt", {
            enumerable: !0,
            get() {
              return d.KeywordCxt;
            },
          });
          var u = e("./compile/codegen");
          Object.defineProperty(r, "_", {
            enumerable: !0,
            get() {
              return u._;
            },
          }),
            Object.defineProperty(r, "str", {
              enumerable: !0,
              get() {
                return u.str;
              },
            }),
            Object.defineProperty(r, "stringify", {
              enumerable: !0,
              get() {
                return u.stringify;
              },
            }),
            Object.defineProperty(r, "nil", {
              enumerable: !0,
              get() {
                return u.nil;
              },
            }),
            Object.defineProperty(r, "Name", {
              enumerable: !0,
              get() {
                return u.Name;
              },
            }),
            Object.defineProperty(r, "CodeGen", {
              enumerable: !0,
              get() {
                return u.CodeGen;
              },
            });
          var f = e("./runtime/validation_error");
          Object.defineProperty(r, "ValidationError", {
            enumerable: !0,
            get() {
              return f.default;
            },
          });
          var p = e("./compile/ref_error");
          Object.defineProperty(r, "MissingRefError", {
            enumerable: !0,
            get() {
              return p.default;
            },
          });
        },
        {
          "./compile/codegen": 2,
          "./compile/ref_error": 7,
          "./compile/validate": 15,
          "./core": 18,
          "./refs/json-schema-draft-07.json": 20,
          "./runtime/validation_error": 24,
          "./vocabularies/discriminator": 46,
          "./vocabularies/draft7": 48,
        },
      ],
    },
    {},
    []
  )("ajv");
});
//# sourceMappingURL=ajv7.min.js.map
