- textarea在auto-height开启之后，小程序和h5上面无法设置min-height，没有初始化高度，在app（至少iOS）上面min-height有效；
- auto-height开启之后，textarea是无法滚动的，哪怕打开之后再关闭，也是无法滚动的，所以不支持动态的auto-height（我们可以尝试先设置高度，等高度到一定的时候设置auto-height，不知道这样是否有效。不足高度的时候使用固定高度，高度足够的时候使用自动高度）；
- linechange事件可以监听，用于设置高度，不过目前app-nvue端以及头条小程序端不支持linechahnge；

> 以下为nvue页面实现方式，vue页面直接参考小程序端实现方式

# 实现自动高度以及最低高度限制

- app端设置min-height，以及开启auto-height；
- 支持line-change的小程序端（头条不支持），根据行数来设置高度；
- 不支持line-change的小程序端（头条），可以考虑动态开启auto-height，当文本高度不足时，使用height，关闭auto-height，当高度足够时，使用auto-height，当然，这需要监听文字输入与改变，且有待实验；
- 设置高度，然后利用一个额外的text来监测高度变化，不断给text-area设置合适高度；

# 实现自动高度以及最大高度或者行数限制

- 支持line-change的，使用line-change决定高度；
- 不支持line-change的无法实现自动高度，因为auto-height关闭之后无法滚动，从而不能实现最大高度限制，建议考虑下面方法；
- 不支持line-change的可以借助于额外的text元素来实现合适高度的决策；

# 实现最低高度，自动高度，以及最大高度限制

- 支持line-change的，使用line-change决定高度；
- 不支持line-change的可以借助于额外的text元素来实现合适高度的决策；

# 总结

尚待实验和测试
