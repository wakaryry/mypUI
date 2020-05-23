# mypUI

# 命名规则
## props
您会看到`type/bgType/titleType`等`props`，`xxType`很好理解，`type`又代表什么？

- `xxType`表示不只是一个`type`，用来加以区分；
- `type`表示就只有一个`type`，不需要区分，直接使用；

## mixin
对于对外可用的 `mixin`，`props`和`computed`，以及`methods`，`data`，我们会加一个 `myp` 前缀，主要出于以下考虑：

- 防止用户在不知情的情况下覆盖掉变量；
- 明确在代码中告知/提示，这是来自于`mypUI`负责的部分，不跟自己代码里面的混同，方便快速定位问题；
