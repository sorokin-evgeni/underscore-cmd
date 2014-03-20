## Compiling underscore templates from command line
### About
This module allow you to compile underscore templates from command line. It search for *.us files compile it as underscore templates and save into javascript file. I wrote this module to use in Make script.
### Usage
```
underscore-cmd [target] [-options] [--file=<path>] [--sep=<char>]
```

*target* is root dir where template files will be searched.
*options* boolean options. It contain:
* f - If flag passed template name will be represented as path to file which contain template sourse. Otherwise template name will be equal to file name without extension

*file* output file path
*sep* use only if -f flag passed. Directory separator will be replaced to the --sep.

### Examples
Suppose we have given filesystem:

templates/
  modules/
    users.us
  index.us

```
userscore-cmd ./templates -f --file=tpl.js --sep=.
```
This command will create the file tpl.js where where will be compiled templates in "templates" variable. Relative path to *.us file with replaced slashes to "." and without extension will used as index of template in templates variable.