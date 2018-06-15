<template>
	<div class="ranking-page">
		<div class='title'>
			<div class="con">
				<h3>{{title}}</h3>
				<p>{{subtitle}}</p>
				<p><button class='btn'>{{$t('ranking["兑换规则"]')}}</button></p>
			</div>
			<div id="banner" class="banner"></div>
		</div>
		<div class="con menu menu--ferdinand">
			<ul class="menu__list">
				<li v-for='(item,index) in nav_data'
			 		@click='checkout_item(item,index)'
				 	:class="current === index ? 'menu__item menu__item--current':'menu__item'" >
					<a class="menu__link"><img :src="item.markUrl" alt="" class="markUrl" >{{item.vName}}</a>
				</li>
			</ul>
		</div>
		<div class="con ranking">
			<div class="loading" v-show='loading'><my-loading></my-loading></div><!--loading 动画-->
			<div class="more-loading" v-show='more'><my-more></my-more></div><!--loading 动画-->
			<div class="ranking-item" v-for ='(i,iiiii) in page_data'>
				<el-card class="box-card">
				  <div slot="header" class="clearfix">
					  <div  style='float:right;padding-top:2px' >
						<el-button type='primary' @click='opendialog(i)'>{{$t('ranking["查看全部"]')}}</el-button>
					  </div>
					  <h3 class="h3_title"><img :src="i.markUrl" alt="" class="markUrl" >{{i.vName}}</h3>
					  <div class="p_title">
					  	<p v-show='getuser(i)'>{{$t('ranking["排名"]')}}：{{getRank(i)}} {{$t('ranking["预计奖励"]')}}({{getPrice(i)}}){{nav_data[current].vName}}：- <el-button size='mini' :type='panduan(i) ? "info":"success"'  @click='receive(i)' :disabled="panduan(i)">{{panduan(i)? "已领取":"领取"}}</el-button></p>
					  </div>
				  </div>
				  <div>
					<el-table
					  :data="i.rank.slice(0,10)"
					   stripe
					  >
						<el-table-column
						prop="address"
						align='center'
						:label="$t(`ranking['排名']`)"
						width='54'>
							<template slot-scope="scope">
								<span>{{scope.$index + 1}}</span>
							</template>
</el-table-column>
<el-table-column align='center' label="UID" width='64'>
	<template slot-scope="scope">
																				<span>{{scope.row.uid}}</span>
																			</template>
</el-table-column>
<el-table-column align='center' :label="$t(`footer['用户昵称']`)">
	<template slot-scope="scope">
							<span>{{ scope.row.nickName && scope.row.nickName.slice(0,3) +'****'}}</span>
							</template>
</el-table-column>
<el-table-column align='right' :label="$t(`ranking['交易额']`)+' '+(nav_data[current] && nav_data[current].vName)" width='80'>
	<template slot-scope="scope">
								<span>{{scope.row.sumAmount | filter_num}}</span>
							</template>
</el-table-column>
<el-table-column align='right' :label="$t(`ranking['预计奖励']`)+ (i.shortName || '暂无')" width='85'>
	<template slot-scope="scope">
													<span>
													{{get_gift(scope.$index,i) | filter_num}}
													</span>
												</template>
</el-table-column>
<!--
						<el-table-column prop="address">
							<template slot-scope="scope">
							<el-button type="success" size="mini" round
												 @click='receive(scope.row.userId,i,scope.$index)'>{{$t('ranking["领取"]')}}</el-button>
						</template>
						</el-table-column>
						-->
</el-table>
</div>
</el-card>
</div>
</div>
<p style="text-align:center;margin-bottom:20px;color:#ccc">----------{{$t('other["我是有底线的"]')}}---------</p>
<el-dialog :visible.sync="dialogTableVisible">
	<el-table :data="dialogData" stripe height="400">
		<el-table-column prop="address" align='center' :label="$t(`ranking['排名']`)">
			<template slot-scope="scope">
					<span>{{scope.$index + 1}}</span>
				</template>
		</el-table-column>
		<el-table-column align='center' label="UID">
			<template slot-scope="scope">
						<span>{{scope.row.uid}}</span>
					</template>
		</el-table-column>

		<el-table-column align='center' :label="$t(`ranking['用户昵称']`)">
			<template slot-scope="scope">
				<span>{{scope.row.nickName && scope.row.nickName.slice(0,3) +'****'}}</span>
			</template>
		</el-table-column>
		<el-table-column :label="$t(`ranking['交易额']`)+ (nav_data[current] && nav_data[current].vName)" align='right'>
			<template slot-scope="scope">
						<span>{{scope.row.sumAmount | filter_num}}</span>
					</template>
		</el-table-column>

		<el-table-column :label='$t(`ranking["预计奖励"]`) + (flag.shortName || $t(`other["暂无"]`))' align='right'>
			<template slot-scope="scope">
						<span>{{get_gift(scope.$index,flag) | filter_num}}</span>
					</template>
		</el-table-column>
		<!--
        <el-table-column prop="address">
            <template slot-scope="scope">
					<el-button type="success" size="mini" round @click='receive(scope.row.userId, scope.row, scope.$index)'>{{$t('ranking["领取"]')}}</el-button>
			</template>
        </el-table-column>
-->
	</el-table>
</el-dialog>
</div>
</template>

<script>
	import myLoading from './loading'
	import myMore from './more'
	import Post from '@/api/post'
	import Get from '@/api/get'
	export default {
		components: {
			myLoading,
			myMore
		},
		data() {
			return {
				title: '',
				subtitle: '',
				hasData: false,
				loading: false,
				more: false,
				current: 0,
				arr: [1, 2, 3],
				nav_data: [],
				dialogData: [],
				dialogTableVisible: false,
				tableData: [],
				current_data: {},
				page_data: [

				],
				flag: {}
			}
		},

		methods: {
			panduan(item) {
				var rank = item.rank;
				for (var i = 0; i < rank.length; i++) {
					if (rank[i].isRankingGet === 0 &&  rank[i].userId === this.$store.state.user.id) {
						return false
					}
				}
				return true
			},
			getRank(item) {
				var rank = item.rank;
				for (var i = 0; i < rank.length; i++) {
					if (this.$store.state.user.id === rank[i].userId) {
						return (i + 1)
					}
				}
				return '-'
			},
			getPrice(item) {
				var rank = item.rank;
				for (var i = 0; i < rank.length; i++) {
					if (this.$store.state.user.id === rank[i].userId) {
						return this.get_gift(i, item)
					}
				}
				return '-'
			},
			getuser(item) {
				var rank = item.rank;
				for (var i = 0; i < rank.length; i++) {
					if (this.$store.state.user.id === rank[i].userId) {
						return true
					}
				}
				return false;

			},
			receive(item) {
				console.log(item);
				var giveAmount = this.getPrice(item)
				if (this.$store.state.isLogin + '' === 'null') {
					this.$alert('您未登陆，请登录后重试', {
						confirmButtonText: '确定',
						callback: action => {
							//                            this.$message({
							//                                type: 'into',
							//                                message: `action: ${ action }`
							//                            });
						}
					});
					return
				}
				this.$confirm('确认领取吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.loading = true;
					Post({
						url: 'basisMarket/receiveAward',
						data: {
							userId: this.$store.state.user.id,
							giveAmount: giveAmount,
							giveVirtualCurrencyId: item.virtualId,
							tradeMarket: item.vName + '_' + this.nav_data[this.current].vName
						},
						success: res => {
							this.loading = false;
							if (res.code === 0) {
								this.$message({
									type: 'success',
									message: res.data
								});
							} else {
								this.$message({
									type: 'error',
									message: res.data
								});
							}
						},
						fail: res => {
							this.loading = false;
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});

			},
			get_gift(index, i) {
				if (index < 3) {
					return i.cardinal1_3 - index * i.decrease1_3
				} else if (index >= 3 && index < 10) {
					return i.cardinal4_10 - (index - 3) * i.decrease4_10
				} else if (index >= 10 && index < 20) {
					return i.cardinal11_20 - (index - 10) * i.decrease11_20
				} else if (index >= 20 && index < 50) {
					return i.cardinal21_50 - (index - 20) * i.decrease21_50
				} else if (index >= 50 && index < 100) {
					return i.cardinal51_100 - (index - 50) * i.decrease51_100
				}
			},
			checkout_item(item, index) {
				this.current = index;
				this.tableData = [];
				this.init(item);
				this.arr = [1, 2, 3];

			},
			opendialog(item) {
				this.flag = item;
				this.dialogTableVisible = true;
				this.dialogData = item.rank;
			},
			color(index) {
				if (index < 3) {
					return {
						backgroundImage: "url(" + require("@/assets/img/" + (index + 1) + ".png") + ")",
						color: "#525252"
					}
				} else {
					return
				}
			},
			init(data) {
				var bId = data.bId;
				var vName = data.vName;
				this.loading = true;
				Get({
					url: 'basisMarket/selRanking',
					data: {
						bId,
						vName
					},
					success: res => {
						this.loading = false;
						if (res.code === 0) {
							this.page_data = res.data;
						} else {
							this.$message({
								showClose: true,
								message: res.data,
								type: 'error'
							});
						}
					},
					fail: res => {
						this.loading = false;

					}
				})
			}
		},
		created() {
			this.loading = true;
			Get({
				url: 'basisMarket/selBasisMarket',
				success: res => {
					if (res.code === 0) {
						this.nav_data = res.data;
						this.current_data = res.data[this.current];
						this.init(this.current_data)
					} else {
						this.loading = false;
						this.$message({
							showClose: true,
							message: res.data,
							type: 'error'
						});
					}
				},
				fail: res => {
					this.loading = false;
				}
			})
			Get({
				url: 'rankingNotice/findAll',
				success: res => {
					if (res.code === 0) {
						this.title = res.data[0].rankingTheme;
						this.subtitle = res.data[0].rankingTime;
					} else {
						this.$message({
							showClose: true,
							message: res.data,
							type: 'error'
						});
					}
				}
			})
		},
		mounted() {
			/*	const h = screen.availHeight;
				var index = 1;
				var flag = true;
				window.onscroll = () => {
					var winY = window.scrollY;
					var height = window.document.body.scrollHeight;
					var cha = height - h;
					if (winY >= cha && flag) {
						if (index === 3) {
							this.more = false;
							this.hasData = true;
							flag = false;
							window.onscroll = null;
							return
						}
						flag = false;
						index++;
						this.more = true;
						setTimeout(() => {
							this.arr.push(1, 2, 3);
							this.more = false;
							flag = true;
						}, 1200)
					}
				}*/
			//based on an Example by @tanlan
			window.requestAnimFrame = (function() {
				return window.requestAnimationFrame
			})();
			! function(e) {
				function r(n) {
					if (t[n]) return t[n].exports;
					var a = t[n] = {
						i: n,
						l: !1,
						exports: {}
					};
					return e[n].call(a.exports, a, a.exports, r), a.l = !0, a.exports
				}
				var t = {};
				r.m = e, r.c = t, r.d = function(e, t, n) {
					r.o(e, t) || Object.defineProperty(e, t, {
						configurable: !1,
						enumerable: !0,
						get: n
					})
				}, r.n = function(e) {
					var t = e && e.__esModule ? function() {
						return e.default
					} : function() {
						return e
					};
					return r.d(t, "a", t), t
				}, r.o = function(e, r) {
					return Object.prototype.hasOwnProperty.call(e, r)
				}, r.p = "./", r(r.s = 4)
			}([, , , , function(e, r, t) {
				e.exports = t(5)
			}, function(e, r, t) {
				"use strict";

				function n() {
					if (u.clearColor(0, 0, 0, 1), u.clear(u.COLOR_BUFFER_BIT), c.uTime) {
						m || (m = Date.now());
						var e = (Date.now() - m) / 1e3 % 65532;
						c.uTime.fill([e])
					}
					A(3), requestAnimationFrame(n)
				}
				var a = t(6),
					i = document.querySelector(".banner"),
					o = i.clientWidth,
					f = i.clientHeight,
					E = document.createElement("canvas");
				E.width = o, E.height = f, E.style.position = "absolute", E.style.left = 0, E.style.top = 0, E.style.zIndex = -1, i.prepend(E);
				var u = E.getContext("webgl"),
					l = (0, a.compile)({
						vShader: "\nattribute vec2 aPosition;\nvoid main() {\n    gl_Position = vec4(aPosition, 0, 1);\n}\n",
						fShader: "\n//Ether by nimitz (twitter: @stormoid)\n#define t uTime\n\nprecision highp float;\n\nuniform float uTime;\nuniform vec2 uResolution;\n\nuniform float ox;\nuniform float oy;\n\nmat2 m(float a){float c=cos(a), s=sin(a);return mat2(c,-s,s,c);}\nfloat map(vec3 p){\n    p.xz*= m(t*0.4);p.xy*= m(t*0.3);\n    vec3 q = p*2.+t;\n    return length(p+vec3(sin(t*0.7)))*log(length(p)+1.) + sin(q.x+sin(q.z+sin(q.y)))*0.5 - 1.;\n}\n\nvoid main(){\n\tvec2 p = gl_FragCoord.xy/uResolution.y - vec2(ox,oy);\n    vec3 cl = vec3(0.);\n    float d = 2.5;\n    for(int i=0; i<=5; i++)\t{\n\t\tvec3 p = vec3(0,0,5.) + normalize(vec3(p, -1.))*d;\n        float rz = map(p);\n\t\tfloat f =  clamp((rz - map(p+.1))*0.5, -.1, 1. );\n        vec3 l = vec3(0.1,0.3,.4) + vec3(5., 2.5, 3.)*f;\n        cl = cl*l + (1.-smoothstep(0., 2.5, rz))*.7*l;\n\t\td += min(rz, 1.);\n\t}\n    gl_FragColor = vec4(cl, 1.);\n}\n",
						gl: u
					}),
					T = l.attributes,
					c = l.uniforms,
					R = l.fillElements,
					A = l.drawElements;
				R((0, l.createElementsBuffer)([0, 1, 2])), T.aPosition.fill(T.aPosition.createBuffer([0, 3, 3, -3, -3, -3])), c.uResolution && c.uResolution.fill([E.width, E.height]), o > f ? (c.ox.fill([.7]), c.oy.fill([.5])) : (c.ox.fill([.4]), c.oy.fill([.7]));
				var m = void 0;
				n()
			}, function(e, r, t) {
				"use strict";

				function n(e) {
					function r(e, r) {
						for (var t = ["FLOAT", "FLOAT_VEC2", "FLOAT_VEC3", "FLOAT_VEC4", "FLOAT_MAT2", "FLOAT_MAT3", "FLOAT_MAT4", "INT", "INT_VEC2", "INT_VEC3", "INT_VEC4", "BOOL", "BOOL_VEC2", "BOOL_VEC3", "BOOL_VEC4", "SAMPLER_2D", "SAMPLER_CUBE"], n = 0; n < t.length; n++)
							if (r[t[n]] === e) return t[n];
						throw "get type failed " + e
					}

					function t(e, t, n) {
						var i = {},
							o = r(e.type, n),
							f = n.getAttribLocation(t, e.name),
							E = o.split("_")[0],
							u = o.split("_").length > 1 ? o.split("_")[1] : "VEC1",
							l = Number(u[3]),
							T = {
								FLOAT: Float32Array,
								INT: Int16Array,
								BOOL: Uint8Array
							},
							c = T[E];
						return i.fill = function(e) {
							n.bindBuffer(n.ARRAY_BUFFER, e), n.vertexAttribPointer(f, l, n[E], !1, 0, 0), n.enableVertexAttribArray(f)
						}, i.createBuffer = function(e) {
							var r = n.createBuffer();
							return n.bindBuffer(n.ARRAY_BUFFER, r), n.bufferData(n.ARRAY_BUFFER, new c(e), n.STATIC_DRAW), n.bindBuffer(n.ARRAY_BUFFER, null), r
						}, a({
							type: o
						}, i)
					}

					function n(e, t, n) {
						var i = {},
							o = r(e.type, n),
							f = n.getUniformLocation(t, e.name),
							l = o.split("_")[0],
							T = o.split("_").length > 1 ? o.split("_")[1] : "VEC1",
							c = T.substr(0, 3),
							R = Number(T[3]),
							A = {
								FLOAT: Float32Array,
								INT: Int32Array,
								BOOL: Uint8Array
							},
							m = A[l],
							s = void 0;
						switch (c) {
							case "VEC":
								s = ["uniform", R, "FLOAT" === l ? "f" : "i", "v"].join(""), i.fill = function(e) {
									n[s](f, new m(e))
								};
								break;
							case "MAT":
								s = ["uniform", "Matrix", R, "fv"].join(""), i.fill = function(e) {
									n[s](f, !1, new m(e))
								};
								break;
							case "2D":
								var _ = E,
									d = "TEXTURE" + _;
								if (E === u) throw "texture size exceed max texture image units";
								E++, i.createTexture = function(e) {
									var r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
										t = n.createTexture();
									return n.activeTexture(n[d]), n.bindTexture(n.TEXTURE_2D, t), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE), r && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !0), e instanceof Uint8Array ? n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, 1, 1, 0, n.RGBA, n.UNSIGNED_BYTE, e) : n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, e), r && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !1), n.bindTexture(n.TEXTURE_2D, null), t
								}, i.fill = function(e) {
									n.activeTexture(n[d]), n.bindTexture(n.TEXTURE_2D, e), n.uniform1i(f, _)
								}, i.update = function(e, r) {
									n.activeTexture(n[d]), n.bindTexture(n.TEXTURE_2D, e), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, r)
								};
								break;
							default:
								throw "baseVecType invalid"
						}
						return a({
							type: o
						}, i)
					}
					var i = e.vShader,
						o = e.fShader,
						f = e.gl,
						E = (e.options, 0),
						u = f.getParameter(f.MAX_TEXTURE_IMAGE_UNITS),
						l = function(e, r, t) {
							function n(e, r, t) {
								var n = e.createShader(r);
								if (e.shaderSource(n, t), e.compileShader(n), !e.getShaderParameter(n, e.COMPILE_STATUS)) throw "An error occurred compiling the shaders: " + e.getShaderInfoLog(n);
								return n
							}
							var a = n(t, t.FRAGMENT_SHADER, r),
								i = n(t, t.VERTEX_SHADER, e),
								o = t.createProgram();
							if (t.attachShader(o, i), t.attachShader(o, a), t.linkProgram(o), !t.getProgramParameter(o, t.LINK_STATUS)) throw "Unable to initialize the shader program: " + t.getProgramInfoLog(o);
							for (var f = [], E = [], u = t.getProgramParameter(o, t.ACTIVE_ATTRIBUTES), l = 0; l < u; l++) {
								var T = t.getActiveAttrib(o, l);
								E.push(T)
							}
							for (var c = t.getProgramParameter(o, t.ACTIVE_UNIFORMS), R = 0; R < c; R++) {
								var A = t.getActiveUniform(o, R);
								f.push(A)
							}
							return {
								program: o,
								uniforms: f,
								attributes: E
							}
						}(i, o, f),
						T = l.program,
						c = l.attributes,
						R = l.uniforms,
						A = {},
						m = {};
					return c.forEach(function(e) {
						A[e.name] = t(e, T, f)
					}), R.forEach(function(e) {
						var r = e.name;
						r.endsWith("[0]") && (r = r.replace("[0]", "")), m[r] = n(e, T, f)
					}), f.useProgram(T), {
						program: T,
						uniforms: m,
						attributes: A,
						drawArrays: function(e) {
							f.drawArrays(f.TRIANGLES, 0, e)
						},
						drawElements: function(e) {
							f.drawElements(f.TRIANGLES, e, f.UNSIGNED_SHORT, 0)
						},
						createElementsBuffer: function(e) {
							var r = f.createBuffer();
							return f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, r), f.bufferData(f.ELEMENT_ARRAY_BUFFER, new Uint16Array(e), f.STATIC_DRAW), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, null), r
						},
						fillElements: function(e) {
							return f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, e), e
						},
						createFramebuffer: function(e, r) {
							var t = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
								n = f.createFramebuffer();
							f.bindFramebuffer(f.FRAMEBUFFER, n);
							var a = void 0,
								i = void 0;
							if (t) {
								var o = f.createRenderbuffer();
								f.bindRenderbuffer(f.RENDERBUFFER, o), f.renderbufferStorage(f.RENDERBUFFER, f.RGBA4, e, r), f.framebufferRenderbuffer(f.FRAMEBUFFER, f.COLOR_ATTACHMENT0, f.RENDERBUFFER, o), a = o
							} else {
								var E = f.createTexture();
								f.activeTexture(f.TEXTURE0), f.bindTexture(f.TEXTURE_2D, E), f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, e, r, 0, f.RGBA, f.UNSIGNED_BYTE, null), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.LINEAR), f.framebufferTexture2D(f.FRAMEBUFFER, f.COLOR_ATTACHMENT0, f.TEXTURE_2D, E, 0), a = E
							}
							var u = f.createRenderbuffer();
							if (f.bindRenderbuffer(f.RENDERBUFFER, u), f.renderbufferStorage(f.RENDERBUFFER, f.DEPTH_COMPONENT16, e, r), f.framebufferRenderbuffer(f.FRAMEBUFFER, f.DEPTH_ATTACHMENT, f.RENDERBUFFER, u), i = u, f.checkFramebufferStatus(f.FRAMEBUFFER) != f.FRAMEBUFFER_COMPLETE) throw new Erroe("this combination of attachments does not work");
							return f.bindFramebuffer(f.FRAMEBUFFER, null), {
								framebuffer: n,
								colorTarget: a,
								depthTarget: i
							}
						}
					}
				}
				Object.defineProperty(r, "__esModule", {
					value: !0
				});
				var a = Object.assign || function(e) {
					for (var r = 1; r < arguments.length; r++) {
						var t = arguments[r];
						for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
					}
					return e
				};
				r.compile = n
			}]);

			//			var canvas = document.getElementById("space");
			//			var c = canvas.getContext("2d");
			//
			//			var numStars = 1900;
			//			var radius = '0.' + Math.floor(Math.random() * 9) + 1;
			//			var focalLength = canvas.width * 2;
			//			var warp = 0;
			//			var centerX, centerY;
			//
			//			var stars = [],
			//				star;
			//			var i;
			//
			//			var animate = true;
			//
			//			initializeStars();
			//
			//			function executeFrame() {
			//
			//				if (animate)
			//					requestAnimFrame(executeFrame);
			//				moveStars();
			//				drawStars();
			//			}
			//
			//			function initializeStars() {
			//				centerX = canvas.width / 2;
			//				centerY = canvas.height / 2;
			//
			//				stars = [];
			//				for (i = 0; i < numStars; i++) {
			//					star = {
			//						x: Math.random() * canvas.width,
			//						y: Math.random() * canvas.height,
			//						z: Math.random() * canvas.width,
			//						o: '0.' + Math.floor(Math.random() * 99) + 1
			//					};
			//					stars.push(star);
			//				}
			//			}
			//
			//			function moveStars() {
			//				for (i = 0; i < numStars; i++) {
			//					star = stars[i];
			//					star.z--;
			//
			//					if (star.z <= 0) {
			//						star.z = canvas.width;
			//					}
			//				}
			//			}
			//
			//			function drawStars() {
			//				var pixelX, pixelY, pixelRadius;
			//
			//				// Resize to the screen
			//				if (canvas.width != window.innerWidth || canvas.width != window.innerWidth) {
			//					canvas.width = window.innerWidth;
			//					canvas.height = window.innerHeight;
			//					initializeStars();
			//				}
			//				if (warp == 0) {
			//					c.fillStyle = "rgba(0,10,20,1)";
			//					c.fillRect(0, 0, canvas.width, canvas.height);
			//				}
			//				c.fillStyle = "rgba(209, 255, 255, " + radius + ")";
			//				for (i = 0; i < numStars; i++) {
			//					star = stars[i];
			//
			//					pixelX = (star.x - centerX) * (focalLength / star.z);
			//					pixelX += centerX;
			//					pixelY = (star.y - centerY) * (focalLength / star.z);
			//					pixelY += centerY;
			//					pixelRadius = 1 * (focalLength / star.z);
			//
			//					c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
			//					c.fillStyle = "rgba(209, 255, 255, " + star.o + ")";
			//					//c.fill();
			//				}
			//			}
			//
			//			/*document.getElementById('warp').addEventListener("click", function(e) {
			//				window.c.beginPath();
			//				window.c.clearRect(0, 0, window.canvas.width, window.canvas.height);
			//				window.warp = warp ? 0 : 1;
			//				executeFrame();
			//			});*/
			//
			//			executeFrame();

		}
	}

</script>

<style>
	@import '../../assets/css/line.css';
	.markUrl {
		width: 24px;
		height: 24px;
		vertical-align: sub;
		margin-right: 10px;


	}

	.loading {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .6);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.more-loading {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		bottom: 20px;
		z-index: 100;
		display: flex;
		justify-content: center;
		padding-bottom: 30px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.ranking-page {
		width: 100%;
	}

	#space {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 400px;
	}

	.ranking-page .title {
		height: 375px;
		position: relative;
		overflow: hidden
	}

	.ranking-page .title .con {
		position: relative;
		z-index: 2;
		color: #fff;
		text-align: center;
		overflow: hidden
	}

	.ranking-page .title .con h3 {
		font-size: 40px;
		color: #fff;
		margin-bottom: 30px;
		margin-top: 100px;
	}

	.ranking-page .title .con p {
		font-size: 20px;
		color: #fff;
		margin-bottom: 25px;
		font-weight: bold;
		text-align: center
	}

	.ranking-page .btn {
		border-radius: 50px;
		border: 2px solid #fff;
		color: #fff;
		overflow: hidden;
		font-family: inherit;
		font-size: inherit;
		background: none;
		cursor: pointer;
		padding: 15px 40px;
		display: inline-block;
		margin: 15px 30px;
		letter-spacing: 1px;
	}

	.ranking {
		display: flex;
		/*		justify-content: ;*/
		padding: 20px 0;
		position: relative;
		flex-flow: wrap;
	}

	.ranking .ranking-item {
		margin: 10px 7px
	}

	div.el-card__header {
		padding: 10px 20px;
	}

	.ranking .box-card {
		width: 385px
	}

	.box-card .h3_title {
		font-size: 16px;
		font-weight: bold;
		margin: 8px 0;
	}

	.box-card .p_title {
		font-size: 12px;
		color: #ccc;
		height: 28px;
	}

	div.el-card__body {
		padding: 8px
	}

	.ranking .el-table td,
	.ranking .el-table th {
		padding: 8px
	}

	.ranking .el-table--scrollable-x .el-table__body-wrappe {
		overflow: hidden
	}

	.ranking .el-table .cell,
	.ranking .el-table th div,
	.ranking .el-table--border td:first-child .cell,
	.ranking .el-table--border th:first-child .cell {
		padding-left: 0;
	}

	.ranking-page .el-dialog__header {
		padding: 2px;
	}

	.ranking-page .has-gutter {
		color: '#42b6f6'
	}

	#banner {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1
	}

</style>
