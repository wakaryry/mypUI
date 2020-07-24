bindingX.bind({
					eventType: 'pan',
					anchor: this.$refs['aaa'].ref,
					props: [{
						element: this.$refs['bbb'].ref,
						property: 'transform.translateY',
						expression: 'y+0'
					}]
				})
				

表达式不能直接是 y 这种，会报错。

TypeError: undefined is not an object (evaluating 't.childNodes') __ERROR

debug会发现是表达式不正确。表达式必须带操作符。


touchstart进行绑定，比如pan手势，Android端可以直接随着手势联动，而iOS端不能，需要下一次才能继续。
