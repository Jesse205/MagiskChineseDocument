# Magisk Delta 内部文档

本文档介绍了适用于安卓设备的无系统 root 解决方案 Magisk Delta 的部分高级功能。Magisk Delta 允许你在不改变原始启动映像的情况下修改设备，并提供一个统一的界面来管理模块、root 访问权限等。

## 早期挂载

有些文件需要在启动过程中尽早挂载，即在执行“启动”进程之前。Magisk Delta 提供了一种在“预启动”阶段使用 `early-mount.d` 目录挂载文件的方法。

- 要检查 Magisk Delta 是否支持 `early-mount.d/v2`，请使用此代码：

``` bash
EARLYMOUNTV2=false
if grep "$(magisk --path)/.magisk/early-mount.d" /proc/mounts | grep -q '^early-mount.d/v2'; then
    EARLYMOUNTV2=true
fi
```

- 要查找 `early-mount.d` 目录（Magisk v26+），请使用此代码：

``` bash
$(magisk --path)/.magisk/early-mount.d
```

### 常规挂载

- 由于在 Magisk Delta v26.0+ 中使用了新的 sepolicy 规则实施 `early-mount.d/v2`，一般的早期挂载分区将挂载到 `$MAGISKTMP/.magisk/early-mount.d`。早期挂载分区与预启动分区相同，可以是其中之一： `data` 、`cache` 、`metadata` 、`cust` 、`persist`等。Magisk 在修补引导映像时会对预启动分区进行硬编码。

> (*) 使用 `persist` 或 `metadata` 进行早期挂载时要小心，因为这些分区的大小非常有限。填满它们可能会导致设备无法启动。

- 您可以将文件放到 `early-mount.d` 目录下的相应位置。例如，如果您想替换 `/vendor/etc/vintf/manifest.xml`，请将您的 `manifest.xml` 复制到 `$MAGISKTMP/.magisk/early-mount.d/system/vendor/etc/vintf/manifest.xml`。Magisk Delta 将在下次重启时挂载您的文件。其他不在 `early-mount.d/system` 中的文件将被忽略。

### 模块挂载

- 自 Magisk Delta v26.0+ 使用 `early-mount.d/v2` 以来，您也可以将早期挂载文件放在 `/data/adb/modules/<module_id>/early-mount` 中。

::: tip
早期启动挂载只支持简单挂载，即可以替换文件，但不能添加新文件、文件夹或替换文件夹。
:::

## init.rc 注入

### 常规注入

如果您想在不重新打包启动映像的情况下将自定义 `*.rc` 脚本注入设备，Magisk Delta 提供了一种无系统地实现这一目标的方法。您可以使用 `initrc.d` 目录来存储自定义脚本，Magisk Delta 会在每次启动时将它们注入到 `init.rc` 中。

- 自定义 `*.rc` 脚本的位置是 `$PRENITDIR/early-mount.d/initrc.d`。Magisk Delta 会在每次启动时将此文件夹中的所有脚本注入到 `init.rc` 中。
- 您可以使用 `${MAGISKTMP}` 来引用 Magisk 的 tmpfs 目录。当 magiskinit 将 `${MAGISKTMP}` 注入到 `init.rc` 时，您的 `*.rc` 脚本中出现的 `${MAGISKTMP}` 模式将被替换为 Magisk 的 tmpfs 目录。
- 启动时，Magisk 的镜像不可用，因此需要使用 `${MAGISKTMP}/.magisk/early-mount.d` 模式来访问 `early-mount.d` 目录的副本。

下面是一个自定义脚本的示例，名为 `custom.rc`，可以与 `initrc.d` 一起使用：

```bash
# 使用 ${MAGISKTMP} 引用 Magisk 的 tmpfs 目录

on early-init
    setprop sys.example.foo bar
    insmod ${MAGISKTMP}/.magisk/early-mount.d/libfoo.ko
    start myservice

service myservice ${MAGISKTMP}/.magisk/early-mount.d/myscript.sh
    oneshot
```

### 模块注入

自 Magisk Delta v26.0+ 使用 `early-mount.d/v2` 后，您也可以将 initrc.d 文件放到 `/data/adb/modules/<module_id>/early-mount/initrc.d` 中。

## 删除文件和文件夹

使用 Magisk 模块是修改系统分区的简便方法，无需对系统分区进行实际修改，而且修改非常容易。Magisk 模块可以替换或添加任何文件或文件夹到系统中。但仍不允许使用 Magisk 模块删除文件。

在 Magisk 文档中：

> 实际删除文件很复杂（有可能，但不值得这么做）。用一个假文件替换它就足够了
>
> 要真正删除文件夹非常复杂（有可能，但不值得费力）。用一个空文件夹替换就足够了。将文件夹添加到模块模板中 "config.sh" 的替换列表中，它将用一个空文件夹替换该文件夹

在某些情况下，仅将文件或文件夹替换为空文件或文件夹是不够的，还可能导致问题，因为某些修改需要文件消失才能生效。因此，Magisk Delta 为模块添加了删除支持：在模块目录的相应位置创建指向 `/xxxxx` 的损坏的符号链接

以创建符号链接 `/data/adb/modules/mymodule_id/system/vendor/etc/thermal-engine-normal.conf` 为例，目标 `/vendor/etc/thermal-engine-normal.conf` 将被忽略并消失。

```bash
ln -s "/xxxxx" /data/adb/modules/mymodule_id/system/vendor/etc/thermal-engine-normal.conf
```

## 参考链接

- [Magisk Delta Internal Documentation](https://huskydg.github.io/magisk-files/docs/internal-guide.html)（官方）
