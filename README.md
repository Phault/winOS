# Windows XP as a web page

A near-pixelperfect recreation of Windows XP's look and feel in the browser with a working filesystem. 

[See the latest version here.](https://phault.dev/winxp/)

## Status

A ton of stuff is missing, which should be obvious if you check out the live version. 

The filesystem is served from the web server and changes are kept locally.

Current apps:
 * Notepad
    * Albeit not fully implemented
 * File Explorer
 * Minesweeper
 * Picture Viewer

## Plans

I have a lot of plans, most of which will never see the light of day. I will however consider this project complete enough once the following are done:

* Start Menu
* Basic working filesystem
    * Most importantly is watching files and directories for changes
    * Would like protected files too
* Have a few apps fully* working
    * Notepad
    * File Explorer
    * Video player (Probably Media Player Classic) 
* Fallback to similar fonts on other platforms
* Customize the cursor
* Blue Screen of Death for the errors that I haven't caught

<sub><sup>* mostly anyway</sup></sub>

## But why..?

I love React, but I have done no projects that prove that. Windows XP also has a special place in my heart, so in a nostalgia-induced rush I decided to start this project.

## Technology

* React + TypeScript <3
* [React-Contexify](https://github.com/fkhadra/react-contexify) for dropdowns and context menus
* [React-Autosuggest](https://github.com/moroshko/react-autosuggest) for the navigation bar
* [BrowserFS](https://github.com/jvilk/BrowserFS) for the filesystem
* [Styled Components](https://www.styled-components.com/) for styling
* A bunch more

### Tools

* Windows XP VM
* Resource Hacker / ResBuild / MSStyles Converter
* ImageMagick
* Gimp
* Magnifixer / KMag

## License

MIT - Do whatever you want

Copyright of all image assets belong to Microsoft. I will remove them upon request, but I'm hoping they will turn a blind eye. Everything feasible is replaced with CSS styling. 