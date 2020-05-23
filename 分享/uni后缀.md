写一个vue格式的组件，在里面做好条件编译。

- nvue页面引入这个vue格式的组件，编译到app端则会使用app端对应的条件；
- nvue页面引入这个vue格式的组件，编译到非app端则会对应其他相应的编译条件。

组件的后缀不重要，是nvue还是vue最终是由页面决定的， APP-NVUE和APP-PLUS-NVUE是一样的.

nvue页面引入组件，组件可以是vue后缀的，编译到app端会是相应的nvue规范
