# Windows XP as a web page

A near-pixelperfect recreation of Windows XP's look and feel in the browser with a working filesystem. 

[See the latest version here.](https://spacenet.casperlindschouw.com/)

## Status

A ton of stuff is missing, which should be obvious if you check out the live version. 
The code is also a bit messy at the moment as I'm experimenting and seeing what sticks.

## Plans

I have a lot of plans, most of which will never see the light of day. I will however consider this project complete enough once the following are done:

* Recreate standard reuseable widgets (toolbars, menubar, input fields, etc)
* Start Menu
* Boot sequence / loading screen
* Replace most ripped images with CSS styling
* Migrate to CSS modules or similar
* Basic working filesystem
* Have a few apps fully* working
    * Notepad
    * File Explorer
    * Paint
    * Minesweeper or Solitaire
* Fallback to similar fonts on other platforms
* Customize the cursor

<sub><sup>* mostly anyway</sup></sub>

## But why..?

I love React, but I have done no projects that prove that. Windows XP also has a special place in my heart, so in a nostalgia-induced rush I decided to start this project.

## Technology
* React + TypeScript <3
* [React-Contexify](https://github.com/fkhadra/react-contexify) for dropdowns and context menus
* [React-Autosuggest](https://github.com/moroshko/react-autosuggest) for the navigation bar
* [BrowserFS](https://github.com/jvilk/BrowserFS) for the filesystem
* A bunch more

### Tools

* Windows XP VM
* Resource Hacker / ResBuild / MSStyles Converter
* ImageMagick
* Gimp
* Magnifixer

## License
MIT - Do whatever your want

Copyright of all image assets belong to Microsoft. I will remove them upon request, but I'm hoping they will turn a blind eye. The plan is to replace everything feasible with CSS styling or original recreations. 