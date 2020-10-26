.. title: My favorite Vim commands
.. slug: my-favorite-vim-commands
.. date: 2020-10-24 21:24:28 UTC-03:00
.. tags: Vim
.. category: 
.. link: 
.. description: Useful Vim commands
.. type: text

I've been using Vim for long time, almost since I started using Linux, but I had never taken the time to
learn good commands to make my life easier.

A few days ago I found a guy on YouTube `ThePrimeagen
<https://www.youtube.com/channel/UC8ENHE5xdFSwx71u3fDH5Xw>`_ that explains some Vim movements and I was
struck by how fast this guy was on Vim, so I decided to learn more about it. I have to clarify that I'm far
from being fast like this guy, but I'm getting better ;-) 

Here are some of the commands that seem most useful to me and I hope they help you as they help me. Please
comment below or create a PR in my Github repository if you have any other command to recommend me.

.. TEASER_END

Cursor movement
---------------

``l`` ➜ left.

``k`` ➜ up.

``j`` ➜ down.

``h`` ➜ left.

``w`` ➜ jump by start of words.

``b`` ➜ jump backward by words.

``^`` ➜ go to the first non-whitespace character in the line.

``0`` ➜ move the cursor to the beginning of the line.

``$`` ➜ move to the end of the line.

``{`` ➜ move one paragraph above.

``}`` ➜ move one parafraph below.

``gg`` ➜ jump to the beginning of the file.

``G`` ➜ jump to the end of the file.

``:{absolut_line_number}`` ➜ jump to a specific line number. For example ``:16``.

``{numer_of_lines}{k|j}`` ➜ move up/down number of lines from the current cursor possition. e.g. ``10j`` jump
jump 10 lines below from the current cursor possition.

``{numer_of_columns}{h|l}`` ➜ move left/right number of columns from the current cursor possition.

*Note: for the commands that use line numbers, consider to enable relative line number*: ``:set nu rnu``.

``f{char}`` ➜  find first occurence of ``{char}`` on a line (to the right). Cursor is placed on ``{char}``
inclusive.

``F{char}`` ➜ same as the command above but to the left.

``/{pattern}`` ➜ search for ``{pattern}``. ``n`` jumps to the next occurrence, ``N`` to the previous one.

``*`` ➜ immediately go to the next occurrence.

``#`` ➜ immediately go to the previous occurrence.

Open a file and let the curson on a desired line
==================================================

Sometimes it's useful open a file in a specific line. It usually happens to me when I have an error in a file
and the program specifies the line where the error is.

``$ vim +n {file_name}`` ➜ open ``file_name`` and with the curson in the line ``n``. e.g:
``$ vim +43 hello_world.py``.

Insert mode - inserting/appending text
--------------------------------------

``i`` ➜ start insert mode at cursor.

``I`` ➜ insert at the beginning of the line.

``a`` ➜ append after the cursor.

``A`` ➜ append at the end of the line.

``o`` ➜ open (append) blank line below current line (no need to press return).

``O`` ➜ open blank line above current line.

``Esc`` ➜ exit insert mode.

Editing
-------

``r`` ➜ replace a single character (does not use insert mode).

``cw`` ➜ change (replace) to the end of word.

``c$`` ➜ change (replace) to the end of line.

``s`` ➜ delete character at cursor and subsitute text.

``S`` ➜ delete line at cursor and substitute text (same as cc).

``u`` ➜ undo.

``.`` ➜ repeat last command.

``gU`` ➜ (visual) chage to UPERCASE.

``gu`` ➜ (visual) change to lowercase.

``ci" / ci'`` ➜ change text inside the single or double quotes (the cursor can be in any position of the
line).

``ci{ / ci( / ci< / ci[`` ➜ change text inside the speech marks (cursor must be inside the).

Splits
------

``:split / :sp`` ➜ horizontal split.

``:vertical split / :vs`` ➜ vertical split.

``:resize {+|-}{n}`` ➜ resize horizontal split ``n`` lines.

``:vertical resize {+|-}{n}`` ➜ resize vertical split ``n`` columns.

``<Ctrl+w> {l|h|k|l}`` ➜ move between splits.

``<Ctrl+w> {H|J|K|L}`` ➜ flip splits.

``<Ctrl+w> _`` ➜ minimize horizontal split.

``<Ctrl+w> |`` ➜ minimize vertical split.

``<Ctrl+w> =`` ➜ reset the size of all split.

``:vertical terminal`` ➜ vertical split and open a terminal.

``:terminal`` ➜ horizontal split and open a terminal.

``<Ctrl+w> N`` ➜ exit insert mode in a terminal.


Tabs
----

``:tabe {file}`` ➜ open ``{file}`` in a new tab.

``gt`` ➜ move forward to the next tab.

``gT`` ➜ go to the previous tab.


Extras
------

``ZZ`` ➜ save and exit ;-)

``{from_line}{to_line}s/{pattern}/{replace}`` ➜ substitution with regex. My favorite one. For example:
``3,10s/foo/bar/`` will replace ``foo`` by ``bar`` from line 3 to 10. ``6,$s/foo/bar/`` replaces from line 6
to the end of the file.


Conclusion
----------

Vim is my favorite text editor for the following reasons:

- Is available on most, if not all Linux distributions out there.
- Well documented.
- It is very customizable and extensible.
- Uses less amount of system resources than some well know graphical text editors

Some of these commands take time to get used to but if you can learn to use them, the speed and efficiency
you achieve with Vim is incredible.


.. raw:: html

 <p style="text-align:center"><br><small>Did you find any errors? Please send me a <a class="reference external"
  href="https://github.com/aryklein/aryklein.github.io/edit/src/posts/my-favorite-vim-commands.rst"> pull
  request</a>. The code of this article is available on Github.</small></p>

