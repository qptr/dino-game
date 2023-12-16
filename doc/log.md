# Log

## 9 Dec, 2023

- Repo
    - Commit PRD
    - Use projects for mgmt
        - add stories as issues
        - eg: https://github.com/orgs/nilenso/projects/1/views/1
        - eg2: https://github.com/orgs/nilenso/projects/13
    - Commit wireframes of project
    - Commit this todo also
- Check PRD after each story
- ADRs for any decisions, tech

## 16 Dec, 2023

Two interesting things.

First, I want to continuously scroll (right to left) two cacti at the same speed but with different delays between them every next scroll. (they should scroll once to the end of the screen on the left, then start again from the right, etc).

I tried this first:
```
scroll(cactus1)
randomDelay()
scroll(cactus2)
```
Here, scroll() is an infinite loop (using setInterval), so these three get called once, and the random delay is always the same between the cacti on each scroll. That's not what I want.

So I wanted to put these in an infinite loop, but with scroll() only scrolling once, right to left. But in JS, because scroll() uses setInterval, they get called one after the other constantly, flooding the call stack while the callbacks from setInterval() don't get to execute at all.

So I figured maybe in the infinite loop, we want to sit and wait for callbacks for when one scroll finishes. So say scroll() returns a promise, and in the loop we... call scroll() again? Like
```
scroll().then(scroll().then(...)).
```

Nm no sorry:
```
while(true) {
    addEventListener("clearInterval(cactus1)", function() {
        randomDelay();
        scroll(cactus1));
    }
    addEventListener("clearInterval(cactus2)", function() {
        randomDelay();
        scroll(cactus2));
    }
}
```
Couldn't figure how to listen for clearInterval, much less on a particular id. Seems a bit involved also.

Chatgpt suggested recursively calling scroll() with a random delay. I've implemented this now because it was a working solution, but scroll() is handling way more than simply scrolling the cactus, so I won't stick with this for long.

I guess that second last should be better, if I figure out how to get it done. Cursory glance, didn't seem hopeful.

---

The second thing is, in the chatgpt solution, inside scroll(), which uses setInterval, I assign the interval id to a variable (no var keyword) so I can clear it conditionally. When I call:
```
scroll(cactus1); scroll(cactus2);
```
cactus1 kept scrolling but cactus2 stopped as soon as cactus1 finished its first scroll.

Found out that declaring vars without any keyword gives them global scope. The issue was that cactus1 cleared cactus2's interval and moved on to call scroll() again. Creates a new interval id and this time since cactus2 isnt involved anymore, no one else is interfering with the var, so it keeps scrolling as expected while cactus2 is stuck 4eva <3

So I'm using strict mode now.

Also shoutout to chatgpt, even though.
