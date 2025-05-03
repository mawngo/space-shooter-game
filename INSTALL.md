# Installation Guide

Go to the [Releases](https://github.com/mawngo/space-shooter-game/releases/latest) page and download the
`asteroids-release.zip` file. Then extract it to any folder you like.

The archive contains multiple executables of the game for multiple platforms. You only need the `resources.neu` file and
the executable of your flatform, for example `asteroids-windows.exe` for Windows Other executables can be removed.

The `executable` and `resources.neu` file must be in the same folder. Run the executable to start the game.

## Fix blank screen on Windows

If you are on Windows, you might get a blank white screen. The reason for this is, accessing localhost from a UWP
context is disabled by default. Run the following command with administrative privileges on the command prompt to fix
this:

```sh
CheckNetIsolation.exe LoopbackExempt -a -n="Microsoft.Win32WebViewHost_cw5n1h2txyewy"
```
