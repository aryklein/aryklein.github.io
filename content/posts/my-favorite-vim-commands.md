---
title: "My Favorite Vim Commands"
date: 2020-10-24T16:51:08-03:00
draft: false
---

I've been using Vim for long time, almost since I started using Linux, but I had never taken the time to
learn good commands to make my life easier.

A few days ago I found a guy on YouTube [ThePrimeagen](https://www.youtube.com/channel/UC8ENHE5xdFSwx71u3fDH5Xw)
that explains some Vim movements and I was struck by how fast this guy was on Vim, so I decided to learn
more about it. I have to clarify that I'm far from being fast like this guy, but I'm getting better ;-) 

Here are some of the commands that seem most useful to me and I hope they help you as they help me. Please
comment below or create a PR in my Github repository if you have any other command to recommend me.

## Cursor movement

`l` ➜ left.

`k` ➜ up.

`j` ➜ down.

`h` ➜ left.

`w` ➜ jump by start of words.

`b` ➜ jump backward by words.

`^` ➜ go to the first non-whitespace character in the line.

`0` ➜ move the cursor to the beginning of the line.

`$` ➜ move to the end of the line.

`{` ➜ move one paragraph above.

`}` ➜ move one parafraph below.

`gg` ➜ jump to the beginning of the file.

`G` ➜ jump to the end of the file.

`:{absolut_line_number}` ➜ jump to a specific line number. For example `:16`.

`{numer_of_lines}{k|j}` ➜ move up/down number of lines from the current cursor possition. e.g. `10j` jump
jump 10 lines below from the current cursor possition.

`{numer_of_columns}{h|l}` ➜ move left/right number of columns from the current cursor possition.

*Note: for the commands that use line numbers, consider to enable relative line number*: `:set nu rnu`.

`f{char}` ➜  find first occurence of `{char}` on a line (to the right). Cursor is placed on `{char}`
inclusive.

`F{char}` ➜ same as the command above but to the left.

`/{pattern}` ➜ search for `{pattern}`. `n` jumps to the next occurrence, `N` to the previous one.

`*` ➜ immediately go to the next occurrence.

`#` ➜ immediately go to the previous occurrence.

`%` ➜ Find the next item in this line after or under the cursor and jump to its match. Items can be found in the help `:help %`

### Open a file and let the curson on a desired line

Sometimes it's useful open a file in a specific line. It usually happens to me when I have an error in a file
and the program specifies the line where the error is.

`$ vim +n {file_name}` ➜ open `file_name` and with the curson in the line `n`. e.g:
`$ vim +43 hello_world.py`.

## Insert mode - inserting/appending text

`i` ➜ start insert mode at cursor.

`I` ➜ insert at the beginning of the line.

`a` ➜ append after the cursor.

`A` ➜ append at the end of the line.

`o` ➜ open (append) blank line below current line (no need to press return).

`O` ➜ open blank line above current line.

`Esc` ➜ exit insert mode.

## Editing

`r` ➜ replace a single character (does not use insert mode).

`cw` ➜ delete and insert mode (replace) from the cursor position to the end of word.

`c$` ➜ delete and insert mode (replace) from the cursor position to the end of line.

`C` ➜ does the same as the previous command `c$`.

`D` ➜ only delete from the cursor position to the end of line.

`s` ➜ delete character at cursor position and change to insert mode.

`S` ➜ delete line at cursor and change to insert mode (same as `cc`).

`u` ➜ undo.

`.` ➜ repeat last command.

`gU` ➜ (visual) change to UPERCASE.

`gu` ➜ (visual) change to lowercase.

`ci" / ci'` ➜ change text inside the single or double quotes (the cursor can be in any position of the
line).

`ci{ / ci( / ci< / ci[` ➜ change text inside the speech marks (cursor must be inside the).

`J` ➜ joins the line the cursor is on with the line below.

## Splits

`:split / :sp` ➜ horizontal split.

`:vertical split / :vs` ➜ vertical split.

`:resize {+|-}{n}` ➜ resize horizontal split `n` lines.

`:vertical resize {+|-}{n}` ➜ resize vertical split `n` columns.

`<Ctrl+w> {l|h|k|l}` ➜ move between splits.

`<Ctrl+w> {H|J|K|L}` ➜ flip splits.

`<Ctrl+w> _` ➜ minimize horizontal split.

`<Ctrl+w> |` ➜ minimize vertical split.

`<Ctrl+w> =` ➜ reset the size of all split.

`:vertical terminal` ➜ vertical split and open a terminal (in Vim).

`:vsplit | :terminal` ➜ vertical split and open a terminal (in NeoVim).

`:terminal` ➜ horizontal split and open a terminal (in Vim).

`:split | :terminal` ➜ horizontal split and open a terminal (in NeoVim)

`<Ctrl+w> N` ➜ exit insert mode in a terminal (in Vim).

`<Ctrl+\><Ctrl+n>` ➜ exit insert mode in a terminal (in NeoVim).

## Tabs

`:tabe {file}` ➜ open `{file}` in a new tab.

`gt` ➜ move forward to the next tab.

`gT` ➜ go to the previous tab.

## Managing buffers

Buffers are a convenient way to manage multiple files within a project in Vim

`:ls` ➜ list the current buffers.

`:b <number>` ➜ show the buffer with the given number.

`:bd` ➜ delete the current unchaged/saved buffer.

`:bd!` ➜ discard changes and delete the current buffer.

## Extras

`ZZ` ➜ save and exit ;-)

`{from_line}{to_line}s/{pattern}/{replace}` ➜ substitution with regex. My favorite one. For example:
`3,10s/foo/bar/` will replace `foo` by `bar` from line 3 to 10. `6,$s/foo/bar/` replaces from line 6
to the end of the file.


# Conclusion

Vim is my favorite text editor for the following reasons:

- Is available on most, if not all Linux distributions out there.
- Well documented.
- It is very customizable and extensible.
- Uses less amount of system resources than some well know graphical text editors

Some of these commands take time to get used to but if you can learn to use them, the speed and efficiency
you achieve with Vim is incredible.

<br><hr>
<p style="text-align:center"><br><small>Did you find any errors? Please send me a <a class="reference external"
href="https://github.com/aryklein/aryklein.github.io/edit/src/content/posts/my-favorite-vim-commands.md">
pull request</a>. The code of this article is available on Github <i class="nf nf-fa-github"></i>.</small></p>

