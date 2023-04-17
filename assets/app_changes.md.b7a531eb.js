import{_ as e,o as i,c as a,V as l}from"./chunks/framework.a9120281.js";const g=JSON.parse('{"title":"Magisk Manager 更新日志","description":"","frontmatter":{},"headers":[],"relativePath":"app_changes.md","lastUpdated":1675020658000}'),t={name:"app_changes.md"},o=l('<h1 id="magisk-manager-更新日志" tabindex="-1">Magisk Manager 更新日志 <a class="header-anchor" href="#magisk-manager-更新日志" aria-label="Permalink to &quot;Magisk Manager 更新日志&quot;">​</a></h1><h2 id="v8-0-7" tabindex="-1">v8.0.7 <a class="header-anchor" href="#v8-0-7" aria-label="Permalink to &quot;v8.0.7&quot;">​</a></h2><ul><li>修复升级时的sepolicy规则迁移</li></ul><h2 id="v8-0-6" tabindex="-1">v8.0.6 <a class="header-anchor" href="#v8-0-6" aria-label="Permalink to &quot;v8.0.6&quot;">​</a></h2><ul><li><p>轻微的UI更改</p></li><li><p>更新内部脚本</p></li></ul><h2 id="v8-0-5" tabindex="-1">v8.0.5 <a class="header-anchor" href="#v8-0-5" aria-label="Permalink to &quot;v8.0.5&quot;">​</a></h2><ul><li>修复sepolicy规则复制</li></ul><h2 id="v8-0-4" tabindex="-1">v8.0.4 <a class="header-anchor" href="#v8-0-4" aria-label="Permalink to &quot;v8.0.4&quot;">​</a></h2><ul><li>大量的稳定性更改和小错误修复</li><li>在日志菜单中保存日志时，收集设备属性、应用程序日志和Magisk日志</li></ul><h2 id="v8-0-3" tabindex="-1">v8.0.3 <a class="header-anchor" href="#v8-0-3" aria-label="Permalink to &quot;v8.0.3&quot;">​</a></h2><ul><li>切换到新的Magisk模块仓库设置，以允许第三方仓库</li><li>在超级用户请求对话框中添加抽头劫持保护</li><li>稳定性更改和错误修复</li></ul><h2 id="v8-0-2" tabindex="-1">v8.0.2 <a class="header-anchor" href="#v8-0-2" aria-label="Permalink to &quot;v8.0.2&quot;">​</a></h2><ul><li>Fix an issue with requesting permission on devices older than Android 10</li><li>Make more files download through CDN</li></ul><h2 id="v8-0-1" tabindex="-1">v8.0.1 <a class="header-anchor" href="#v8-0-1" aria-label="Permalink to &quot;v8.0.1&quot;">​</a></h2><ul><li>Fix <code>vbmeta.img</code> patching for Samsung <code>AP.tar</code> files. This fixes bootloops on devices like Galaxy S10 after flashing updated AP files.</li><li>Properly truncate existing files before writing to prevent corrupted files</li><li>Prevent a possible UI loop when device ran into very low memory</li><li>Switch to use JSDelivr CDN for several files</li></ul><h2 id="v8-0-0" tabindex="-1">v8.0.0 <a class="header-anchor" href="#v8-0-0" aria-label="Permalink to &quot;v8.0.0&quot;">​</a></h2><ul><li>100% full app rewrite! Will highlight functional changes below.</li><li>Add detailed device info in home screen to assist user installation</li><li>Support Magisk v21.0 communication protocol</li><li>Support patching modern Samsung <code>AP.tar</code></li></ul><h2 id="v7-5-1" tabindex="-1">v7.5.1 <a class="header-anchor" href="#v7-5-1" aria-label="Permalink to &quot;v7.5.1&quot;">​</a></h2><ul><li>Fix toggling app components in MagiskHide screen</li><li>Update translations</li></ul><h2 id="v7-5-0" tabindex="-1">v7.5.0 <a class="header-anchor" href="#v7-5-0" aria-label="Permalink to &quot;v7.5.0&quot;">​</a></h2><ul><li>Support new MagiskSU communication method (ContentProvider)</li><li>Fix several issues with hidden stub APK</li><li>Support using BiometricPrompt (face unlock)</li></ul><h2 id="v7-4-0" tabindex="-1">v7.4.0 <a class="header-anchor" href="#v7-4-0" aria-label="Permalink to &quot;v7.4.0&quot;">​</a></h2><ul><li>Hide Magisk Manager with stub APKs on Android 9.0+</li><li>Allow customizing app name when hiding Magisk Manager</li><li>Generate random keys to sign the hidden Magisk Manager to prevent signature detections</li><li>Fix fingerprint UI infinite loop</li></ul><h2 id="v7-3-5" tabindex="-1">v7.3.5 <a class="header-anchor" href="#v7-3-5" aria-label="Permalink to &quot;v7.3.5&quot;">​</a></h2><ul><li>Sort installed modules by name</li><li>Better pre-5.0 support</li><li>Fix potential issues when patching tar files</li></ul><h2 id="v7-3-4" tabindex="-1">v7.3.4 <a class="header-anchor" href="#v7-3-4" aria-label="Permalink to &quot;v7.3.4&quot;">​</a></h2><ul><li>App is now fully written in Kotlin!</li><li>New downloading system</li><li>Add new &quot;Recovery Mode&quot; to Advanced Settings</li></ul><h2 id="v7-3-0-1-2" tabindex="-1">v7.3.0/1/2 <a class="header-anchor" href="#v7-3-0-1-2" aria-label="Permalink to &quot;v7.3.0/1/2&quot;">​</a></h2><ul><li>HUGE code base modernization, thanks @diareuse!</li><li>More sweet changes coming in the future!</li><li>Reboot device using proper API (no more abrupt reboot)</li><li>New floating button in Magisk logs to go to bottom</li></ul><h2 id="v7-2-0" tabindex="-1">v7.2.0 <a class="header-anchor" href="#v7-2-0" aria-label="Permalink to &quot;v7.2.0&quot;">​</a></h2><ul><li>Huge UI overhaul</li><li>More sweet changes coming in the future!</li></ul><h2 id="v7-1-2" tabindex="-1">v7.1.2 <a class="header-anchor" href="#v7-1-2" aria-label="Permalink to &quot;v7.1.2&quot;">​</a></h2><ul><li>Support patching Samsung AP firmware</li><li>Much better module downloading mechanism</li></ul><h2 id="v7-1-1" tabindex="-1">v7.1.1 <a class="header-anchor" href="#v7-1-1" aria-label="Permalink to &quot;v7.1.1&quot;">​</a></h2><ul><li>Fix a bug that causes some modules using new format not showing up</li></ul><h2 id="v7-1-0" tabindex="-1">v7.1.0 <a class="header-anchor" href="#v7-1-0" aria-label="Permalink to &quot;v7.1.0&quot;">​</a></h2><ul><li>Support the new module format</li><li>Support per-application component granularity MagiskHide targets (only on v19+)</li><li>Ask for fingerprint before deleting rules if enabled</li><li>Fix the bug that causes repackaging to lose settings</li><li>Several UI fixes</li></ul><h2 id="v7-0-0" tabindex="-1">v7.0.0 <a class="header-anchor" href="#v7-0-0" aria-label="Permalink to &quot;v7.0.0&quot;">​</a></h2><ul><li>Major UI redesign!</li><li>Render Markdown natively (no more buggy WebView!)</li><li>Support down to Android 4.1 (native Magisk only support Android 4.2 though)</li><li>Significantly improve Magisk log display performance</li><li>Fix post OTA scripts for A/B devices</li><li>Reduce memory usages when verifying and signing boot image</li><li>Drop support for Magisk lower than v18.0</li></ul><h2 id="v6-1-0" tabindex="-1">v6.1.0 <a class="header-anchor" href="#v6-1-0" aria-label="Permalink to &quot;v6.1.0&quot;">​</a></h2><ul><li>Introduce new downloading methods: no longer uses buggy system Download Manager</li><li>Introduce many new notifications for better user experience</li><li>Add support for Magisk v18.0</li><li>Change application name to &quot;Manager&quot; after hiding(repackaging) to prevent app name detection</li><li>Add built-in systemless hosts module (access in settings)</li><li>Auto launch the newly installed app after hiding(repackaging) and restoring Magisk Manager</li><li>Fix bug causing incomplete module.prop in modules to have improper UI</li></ul><h2 id="v6-0-1" tabindex="-1">v6.0.1 <a class="header-anchor" href="#v6-0-1" aria-label="Permalink to &quot;v6.0.1&quot;">​</a></h2><ul><li>Update to use new online module&#39;s organizing method</li><li>When fingerprint authentication is enabled, toggling root permissions in &quot;Superuser&quot; section now requires fingerprint beforehand</li><li>Fix crashes when entering MagiskHide section on some devices</li><li>Remove support to Magisk version lower than v15.0</li><li>Ask storage permissions before patching stock boot image</li><li>Update dark theme CardView color</li></ul><h2 id="v6-0-0" tabindex="-1">v6.0.0 <a class="header-anchor" href="#v6-0-0" aria-label="Permalink to &quot;v6.0.0&quot;">​</a></h2><ul><li>Update to latest AndroidX support library</li><li>Fix crashes when online repos contain incomplete metadata</li><li>Optimize BootSigner to use as little memory as possible, prevent OutOfMemoryError</li><li>Support new communication scheme between Magisk v17.2 and Magisk Manager</li><li>Enable excessive obfuscation to prevent APK analysis root detections (still not 100% obfuscated due to backwards compatibility with stable channel)</li></ul><h2 id="v5-9-0-v5-9-1" tabindex="-1">v5.9.0/v5.9.1 <a class="header-anchor" href="#v5-9-0-v5-9-1" aria-label="Permalink to &quot;v5.9.0/v5.9.1&quot;">​</a></h2><ul><li>No more on boot notifications</li><li>Support new mechanism for installing to inactive slot for OTAs on A/B devices</li><li>Fix restore Magisk Manager settings on Android P</li><li>Verify existing file checksums to prevent unnecessary re-downloads</li><li>Update SNET extension to use new Google API, fix &quot;Invalid Response&quot; errors</li><li>Move fingerprint settings to magisk database to prevent the settings to be easily removed</li><li>Fingerprint settings are now guarded with fingerprint authentications before it can get changed</li><li>Prevent any files to be downloaded to /sdcard/MagiskManager</li></ul><h2 id="v5-8-3" tabindex="-1">v5.8.3 <a class="header-anchor" href="#v5-8-3" aria-label="Permalink to &quot;v5.8.3&quot;">​</a></h2><ul><li>Prevent invalid modules in the online repo crashing the app</li><li>Update Stable and Beta channel URLs</li></ul><h2 id="v5-8-1" tabindex="-1">v5.8.1 <a class="header-anchor" href="#v5-8-1" aria-label="Permalink to &quot;v5.8.1&quot;">​</a></h2><ul><li>Fix a bug that cause the root shell initializer not running in BusyBox environment</li></ul><h2 id="v5-8-0" tabindex="-1">v5.8.0 <a class="header-anchor" href="#v5-8-0" aria-label="Permalink to &quot;v5.8.0&quot;">​</a></h2><ul><li>Remain hidden when upgrading within repackaged Magisk Manager</li><li>New feature: support reconstructing a proper Magisk environment if error detected (e.g. after factory reset)</li><li>New uninstall method: download uninstaller and completely remove Magisk + Magisk Manager, following with a reboot</li><li>Hidden apps are now shown on the top of the list in MagiskHide fragment</li><li>Tons of under-the-hood bug fixes and improvements</li></ul><h2 id="v5-7-0" tabindex="-1">v5.7.0 <a class="header-anchor" href="#v5-7-0" aria-label="Permalink to &quot;v5.7.0&quot;">​</a></h2><ul><li>Add app shortcuts for Android 7.1+</li><li>Bump minimal module minMagisk requirement to 1500</li><li>Adjustments for new sepolicies on v16.4+</li><li>Fix crashes when refreshing the online repo</li></ul><h2 id="v5-6-4" tabindex="-1">v5.6.4 <a class="header-anchor" href="#v5-6-4" aria-label="Permalink to &quot;v5.6.4&quot;">​</a></h2><ul><li>Remove the blacklisted apps using SafetyNet (e.g. Pokemon GO)</li></ul><h2 id="v5-6-3" tabindex="-1">v5.6.3 <a class="header-anchor" href="#v5-6-3" aria-label="Permalink to &quot;v5.6.3&quot;">​</a></h2><ul><li>Fix repo loading UI logic</li></ul><h2 id="v5-6-2" tabindex="-1">v5.6.2 <a class="header-anchor" href="#v5-6-2" aria-label="Permalink to &quot;v5.6.2&quot;">​</a></h2><ul><li>Cleanup folders if installation failed</li><li>Add support for Android P</li></ul><h2 id="v5-6-1" tabindex="-1">v5.6.1 <a class="header-anchor" href="#v5-6-1" aria-label="Permalink to &quot;v5.6.1&quot;">​</a></h2><ul><li>Fix database crashes on F2FS with SQLite 3.21.0+</li><li>Optimize several settings options</li><li>Use native XML for settings migration</li></ul><h2 id="v5-6-0" tabindex="-1">v5.6.0 <a class="header-anchor" href="#v5-6-0" aria-label="Permalink to &quot;v5.6.0&quot;">​</a></h2><ul><li>Remove JNI requirement, Magisk Manager is now pure Java</li><li>Update the method of handling su database, may fix the issue that root requests won&#39;t save</li><li>Add the option to restore Magisk Manager after repackaging with random package name</li><li>Massive under-the-hood</li></ul><h2 id="v5-5-5" tabindex="-1">v5.5.5 <a class="header-anchor" href="#v5-5-5" aria-label="Permalink to &quot;v5.5.5&quot;">​</a></h2><ul><li>Fix crashes on Lollipop and some devices not following AOSP standards</li></ul><h2 id="v5-5-4" tabindex="-1">v5.5.4 <a class="header-anchor" href="#v5-5-4" aria-label="Permalink to &quot;v5.5.4&quot;">​</a></h2><ul><li>Fix dtbo on-boot detection, should follow configured dtbo patching behavior on Pixel 2 devices</li><li>Add fingerprint authentication for Superuser requests</li></ul><h2 id="v5-5-3" tabindex="-1">v5.5.3 <a class="header-anchor" href="#v5-5-3" aria-label="Permalink to &quot;v5.5.3&quot;">​</a></h2><ul><li>Update translations</li><li>Update internal scripts (in sync with Magisk)</li><li>Minor adjustments</li></ul><h2 id="v5-5-2" tabindex="-1">v5.5.2 <a class="header-anchor" href="#v5-5-2" aria-label="Permalink to &quot;v5.5.2&quot;">​</a></h2><ul><li>Support sorting online repos with last update</li><li>Fix issue that advanced installation settings won&#39;t stick</li><li>Prevent sudb crashing Magisk Manager</li></ul><h2 id="v5-5-1" tabindex="-1">v5.5.1 <a class="header-anchor" href="#v5-5-1" aria-label="Permalink to &quot;v5.5.1&quot;">​</a></h2><ul><li>Fix an issue in setting up superuser database, which causes some users to experience tons of root issues</li></ul><h2 id="v5-5-0" tabindex="-1">v5.5.0 <a class="header-anchor" href="#v5-5-0" aria-label="Permalink to &quot;v5.5.0&quot;">​</a></h2><ul><li>Fix dynamic resource loading, prevent crashes when checking SafetyNet</li><li>Update SignAPK to use very little RAM for supporting old devices</li><li>Support settings migration after hiding Magisk Manager</li><li>Add reboot menu in modules section</li><li>Add dark theme to superuser request dialogs</li><li>Properly handle new HIGHCOMP and add recommended KEEPVERITY and KEEPFORCEENCRYPT flags for installation</li><li>Support new paths for v14.6</li><li>Massive improvements in repackaging Magisk Manager</li></ul><h2 id="v5-4-3" tabindex="-1">v5.4.3 <a class="header-anchor" href="#v5-4-3" aria-label="Permalink to &quot;v5.4.3&quot;">​</a></h2><ul><li>Add flags to intent to prevent crashes</li><li>Update translations</li></ul><h2 id="v5-4-2" tabindex="-1">v5.4.2 <a class="header-anchor" href="#v5-4-2" aria-label="Permalink to &quot;v5.4.2&quot;">​</a></h2><ul><li>Support new paths and setup of v14.5</li><li>Support repackaging Magisk Manager for hiding (only works on v14.5+)</li><li>Support hardlinking global su database into app data</li><li>Support signing boot images (AVB 1.0)</li><li>Update app icon to adaptive icons</li><li>Remove app from MagiskHide list if uninstalled</li><li>Add support to save detailed logs when installing Magisk or modules</li><li>Fix download progress error if module is larger than 20MB</li><li>Changed the way how downloaded repos are processed, should be rock stable</li><li>Prevent crashes when database is corrupted - clear db instead</li><li>Fix saving wrong UID issue on multiuser mode</li><li>Add custom update channel support - you can now switch to your own update server!</li><li>Some UI adjustments and asynchronous UI performance improvements</li></ul><h2 id="v5-4-0" tabindex="-1">v5.4.0 <a class="header-anchor" href="#v5-4-0" aria-label="Permalink to &quot;v5.4.0&quot;">​</a></h2><ul><li>SafetyNet checks now require external code extension (for 100% FOSS)</li><li>Repo loading will now show real-time progress instead of blank screen</li><li>Show progress when downloading an online module</li><li>Allow secondary users to access superuser settings if allowed</li><li>Fix several places where external storage is needed but forgot to request</li><li>Fetching online repo info from sever is significantly faster thanks to multithreading</li><li>Pulling down Download page will now force a full refresh, thanks to the faster loading speed</li><li>Using new resetprop tool to properly detect MagiskHide status</li></ul><h2 id="v5-3-5" tabindex="-1">v5.3.5 <a class="header-anchor" href="#v5-3-5" aria-label="Permalink to &quot;v5.3.5&quot;">​</a></h2><ul><li>Fix error when MagiskManager folder doesn&#39;t exist</li><li>Offload many logic to scripts: script fixes will also be picked up in the app</li><li>Add installing Magisk to second slot on A/B partition devices</li><li>Support file based encryption: store necessary files into DE storage</li><li>Update uninstall method to self remove app and prompt user to manually reboot</li></ul><h2 id="v5-3-0" tabindex="-1">v5.3.0 <a class="header-anchor" href="#v5-3-0" aria-label="Permalink to &quot;v5.3.0&quot;">​</a></h2><ul><li>Add hide Magisk Manager feature - hide the app from detection</li><li>Add update channel settings - you can now receive beta updates through the app</li><li>Proper runtime permission implementation - request storage permission only when needed</li><li>Add boot image file patch feature - you can patch boot images without root!</li><li>Rewrite Magisk direct install method - merge with boot image file patch mode</li><li>Add feature to restore stock boot image - convenient for applying OTAs</li></ul><h2 id="v5-2-0" tabindex="-1">v5.2.0 <a class="header-anchor" href="#v5-2-0" aria-label="Permalink to &quot;v5.2.0&quot;">​</a></h2><ul><li>Fix force close which occurs when failure in flashing zips</li><li>Remove several external dependencies and rewrite a large portion of components</li><li>Improve MarkDown support: showing README.MD is much faster and will properly render Unicode characters (e.g. Chinese characters)</li><li>Add language settings: you can now switch to languages other than system default</li><li>Remove busybox included within APK; download through Internet if needed</li><li>Use Magisk internal busybox if detected</li><li>Busybox is added to the highest priority in PATH to create reliable shell environment</li><li>Always use global namespace for internal shell if possible</li></ul><h2 id="v5-1-1" tabindex="-1">v5.1.1 <a class="header-anchor" href="#v5-1-1" aria-label="Permalink to &quot;v5.1.1&quot;">​</a></h2><ul><li>Fix Magisk Manager hanging when reading files with no end newline</li><li>Massive rewrite AsyncTasks to prevent potential memory leak</li><li>Fix some minor issues with notifications</li><li>Improve update notification and popup behavior</li><li>Update internal uninstaller script</li></ul><h2 id="v5-1-0" tabindex="-1">v5.1.0 <a class="header-anchor" href="#v5-1-0" aria-label="Permalink to &quot;v5.1.0&quot;">​</a></h2><ul><li>Introduce a new flash log activity, so you know what is actually happening, just like flashing in custom recoveries!</li><li>Rewritten Java native shall interface: merged root shell and normal shell</li><li>Cleaned up implementation of repo recyclerview and adapters</li></ul><h2 id="v5-0-6" tabindex="-1">v5.0.6 <a class="header-anchor" href="#v5-0-6" aria-label="Permalink to &quot;v5.0.6&quot;">​</a></h2><ul><li>Fix crash when installing modules downloading from repos</li></ul><h2 id="v5-0-5" tabindex="-1">v5.0.5 <a class="header-anchor" href="#v5-0-5" aria-label="Permalink to &quot;v5.0.5&quot;">​</a></h2><ul><li>Fix update notifications on Android O</li><li>Fix crash when trying to install Magisk Manager update</li><li>Update translations</li></ul><h2 id="v5-0-4" tabindex="-1">v5.0.4 <a class="header-anchor" href="#v5-0-4" aria-label="Permalink to &quot;v5.0.4&quot;">​</a></h2><ul><li>Fix bug in su timeout</li></ul><h2 id="v5-0-3" tabindex="-1">v5.0.3 <a class="header-anchor" href="#v5-0-3" aria-label="Permalink to &quot;v5.0.3&quot;">​</a></h2><ul><li>Fix FC on boot on Android O</li><li>Adapt to Android O broadcast limitations: re-authenticate app when update is disabled on Android O</li></ul><h2 id="v5-0-2" tabindex="-1">v5.0.2 <a class="header-anchor" href="#v5-0-2" aria-label="Permalink to &quot;v5.0.2&quot;">​</a></h2><ul><li>Rewrite zip signing part, zips downloaded from repo will be properly signed and adjusted for custom recoveries</li></ul><h2 id="v5-0-1" tabindex="-1">v5.0.1 <a class="header-anchor" href="#v5-0-1" aria-label="Permalink to &quot;v5.0.1&quot;">​</a></h2><ul><li>Add namespace mode options</li><li>Fix a bug in Manager OTA system</li></ul><h2 id="v5-0-0" tabindex="-1">v5.0.0 <a class="header-anchor" href="#v5-0-0" aria-label="Permalink to &quot;v5.0.0&quot;">​</a></h2><ul><li>Support the new Magisk unified binary</li><li>Properly handle application install / uninstall root management issues</li><li>Add multiuser mode support</li><li>Add application upgrade re-authentication feature</li><li>Add basic integrity check for SafetyNet</li><li>Merged install fragment and status fragment into Magisk fragment</li><li>Fix theme switching glitch</li><li>Update translations</li></ul><h2 id="v4-3-3" tabindex="-1">v4.3.3 <a class="header-anchor" href="#v4-3-3" aria-label="Permalink to &quot;v4.3.3&quot;">​</a></h2><ul><li>Re-build APK with stable build tools</li></ul><h2 id="v4-3-2" tabindex="-1">v4.3.2 <a class="header-anchor" href="#v4-3-2" aria-label="Permalink to &quot;v4.3.2&quot;">​</a></h2><ul><li>Improve usage of Github API to support unlimited amount of online repos</li><li>Update translations (thanks to all contributors!!)</li></ul><h2 id="v4-3-1" tabindex="-1">v4.3.1 <a class="header-anchor" href="#v4-3-1" aria-label="Permalink to &quot;v4.3.1&quot;">​</a></h2><ul><li>Update proper Magisk busybox detection, will not be confused by busybox installed by default in custom roms</li></ul><h2 id="v4-3-0" tabindex="-1">v4.3.0 <a class="header-anchor" href="#v4-3-0" aria-label="Permalink to &quot;v4.3.0&quot;">​</a></h2><ul><li>Add Core Only Mode option</li><li>Fix crashes when selecting release note on Samsung devices</li><li>Hide modules using template lower than version 3</li></ul><h2 id="v4-2-7" tabindex="-1">v4.2.7 <a class="header-anchor" href="#v4-2-7" aria-label="Permalink to &quot;v4.2.7&quot;">​</a></h2><ul><li>Update translations</li><li>Update uninstall scripts</li></ul><h2 id="v4-2-6" tabindex="-1">v4.2.6 <a class="header-anchor" href="#v4-2-6" aria-label="Permalink to &quot;v4.2.6&quot;">​</a></h2><ul><li>Samsung crashes finally fixed (confirmed!)</li><li>Add settings to disable update notifications</li><li>Adjust Dark theme colors</li><li>Refined download section, now support download only when root is not detected</li><li>Fix crashes in boot image selection</li></ul><h2 id="v4-2" tabindex="-1">v4.2 <a class="header-anchor" href="#v4-2" aria-label="Permalink to &quot;v4.2&quot;">​</a></h2><ul><li>Change Repo cache to database</li><li>Dark theme refined</li><li>Alert Dialog buttons now properly aligned</li><li>Support very large online modules&#39; zip processing</li><li>You can now download online modules without installing</li><li>Add notifications when new Magisk version is available</li><li>Removed changelog, donation link, support link in download cards</li><li>Read and display README.md for online modules</li></ul><h2 id="v4-1" tabindex="-1">v4.1 <a class="header-anchor" href="#v4-1" aria-label="Permalink to &quot;v4.1&quot;">​</a></h2><ul><li>Change MagiskHide startup</li><li>Reduce static data (= less memory leaks/issues)</li><li>Translation updates</li></ul><h2 id="v4-0" tabindex="-1">v4.0 <a class="header-anchor" href="#v4-0" aria-label="Permalink to &quot;v4.0&quot;">​</a></h2><ul><li>Whole new Superuser section for MagiskSU management!</li><li>Add Superuser tab in Logs section</li><li>Add lots of Superuser settings</li><li>Handle MagiskSU requests, logging, notifications</li><li>Controls MagiskHide initialization</li><li>Add disable button</li><li>Add uninstall button</li><li>Tons of improvements, not practical to list all 😃</li></ul><h2 id="v3-1" tabindex="-1">v3.1 <a class="header-anchor" href="#v3-1" aria-label="Permalink to &quot;v3.1&quot;">​</a></h2><ul><li>Fix online repo inaccessible issue</li><li>Fix repo list card expanding issues</li><li>Change SafetyNet check to manually triggered</li><li>Update translations</li><li>Tons of bug fixes preventing potential crashes</li></ul><h2 id="v3-0" tabindex="-1">v3.0 <a class="header-anchor" href="#v3-0" aria-label="Permalink to &quot;v3.0&quot;">​</a></h2><ul><li>Now on Play Store</li><li>Add Status Section, you can check Safety Net, root status, and Magisk status in one place</li><li>Add Install Section, you can manually choose the boot image location and advanced options</li></ul><h2 id="v2-5" tabindex="-1">v2.5 <a class="header-anchor" href="#v2-5" aria-label="Permalink to &quot;v2.5&quot;">​</a></h2><ul><li>Add Magisk Hide section, you can now add/remove apps from Magisk Hide list</li><li>Support custom Magisk Version names, any string is now accepted (for custom builds)</li><li>Fixed modules and repos not sorted by name</li></ul><h2 id="v2-1" tabindex="-1">v2.1 <a class="header-anchor" href="#v2-1" aria-label="Permalink to &quot;v2.1&quot;">​</a></h2><ul><li>Add Magisk Hide settings</li><li>Add search bar in &quot;Downloads Sections&quot;</li><li>Fix crashes when no root is available</li><li>Fix trash can icon not updated when removing module</li><li>Prevent crash when Magisk Version is set incorrectly</li></ul><h2 id="v2-0" tabindex="-1">v2.0 <a class="header-anchor" href="#v2-0" aria-label="Permalink to &quot;v2.0&quot;">​</a></h2><ul><li>Massive refactor</li><li>Material Design</li><li>Module Management</li><li>Download Section</li><li>And much more....</li></ul><h2 id="v1-0" tabindex="-1">v1.0 <a class="header-anchor" href="#v1-0" aria-label="Permalink to &quot;v1.0&quot;">​</a></h2><ul><li>初始版本</li></ul><h2 id="参考链接" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接" aria-label="Permalink to &quot;参考链接&quot;">​</a></h2><ul><li><a href="https://topjohnwu.github.io/Magisk/app_changes.html" target="_blank" rel="noreferrer">Magisk Manager Changelog</a>（官方）</li></ul>',139),n=[o];function r(s,d,h,u,c,v){return i(),a("div",null,n)}const m=e(t,[["render",r]]);export{g as __pageData,m as default};
