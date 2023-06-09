# 8-bit_NUDGE

https://docs.google.com/document/d/1PWecan2NnyJX-DLQFXqD6JGEbpXJhRHP7dKZCKokdP0/edit

Trunk based development
---------------------------------------------------------------------
Always keep local "trunk" up to date.
Suppose we have a task called feature-101, create a local branch task/feature-101 for it.
Implement work.
Send the branch for review in a PR as soon as a small piece of functionality is ready. Cover missing work with a feature flag. This flag is open for test and closed for production environments.
Merge into the trunk. Allow the code on test to be tested with the flag open.
Remember to update your local trunk often as code is sent there frequently.

https://statusneo.com/trunk-based-development/



merging instead of rebasing
---------------------------------------------------------------------
Merge Pros
	Collaboration friendly, as we can see when and where the branches were merged. 
	Keeps original history intact, making dev timeline easier to understand. 

	Merge Cons
	Creates more complex histories. 
