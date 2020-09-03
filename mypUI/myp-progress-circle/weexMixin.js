// #ifdef APP-NVUE
const animation = weex.requireModule('animation');
// #endif

export default {
	methods: {
		// #ifdef APP-NVUE
		initOpacityState() {
			const rightEl = this.$refs['myp-right']
			const leftEl = this.$refs['myp-left']
			animation.transition(rightEl, {
				styles: {
					opacity: 0
				}
			})
			animation.transition(leftEl, {
				styles: {
					opacity: 0
				}
			})
		},
		twoWayZeroProgress(pr, lastPr, duration) {
			const rightEl = this.$refs['myp-right']
			const leftEl = this.$refs['myp-left']
			
			let delay = 0
			if (this.aniToZero) {
				const lastDur = this.getBackDuration(lastPr, this.duration)
				delay = lastDur.left > lastDur.right ? lastDur.left : lastDur.right
			}
			// back to zero
			animation.transition(leftEl, {
				styles: {
					transform: 'rotate(225deg)'
				},
				duration: delay,
				delay: 0
			})
			animation.transition(rightEl, {
				styles: {
					transform: 'rotate(45deg)'
				},
				duration: delay,
				delay: 0
			}, ()=>{
				if (pr > 0.5) {
					animation.transition(leftEl, {
						styles: {
							opacity: 1,
							transform: 'rotate(225deg)'
						}
					})
					animation.transition(rightEl, {
						styles: {
							opacity: 1,
							transform: 'rotate(45deg)'
						}
					})
				} else {
					animation.transition(leftEl, {
						styles: {
							opacity: 0,
							transform: 'rotate(225deg)'
						}
					})
					if (pr <= 0) {
						animation.transition(rightEl, {
							styles: {
								opacity: 0,
								transform: 'rotate(45deg)'
							}
						})
					} else {
						animation.transition(rightEl, {
							styles: {
								opacity: 1,
								transform: 'rotate(45deg)'
							}
						})
					}
				}
				// forward
				const newDur = this.getDuration(pr, duration)
				const dur = newDur.left > newDur.right ? newDur.left : newDur.right
				const newDeg = this.getDeg(pr)
				animation.transition(leftEl, {
					styles: {
						transform: `rotate(${newDeg.left}deg)`
					},
					duration: dur
				})
				animation.transition(rightEl, {
					styles: {
						transform: `rotate(${newDeg.right}deg)`
					},
					duration: dur
				})
			})
		},
		twoWayProgress(pr, lastPr, duration) {
			const rightEl = this.$refs['myp-right']
			const leftEl = this.$refs['myp-left']
			// continue
			let dur = duration
			const newDeg = this.getDeg(pr)
			if (!duration) {
				const newDur = this.getDuration(pr, duration)
				const lastDur = this.getBackDuration(lastPr, this.duration)
				dur = Math.max(Math.abs(newDur.left - lastDur.left), Math.abs(newDur.right - lastDur.right))
			}
			if (lastPr > 0.5) {
				
			} else {
				if (pr > 0.5) {
					animation.transition(leftEl, {
						styles: {
							opacity: 1,
							transform: 'rotate(225deg)'
						}
					})
				}
				if (lastPr <=0 && pr > 0) {
					animation.transition(rightEl, {
						styles: {
							opacity: 1,
							transform: 'rotate(45deg)'
						}
					})
				}
			}
			animation.transition(leftEl, {
				styles: {
					transform: `rotate(${newDeg.left}deg)`
				},
				duration: dur
			})
			animation.transition(rightEl, {
				styles: {
					transform: `rotate(${newDeg.right}deg)`
				},
				duration: dur
			}, ()=>{
				if (pr <= 0.5) {
					animation.transition(leftEl, {
						styles: {
							opacity: 0,
							transform: 'rotate(225deg)'
						}
					})
				}
				if (pr <= 0) {
					animation.transition(rightEl, {
						styles: {
							opacity: 0,
							transform: 'rotate(45deg)'
						}
					})
				}
			})
		},
		oneWayZeroProgress(pr, lastPr, duration) {
			const rightEl = this.$refs['myp-right']
			const leftEl = this.$refs['myp-left']
			const that = this
			// back to zero
			let leftDelay = 0
			let rightDelay = 0
			if (this.aniToZero) {
				const lastDur = this.getBackDuration(lastPr, this.duration)
				leftDelay = lastDur.left
				rightDelay = lastDur.right
			}
			animation.transition(leftEl, {
				styles: {
					transform: 'rotate(225deg)'
				},
				duration: leftDelay
			}, ()=>{
				animation.transition(leftEl, {
					styles: {
						opacity: 0,
						transform: 'rotate(225deg)'
					}
				})
				animation.transition(rightEl, {
					styles: {
						transform: 'rotate(45deg)'
					},
					duration: rightDelay
				}, ()=>{
					if (pr <= 0) {
						animation.transition(rightEl, {
							styles: {
								opacity: 0,
								transform: 'rotate(45deg)'
							}
						})
					} else {
						animation.transition(rightEl, {
							styles: {
								opacity: 1,
								transform: 'rotate(45deg)'
							}
						})
					}
					// forward
					const newDur = that.getDuration(pr, duration)
					const newDeg = that.getDeg(pr)
					animation.transition(rightEl, {
						styles: {
							transform: `rotate(${newDeg.right}deg)`
						},
						duration: newDur.right
					}, ()=>{
						if (pr > 0.5) {
							animation.transition(leftEl, {
								styles: {
									opacity: 1,
									transform: 'rotate(225deg)'
								}
							})
						} else {
							animation.transition(leftEl, {
								styles: {
									opacity: 0,
									transform: 'rotate(225deg)'
								}
							})
						}
						animation.transition(leftEl, {
							styles: {
								transform: `rotate(${newDeg.left}deg)`
							},
							duration: newDur.left
						})
					})
				})
			})
		},
		oneWayProgress(pr, lastPr, duration) {
			const rightEl = this.$refs['myp-right']
			const leftEl = this.$refs['myp-left']
			const that = this
			const newDur = this.getDuration(pr, duration)
			const newDeg = this.getDeg(pr)
			if (lastPr <=0 && pr > 0) {
				animation.transition(rightEl, {
					styles: {
						opacity: 1,
						transform: 'rotate(45deg)'
					}
				})
			}
			if (duration) {
				if (pr >= lastPr) {
					animation.transition(rightEl, {
						styles: {
							transform: `rotate(${newDeg.right}deg)`
						},
						duration: newDur.right
					}, ()=>{
						if (pr <= 0) {
							animation.transition(rightEl, {
								styles: {
									opacity: 0,
									transform: 'rotate(45deg)'
								}
							})
						}
						if (pr > 0.5 && lastPr <= 0.5) {
							animation.transition(leftEl, {
								styles: {
									opacity: 1,
									transform: 'rotate(225deg)'
								}
							})
						}
						animation.transition(leftEl, {
							styles: {
								transform: `rotate(${newDeg.left}deg)`
							},
							duration: newDur.left
						})
					})
				} else {
					animation.transition(leftEl, {
						styles: {
							transform: `rotate(${newDeg.left}deg)`
						},
						duration: newDur.left
					}, ()=>{
						if (pr < 0.5) {
							animation.transition(leftEl, {
								styles: {
									opacity: 0,
									transform: 'rotate(225deg)'
								}
							})
						}
						animation.transition(rightEl, {
							styles: {
								transform: `rotate(${newDeg.right}deg)`
							},
							duration: newDur.right
						}, ()=>{
							if (pr <= 0) {
								animation.transition(rightEl, {
									styles: {
										opacity: 0,
										transform: 'rotate(45deg)'
									}
								})
							}
						})
					})
				}
			} else {
				const lastDur = this.getBackDuration(lastPr, this.duration)
				if (pr >= lastPr) {
					animation.transition(rightEl, {
						styles: {
							transform: `rotate(${newDeg.right}deg)`
						},
						duration: newDur.right - lastDur.right
					}, ()=>{
						if (pr <= 0) {
							animation.transition(rightEl, {
								styles: {
									opacity: 0,
									transform: 'rotate(45deg)'
								}
							})
						}
						if (pr > 0.5 && lastPr <= 0.5) {
							animation.transition(leftEl, {
								styles: {
									opacity: 1,
									transform: 'rotate(225deg)'
								}
							})
						}
						animation.transition(leftEl, {
							styles: {
								transform: `rotate(${newDeg.left}deg)`
							},
							duration: newDur.left - lastDur.left
						})
					})
				} else {
					animation.transition(leftEl, {
						styles: {
							transform: `rotate(${newDeg.left}deg)`
						},
						duration: lastDur.left - newDur.left
					}, ()=>{
						if (pr < 0.5) {
							animation.transition(leftEl, {
								styles: {
									opacity: 0,
									transform: 'rotate(225deg)'
								}
							})
						}
						animation.transition(rightEl, {
							styles: {
								transform: `rotate(${newDeg.right}deg)`
							},
							duration: lastDur.right - newDur.right
						}, ()=>{
							if (pr <= 0) {
								animation.transition(rightEl, {
									styles: {
										opacity: 0,
										transform: 'rotate(45deg)'
									}
								})
							}
						})
					})
				}
			}
		}
		// #endif
	}
}
