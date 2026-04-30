---
title: "Goodnight, GitHub"
description: "After 2 months of instability, we're done."
pubDate: "2026-04-30"
author: "William Whittaker"
category: "News"
---

> This article is a bit personal, and under normal circumstances it'd be on my personal blog. However, since this affects the Hummingbird project, it's being posted here.

I've always tried to avoid *relying* on proprietary software. Sure, I'll use it; the convience is often worth it, especially for more social platforms. I've spent a lot of time and money trying to get to a place where I can benefit from the proprietary software I choose to use while still not relying on it. For example, Discord could disappear tommorow and it wouldn't affect me much - I've been bridging every server I consider personally important to Matrix for the last year and a half. I use whichever streaming service is cheapest to listen to new music, but when it comes down to playing the music I already own, the first choice is always Hummingbird.

There are two places, though, where I do rely on proprietary software and services: one of them being Steam (which is unavoidable, for better or worse), and the other being GitHub.

# GitHub
Words cannot begin to describe the impact that GitHub has had on software development. This platform has, over nearly two decades, become the center of the universe. The entire computing world is developed, tracked, built and packaged on GitHub. Millions of people wake up every day, do their work on GitHub, and then come home and build their passion projects on GitHub, before ending the day by watching movie on a platform that was developed on GitHub. GitHub killed Phabricator. GitHub killed SourceForge. GitHub killed Google Code.

Microsoft had, up until 8 months ago, essentially been completely hands off with GitHub as a company. This changed very publicly in August of last year, and it is nearly impossible to overstate how fast they've screwed it up.

# Reliability
I've never considered the lack of having an alternative to GitHub ready and raring to go a problem specifically because I've never actually owned a project large enough that multiple people were regularly working on it. Obviously, that's not the case any more.

The biggest part of that is pull requests. For those of you not familiar with SCM systems, a pull request is *the* most important feature for multi-developer work. Pull requests allow someone to make a copy of your repository, then make some changes to their copy, then submit them to the main repository to be integrated in to the file software. This isn't a perfect explanation, but it should get across how absolutely critical it is that pull requests always work.

Microsoft has broken pull requests. They broke them 3 days ago. At the time of writing, they're still broken. There's no indication of when they will be fixed. Microsoft first said this was a result of a targeted attack. They're now saying Elastisearch de-indexed a bunch of documents across every repo and now the pull request page (which relies entirely on Elastisearch and will not function without it) doesn't list all the pull requests reliably. On the 27th, it didn't list any at all. Yesterday morning, it still wasn't listing most of them. Now "99% of pull requests are available".

Of course, this is just the latest of a long string of reliability incidents across the platform. It's the worst one I've ever seen, and my GitHub account is 15 years old - but it's still "just the latest one".

Not a great look for the 3rd most valuable company's 2nd most important service.

# What's Next
I'm done. This one was the final straw. We're still going to have to use GitHub for our nightly and release builds (because nothing else supports macOS runners properly), but it just doesn't cut it any more for the actual work.

We've been talking about moving to something else for a while now. Likely it'll be self hosted. There are questions about how we're going to run test jobs still, but at this point staring down the barrel of CI issues isn't as scary as staring down the barrel of being frozen because there's no evidence anything actually exists.

# Costs

This isn't going to be particularly cheap. We're going to have to actually pay for CI minutes or a server to run the jobs on, which I'm only planning to do for Linux. We'll still test for macOS and Windows, and that will hopefully continue using GitHub actions for the time being - which means no testing on these platforms for PRs. It is what it is.

This is a great time to thank all my patrons on [Patreon](https://www.patreon.com/c/william341). In no particular order:

- Peter Hevesi
- Victor Tran
- Claire Sorrel
- Mikayla Maki
- Naomi Hikaru
- aloraxic

Obviously, any help is appreciated - no pressure.
