#Unit 1 - Navigating the File System

- the command line is a text interface for a computer
- has great power
    - can run programs
    - write scripts to automate common tasks
    - combine simple commands to handle difficult tasks

###Basic Commands
- to access we use the terminal
    - the prompt of a terminal is the '$' or shell prompt
- ```ls``` is a command that lists all files and directories in the working directory
- parent/child/sibling are used to refer to directory relationships in a directory tree
    - directory names are represented plainly
    - file names have extensions
- ```pwd``` is a command that stands for 'print working directory'
- ```cd``` is a command that changes your current directory
```
$ pwd
/home/ccuser/workspace/blog
$ ls
2014 2015 hardware.text
$ cd 2015
$ pwd
/home/ccuser/workspace/blog/2015
```
- the ```cd``` command takes a directory name as an argument
    - the above example passes the directory '2015' as an argument to ```cd```
    - can only move linearly through parent/relationships
```
$ cd jan/memory/
$ pwd
/home/ccuser/workspace/blog/ 2015/jan/memory
$ cd ..
$ pwd
/home/ccuser/workspace/blog/ 2015/jan
```
- can use cd with an explicit path to move beyond immediate directories
- the ```..``` after a ```cd``` command navigates up one level in the tree
    - ```cd ../..``` moves up two levels
- ```mkdir``` is a command for 'make directory'
    - it takes the name of the new directory as an argument
    - creates new directory in the current working directory
```
$ cd 2015/feb
$ pwd
/home/ccuser/workspace/blog/2015/feb
$ mkdir media
$ ls
circuit-board.txt input-output.txt media power-supply.txt
```
- ```touch``` is a command that creates a new file in the current working directory
    - it takes one argument as the name of the new file including extension for type
```
$ cd 2014/dec
$ ls
monitor.txt mouse.txt
$ touch keyboard.txt
$ ls
keyboard.txt monitor.txt mouse.txt
```

#Unit 2 - Viewing and Changing the File System

- Options
    - while ```ls``` lists all files and directories adding ```-a``` as an option modifies its behavior
        - ```ls -a``` also lists all files and directories that start with a dot (.)
    - ```-a``` lists all contents, including hidden files and directories
    - ```-l``` lists all contents in long format
    - ```-t``` order files and directories by the time they were last modified
- long format
    - displays each file with 7 columns of data
        - 1. Access rights - permitted actions (more later..)
        - 2. Number of hard links - Number of child directories and files
            - includes parent directory link (..) and current directory link (.)
        - 3. Username of the file's owner
        - 4. Name of the group that owns the file
        - 5. Size of the file in bytes
        - 6. Date & time that the file was last modified
        - 7. Name of the file or directory
```
$ ls -l
drwxr-xr-x 5  cc  eng  4096 Jun 24 16:51  action
drwxr-xr-x 4  cc  eng  4096 Jun 24 16:51  comedy
drwxr-xr-x 6  cc  eng  4096 Jun 24 16:51  drama
-rw-r--r-- 1  cc  eng     0 Jun 24 16:51  genres.txt
```
- options can be combined
    - ```$ ls -alt``` lists all files, including hidden files and directories, in long format, sorted by time

###Playing With Files
- The ```cp``` command copies files or directories
```
$ cp biopic/cleopatra.txt historical/
```
- The first argument after ```cp``` is the source file
    - the last argument is the destination
        - the above command copies the file cleopatra.txt and places it in historical/
- to copy multiple files pass them to cp with a destination directory tagged to the end
```
$ cp biopic/ray.txt biopic/notorious.txt historical/
```
- instead of passing a filename as an argument to be copied we can use special characters
    - ```*``` is a wildcard that selects all files in a working directory
```
$ cp m*.txt scifi/
```
- selects all '.txt' files in the working directory starting with 'm' and copies them to scifi/
- The ```mv``` command moves files using the same syntax as the ```cp``` command
    - can also be used to rename a file
```
$ mv rambo.txt first-blood.txt
```
- The ```rm``` command deletes or 'removes' the files or directories passed as arguments
    - adding the ```-r``` option modifies the rm command to 'remove' 'recursively'
        - deletes a directory and all of its child directories
```
$ rm -r two-and-a-half-men
```
- no undelete so watch out!
