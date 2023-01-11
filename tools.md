# Magisk 工具

Magisk 为开发人员提供了大量安装工具、守护程序和实用程序。本文档涵盖了4个二进制文件和所有包含的小程序。二进制文件和小程序如下所示：

```
magiskboot                 /* binary */
magiskinit                 /* binary */
magiskpolicy               /* binary */
supolicy -> magiskpolicy
magisk                     /* binary */
resetprop -> magisk
su -> magisk
```

## magiskboot

一个用于解压缩/重新打包 boot 映像、解析/修补/解压缩 cpio 、修补 dtb 、十六进制修补二进制文件，以及使用多种算法压缩/解压缩文件的工具。

`magiskboot` 支持常见的压缩格式（这意味着它不依赖于外部工具），包括 `gzip`、`lz4`、`lz4_legacy`（[仅在LG上使用](https://events.static.linuxfound.org/sites/events/files/lcjpcojp13_klee.pdf))、`lzma`、`xz` 和 `bzip2`。

`magiskboot` 的概念是使 boot 映像修改更简单。对于解包，它解析标头并提取映像中的所有部分，如果在任何部分中检测到压缩，则会立即解压缩。对于重新打包，需要原始 boot 映像，以便可以使用原始标头，只需更改必要的内容，如节大小和校验和。如果需要，所有部分将被压缩回原始格式。该工具还支持许多 CPIO 和 DTB 操作。

```
用法: ./magiskboot <action> [args...]

支持的操作:
  unpack [-n] [-h] <bootimg>
      将<bootimg>解压缩到其各个组件，每个组件到一个文件，并在当前目录中具有相
    应的文件名。
      支持的组件：kernel、kernel_dtb、ramdisk.cpio、second、dtb、extra 和
    recovery_dtbo。
      默认情况下，每个组件将在写入输出文件之前即时自动解压缩。
      如果提供“-n”，则将跳过所有解压缩操作;每个组件将保持不变，以原始格式转储。
      如果提供了“-h”，则启动映像标头信息将转储到文件“header”，该文件可用于
    在重新打包期间修改标头配置。

    返回值：
    0:valid    1:error    2:chromeos

  repack [-n] <origbootimg> [outbootimg]
      使用当前目录中的文件将启动映像组件重新打包到 [outbootimg]，如果未指
    定，则为“new-boot.img”。
      <origbootimg> 是用于解压缩组件的原始启动映像。
      默认情况下，每个组件将使用 <origbootimg> 中检测到的相应格式自动压缩。如
    果当前目录中的组件文件已被压缩，则不会对该特定组件执行任何附加压缩。
      如果提供“-n”，则将跳过所有压缩操作。
    如果 env 变量 PATCHVBMETAFLAG 设置为 true，则将设置启动映像的 vbmeta
    header 中的所有禁用标志。

  hexpatch <file> <hexpattern1> <hexpattern2>
    在 <file> 中搜索 <hexpattern1>，并将其替换为 <hexpattern2>

  cpio <incpio> [commands...]
    对 <incpio> 执行 cpio 命令（修改已到位）
    每个命令都是一个参数，请为每个命令添加引号。
    支持的命令：
      exists ENTRY
        如果 ENTRY 存在，则返回 0，否则返回 1
      rm [-r] ENTRY
        删除 ENTRY，指定 [-r] 以递归删除
      mkdir MODE ENTRY
        在 MODE 权限下创建目录 ENTRY
      ln TARGET ENTRY
        使用名称 ENTRY 创建指向 TARGET 的符号链接
      mv SOURCE DEST
        将 SOURCE 移动到 DEST
      add MODE ENTRY INFILE
        在 MODE 权限中添加 INFILE 作为 ENTRY；替换 ENTRY（如果存在）
      extract [ENTRY OUT]
        Extract ENTRY to OUT, or extract all entries to current directory
      test
        Test the cpio's status
        Return value is 0 or bitwise or-ed of following values:
        0x1:Magisk    0x2:unsupported    0x4:Sony
      patch
        Apply ramdisk patches
        Configure with env variables: KEEPVERITY KEEPFORCEENCRYPT
      backup ORIG
        Create ramdisk backups from ORIG
      restore
        Restore ramdisk from ramdisk backup stored within incpio
      sha1
        Print stock boot SHA1 if previously backed up in ramdisk

  dtb <file> <action> [args...]
    Do dtb related actions to <file>
    Supported actions:
      print [-f]
        Print all contents of dtb for debugging
        Specify [-f] to only print fstab nodes
      patch
        Search for fstab and remove verity/avb
        Modifications are done directly to the file in-place
        Configure with env variables: KEEPVERITY
      test
        Test the fstab's status
        Return values:
        0:valid    1:error

  split <file>
    Split image.*-dtb into kernel + kernel_dtb

  sha1 <file>
    Print the SHA1 checksum for <file>

  cleanup
    Cleanup the current working directory

  compress[=format] <infile> [outfile]
    Compress <infile> with [format] to [outfile].
    <infile>/[outfile] can be '-' to be STDIN/STDOUT.
    If [format] is not specified, then gzip will be used.
    If [outfile] is not specified, then <infile> will be replaced
    with another file suffixed with a matching file extension.
    Supported formats: gzip zopfli xz lzma bzip2 lz4 lz4_legacy lz4_lg 

  decompress <infile> [outfile]
    Detect format and decompress <infile> to [outfile].
    <infile>/[outfile] can be '-' to be STDIN/STDOUT.
    If [outfile] is not specified, then <infile> will be replaced
    with another file removing its archive format file extension.
    Supported formats: gzip zopfli xz lzma bzip2 lz4 lz4_legacy lz4_lg 
```

## magiskinit

这个二进制文件将替换 Magisk 补丁启动映像的 ramdisk 中的 `init`。它最初是为支持以 system-as-root 的设备而创建的，但该工具被扩展为支持所有设备，并成为 Magisk 的关键部分。更多详细信息可以在 [Micsk Booting Process](details.md#magisk-booting-process) 中的 **Pre-Init** 部分找到。

## magiskpolicy

（此工具别名为 `supolicy`，以与 SuperSU 的 sepolicy 工具兼容）

高级开发人员可以使用此工具修改 SELinux 策略。在像 Linux 服务器管理员这样的常见场景中，他们会直接修改 SELinux 策略源（`*.te`）并重新编译 `sepolicy` 二进制文件，但在 Android 上，我们直接修补二进制文件（或运行时策略）。

All processes spawned from the Magisk daemon, including root shells and all its forks, are running in the context `u:r:magisk:s0`. The rule used on all Magisk installed systems can be viewed as stock `sepolicy` with these patches: `magiskpolicy --magisk 'allow magisk * * *'`.

```
用法: ./magiskpolicy [--options...] [policy statements...]

Options:
   --help            show help message for policy statements
   --load FILE       load monolithic sepolicy from FILE
   --load-split      load from precompiled sepolicy or compile
                     split cil policies
   --compile-split   compile split cil policies
   --save FILE       dump monolithic sepolicy to FILE
   --live            immediately load sepolicy into the kernel
   --magisk          apply built-in Magisk sepolicy rules
   --apply FILE      apply rules from FILE, read and parsed
                     line by line as policy statements
                     (multiple --apply are allowed)

If neither --load, --load-split, nor --compile-split is specified,
it will load from current live policies (/sys/fs/selinux/policy)

One policy statement should be treated as one parameter;
this means each policy statement should be enclosed in quotes.
Multiple policy statements can be provided in a single command.

Statements has a format of "<rule_name> [args...]".
Arguments labeled with (^) can accept one or more entries. Multiple
entries consist of a space separated list enclosed in braces ({}).
Arguments labeled with (*) are the same as (^), but additionally
support the match-all operator (*).

Example: "allow { s1 s2 } { t1 t2 } class *"
Will be expanded to:

allow s1 t1 class { all-permissions-of-class }
allow s1 t2 class { all-permissions-of-class }
allow s2 t1 class { all-permissions-of-class }
allow s2 t2 class { all-permissions-of-class }

Supported policy statements:

"allow *source_type *target_type *class *perm_set"
"deny *source_type *target_type *class *perm_set"
"auditallow *source_type *target_type *class *perm_set"
"dontaudit *source_type *target_type *class *perm_set"

"allowxperm *source_type *target_type *class operation xperm_set"
"auditallowxperm *source_type *target_type *class operation xperm_set"
"dontauditxperm *source_type *target_type *class operation xperm_set"
- The only supported operation is 'ioctl'
- xperm_set format is either 'low-high', 'value', or '*'.
  '*' will be treated as '0x0000-0xFFFF'.
  All values should be written in hexadecimal.

"permissive ^type"
"enforce ^type"

"typeattribute ^type ^attribute"

"type type_name ^(attribute)"
- Argument 'attribute' is optional, default to 'domain'

"attribute attribute_name"

"type_transition source_type target_type class default_type (object_name)"
- Argument 'object_name' is optional

"type_change source_type target_type class default_type"
"type_member source_type target_type class default_type"

"genfscon fs_name partial_path fs_context"
```

## magisk

当使用名称 `magisk` 调用magisk二进制文件时，它作为一个实用工具，具有许多助手函数和几个 Magisk 服务的入口点。

```
用法: magisk [applet [arguments]...]
   或: magisk [options]...

Options:
   -c                        print current binary version
   -v                        print running daemon version
   -V                        print running daemon version code
   --list                    list all available applets
   --remove-modules          remove all modules and reboot
   --install-module ZIP      install a module zip file

Advanced Options (Internal APIs):
   --daemon                  manually start magisk daemon
   --stop                    remove all magisk changes and stop daemon
   --[init trigger]          callback on init triggers. Valid triggers:
                             post-fs-data, service, boot-complete, zygote-restart
   --unlock-blocks           set BLKROSET flag to OFF for all block devices
   --restorecon              restore selinux context on Magisk files
   --clone-attr SRC DEST     clone permission, owner, and selinux context
   --clone SRC DEST          clone SRC to DEST
   --sqlite SQL              exec SQL commands to Magisk database
   --path                    print Magisk tmpfs mount path
   --denylist ARGS           denylist config CLI

Available applets:
    su, resetprop

Usage: magisk --denylist [action [arguments...] ]
Actions:
   status          Return the enforcement status
   enable          Enable denylist enforcement
   disable         Disable denylist enforcement
   add PKG [PROC]  Add a new target to the denylist
   rm PKG [PROC]   Remove target(s) from the denylist
   ls              Print the current denylist
   exec CMDs...    Execute commands in isolated mount
                   namespace and do all unmounts
```

## su

MagiskSU 入口点 `magisk` 的小程序。不错的旧 `su` 命令。

```
用法: su [options] [-] [user [argument...]]

Options:
  -c, --command COMMAND         pass COMMAND to the invoked shell
  -h, --help                    display this help message and exit
  -, -l, --login                pretend the shell to be a login shell
  -m, -p,
  --preserve-environment        preserve the entire environment
  -s, --shell SHELL             use SHELL instead of the default /system/bin/sh
  -v, --version                 display version number and exit
  -V                            display version code and exit
  -mm, -M,
  --mount-master                force run in the global mount namespace
```

::: tip 注意
尽管上面没有列出 `-Z, --context` 选项，但该选项仍然存在，以便与为 SuperSU 设计的应用程序进行 CLI 兼容。然而，该选项被默默忽略，因为它不再相应。
:::

## resetprop

`magisk` 的小程序。高级系统属性操作实用程序。查看 [Resetprop 详细信息](details.md#重置属性-resetprop) 以了解更多背景信息。

```
用法: resetprop [flags] [options...]

选项:
   -h, --help        显示此消息
   (no arguments)    输出所有属性
   NAME              获取 NAME 属性
   NAME VALUE        使用 VALUE 设置 NAME 属性
   --file FILE       从 FILE 加载属性
   --delete NAME     删除 NAME 属性

标志:
   -v      将详细输出打印到 stderr
   -n      设置 props 而不经过 property_service
           (此标志仅影响 setprop)
   -p      从/向持久存储读取/写入属性
           (此标志仅影响 getprop 和 delprop)
```
## 参考链接
* [Magisk Tools](https://topjohnwu.github.io/Magisk/tools.html)
* [Magisk 工具](https://e7kmbb.github.io/Magisk/tools.html)