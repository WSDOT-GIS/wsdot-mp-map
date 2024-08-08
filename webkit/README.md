# This folder contains files for testing with Webkit on Windows

## Download files

Follow the steps outlined in the [WebKit documentation][WebKit Windows Port].

> 1. Go to [WinCairo-64-bit-Release-Build Buildbot builder page].
> 2. Click any "Build #" which is green.
> 3. Click the "Archive" link under "compile-webkit" to download the zip
> 4. Download the corresponding release of [WebKitRequirements].
>    \[You can tell which release you need by examining the `WebKitRequirementsWin64.zip.config` contained in the zip file you downloaded in step 1.\]
> 5. Unpack them, copy all DLL of WebKitRequirements to the directory of MiniBrowser.exe
> 6. Install the latest [vc_redist.x64.exe] of Microsoft Visual C++ Redistributable for Visual Studio

## TODO

- [ ] Create a script that performs the above steps.

## Sources

- [WebKit Windows Port]
- [Running the Latest Safari WebKit on Windows]

[WebKit Windows Port]: https://docs.webkit.org/Ports/WindowsPort.html#downloading-build-artifacts-from-buildbot
[WinCairo-64-bit-Release-Build Buildbot builder page]: https://build.webkit.org/#/builders/731
[WebKitRequirements]: https://github.com/WebKitForWindows/WebKitRequirements/releases
[Running the Latest Safari WebKit on Windows]: https://dev.to/dustinbrett/running-the-latest-safari-webkit-on-windows-33pb#method-2-download-build-artifacts
[vc_redist.x64.exe]: https://docs.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist
