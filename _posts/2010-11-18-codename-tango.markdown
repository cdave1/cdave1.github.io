---
layout: post
title:  "Codename 'Tango': A WYSIWIG interface builder for OpenGL apps"
date:   2010-11-18 18:42:04
categories: tango opengl
---

Here’s a screenshot of a side project I’ve been working on. It’s a WYSIWIG interface editor for OpenGL apps (soon to include HTML 5 and WebGL), which I’ve codenamed “Tango”.

Tango is intended to be used for making HUDs and menus for games, although I guess it could be used for making other kinds of apps. I haven’t decided whether to completely open source it, or just keep it to myself.

![My helpful screenshot](http://davidpetrie.com/oldsite/index_files/Screen-shot-2010-11-19-at-10.12.41-AM-300x168.png)

That screenshot looked a lot better when I took it. I’m kind of embarrassed about how spartan Tango’s interface is! The interface being edited in the middle of the screenshot is for an up and coming iPad game.

Anyway, Tango currently allows you to do a very limited number of things, but it does them fairly well. You can quickly build up interfaces with a combination of buttons, labels, switches, and images. You just drag out the size of the interface element you want with your mouse. You can move/scale/rotate/stretch things. To use the interface in a game, you just load the interface file, assign button callbacks, and call the draw function in your render loop.

So Tango sounds good, right? Yeah, uhhm, not really. It’s still incredibly buggy. There are a number of half-baked features I need to either finish or remove before I release any code to the public. For example, the font system does not currently support Truetype fonts, despite the fact that I have a perfectly good font rendering library just sitting there. Instead, the font system uses an implementation of “FluidFonts”, a kind of fixed-size bitmapped font file format. You need to create these font files using a windows tool — very tedious. The animation system supports keyframes, bezier-paths, timing curves, alpha variance, and per-frame function callbacks, but there’s no interface for it, so all that functionality is unavailable.

Also, I’ve gone with Lua as the scripting language, but I don’t think Lua is the right approach. I’m debating chucking Lua out and replacing it with JavaScript in combination with some kind of V8 JIT compiler, but I’m not even sure if this is possible. JS will certainly make it easier to support HTML5.

Tango has no undo support either; instead it simply makes a hidden backup of the file when you save. This backup system is useful, because the program crashes, frequently.

Still, please contact me if you want to try out an ad hoc, informally-specified, bug-ridden, slow implementation of one-eighth of the first version of Flash. Be good to know if there is any interest for this sort of thing.
