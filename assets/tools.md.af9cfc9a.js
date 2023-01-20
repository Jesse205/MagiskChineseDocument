import{_ as s,c as n,o as a,a as l}from"./app.4fe42109.js";const D=JSON.parse('{"title":"Magisk 工具","description":"","frontmatter":{},"headers":[{"level":2,"title":"magiskboot","slug":"magiskboot","link":"#magiskboot","children":[]},{"level":2,"title":"magiskinit","slug":"magiskinit","link":"#magiskinit","children":[]},{"level":2,"title":"magiskpolicy","slug":"magiskpolicy","link":"#magiskpolicy","children":[]},{"level":2,"title":"magisk","slug":"magisk","link":"#magisk","children":[]},{"level":2,"title":"su","slug":"su","link":"#su","children":[]},{"level":2,"title":"resetprop","slug":"resetprop","link":"#resetprop","children":[]},{"level":2,"title":"参考链接","slug":"参考链接","link":"#参考链接","children":[]}],"relativePath":"tools.md","lastUpdated":1674201921000}'),p={name:"tools.md"},e=l(`<h1 id="magisk-工具" tabindex="-1">Magisk 工具 <a class="header-anchor" href="#magisk-工具" aria-hidden="true">#</a></h1><p>Magisk 为开发人员提供了大量安装工具、守护程序和实用程序。本文档涵盖了4个二进制文件和所有包含的小程序。二进制文件和小程序如下所示：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">magiskboot                 /* binary */</span></span>
<span class="line"><span style="color:#A6ACCD;">magiskinit                 /* binary */</span></span>
<span class="line"><span style="color:#A6ACCD;">magiskpolicy               /* binary */</span></span>
<span class="line"><span style="color:#A6ACCD;">supolicy -&gt; magiskpolicy</span></span>
<span class="line"><span style="color:#A6ACCD;">magisk                     /* binary */</span></span>
<span class="line"><span style="color:#A6ACCD;">resetprop -&gt; magisk</span></span>
<span class="line"><span style="color:#A6ACCD;">su -&gt; magisk</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="magiskboot" tabindex="-1">magiskboot <a class="header-anchor" href="#magiskboot" aria-hidden="true">#</a></h2><p>一个用于解压缩/重新打包 boot 映像、解析/修补/解压缩 cpio 、修补 dtb 、十六进制修补二进制文件，以及使用多种算法压缩/解压缩文件的工具。</p><p><code>magiskboot</code> 支持常见的压缩格式（这意味着它不依赖于外部工具），包括 <code>gzip</code>、<code>lz4</code>、<code>lz4_legacy</code>（<a href="https://events.static.linuxfound.org/sites/events/files/lcjpcojp13_klee.pdf" target="_blank" rel="noreferrer">仅在LG上使用</a>)、<code>lzma</code>、<code>xz</code> 和 <code>bzip2</code>。</p><p><code>magiskboot</code> 的概念是使 boot 映像修改更简单。对于解包，它解析标头并提取映像中的所有部分，如果在任何部分中检测到压缩，则会立即解压缩。对于重新打包，需要原始 boot 映像，以便可以使用原始标头，只需更改必要的内容，如节大小和校验和。如果需要，所有部分将被压缩回原始格式。该工具还支持许多 CPIO 和 DTB 操作。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">用法: ./magiskboot &lt;action&gt; [args...]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">支持的操作:</span></span>
<span class="line"><span style="color:#A6ACCD;">  unpack [-n] [-h] &lt;bootimg&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      将&lt;bootimg&gt;解压缩到其各个组件，每个组件到一个文件，并在当前目录中具有相</span></span>
<span class="line"><span style="color:#A6ACCD;">    应的文件名。</span></span>
<span class="line"><span style="color:#A6ACCD;">      支持的组件：kernel、kernel_dtb、ramdisk.cpio、second、dtb、extra 和</span></span>
<span class="line"><span style="color:#A6ACCD;">    recovery_dtbo。</span></span>
<span class="line"><span style="color:#A6ACCD;">      默认情况下，每个组件将在写入输出文件之前即时自动解压缩。</span></span>
<span class="line"><span style="color:#A6ACCD;">      如果提供“-n”，则将跳过所有解压缩操作;每个组件将保持不变，以原始格式转储。</span></span>
<span class="line"><span style="color:#A6ACCD;">      如果提供了“-h”，则启动映像标头信息将转储到文件“header”，该文件可用于</span></span>
<span class="line"><span style="color:#A6ACCD;">    在重新打包期间修改标头配置。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    返回值：</span></span>
<span class="line"><span style="color:#A6ACCD;">    0:valid    1:error    2:chromeos</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  repack [-n] &lt;origbootimg&gt; [outbootimg]</span></span>
<span class="line"><span style="color:#A6ACCD;">      使用当前目录中的文件将启动映像组件重新打包到 [outbootimg]，如果未指</span></span>
<span class="line"><span style="color:#A6ACCD;">    定，则为“new-boot.img”。</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;origbootimg&gt; 是用于解压缩组件的原始启动映像。</span></span>
<span class="line"><span style="color:#A6ACCD;">      默认情况下，每个组件将使用 &lt;origbootimg&gt; 中检测到的相应格式自动压缩。如</span></span>
<span class="line"><span style="color:#A6ACCD;">    果当前目录中的组件文件已被压缩，则不会对该特定组件执行任何附加压缩。</span></span>
<span class="line"><span style="color:#A6ACCD;">      如果提供“-n”，则将跳过所有压缩操作。</span></span>
<span class="line"><span style="color:#A6ACCD;">    如果 env 变量 PATCHVBMETAFLAG 设置为 true，则将设置启动映像的 vbmeta</span></span>
<span class="line"><span style="color:#A6ACCD;">    header 中的所有禁用标志。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  hexpatch &lt;file&gt; &lt;hexpattern1&gt; &lt;hexpattern2&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    在 &lt;file&gt; 中搜索 &lt;hexpattern1&gt;，并将其替换为 &lt;hexpattern2&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  cpio &lt;incpio&gt; [commands...]</span></span>
<span class="line"><span style="color:#A6ACCD;">    对 &lt;incpio&gt; 执行 cpio 命令（修改已到位）</span></span>
<span class="line"><span style="color:#A6ACCD;">    每个命令都是一个参数，请为每个命令添加引号。</span></span>
<span class="line"><span style="color:#A6ACCD;">    支持的命令:</span></span>
<span class="line"><span style="color:#A6ACCD;">      exists ENTRY</span></span>
<span class="line"><span style="color:#A6ACCD;">        如果 ENTRY 存在，则返回 0，否则返回 1</span></span>
<span class="line"><span style="color:#A6ACCD;">      rm [-r] ENTRY</span></span>
<span class="line"><span style="color:#A6ACCD;">        删除 ENTRY，指定 [-r] 以递归删除</span></span>
<span class="line"><span style="color:#A6ACCD;">      mkdir MODE ENTRY</span></span>
<span class="line"><span style="color:#A6ACCD;">        在 MODE 权限下创建目录 ENTRY</span></span>
<span class="line"><span style="color:#A6ACCD;">      ln TARGET ENTRY</span></span>
<span class="line"><span style="color:#A6ACCD;">        使用名称 ENTRY 创建指向 TARGET 的符号链接</span></span>
<span class="line"><span style="color:#A6ACCD;">      mv SOURCE DEST</span></span>
<span class="line"><span style="color:#A6ACCD;">        将 SOURCE 移动到 DEST</span></span>
<span class="line"><span style="color:#A6ACCD;">      add MODE ENTRY INFILE</span></span>
<span class="line"><span style="color:#A6ACCD;">        在 MODE 权限中添加 INFILE 作为 ENTRY；替换 ENTRY（如果存在）</span></span>
<span class="line"><span style="color:#A6ACCD;">      extract [ENTRY OUT]</span></span>
<span class="line"><span style="color:#A6ACCD;">        将 ENTRY 解压到 OUT，或将所有条目解压到当前目录</span></span>
<span class="line"><span style="color:#A6ACCD;">      test</span></span>
<span class="line"><span style="color:#A6ACCD;">        测试 cpio 的状态</span></span>
<span class="line"><span style="color:#A6ACCD;">        返回值为0或或运算以下值：</span></span>
<span class="line"><span style="color:#A6ACCD;">        0x1:Magisk    0x2:unsupported    0x4:Sony</span></span>
<span class="line"><span style="color:#A6ACCD;">      patch</span></span>
<span class="line"><span style="color:#A6ACCD;">        应用 ramdisk 补丁</span></span>
<span class="line"><span style="color:#A6ACCD;">        用 env 变量进行配置：KEEPVERITY KEEPFORCEENCRYPT</span></span>
<span class="line"><span style="color:#A6ACCD;">      backup ORIG</span></span>
<span class="line"><span style="color:#A6ACCD;">        从 ORIG 创建 ramdisk 备份</span></span>
<span class="line"><span style="color:#A6ACCD;">      restore</span></span>
<span class="line"><span style="color:#A6ACCD;">        从 incpio 中存储的 ramdisk 备份恢复 ramdisk</span></span>
<span class="line"><span style="color:#A6ACCD;">      sha1</span></span>
<span class="line"><span style="color:#A6ACCD;">        如果以前已在 ramdisk 中备份，则输出原始引导SHA1</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  dtb &lt;file&gt; &lt;action&gt; [args...]</span></span>
<span class="line"><span style="color:#A6ACCD;">    对 &lt;file&gt; 执行与 dtb 相关的操作</span></span>
<span class="line"><span style="color:#A6ACCD;">    支持的操作：</span></span>
<span class="line"><span style="color:#A6ACCD;">      print [-f]</span></span>
<span class="line"><span style="color:#A6ACCD;">        打印 dtb 的所有内容以进行调试</span></span>
<span class="line"><span style="color:#A6ACCD;">        指定 [-f] 以仅打印 fstab 节点</span></span>
<span class="line"><span style="color:#A6ACCD;">      patch</span></span>
<span class="line"><span style="color:#A6ACCD;">        搜索 fstab 并删除 verity/avb</span></span>
<span class="line"><span style="color:#A6ACCD;">        直接对文件进行修改</span></span>
<span class="line"><span style="color:#A6ACCD;">        使用env变量进行配置：KEEPVERITY</span></span>
<span class="line"><span style="color:#A6ACCD;">      test</span></span>
<span class="line"><span style="color:#A6ACCD;">        测试 fstab 的状态</span></span>
<span class="line"><span style="color:#A6ACCD;">        返回值:</span></span>
<span class="line"><span style="color:#A6ACCD;">        0:valid    1:error</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  split &lt;file&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    将 image.*-dtb 拆分为 kernel + kernel_dtb</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  sha1 &lt;file&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    出 &lt;file&gt; 的 SHA1 校验和</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  cleanup</span></span>
<span class="line"><span style="color:#A6ACCD;">    清理当前工作目录</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  compress[=format] &lt;infile&gt; [outfile]</span></span>
<span class="line"><span style="color:#A6ACCD;">    Compress &lt;infile&gt; with [format] to [outfile].</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;infile&gt;/[outfile] can be &#39;-&#39; to be STDIN/STDOUT.</span></span>
<span class="line"><span style="color:#A6ACCD;">    If [format] is not specified, then gzip will be used.</span></span>
<span class="line"><span style="color:#A6ACCD;">    If [outfile] is not specified, then &lt;infile&gt; will be replaced</span></span>
<span class="line"><span style="color:#A6ACCD;">    with another file suffixed with a matching file extension.</span></span>
<span class="line"><span style="color:#A6ACCD;">    Supported formats: gzip zopfli xz lzma bzip2 lz4 lz4_legacy lz4_lg </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  decompress &lt;infile&gt; [outfile]</span></span>
<span class="line"><span style="color:#A6ACCD;">    Detect format and decompress &lt;infile&gt; to [outfile].</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;infile&gt;/[outfile] can be &#39;-&#39; to be STDIN/STDOUT.</span></span>
<span class="line"><span style="color:#A6ACCD;">    If [outfile] is not specified, then &lt;infile&gt; will be replaced</span></span>
<span class="line"><span style="color:#A6ACCD;">    with another file removing its archive format file extension.</span></span>
<span class="line"><span style="color:#A6ACCD;">    Supported formats: gzip zopfli xz lzma bzip2 lz4 lz4_legacy lz4_lg </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="magiskinit" tabindex="-1">magiskinit <a class="header-anchor" href="#magiskinit" aria-hidden="true">#</a></h2><p>这个二进制文件将替换 Magisk 补丁启动映像的 ramdisk 中的 <code>init</code>。它最初是为支持以 system-as-root 的设备而创建的，但该工具被扩展为支持所有设备，并成为 Magisk 的关键部分。更多详细信息可以在 <a href="./details.html#magisk-booting-process">Micsk Booting Process</a> 中的 <strong>Pre-Init</strong> 部分找到。</p><h2 id="magiskpolicy" tabindex="-1">magiskpolicy <a class="header-anchor" href="#magiskpolicy" aria-hidden="true">#</a></h2><p>（此工具别名为 <code>supolicy</code>，以与 SuperSU 的 sepolicy 工具兼容）</p><p>高级开发人员可以使用此工具修改 SELinux 策略。在像 Linux 服务器管理员这样的常见场景中，他们会直接修改 SELinux 策略源（<code>*.te</code>）并重新编译 <code>sepolicy</code> 二进制文件，但在 Android 上，我们直接修补二进制文件（或运行时策略）。</p><p>All processes spawned from the Magisk daemon, including root shells and all its forks, are running in the context <code>u:r:magisk:s0</code>. The rule used on all Magisk installed systems can be viewed as stock <code>sepolicy</code> with these patches: <code>magiskpolicy --magisk &#39;allow magisk * * *&#39;</code>.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">用法: ./magiskpolicy [--options...] [policy statements...]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Options:</span></span>
<span class="line"><span style="color:#A6ACCD;">   --help            show help message for policy statements</span></span>
<span class="line"><span style="color:#A6ACCD;">   --load FILE       load monolithic sepolicy from FILE</span></span>
<span class="line"><span style="color:#A6ACCD;">   --load-split      load from precompiled sepolicy or compile</span></span>
<span class="line"><span style="color:#A6ACCD;">                     split cil policies</span></span>
<span class="line"><span style="color:#A6ACCD;">   --compile-split   compile split cil policies</span></span>
<span class="line"><span style="color:#A6ACCD;">   --save FILE       dump monolithic sepolicy to FILE</span></span>
<span class="line"><span style="color:#A6ACCD;">   --live            immediately load sepolicy into the kernel</span></span>
<span class="line"><span style="color:#A6ACCD;">   --magisk          apply built-in Magisk sepolicy rules</span></span>
<span class="line"><span style="color:#A6ACCD;">   --apply FILE      apply rules from FILE, read and parsed</span></span>
<span class="line"><span style="color:#A6ACCD;">                     line by line as policy statements</span></span>
<span class="line"><span style="color:#A6ACCD;">                     (multiple --apply are allowed)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">If neither --load, --load-split, nor --compile-split is specified,</span></span>
<span class="line"><span style="color:#A6ACCD;">it will load from current live policies (/sys/fs/selinux/policy)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">One policy statement should be treated as one parameter;</span></span>
<span class="line"><span style="color:#A6ACCD;">this means each policy statement should be enclosed in quotes.</span></span>
<span class="line"><span style="color:#A6ACCD;">Multiple policy statements can be provided in a single command.</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Statements has a format of &quot;&lt;rule_name&gt; [args...]&quot;.</span></span>
<span class="line"><span style="color:#A6ACCD;">Arguments labeled with (^) can accept one or more entries. Multiple</span></span>
<span class="line"><span style="color:#A6ACCD;">entries consist of a space separated list enclosed in braces ({}).</span></span>
<span class="line"><span style="color:#A6ACCD;">Arguments labeled with (*) are the same as (^), but additionally</span></span>
<span class="line"><span style="color:#A6ACCD;">support the match-all operator (*).</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Example: &quot;allow { s1 s2 } { t1 t2 } class *&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">Will be expanded to:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">allow s1 t1 class { all-permissions-of-class }</span></span>
<span class="line"><span style="color:#A6ACCD;">allow s1 t2 class { all-permissions-of-class }</span></span>
<span class="line"><span style="color:#A6ACCD;">allow s2 t1 class { all-permissions-of-class }</span></span>
<span class="line"><span style="color:#A6ACCD;">allow s2 t2 class { all-permissions-of-class }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Supported policy statements:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;allow *source_type *target_type *class *perm_set&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;deny *source_type *target_type *class *perm_set&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;auditallow *source_type *target_type *class *perm_set&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;dontaudit *source_type *target_type *class *perm_set&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;allowxperm *source_type *target_type *class operation xperm_set&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;auditallowxperm *source_type *target_type *class operation xperm_set&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;dontauditxperm *source_type *target_type *class operation xperm_set&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">- The only supported operation is &#39;ioctl&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">- xperm_set format is either &#39;low-high&#39;, &#39;value&#39;, or &#39;*&#39;.</span></span>
<span class="line"><span style="color:#A6ACCD;">  &#39;*&#39; will be treated as &#39;0x0000-0xFFFF&#39;.</span></span>
<span class="line"><span style="color:#A6ACCD;">  All values should be written in hexadecimal.</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;permissive ^type&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;enforce ^type&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;typeattribute ^type ^attribute&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;type type_name ^(attribute)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">- Argument &#39;attribute&#39; is optional, default to &#39;domain&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;attribute attribute_name&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;type_transition source_type target_type class default_type (object_name)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">- Argument &#39;object_name&#39; is optional</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;type_change source_type target_type class default_type&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;type_member source_type target_type class default_type&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;genfscon fs_name partial_path fs_context&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="magisk" tabindex="-1">magisk <a class="header-anchor" href="#magisk" aria-hidden="true">#</a></h2><p>当使用名称 <code>magisk</code> 调用magisk二进制文件时，它作为一个实用工具，具有许多助手函数和几个 Magisk 服务的入口点。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">用法: magisk [applet [arguments]...]</span></span>
<span class="line"><span style="color:#A6ACCD;">   或: magisk [options]...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Options:</span></span>
<span class="line"><span style="color:#A6ACCD;">   -c                        print current binary version</span></span>
<span class="line"><span style="color:#A6ACCD;">   -v                        print running daemon version</span></span>
<span class="line"><span style="color:#A6ACCD;">   -V                        print running daemon version code</span></span>
<span class="line"><span style="color:#A6ACCD;">   --list                    list all available applets</span></span>
<span class="line"><span style="color:#A6ACCD;">   --remove-modules          remove all modules and reboot</span></span>
<span class="line"><span style="color:#A6ACCD;">   --install-module ZIP      install a module zip file</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Advanced Options (Internal APIs):</span></span>
<span class="line"><span style="color:#A6ACCD;">   --daemon                  manually start magisk daemon</span></span>
<span class="line"><span style="color:#A6ACCD;">   --stop                    remove all magisk changes and stop daemon</span></span>
<span class="line"><span style="color:#A6ACCD;">   --[init trigger]          callback on init triggers. Valid triggers:</span></span>
<span class="line"><span style="color:#A6ACCD;">                             post-fs-data, service, boot-complete, zygote-restart</span></span>
<span class="line"><span style="color:#A6ACCD;">   --unlock-blocks           set BLKROSET flag to OFF for all block devices</span></span>
<span class="line"><span style="color:#A6ACCD;">   --restorecon              restore selinux context on Magisk files</span></span>
<span class="line"><span style="color:#A6ACCD;">   --clone-attr SRC DEST     clone permission, owner, and selinux context</span></span>
<span class="line"><span style="color:#A6ACCD;">   --clone SRC DEST          clone SRC to DEST</span></span>
<span class="line"><span style="color:#A6ACCD;">   --sqlite SQL              exec SQL commands to Magisk database</span></span>
<span class="line"><span style="color:#A6ACCD;">   --path                    print Magisk tmpfs mount path</span></span>
<span class="line"><span style="color:#A6ACCD;">   --denylist ARGS           denylist config CLI</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Available applets:</span></span>
<span class="line"><span style="color:#A6ACCD;">    su, resetprop</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Usage: magisk --denylist [action [arguments...] ]</span></span>
<span class="line"><span style="color:#A6ACCD;">Actions:</span></span>
<span class="line"><span style="color:#A6ACCD;">   status          Return the enforcement status</span></span>
<span class="line"><span style="color:#A6ACCD;">   enable          Enable denylist enforcement</span></span>
<span class="line"><span style="color:#A6ACCD;">   disable         Disable denylist enforcement</span></span>
<span class="line"><span style="color:#A6ACCD;">   add PKG [PROC]  Add a new target to the denylist</span></span>
<span class="line"><span style="color:#A6ACCD;">   rm PKG [PROC]   Remove target(s) from the denylist</span></span>
<span class="line"><span style="color:#A6ACCD;">   ls              Print the current denylist</span></span>
<span class="line"><span style="color:#A6ACCD;">   exec CMDs...    Execute commands in isolated mount</span></span>
<span class="line"><span style="color:#A6ACCD;">                   namespace and do all unmounts</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="su" tabindex="-1">su <a class="header-anchor" href="#su" aria-hidden="true">#</a></h2><p>MagiskSU 入口点 <code>magisk</code> 的小程序。不错的旧 <code>su</code> 命令。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">用法: su [options] [-] [user [argument...]]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Options:</span></span>
<span class="line"><span style="color:#A6ACCD;">  -c, --command COMMAND         pass COMMAND to the invoked shell</span></span>
<span class="line"><span style="color:#A6ACCD;">  -h, --help                    display this help message and exit</span></span>
<span class="line"><span style="color:#A6ACCD;">  -, -l, --login                pretend the shell to be a login shell</span></span>
<span class="line"><span style="color:#A6ACCD;">  -m, -p,</span></span>
<span class="line"><span style="color:#A6ACCD;">  --preserve-environment        preserve the entire environment</span></span>
<span class="line"><span style="color:#A6ACCD;">  -s, --shell SHELL             use SHELL instead of the default /system/bin/sh</span></span>
<span class="line"><span style="color:#A6ACCD;">  -v, --version                 display version number and exit</span></span>
<span class="line"><span style="color:#A6ACCD;">  -V                            display version code and exit</span></span>
<span class="line"><span style="color:#A6ACCD;">  -mm, -M,</span></span>
<span class="line"><span style="color:#A6ACCD;">  --mount-master                force run in the global mount namespace</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">注意</p><p>尽管上面没有列出 <code>-Z, --context</code> 选项，但该选项仍然存在，以便与为 SuperSU 设计的应用程序进行 CLI 兼容。然而，该选项被默默忽略，因为它不再相应。</p></div><h2 id="resetprop" tabindex="-1">resetprop <a class="header-anchor" href="#resetprop" aria-hidden="true">#</a></h2><p><code>magisk</code> 的小程序。高级系统属性操作实用程序。查看 <a href="./details.html#重置属性-resetprop">Resetprop 详细信息</a> 以了解更多背景信息。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">用法: resetprop [flags] [options...]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">选项:</span></span>
<span class="line"><span style="color:#A6ACCD;">   -h, --help        显示此消息</span></span>
<span class="line"><span style="color:#A6ACCD;">   (no arguments)    输出所有属性</span></span>
<span class="line"><span style="color:#A6ACCD;">   NAME              获取 NAME 属性</span></span>
<span class="line"><span style="color:#A6ACCD;">   NAME VALUE        使用 VALUE 设置 NAME 属性</span></span>
<span class="line"><span style="color:#A6ACCD;">   --file FILE       从 FILE 加载属性</span></span>
<span class="line"><span style="color:#A6ACCD;">   --delete NAME     删除 NAME 属性</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">标志:</span></span>
<span class="line"><span style="color:#A6ACCD;">   -v      将详细输出打印到 stderr</span></span>
<span class="line"><span style="color:#A6ACCD;">   -n      设置 props 而不经过 property_service</span></span>
<span class="line"><span style="color:#A6ACCD;">           (此标志仅影响 setprop)</span></span>
<span class="line"><span style="color:#A6ACCD;">   -p      从/向持久存储读取/写入属性</span></span>
<span class="line"><span style="color:#A6ACCD;">           (此标志仅影响 getprop 和 delprop)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="参考链接" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接" aria-hidden="true">#</a></h2><ul><li><a href="https://topjohnwu.github.io/Magisk/tools.html" target="_blank" rel="noreferrer">Magisk Tools</a></li><li><a href="https://e7kmbb.github.io/Magisk/tools.html" target="_blank" rel="noreferrer">Magisk 工具</a></li></ul>`,27),o=[e];function t(c,i,r,A,C,y){return a(),n("div",null,o)}const m=s(p,[["render",t]]);export{D as __pageData,m as default};
