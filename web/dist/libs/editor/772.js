(() => {
	function e(e, t, r) {
		let s;
		return (
			(t =
				"symbol" ===
				typeof (s = ((e, t) => {
					if ("object" !== typeof e || !e) return e;
					const r = e[Symbol.toPrimitive];
					if (void 0 !== r) {
						const s = r.call(e, t || "default");
						if ("object" !== typeof s) return s;
						throw new TypeError("@@toPrimitive must return a primitive value.");
					}
					return ("string" === t ? String : Number)(e);
				})(t, "string"))
					? s
					: String(s)) in e
				? Object.defineProperty(e, t, {
						value: r,
						enumerable: !0,
						configurable: !0,
						writable: !0,
				  })
				: (e[t] = r),
			e
		);
	}
	class t {
		constructor(t) {
			e(this, "worker", void 0), (this.worker = t);
		}
		async compute(e) {
			let t;
			let r;
			const s = await this.sendMessage(
				this.worker,
				{ data: e, type: "compute" },
				!0,
			);
			return null == s ||
				null === (t = s.data) ||
				void 0 === t ||
				null === (r = t.result) ||
				void 0 === r
				? void 0
				: r.data;
		}
		async precompute(e) {
			await this.sendMessage(this.worker, { data: e, type: "precompute" });
		}
		async store(e) {
			await this.sendMessage(this.worker, { data: e, type: "store" });
		}
		async getStorage() {
			let e;
			const t = await this.sendMessage(this.worker, { type: "getStorage" }, !0);
			return null == t || null === (e = t.data) || void 0 === e
				? void 0
				: e.result;
		}
		destroy() {
			this.worker.terminate();
		}
		sendMessage(e, t, r = !1) {
			return new Promise((s) => {
				const a = Math.random().toString();
				if (r) {
					const t = (r) => {
						a === r.data.eventId && (e.removeEventListener("message", t), s(r));
					};
					e.addEventListener("message", t);
				}
				e.postMessage({ ...t, eventId: a }), r || s(void 0);
			});
		}
	}
	function r({ value: e, channelCount: t }) {
		const r = [];
		for (let s = 0; s < t; s++) r[s] = new Float32Array(e.length / t);
		for (let s = 0; s < e.length; s++) {
			const a = s % t;
			const n = Math.floor(s / t);
			r[a][n] = e[s];
		}
		return r;
	}
	e(t, "Messenger", {
		receive({ compute: e, precompute: t }) {
			const r = {};
			self.addEventListener("message", (s) => {
				if (!s.data) return;
				const { data: a, type: n, eventId: o } = s.data;
				switch (n) {
					case "compute":
						((t, s) => {
							e(t, r, (e) => {
								self.postMessage({ result: e, eventId: s });
							});
						})(a, o);
						break;
					case "precompute":
						((e) => {
							null == t ||
								t(e, r, (e) => {
									Object.assign(r, e);
								});
						})(a);
						break;
					case "store":
						((e) => {
							Object.assign(r, e.data.data);
						})(s);
						break;
					case "getStorage":
						((e) => {
							self.postMessage({ result: r, eventId: e });
						})(o);
				}
			});
		},
	}),
		t.Messenger.receive({
			compute: (e, t, s) => {
				s({ data: r(e) });
			},
			precompute: (e, t, s) => {
				s({ data: r(e) });
			},
		});
})();
//# sourceMappingURL=772.js.map
