# Testing JavaScript Applications by Lucas da Costa

## Part 1. Testing JavaScript Applications

### 1. An introduction to automated testing
### 2. What do test and when?

## Part 2. Writing Tests

### 3. Testing techniques
### 4. Testing backend applications
### 5. Advanced backend testing techniques
### 6. Testing frontend applications
### 7. The React testing ecosystem
### 8. Testing React applications
### 9. Test-driven development
### 10. UI-based end-to-end testing
### 11. Writing UI-based end-to-end tests

## Part 3. Business Impact

### 12. Continuous integration and continous delivery
### 13. A culture of quality

---
---

# 1. An introduction to automated testing

## What is an automated test ?

Uncle Louis didn’t stand a chance in New York, but in London, he’s wellknown for his vanilla cheesecakes. Because of his outstanding popularity, it didn’t take long for him to notice that running a bakery on pen and paper doesn’t scale. To keep up with the booming orders, he decided to hire the best programmer he knows to build his online store: you.

His requirements are simple: customers must be able to order items from the bakery, enter the delivery address, and check out online. Once you implement these features, you decide to make sure the store works appropriately. You create the databases, seed them, spin up the server, and access the website on your machine to try ordering a few cakes. During this process, suppose you find a bug. You notice, for example, that you can have only one unit of an item in your cart at a time.

For Louis, it would be disastrous if the website went live with such a defect. Everyone knows that it’s impossible to eat a single macaroon at a time, and therefore, no macaroons—one of Louis’s specialties—would sell. To avoid that happening again, you decide that adding multiple units of an item is a use case that always needs to be tested.

You could decide to manually inspect every release, like old assembly lines used to do. But that’s an unscalable approach. It takes too long, and, as in any manual process, it’s also easy to make mistakes. To solve this problem, you must replace yourself, the customer, with code.

Let’s think about how a user tells your program to add something to the cart. This exercise is useful to identify which parts of the action flow need to be replaced by automated tests.

Users interact with your application through a website, which sends an HTTP request to the backend. This request informs the addToCart function which item and how many units they want to add to their cart. The customer’s cart is identified by looking at the sender’s session. Once the items were added to the cart, the website updates according to the server’s response. This process is shown in figure 1.1.

![Figure](ScreenshotsForNotes/Chapter1/Figure_1_1.PNG)

Let’s replace the customer with a piece of software that can call the addToCartFunction. Now, you don’t depend on someone to manually add items to a cart and look at the response. Instead, you have a piece of code that does the verification for you. That’s an automated test.

> ***AUTOMATED TEST:*** Automated tests are programs that automate the task of testing your software. They interface with your application to perform actions and compare the actual result with the expected output you have previously defined.

Your testing code creates a cart and tells addToCart to add items to it. Once it gets a response, it checks whether the requested items are there, as shown in figure 1.2.

![Figure](ScreenshotsForNotes/Chapter1/Figure_1_2.PNG)

Within your test, you can simulate the exact scenario in which users would be able to add only a single macaroon to their cart:

1. Create an instance of a cart.

2. Call addToCart and tell it to add a macaroon to that cart.

3. Check whether the cart contains two macaroons.

By making your test reproduce the steps that would cause the bug to happen, you can prove that this specific bug doesn’t happen anymore.

The next test we will write is to guarantee that it’s possible to add multiple macaroons to the cart. This test creates its own instance of a cart and uses the addToCart function to try adding two macaroons to it. After calling the addToCart function, your test checks the contents of the cart. If the cart’s contents match your expectations, it tells you that everything worked properly. We’re now sure it’s possible to add two macaroons to the cart, as shown in figure 1.3.

![Figure](ScreenshotsForNotes/Chapter1/Figure_1_3.PNG)

Now that customers can have as many macaroons as they want—as it should be—let’s say you try to simulate a purchase your customer would make: 10,000 macaroons. Surprisingly, the order goes through, but Uncle Louis doesn’t have that many macaroons in stock. As his bakery is still a small business, he also can’t fulfill humongous orders like this on such short notice. To make sure that Louis can deliver flawless desserts to everyone on time, he asks you to make sure that customers can order only what’s in stock.

To identify which parts of the action flow need to be replaced by automated tests, let’s define what should happen when customers add items to their carts and adapt our application correspondingly.

When customers click the “Add to Cart” button on the website, as shown in figure 1.4, the client should send an HTTP request to the server telling it to add 10,000 macaroons to the cart. Before adding them to the cart, the server must consult a database to check if there are enough in stock. If the amount in stock is smaller or equal to the quantity requested, the macaroons will be added to the cart, and the server will send a response to the client, which updates accordingly.

> *NOTE* You should use a separate testing database for your tests. Do not pollute your production database with testing data. Tests will add and manipulate all kinds of data, which can lead to data being lost or to the database being in an inconsistent state. Using a separate database also makes it easier to determine a bug’s root cause. Because you are fully in control of the test database’s state, customers’ actions won’t interfere with your tests’ results.

![Figure](ScreenshotsForNotes/Chapter1/Figure_1_4.PNG)

This bug is even more critical, so you need to be twice as careful. To be more confident about your test, you can write it before actually fixing the bug, so that you can see if it fails as it should.

***The only useful kind of test is a test that will fail when your application doesn’t work.***

This test is just like the one from earlier: it replaces the user with a piece of software and simulates its actions. The difference is that, in this case, you need to add one extra step to remove all macaroons from the inventory. The test must set up the scenario and simulate the actions that would cause the bug to happen; see figure 1.5.

Once the test is in place, it’s also much quicker to fix the bug. Every time you make a change, your test will tell you whether the bug is gone. You don’t need to manually log in to the database, remove all macaroons, open the website, and try to add them to your cart. The test can do it for you much quicker.

Because you have also written a test to check whether customers can add multiple items to the cart, if your fix causes the other bug to reappear, that test will warn you. Tests provide quick feedback and make you more confident that your software works.

![Figure](ScreenshotsForNotes/Chapter1/Figure_1_5.PNG)

I must warn you, however, that automated tests are not the panacea for producing software that works. Tests can’t prove your software works; they can only prove it doesn’t. If adding 10,001 macaroons to the cart still caused their availability to be ignored, you wouldn’t know unless you tested this specific input.

Tests are like experiments. You encode our expectations about how the software works into your tests, and because they passed in the past, you choose to believe your application will behave the same way in the future, even though that’s not always true. The more tests you have, and the closer these tests resemble what real users do, the more guarantees they give you.

Automated tests also don’t eliminate the need for manual testing. Verifying your work as end users would do and investing time into exploratory testing are still indispensable. Because this book is targeted at software developers instead of QA analysts, in the context of this chapter, I’ll refer to the unnecessary manual testing process often done during development just as manual testing.

## Why automated tests matter

Tests matter because they give you quick and fail-proof feedback. In this chapter, we’ll look in detail at how swift and precise feedback improves the software development process by making the development workflow more uniform and predictable, making it easy to reproduce issues and document tests cases, easing the collaboration among different developers or teams, and shortening the time it takes to deliver high-quality software.

## Predictability

Having a predictable development process means preventing the introduction of unexpected behavior during the implementation of a feature or the fixing of a bug. Reducing the number of surprises during development also makes tasks easier to estimate and causes developers to revisit their work less often.

Manually ensuring that your entire software works as you expect is a timeconsuming and error-prone process. Tests improve this process because they decrease the time it takes to get feedback on the code you write and, therefore, make it quicker to fix mistakes. The smaller the distance between the act of writing code and receiving feedback, the more predictable development becomes.

To illustrate how tests can make development more predictable, let’s imagine that Louis has asked you for a new feature. He wants customers to be able to track the status of their orders. This feature would help him spend more time baking and less time answering the phone to reassure customers that their order will be on time. Louis is passionate about cheesecakes, not phone calls.

If you were to implement the tracking feature without automated tests, you’d have to run through the entire shopping process manually to see if it works, as shown in figure 1.6. Every time you need to test it again, besides restarting the server, you also need to clear your databases to make sure they are in a consistent state, open your browser, add items to the cart, schedule a delivery, go through checkout, and only then you’d finally test tracking your order.

![Figure](ScreenshotsForNotes/Chapter1/Figure_1_6.PNG)

Before you can even manually test this feature, it needs to be accessible on the website. You need to write its interface and a good chunk of the backend the client talks to.

Not having automated tests will cause you to write too much code before checking whether the feature works. If you have to go through a long and tedious process every time you make changes, you will write bigger chunks of code at a time. Because it takes so long to get feedback when you write bigger chunks of code, by the time you do receive it, it might be too late. You have written too much code before testing, and now there are more places for bugs to hide. Where, among the thousand new lines of code, is the bug you’ve just seen?

![Figure](ScreenshotsForNotes/Chapter1/Figure_1_7.PNG)

With an automated test like the ones in figure 1.7, you can write less code before getting feedback. When your automated tests can call the trackOrder function directly, you can avoid touching unnecessary parts of your application before you’re sure that trackOrder works.

When a test fails after you’ve written only 10 lines of code, you have only 10 lines of code to worry about. Even if the bug is not within those 10 lines, it becomes way easier to detect which one of them provoked misbehavior somewhere else.

The situation can get even worse if you break other parts of your application. If you introduce bugs into the checkout procedure, you need to check how your changes affected it. The more changes you’ve made, the harder it becomes to find where the problem is.

When you have automated tests like the ones in figure 1.8, they can alert you as soon as something breaks so that you can correct course more easily. If you run tests frequently, you will get precise feedback on what part of your application is broken as soon as you break it. ***Remember that the less time it takes to get feedback once you’ve written code, the more predictable your development process will be.***

![Figure](ScreenshotsForNotes/Chapter1/Figure_1_8.PNG)

Often I see developers having to throw work away because they’ve done too many changes at once. When those changes caused so many parts of the application to break, they didn’t know where to start. It was easier to start from scratch than to fix the mess they had already created. How many times have you done that?

## Reproducibility

The more steps a particular task has, the more likely a human is to make mistakes following them. Automated tests make it easier and quicker to reproduce bugs and ensure they aren’t present anymore.

For a customer to track the status of an order, they will have to go through multiple steps. They’d have to add items to their cart, pick a delivery date, and go through the checkout process. To test your application and ensure that it will work for customers, you must do the same. This process is reasonably long and error-prone, and you could approach each step in many different ways. With automated tests, we can ensure that these steps are followed to the letter.

Let’s assume that you find bugs when you test your application, like being able to check out with an empty cart or with an invalid credit card. For you to find those bugs, you had to go through a series of steps manually.

To avoid those bugs happening again, you must reproduce the exact same steps that cause each one of them. If the list of test cases grows too long or if there are too many steps, the room for human mistakes gets bigger. Unless you have a checklist that you follow to the letter every single time, bugs will slip in (see figure 1.9).

Ordering a cake is something you will certainly remember to check, but what about ordering –1 cakes, or even NaN cakes? People forget and make mistakes, and, therefore, software breaks. Humans should do things that humans are good at, and performing repetitive tasks is not one of them.

![Figure](ScreenshotsForNotes/Chapter1/Figure_1_9.PNG)

Even if you decide to maintain a checklist for those test cases, you will have the overhead of keeping that documentation always up-to-date. If you ever forget to update it and something not described in a test case happens, who’s wrong—the application or the documentation?

Automated tests do the exact same actions every time you execute them. When a machine is running tests, it neither forgets any steps nor makes mistakes.

## Collaboration

Everyone who tastes Louis’s banoffee pies knows he’s one Great British Bake Off away from stardom. If you do everything right on the software side, maybe one day he’ll open bakeries everywhere from San Franciso to Saint Petersburg. In that scenario, a single developer just won’t cut it.

If you hire other developers to work with you, all of a sudden, you start having new and different concerns. If you’re implementing a new discount system, and Alice is implementing a way to generate coupons, what do you do if your changes to the checkout procedure make it impossible for customers also to apply coupons to their orders? In other words, how can you ensure that your work is not going to interfere with hers and vice versa?

If Alice merges her feature into the codebase first, you have to ask her how you’re supposed to test her work to ensure yours didn’t break it. Merging your work will consume your time and Alice’s.

The effort you and Alice spent manually testing your changes will have to be repeated when integrating your work with hers. On top of that, there will be additional effort to test the integration between both changes, as illustrated by figure 1.10.

![Figure](ScreenshotsForNotes/Chapter1/Figure_1_10.PNG)

Besides time-consuming, this process is also error-prone. You have to remember all the steps and edge cases to test in both your work and Alice’s. And, even if you do remember, you still need to follow them exactly.

When a programmer adds automated tests for their features, everyone else benefits. If Alice’s work has tests, you don’t need to ask her how to test her changes. When the time comes for you to merge both pieces of work, you can simply run the existing automated tests instead of going through the whole manual testing process again.

Even if your changes build on top of hers, tests will serve as up-to-date documentation to guide further work. Well-written tests are the best documentation a developer can have. Because they need to pass, they will always be up-to-date. If you are going to write technical documentation anyway, why not write a test instead?

If your code integrates with Alice’s, you will also add more automated tests that cover the integration between your work and hers. These new tests will be used by the next developers when implementing correlated features and, therefore, save them time. Writing tests whenever you make changes creates a virtuous collaboration cycle where one developer helps those who will touch that part of the codebase next (see figure 1.11).

This approach reduces communication overhead but does not eliminate the need for communication, which is the foundation stone for every project to succeed. Automated tests remarkably improve the collaboration process, but they become even more effective when paired with other practices, such as code reviews.

![Figure](ScreenshotsForNotes/Chapter1/Figure_1_11.PNG)

One of the most challenging tasks in software engineering is to make multiple developers collaborate efficiently, and tests are one of the most useful tools for that.

## Speed

Louis doesn’t care about which language you use and much less about how many tests you have written. Louis wants to sell pastries, cakes, and whatever other sugary marvels he can produce. Louis cares about revenue. If more features make customers happier and generate more revenue, then he wants you to deliver those features as fast as possible. There’s only one caveat: they must work.

For the business, it’s speed and correctness that matters, not tests. In all the previous sections, we talked about how tests improved the development process by making it more predictable, reproducible, and collaborative, but, ultimately, those are benefits only because they help us produce better software in less time.

When it takes less time for you to produce code, prove that it doesn’t have specific bugs, and integrate it with everyone else’s work, the business succeeds. When you prevent regressions, the business succeeds. When you make deployments safer, the business succeeds.

Because it takes time to write tests, they do have a cost. But we insist on writing tests because the benefits vastly outweigh the drawbacks.

Initially, writing a test can be time-consuming, too, even more than doing a manual test, but the more you run it, the more value you extract from it. If it takes you one minute to do a manual test and you spend five minutes writing one that’s automated, as soon as it runs for the fifth time it will have paid for itself—and trust me, that test is going to run way more than five times.

In contrast to manual testing, which will always take the same amount of time or more, automating a test causes the time and effort it takes to run it to drop to almost zero. As time passes, the total effort involved in manual tests grows much quicker. This difference in effort between writing automated tests and performing manual testing is illustrated in figure 1.12.

![Figure](ScreenshotsForNotes/Chapter1/Figure_1_12.PNG)

Writing tests is like buying stocks. You may pay a big price up-front, but you will continue to reap the dividends for a long time. As in finance, the kind of investment you will make—and whether you will make it—depends on when you need the money back. Long-term projects are the ones that benefit the most from tests. The longer the project runs, the more effort is saved, and the more you can invest in new features or other meaningful activities. Short-term projects, like the ones you make in pizza-fueled hackathons, for example, don’t benefit much. They don’t live long enough to justify the effort you will save with testing over time.

The last time Louis asked you if you could deliver features faster if you were not writing so many tests, you didn’t use the financial analogy, though. You told him that this would be like increasing an oven’s temperature for a cake to be ready sooner. The edges get burned, but the middle is still raw.

## Summary

* Automated tests are programs that automate the task of testing your software. These tests will interact with your application and compare its actual output to the expected output. They will pass when the output is correct and provide you with meaningful feedback when it isn’t.

* Tests that never fail are useless. The goal of having tests is for them to fail when the application misbehaves no longer present.

* You can’t prove your software works. You can prove only it doesn’t. Tests show that particular bugs are no longer present—not that there are no bugs. An almost infinite number of possible inputs could be given to your application, and it’s not feasible to test all of them. Tests tend to cover bugs you’ve seen before or particular kinds of situations you want to ensure will work.

* Automated tests reduce the distance between the act of writing code and getting feedback. Therefore, they make your development process more structured and reduce the number of surprises. A predictable development process makes it easier to estimate tasks and allows developers to revisit their work less often.

* Automated tests always follow the exact same series of steps. They don’t forget or make mistakes. They ensure that test cases are followed thoroughly and make it easier to reproduce bugs.

* When tests are automated, rework and communication overhead decrease. On their own, developers can immediately verify other people’s work and ensure they haven’t broken other parts of the application.

* Well-written tests are the best documentation a developer can have. Because tests need to pass, they must always be up-to-date. They demonstrate the usage of an API and help others understand how the codebase works.

* Businesses don’t care about your tests. Businesses care about making a profit. Ultimately, automated tests are helpful because they drive up profits by helping developers deliver higher-quality software faster.

* When writing tests, you pay a big price up-front by investing extra time in creating them. However, you get value back in dividends. The more often a test runs, the more time it has saved you. Therefore, the longer the life cycle of a project, the more critical tests become

# 2. What do test and when?

## Introduction

It’s essential to understand how tests fit into different categories because different types of tests serve different purposes. When building a car, for example, it’s crucial to test the engine and the ignition system individually, but it’s also vital to ensure they work together. If not, both the engine and the ignition system are useless. It’s equally as important to test whether people can drive the car once all parts are in place, or else nobody will go anywhere.

When we build software, we want to have similar guarantees. We want to ensure our functions work in isolation as well as in integration. And, when we put all of these functions together in an application, we want to ensure customers can use it.

These different types of tests serve different purposes, run at different frequencies, and take different amounts of time to complete. Some are more suited to guide you through the development phase, whereas others can make it easier to test a feature only after it’s complete. Some tests interface directly with your code, and others interact with your application through a graphical interface, as an end user would do. It’s your job to decide which of these tests to use and when.

Learning about these different labels is helpful because they help you decide what your tests should and should not cover in each situation. In reality, these definitions are a bit blurry. You will rarely find yourself proactively labeling different types of tests, but knowing that labels exist and having good examples for each of them is invaluable for creating strong quality guarantees and for unambiguous communication with colleagues.

## The testing pyramid

Louis’s bakery is committed to producing the highest quality pastries East London has ever tasted. Louis and his team meticulously inspect every ingredient to guarantee it’s fresh and new. The same happens to all the parts of his cheesecakes. From the crust to the batter, each step in the recipe goes through rigorous quality control to scrutinize its texture and consistency. For every cheesecake made, Louis makes sure also to bake a “proof”: a small separate piece for him to savor—a sweet reward and the ultimate proof that Louis’s cheesecakes are undeniably delectable.

When you keep your desserts up to such high standards, you don’t want your software to fall behind. For that, there’s a lot we can learn from the way Louis ensures his baked goods are the best in town.

In the same way that low-quality ingredients ruin a cake, poorly written functions ruin a piece of software. If your functions don’t work, then your whole application won’t. Testing these tiny pieces of software is the first step in achieving high-quality digital products.

The next step is to ensure that all the intermediary products of this process are as high quality as its parts. When combining those functions into larger components, like when combining ingredients to make dough, you must ensure that the blend is as good as its individual items.

Finally, just as Louis tastes his cakes as his customers would, we must also try our software as our users would. If all of its modules work, but the application itself doesn’t, it’s a useless product.

* Test individual ingredients.
* Test the combination of the primary ingredients into intermediary products.
* Test the final product.

Mike Cohn’s testing pyramid (figure 2.1)—the metaphor whose name designates this section—comes from this idea that different parts of your software must be tested in diverse ways and with varying regularity.

It divides tests into the following three categories:

* UI tests
* Service tests
* Unit tests

![Figure](ScreenshotsForNotes/Chapter2/Figure_2_1.PNG)

The higher the tests are in the pyramid, the less frequently they run and the more value they provide. Tests in the top are few, and tests in the bottom are numerous.

Unit tests attest to the quality of the most atomic unit in your software: your functions. Service tests ensure these functions work in integration as a service. UI tests verify your work from a user’s perspective by interacting with your software through the user interface it provides.

The size of the pyramid’s layers indicates how many tests of that kind we should write. Their placement in the pyramid suggests how strong the guarantees those tests provide are. The higher up a test fits into the pyramid, the more valuable it is.

Back to our baking analogy: unit tests are analogous to inspecting individual ingredients. It’s a reasonably quick and cheap task that can be done multiple times quite early in the overall process, but it provides little value when compared to further quality control steps. Unit tests fit into the bottom part of the pyramid because we have many of them, but their quality assurance guarantees aren’t as strict as the other tests’.

Service tests are analogous to inspecting the intermediary products of the recipe. In comparison to the inspection of individual ingredients, these tests are reasonably more complex and can be done only in the later phases of the overall process. Nonetheless, they provide more compelling evidence that a heavenly cheesecake is about to materialize. They fit into the middle of the pyramid because you should have fewer service tests than unit tests and because they provide stronger quality guarantees.

UI tests are analogous to tasting your cheesecake once it’s done. They tell you whether the final product matches your expectations. To perform these tests, you must have gone through the entire recipe and have a finished product. They go into the top of the pyramid because these test should be the most sporadic and are the ones that provide the most stringent guarantees.

Each one of the pyramid’s testing layers builds on top of the one underneath. All of them help us assert the quality of the final product, but at different stages of the process. Without fresh ingredients, for example, you can’t have a luxurious batter. Furthermore, without a luxurious batter, you can’t have a sublime cheesecake.

> ***WARNING*** This terminology is not used consistently throughout the industry. You may see people referring to these same categories with different names. The separation between these categories is blurry, just as it is to differentiate one kind of test from another when we see the source code.

Mike’s pyramid is, in general, an excellent mental framework. Separating tests into different categories is instrumental in determining how many of each type we should write and how often they should run. But I find it problematic to divide tests by their target, be it a function, service, or interface.

If, for example, you are writing tests that target a web application, should all of its tests be considered UI tests? Even though you are testing the client itself, you may have separate tests for individual functions and other tests that actually interact with the GUI. If your product is a RESTful API and you test it by sending it HTTP requests, is this a service test or a UI test? Even though you are testing a service, the HTTP API is the interface provided to your users.

Instead of dividing tests by their targets, I suggest that we separate tests by how broad their scope is. The larger the portion of your software a test makes up, the higher it will be placed in the pyramid.

This revised pyramid (shown in figure 2.2) divides tests into three categories, too, but labels them differently and used the level of isolation of each test as the main criterion for its division. The new labels are as follows:

* End-to-end tests
* Integration tests
* Unit tests

![Figure](ScreenshotsForNotes/Chapter2/Figure_2_2.PNG)

Unit tests are the same as in Mike’s original pyramid. They validate the most atomic building blocks of your software: its functions. The tests that directly interact with individual functions in chapter 1 fit into this category. The scope of these tests is the smallest possible, and they assert only the quality of individual functions.

Integration tests validate how the different pieces of your software work together. Tests that call a function and check whether it has updated items in a database are in this category. An example of an integration test is the test in chapter 1 that ensures that only available items can be added to the cart. The scope of these tests is broader than the scope of unit tests but smaller than the scope of end-to-end tests. They assert the quality of the intermediary steps of the process.

End-to-end tests validate your application from a user’s perspective, treating your software as much as a black box as possible. A test that controls a web browser and interacts with your application by clicking buttons and verifying labels is in this category. End-to-end tests correspond to tasting a sample of your cheesecake. Their scope is the entire application and its features.

As in the real world, tests don’t necessarily need to be in one category or the other. Many times they will fit between groups, and that’s fine. These categories don’t exist for us to write labels on top of each of our tests. They exist to guide us toward better and more reliable software, indicating which tests we should write, when, and how much. For a detailed comparison between the different aspects of each type of test, see table 2.1.

![Table](ScreenshotsForNotes/Chapter2/Table_2_1_1.PNG)
![Table](ScreenshotsForNotes/Chapter2/Table_2_1_2.PNG)

Using this new taxonomy, let’s think about how we’d classify specific examples of tests and where they’d fit in our revised test pyramid.

If your end product is a RESTful API, tests that send requests to it are one kind of end-to-end test. If you build a web application that talks to this API, then tests that open a web browser and interact with it from a user’s perspective are also end-to-end tests, but they should be placed even higher in the pyramid.

Tests for your React components fit somewhere between the integration and unit layers. You may be testing UI, but you are orienting your development process by interacting with individual parts of your application in integration with React’s API.

> ***NOTE*** Remember not to be too concerned about fitting tests into one category or another. The pyramid exists as a mental framework for you to think about the different types of guarantees you want to create around your software. Because every piece software is different, some pyramids may have a narrower base or a wider top than others, but, as a general rule, you should strive to keep the pyramid’s shape.

## Unit tests

In the same way that you can’t bake tasty desserts without fresh ingredients, you can’t write great software without well-written functions. Unit tests help you ensure that the smallest units of your software, your functions, behave as you expect them to. In this section, you’ll write your first automated test: a unit test.

To visualize precisely what these tests cover, assume that the bakery’s online store, whose components are shown in figure 2.3, consists of a React client and a Node.js backend that talks to a database and an email service.

![Figure](ScreenshotsForNotes/Chapter2/Figure_2_3.PNG)

The tests you will write cover a small portion of this application. They will deal only with individual functions within your server.

Unit tests are at the bottom of the pyramid, so their scope, shown in figure 2.4, is small. As we move up, you will see that the surface covered by tests will increase.

![Figure](ScreenshotsForNotes/Chapter2/Figure_2_4.PNG)

Start by writing the function shown in listing 2.1 that will be the target of your test. Create a file called Cart.js, and write a class Cart that has an addToCart function.

> ***UNIT UNDER TEST:*** Most of the literature related to testing refers to the target of your tests as the unit under test.

```JavaScript
export default class Cart {
    constructor() {
        this.items = [];
    }

    addToCart(item) {
        this.items.push(item);
    }
}
```

Now think about how you’d go about testing the addToCart function. One of the ways would be to integrate it into a real application and use it, but then we’d run into problems involving time, repeatability, and costs, as we mentioned in chapter 1.

Having to write an entire application before you can test your code requires too much code to be written before knowing whether it works. Additionally, if it doesn’t work, it will be challenging to spot bugs. A quicker way would be to write code that imports your Cart, uses its addToCart function, and validates the result.

Go on and write a Cart.test.js file that imports your Cart, uses its addToCart function, and checks whether a cart has the items you expected, as shown in listing 2.2.

```JavaScript
import Cart from './Listing_2_1';

const cart = new Cart();
cart.addToCart("cheesecake");


const hasOneItem = cart.items.length === 1;
const hasACheesecake = cart.items[0] === 'cheesecake';

// If both cheks have succeeded, prints a success message to the console
if (hasOneItem && hasACheesecake) {
    console.log("The addToCart function can add an item to the cart");
} else {
    // If any of the tests failed, prints error messages

    // Creates a comma-separated list of the actual items in the cart to display in the test's error message
    const actualContent = cart.items.join(", ");

    console.error("The addToCart function didn't do what we expect!");
    console.error(`Here is the actual content of the cart: ${actualContent}`);

    throw new Error("Test failed!");
}
```

When you execute this file using node Cart.test.js, it will tell you whether your code can successfully add cheesecake to the cart—instant and precise feedback.

Congratulations! You have just written your first test. A test sets up a scenario, executes the target code, and verifies whether the output matches what you expected. Because tests tend to follow this same formula, you can use tools to abstract away the testing specific concerns of your code. One of these concerns, for example, is comparing whether the actual output matches the expected output.

Node.js itself ships with a built-in module, called assert, to do those checks, which, in the context of tests, we call assertions. It contains functions to compare objects and throw errors with meaningful messages if the actual output doesn’t match what you expected.

Use assert’s deepStrictEqual function to compare the actual output with the expected output and therefore shorten your test, as shown next.

```JavaScript
import assert from 'assert';
import Cart from './Listing_2_1';

const cart = new Cart();
cart.addToCart("cheesecake");

// Compares the first and second arguments, and throws an insightful error if their values are different
assert.deepStrictEqual(cart.items, ["cheesecake"]);

console.log("The addToCart function can add an item to the cart");
```

Using an assertion library enables you to get rid of the convoluted logic to determine whether objects are equal. It also generates meaningful output, so you don’t have to manipulate strings yourself.

Now suppose you implement a removeFromCart function, as shown here.

```JavaScript
export default class Cart {
    constructor() {
        this.items = [];
    }

    addToCart(item) {
        this.items.push(item);
    }

    removeFromCart(item) {
        for (let i = 0 ; i < this.items.length ; i++) {
            const currentItem = this.items[i];
            if (currentItem === item) {
                this.items.splice(i, 1);
            }
        }
    }
}
```

How would you test it? Probably, you’d write something like the following code.

```JavaScript
import assert from 'assert';
import Cart from './Listing_2_4.js';

const cart = new Cart();

// Adds an item to the cart
cart.addToCart("cheesecake");
// Removes the recently added item
cart.removeFromCart("cheesecake");

// Checks wheter the cart's items property is an empty array
assert.deepStrictEqual(cart.items, []);

console.log("The removeFromCart function can remove an item from the cart");
```

First, your test sets up a scenario by adding a cheesecake to the cart. Then it calls the function you want to test (in this case, removeFromCart). Finally, it checks whether the content of the cart matches what you expected it to be. Again, the same formula: setup, execution, and verification. This sequence is also known as the three As pattern: arrange, act, assert.

Now that you have multiple tests, think about how you’d add them to your Cart.test.js. If you paste your new test right after the old one, it won’t run if the first test fails. You will also have to be careful to give variables in both tests different names. But, most importantly, it would become harder to read and interpret the output of each test. To be honest, it would be a bit of a mess.

Test runners can solve this problem. They enable you to organize and run multiple tests in a comprehensive manner, providing meaningful and easily readable results.

At the present moment, the most popular testing tool in the JavaScript ecosystem is called Jest.

Jest is a testing framework created at Facebook. It focuses on simplicity and, therefore, ships with everything you need to start writing tests straightaway.

Let’s install Jest so that we can write unit tests more concisely. Go ahead and install it globally with the command npm install -g jest.

Without a configuration file, jest.config.js, or a package.json file, Jest will not run, so remember to add a package.json file to the folder that contains your code.

Now, instead of manually running your test file with Node.js, you will use Jest and tell it to load and execute tests.

> *NOTE:* By default, Jest loads all files ending in .test.js, .spec.js, or tests inside folders named tests.

Prepare your tests for Jest to run by wrapping them into the test function that Jest adds to the global scope. You can use this function to organize multiple tests within a single file and indicate what should run. It takes the test’s name as its first argument and a callback function containing the actual test as the second argument.

Once you have wrapped the previous tests into Jest’s test function, your Cart.test.js file should look like this.

```JavaScript
import * as jest from 'jest';
import assert from 'assert';
import Cart from './Listing_2_4.js';


// Encapsulates the first test into a different namespace, isolating its varialbes and prodcuing more readable output
test("The addToCart function can add an item to the cart", () => {
    // Arrange: create an empty cart
    const cart = new Cart();

    // Act: exercises the addToCart function
    cart.addToCart("cheesecake");

    // Assert: checks whether cart contains the newly added item
    assert.deepStrictEqual(cart.items, ["cheesecake"]);
});


// Encapsulates the second test into a different namespace
test("The removeFromCart function can remove an item from the cart", () => {
    // Arrange: creates an empty cart, and adds an item to it
    const cart = new Cart();
    cart.addToCart("cheesecake");

    // Act: exercises the removeFromCart function
    cart.removeFromCart("cheesecake");

    // Assert: checks whether the cart is empty
    assert.deepStrictEqual(cart.items, []);
})
```

Notice how you eliminated the previous if statements used to determine how to generate output by delegating that task to Jest. Whenever a test fails, Jest will provide you with a precise diff so that you can see how the actual output was different from what you expected. To see how much better Jest’s feedback is, try changing one of the assertions so that it fails.

Finally, to avoid using anything but Jest for your tests, replace the assert library with Jest’s own alternative: expect. The expect module is just like Node.js’s assert module, but it’s tailored for Jest and helps it provide feedback that’s even more helpful.

Like the test function, expect is available in the global scope when running tests within Jest. The expect function takes as an argument the actual subject of the assertion and returns an object that provides different matcher functions. These functions verify whether the actual value matches your expectations.

Jest’s equivalent to deepStrictEqual is toEqual. Replacing your first test’s deepStrictEqual with toEqual should lead you to code that looks similar to the following listing.

```JavaScript
import * as jest from 'jest';
import assert from 'assert';
import Cart from './Listing_2_4.js';

test("The addToCart function cna add an item to the cart", () => { 
    const cart = new Cart();
    cart.addToCart("cheesecake");

    // Compares the value of the assertion's target - the argument provided to expect - to the value of the argument passed to toEqual
    expect(cart.items).toEqual(["cheesecake"]);
});
```

> ***IMPORTANT:*** There’s a difference between “strict” equality checks and “deep” equality checks. Deep equality verifies whether two different objects have equal values. Strict equality verifies whether two references point to the same object. In Jest, you perform deep equality checks using toEqual, and strict equality checks using toBe. Read Jest’s documentation for the toEqual matcher to learn more about how it works. It’s available at https://jestjs.io/docs/en/expect#toequalvalue.

Up to now, you have been using a global installation of Jest to run your tests, which is not a good idea. If you are using an assertion that is available only in the latest version of Jest and one of your coworkers’ global installation is older than yours, tests may fail if the assertion’s behavior changed from one version to another.

You want tests to fail only when there’s something wrong with your application, not when people are running different versions of a test framework.

Solve this problem by running npm install jest --savedev to install Jest as a devDependency. It should be a devDependency because it doesn’t need to be available when you ship your application. It needs to be available in developers’ machines only so that they can execute tests after they download the project and run npm install.

Once you run that command, you will see that your package.json file now lists a specific version of Jest within its devDependencies.

> *NOTE:* Did you notice that the version of Jest within your package.json has ^ in front of it? That ^ indicates that when running npm install, NPM will install the latest major version of Jest. In other words, the leftmost version number will not change. In theory, when following semantic versioning practices, any nonmajor upgrades should be backward-compatible, but, in reality, they are not always. To force NPM to install an exact version of Jest when running npm install, remove the ^. I highly recommend readers read more about what semantic versioning is and how it works. The website https://semver.org is an excellent resource for that.

Your project’s dependencies, including Jest, are available within the node_modules folder. You can run the specific version of Jest specified in your package.json by running its built version located in node_modules/.bin/jest. Go ahead and execute that file. You will see that it produces the same output as before.

It’s still cumbersome to type the full path to your project’s Jest installation every time we want to run tests, though. To avoid that, edit your package.json file, and create a test script that executes the project’s Jest installation whenever you run the npm test command.

Add a test property under scripts in your package.json, and specify that it should run the jest command, as shown next.

```json
{
    "name": "5_global_jest",
    "version": "1.0.0",
    "scripts": {
        "test": "jest"
    },
    "devDependencies": {
        "jest": "^26.6.0"
    }
}
```

After creating this NPM script, whenever someone wants to execute your project’s tests, they can run npm test. They don’t need to know which tool you are using or worry about any other options they may need to pass to it. Whatever the command within the package.jsontest script is, it will run.

> *NOTE:* When you run a command defined in your package.json scripts, it spawns a new shell environment, which has ./node_modules/.bin added to its PATH environment variable. Because of this PATH, you don’t need to prefix commands with ./node_modules/.bin. By default, any installed libraries you have will be preferred.

When refactoring, you want to ensure that you can shape your code differently while maintaining the same functionality. Therefore, having rigorous unit tests is a fantastic way to obtain quick and precise feedback during the process.

Unit tests help you iterate confidently, by providing quick feedback as you write code, as we will see in detail when we talk about test-driven development in chapter 9. Because unit tests’ scope is limited to a function, their feedback is narrow and precise. They can immediately tell which function is failing. Strict feedback like this makes it faster to write and fix your code.

These tests are inexpensive and quick to write, but they cover only a small part of your application, and the guarantees they provide are weaker. Just because functions work in isolation for a few cases doesn’t mean your whole software application works, too. To get the most out of these narrow and inexpensive tests, you should write many of them.

Considering that unit tests are numerous and inexpensive, and run quickly and frequently, we place these tests at the bottom of the testing pyramid, as figure 2.5 shows. They’re the foundation other tests will build upon.

![Figure](ScreenshotsForNotes/Chapter2/Figure_2_5.PNG)

## Integration tests

When looking at the application’s infrastructure diagram, you will see that the scope of integration tests, which is shown in figure 2.6, is broader than the scope of unit tests. They check how your functions interact and how your software integrates with third parties.

![Figure](ScreenshotsForNotes/Chapter2/Figure_2_6.PNG)

Integration tests help you ensure that the different parts of your software can work together. For example, they help you validate whether your software communicates appropriately with third-party RESTful APIs, or whether it can manipulate items in a database.

Let’s start by creating one of the most classic examples of an integration test: a test that talks to a database.

```JavaScript
import * as db from './dbConnection.js';

const createCart = username => {
    return db("carts").insert({ username });
};

const addItem = (cartId, itemName) => {
    return db("carts_items").insert({ cartId, itemName });
};

export default {
    createCart,
    addItem
};
```

Try to import the createCart and addItem function in another file and use them to add items to your local sqlite database. Don’t forget to use closeConnection to disconnect from the database once you’re done; otherwise, your program will never terminate.

To test the functions in the cart.js module, you can follow a pattern similar to the one we used in chapter 1. First, you set up a scenario. Then you call the function you want to test. And, finally, you check whether it produced the desired results.

After installing Jest as a devDependency, write a test for createCart. It should ensure that the database is clean, create a cart, and then check if the database contains the cart you’ve just created.

```JavaScript
import * as jest from 'jest';
import {
    db,
    closeConnection
} from './dbConnection.js';
import createCart from './Listing_2_12.js';

test("createCart creates a cart for a username", async () => {
    // Deletes every row in the carts table
    await db("carts").truncate();
    await createCart("Lucas da Costa");

    // Selects value in the username column for all the items in the carts table
    const result = await db.select("username").from("carts");
    expect(result).toEqual([{
        username: "Lucas da Costa"
    }]);

    // Tears down the connection pool
    await closeConnection();
});
```

Add tests for the addItem function now.

```JavaScript
test("addItem adds an item to a cart", async () => {
    await db("carts_items").truncate();
    await db("carts").truncate();

    const username = "Lucas da Costa";
    await createCart(username);
    // Selects all the rows int he carts table whose username column matches the username used for the test
    const {
        id: cartId
    } = await db
        .select()
        .from("carts")
        .where({
            username
        });

    await addItem(cartId, "cheesecake");
    const reuslt = await db.select("itemName").from("carts_items");

    expect(result).toEqual([{ cartId, itemName: "cheesecake" }]);
    await closeConnection();
});
```

If you execute both tests, you will run into an error. The error says that the second test was “unable to acquire a connection” to the database. It happens because, once the first test finishes, it closes the connection pool by calling closeConnection. To avoid this error, we must ensure that closeConnection is called only after all tests have run.

Because it’s quite common to perform this sort of cleanup operation once tests run, Jest has hooks called afterEach and afterAll. These hooks are available on the global scope. They take, as arguments, functions to execute either after each test or after all tests.

Let’s add an afterAll hook to close the connection pool only after all tests have run and remove the invocation of closeConnection from within the test.

```JavaScript
const { db, closeConnection } = require("./dbConnection");
const { createCart, addItem } = require("./cart");

// Tears down the connection pool once all tests have finished, returning a promise os that Jest knows when the hook is done
afterAll(async () => await closeConnection());
```

Jest also provides beforeAll and beforeEach hooks, shown in listing 2.17. Because both of your tests need to clean the database before they run, you can encapsulate that behavior into a beforeEach hook. If you do this, there’s no need to repeat those truncate statements on every test.

```JavaScript
const { db, closeConnection } = require("./dbConnection");
const { createCart, addItem } = require("./cart");

// Clears the carts and carts_items tables before each test
beforeEach(async () => {
    await db("carts").truncate();
    await db("carts_items").truncate();
});
```

These tests help ensure that your code works and that the APIs you’re using behave as you expect. If you had any incorrect queries, but they were still valid SQL queries, these tests would catch it.

Like the term “unit testing,” “integration testing” means different things to different people. As I’ve mentioned before, I recommend you not get too hung up on labels. Instead, think of how big the scope of your test is. The larger its scope, the higher it fits in the pyramid. Whether you call it an “integration” test or an “end-to-end” test doesn’t matter that much. The important thing is to remember that the bigger the test’s scope, the stronger the quality guarantee it provides, but the longer it takes to run and the less of it you need.

Considering the characteristics of unit tests, they’d go in the middle of the pyramid, as shown in figure 2.7.

![Figure](ScreenshotsForNotes/Chapter2/Figure_2_7.PNG)

You should write integration tests whenever it’s fundamental to ensure that multiple parts of your program can work together or that they integrate correctly with third-party software.

If you are using a library like React, for example, your software must integrate appropriately with it. The way React behaves is essential to how your application does, so you must test your code in integration with React. The same is valid for interacting with a database or with a computer’s filesystem. You rely on how those external pieces of software work, and, therefore, it’s wise to check if you’re using them correctly.

This kind of test provides substantial value because it helps you verify whether your code does what you expect and whether the libraries you use do, too. Nonetheless, it’s important to highlight that the goal of an integration test is not to test any third-party pieces of software themselves. The purpose of an integration test is to check whether you are interacting with them correctly.

If you are using a library to make HTTP requests, for example, you should not write tests for that library’s get or post methods. You should write tests to see if your software uses those methods correctly. Testing the request library is their author’s responsibility, not yours. And, if their authors didn’t write tests, it’s probably better to reconsider its adoption.

Isolating your code in unit tests can be great for writing quick and simple tests, but unit tests can’t guarantee that you are using other pieces of software as you’re supposed to.

We will talk more about the trade-offs between more isolated versus more integrated tests in chapter 3.

## End-to-end tests

End-to-end tests are the most coarse tests. These tests validate your application by interacting with it as your users would.

They don’t use your software’s code directly as unit tests do. Instead, endto- end tests interface with it from an external perspective. If it’s possible to use a button or access a page instead of calling a function or checking the database, they’ll do it. By taking this highly decoupled approach, they end up covering a large surface of the application, as shown in figure 2.8. They rely on the client side working as well as all the pieces of software in the backend.

![Figure](ScreenshotsForNotes/Chapter2/Figure_2_8.PNG)

An end-to-end test to validate whether it’s possible to add an item to the cart wouldn’t directly call the addToCart function. Instead, it would open your web application, click the buttons with “Add to Cart” written on them, and then check the cart’s content by accessing the page that lists its items. A test like this goes at the very top of the testing pyramid.

Even the REST API for this application can have its own end-to-end tests. An end-to-end test for your store’s backend would send an HTTP request to add items to the cart and then another to get its contents. This test, however, fits below the previous one in the testing pyramid because it covers only the API. Testing an application using its GUI has a broader scope because it comprises both the GUI and the API to which it sends requests.

Again, I’d like to reinforce that labeling tests as end-to-end, integration, or unit tests is not our primary goal. The testing pyramid serves to orient us on the role, value, and frequency of tests. What the placement of end-to-end tests in the pyramid (figure 2.9) tells us about this type of tests is that they’re very valuable and that you need a smaller quantity of them. Just a few can already cover large parts of your application. In contrast, unit tests focus on a single function and, therefore, need to be more frequent.

![Figure](ScreenshotsForNotes/Chapter2/Figure_2_9.PNG)

End-to-end tests avoid using any private parts of your application, so they resemble your users’ behavior very closely. The more your tests resemble a user interacting with your application, the more confidence they give you. Because end-to-end automated tests most closely simulate real use-case scenarios, they provide the most value.

> *NOTE:* In testing lingo, tests that don’t know about an application’s internals are called black box tests. Tests that do are called white box tests. Tests don’t necessarily need to fit entirely in one category or another. The less they rely on an application’s implementation details, the more “black box” they are. The opposite is valid for more “white box” tests.

These tests also tend to take more time to run and, therefore, run less frequently. Differently from unit tests, it’s not feasible to run end-to-end tests whenever you save a file. End-to-end tests are more suited for a later stage of the development process. They can help you by thoroughly checking whether your application’s features will work for your customers before allowing developers to merge pull requests or perform deployments, for example.

## Testing HTTP APIs

Now, write a test that uses HTTP requests to add items to a cart and check the cart’s contents.

Even though you are making HTTP requests instead of calling functions, the general formula for your tests should be the same: arrange, act, assert.

To make it easier to perform requests, you can add the following helper functions to your tests.

```JavaScript
import * as fetch from 'isomorphic-fetch';
import * as jest from 'jest';
const apiRoot = "http://localhost:3000";

const addItem = (username, item) => {
    // Sends POST requests to the route that adds items to a user's cart
    return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
        method: "POST"
    });
};

const getItems = username => {
    // Sends GET requests to the route that lists the contents of a user's carts
    return fetch(`${apiRoot}/carts/${username}/items`, {
        method: "GET"
    });
};
```

After adding these helper functions, you can go ahead and use them in the test itself, making it shorter than it would be otherwise.

```JavaScript
test("adding items to a cart", async () => {
    // Lists the items in a user's cart
    const initialItemsResponse = await getItems("lucas");
    // Checks wheter the response's status is 404
    expect(initialItemsResponse.status).toEqual(404);

    // Sends a request to add an item to a user's cart
    const addItemResponse = await addItem("lucas", "cheesecake");
    // Checks wheter the server responded with the cart's new contents
    expect(await addItemResponse.json()).toEqual(["cheesecake"]);

    // Sends another request to list the items in the user's cart
    const finalItemsResponse = await getItems("lucas");
    // Checks wheter the server's response includes the item you've added
    expect(await finalItemsResponse.json()).toEqual(["cheesecake"]);
});
```

Run this test, and see what happens. You will notice that the test passes but Jest doesn’t exit. To detect what caused this, you can use Jest’s detectOpenHandles option. When running Jest with this flag, it will tell you what prevented your tests from exiting.

> *NOTE:* If you are using an NPM script to run Jest, as we’ve done before, add -- to it and then all the options you want to pass to the script. To pass --detectOpenHandles to Jest through your NPM script, for example, you need to run npm test -- --detectOpenHandles.

When you use this option, Jest will warn you that the problem comes from app .listen.

```
Jest has detected the following 1 open handle potentially keeping Jest from exiting:

● TCPSERVERWRAP
    21 | app.use(router.routes());
    22 |
    > 23 | app.listen(3000);
    24 |
    at Application.listen (node_modules/koa/lib/application.js:80:19)
    at Object.<anonymous> (server.js:23:5)
```

You have started your server before your tests run, but you didn’t stop it when they finished!

To avoid tests that never exit, Jest allows you to use the forceExit option. If you add that to the NPM script that runs Jest, as shown next, you can guarantee that the tests will always exit when running npm test.

```JSON
{
    "name": "1_http_api_tests",
    "version": "1.0.0",
    "scripts": {
        "test": "jest --forceExit"
    },
    "devDependencies": {
        "isomorphic-fetch": "^2.2.1",
        "jest": "^26.6.0"
    },
    "dependencies": {
        "koa": "^2.11.0",
        "koa-router": "^7.4.0"
    }
}
```

A more elegant way to avoid tests hanging is to stop your server after they finish. Koa allows you to close your server by calling its close method. Adding an afterAll hook that invokes app.close should be enough to make your tests exit graciously.

```JavaScript
// Assign your server to `app`
const app = require("./server");

// Your tests...

afterAll(() => app.close());
```

If you clean up your open handles, you won’t need to use the forceExit option. Avoiding this option is wiser because it allows you to ensure that the application is not holding any external resources, such as a database connection.Writing tests for an HTTP API is excellent for ensuring that services follow the established “contracts.” When multiple teams have to develop different services, these services must have well-defined communication standards, which you can enforce through tests. Tests will help prevent services from not being able to talk to each other.

The scope of tests for HTTP APIs is broad, but it is still narrower than the scope of tests that target GUIs. Tests that comprise GUIs examine the entire application, whereas tests for HTTP APIs only probe its backend. Because of this difference in scope, we will subdivide the area for end-to-end tests in the testing pyramid and place HTTP API tests below GUI tests, as you can see in figure 2.11.

![Figure](ScreenshotsForNotes/Chapter2/Figure_2_11.PNG)

## Testing GUIs

GUI tests cover your entire application. They will use its client to interact with your backend, therefore, touching every single piece of your stack, as figure 2.12 illustrates.

![Figure](ScreenshotsForNotes/Chapter2/Figure_2_12.PNG)

Writing end-to-end tests for GUIs involves particular requirements and, therefore, requires special tools.

Tools for end-to-end testing GUIs need to be capable of interacting with a web page’s elements, like buttons and forms. Because of these demands, they need to be able to control a real browser. Otherwise, the tests will not simulate the user’s actions precisely.

At the moment, the most popular tools for UI testing are Cypress, TestCafe, and Selenium. It’s possible to use these tools to make a browser interact with your application by using JavaScript to control them.

The overall structure of UI tests is similar to the types of tests we have already seen. UI tests still require you to set up a scenario, perform actions, and then do assertions. The main difference between UI tests and other types of tests is that instead of merely calling functions or performing requests, your actions happen through the browser and assertions depend on a web page’s content.

Even though the general three As pattern for tests applies to UI tests, the very process of setting up an environment for tests to run tends to be more complicated, especially if you need to spin up an entire application and all of its separate services. Instead of dealing with a single piece of software, you may be dealing with many.

GUI tests also bring to light many new concerns, mostly related to the irregularity of how a real browser behaves. Waiting for pages to load, for text to render, for elements to be ready for interaction, or for a web page to perform HTTP requests and update itself are examples of actions that are usually troublesome. They tend to be unpredictable, and different machines can take different times to complete them.

Because these tests cover all parts of your application, they have the highest place in the testing pyramid, as shown in figure 2.13. They take the longest to run, but they also provide the strongest possible guarantees.

![Figure](ScreenshotsForNotes/Chapter2/Figure_2_13.PNG)

## Acceptance tests and end-to-end tests are not the same

People frequently conflate acceptance tests with end-to-end tests. Acceptance testing is a practice that aims to validate whether your application works from a business perspective. It verifies whether your software is acceptable for the end users the business wants to target.

End-to-end tests are a type of test that verifies your application as a whole, from an engineering perspective. It focuses on correctness rather than functionality.

Some overlap occurs between the two concepts because acceptance tests focus on functional requirements—on what an application can do—which is something that can be done through end-to-end tests.

Not all end-to-end tests are acceptance tests, and not all acceptance tests are end-to-end tests. You can perform acceptance tests through end-to-end tests —and many times you probably will.

End-to-end tests are excellent for this kind of verification because they can cover aspects that simple unit tests won’t, such as what a web page looks like or how long it takes for an application to respond to specific actions.

As I have previously mentioned, because end-to-end tests most closely resemble user behavior, they provide stronger guarantees when it comes to acceptance tests. Nonetheless, it’s also possible to perform acceptance testing using unit or integration tests. When testing whether the emails sent to users contain the desired content, for example, you might want to write a unit test to check the generated text.

## Exploratory testing and the value of QA

When you don’t have Silicon Valley-types of budgets—like Louis—you need to find cheaper ways of testing your software. Not everyone can afford an entire department filled with QA analysts and testers.

With the rise of automated tests, the demand for manual QA has been decreasing dramatically. This isn’t because having a specialized QA team is not useful, but because some of their tasks, when automated, can be cheaper, quicker, and more precise.

Up until now, you haven’t felt the need to have a QA specialist. Every day, you are learning how to write better tests, which helps you ensure that your software works without the need for much human intervention.

So far, your colleagues may have been reliable enough to test their own work. In the vast majority of cases, your deployments might not have introduced any critical failures. And, let’s be honest, it’s not a tragedy if someone can’t order their cake soon enough. The median cost of failure is low. Defects are definitely harmful to the business, but, considering that critical failures rarely happen because of your rigorous automated tests, the benefits of hiring someone to do manual testing don’t outweigh its costs.

Besides the fact that the cost of failure doesn’t justify the cost of hiring a QA analyst, introducing one could increase the time it takes to ship changes. Machines provide feedback way quicker than a person would and with less communication overhead.

But all business evolve, especially when their owners pour so much of their hearts—and sugar—into them. The cost of failure for Louis’s business could dramatically increase if he decides to bake wedding cakes, for example.

Wedding cakes are one of the most expensive pieces of carbohydrates someone will ever buy in their lives. It’s challenging to pick one, and it’s even more stressful to worry about it until it arrives on the very day of your wedding.

To increase the likelihood of customers placing an order, Louis also wants to provide them with various customization features. These features can be as complex as uploading a model that can be 3-D printed and placed on top of the cake—the future is here.

Now Louis has an extraordinarily complex and mission-critical feature that will represent a large chunk of the business’s revenue. These two factors drive up the necessity for a QA specialist, and now its cost is justified. In the future, the more features like this you have to ship, the more evident this need will become.

Sophisticated features usually have many edge cases, and the requirements for them to be well received by users are stricter. We are not only concerned about whether users can shape their cakes in any form, but we are also concerned whether it’s easy enough for them to do that. What matters is not only whether features work but also whether they fulfill our customers’ needs and whether they are delightful to use. This kind of acceptance testing is—at least for now—almost impossible for a machine to do.

So far, our comparison between QA professionals and machines has been pretty unfair. We have been comparing what computers are good at with what humans are the worst at: performing repetitive tasks quickly and flawlessly. A comparison that would be more favorable to users is in regard to creative tasks and empathy. Only humans can think of the multiple curious ways someone would find to use a feature. Only people can place themselves in someone else’s shoes and think about how pleasing a piece of software is.

Even tests need to be written by someone. A machine can execute a test only after it’s taught how to do so. Once you have discovered a bug that prevents someone from adding cheesecakes to their carts if they’re also ordering macaroons, you can write a test to avoid this specific bug from happening again. The problem is that until you have considered the possibility of that ever happening, there will be no tests for it. You can only add tests that prevent bugs from happening again—regression tests—if you have seen them happening in the first place.

A programmer’s tests usually ensure that the software will behave when someone orders a cake. A QA’s tests often ensure that the software will behave when someone orders –91344794 cakes. This willingness to test curious scenarios is the other advantage of hiring QA professionals. They are excellent resources for exploratory testing.

Exploratory testing is useful because it can cover cases that programmers didn’t think of. Once a QA catches a new bug, they can report it to the development team, which will fix it and add a test to ensure it won’t happen again.

Competent QA professionals act collaboratively with development teams. They help developers improve automated tests by providing feedback on the bugs that the QA team has found.

The best way to prevent bugs from happening is to write automated tests that try to reproduce them. In fact, preventing specific bugs is all that automated testing can do. Automated tests can’t determine whether a piece of software works because they can’t test all possible inputs and outputs. Software becomes safer when QA teams help developers expand that universe of inputs and outputs that may be problematic.

On the other hand, the way developers help QA teams perform better work is by writing rigorous automated tests. The more that software can do on its own, the more time it saves the QA team to do tasks that only people can do, like exploratory testing.

The biggest concern you should have when hiring QA people is whether it will create an adversarial relationship between them and the software development team. That’s the most counterproductive thing that can happen.

If QA teams see developers as adversaries, they will consider all fixes as an utmost priority, rather than communicating with developers and coming to an agreement about what’s better for the business. If a small defective animation hinders a release with a crucial new feature, for example, the company will miss out on revenue. This intransigence increases frustration and stress among teams and makes release cycles longer.

When developers have an adversarial attitude toward QA, they will be dismissive of problems. They will not test their code thoroughly before putting it into the hands of QA professionals, because, ultimately, they think that quality is a responsibility exclusive to the QA team and not to the business. They see their success as shipping features as quickly as they can, so they delegate all the testing to others. This carelessness leads to untestable software and, ultimately, to more bugs being shipped.

> *NOTE:* Some people will argue that there should never be QA teams in Agile. Whenever I hear binary arguments like this, I tend to be sceptical. Every project is distinct and, therefore, has different constraints and requirements for success. I believe in an Agile approach to QA. I’d advocate for integrating QA in the development process. Instead of having QA run a big batch of tests before a major release, companies should integrate QA into the process of the delivery of individual tasks. Such an approach tightens the feedback loop and still ensures a satisfactory level of correctness and usability.

## Tests, cost, and revenue

Hey, let me tell you a secret: Louis doesn’t care whether you write tests. As long as you can produce working software in less time, you might as well use ancient wizardry. In business, there’s only two things that matter: increasing revenue and diminishing costs.

Businesses care about beautiful code because it helps programmers make fewer mistakes and produce code in a swift and predictable pace. Wellorganized code is easier to understand and has fewer places for bugs to hide. It decreases frustration and makes programmers’ jobs more stimulating. In turn, the dynamic and satisfying environment keeps them motivated and makes them stay at the company longer. Beautiful code is not a goal—it is a means to an end.

Counterintuitively, producing bug-free software is also not a goal. Imagine you add a bug that causes customers to get a free macaroon for every 10 cheesecakes they buy. If that bug drives up profits, you might as well keep it. When a bug becomes a feature, you won’t fix it just for the sake of complying with the original spec. We fix bugs because, in the vast majority of cases, they decrease revenue and increase costs.

Even writing code is not your job. Your job is to help the company increase its revenue and diminish its costs. The less code you write, the better, because less code is cheaper to maintain. Implementing a new feature in 10 lines of code costs way less than doing it in a thousand. Your business doesn’t thrive when you write elegant solutions to problems. It thrives when features are quick and easy to implement and, therefore, cost less money and deliver more value.

In the first chapter, we talked about how tests can help businesses generate revenue with fewer costs. But how can we structure tests themselves to be as cost efficient as possible?

The first step toward cost-efficient tests is to keep in mind that you pay for tests that you have to maintain. When Louis asks you for a change, he doesn’t care that you spent only five minutes to change the application but two hours to update its tests. All that matters to the business is that it took you more than two hours to deliver the change. It’s insignificant whether you had to spend time updating the application’s code or its tests. Tests are code, too. Maintaining a hundred lines of code costs the same as maintaining a hundred lines of tests. Poorly written code is expensive because it takes a lot of time to change, and the same is valid for poorly written tests.

The next step to cut the cost of your tests is to reduce duplication in them. When you notice repetitive patterns, don’t be afraid to create abstractions. Creating separate utility functions makes tests shorter and faster to write. Using abstractions decreases costs and incentivizes developers to write tests more frequently. In the chapter about end-to-end tests, for example, we wrote helpers to make it easier to perform HTTP requests. Those helpers saved us from having to rewrite the whole fetching logic repeatedly. Let’s revisit that example to talk about good and bad patterns.

Consider the two samples below.

```JavaScript
// badly written test
const { app, resetState } = require("./server");
const fetch = require("isomorphic-fetch");
test("adding items to a cart", done => {
    resetState();
    return fetch(`http://localhost:3000/carts/lucas/items`, {
        method: "GET"
    })
        .then(initialItemsResponse => {
            expect(initialItemsResponse.status).toEqual(404);
            return fetch(`http://localhost:3000/carts/lucas/items/cheesecake`, {
            method: "POST"
        }).then(response => response.json());
        })
        .then(addItemResponse => {
            expect(addItemResponse).toEqual(["cheesecake"]);
            return fetch(`http://localhost:3000/carts/lucas/items`, {
            method: "GET"
        }).then(response => response.json());
        })
        .then(finalItemsResponse => {
            expect(finalItemsResponse).toEqual(["cheesecake"]);
        })
        .then(() => {
            app.close();
            done();
        });
});
```

```JavaScript
// well written test
const { app, resetState } = require("./server");
const fetch = require("isomorphic-fetch");
const apiRoot = "http://localhost:3000";

const addItem = (username, item) => {
    return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
        method: "POST"
    });
};

const getItems = username => {
    return fetch(`${apiRoot}/carts/${username}/items`, { method: "GET" });
};

beforeEach(() => resetState());
afterAll(() => app.close());

test("adding items to a cart", async () => {
    const initialItemsResponse = await getItems("lucas");
    expect(initialItemsResponse.status).toEqual(404);

    const addItemResponse = await addItem("lucas", "cheesecake");
    expect(await addItemResponse.json()).toEqual(["cheesecake"]);

    const finalItemsResponse = await getItems("lucas");
    expect(await finalItemsResponse.json()).toEqual(["cheesecake"]);
});
```

Think about which of them is harder to read, and why.

I find the first sample way harder to read. The logic necessary to handle promises and send requests muddles the intent of each test. This complexity makes it more challenging to understand what the test does and, therefore, makes changes take longer, too. In the second test, we have encapsulated the logic for getting and adding cart items into separate functions. This abstraction makes it easier to understand each of the steps in the test. The sooner we grasp what a test does, the sooner we can change it and the less it costs.

If you had to change the URL of your server’s endpoints, think about which one of these samples would be easier to update.

Updating the second code sample is way easier because you don’t have to rewrite the URLs used in each test. By updating those functions, you’d fix all the tests that use them. A single change can impact multiple tests and, therefore, decrease their maintenance costs. When it comes to removing duplication, the same principles you apply to your code apply to your tests. Now consider that you have to add more tests. With which of these samples would that task be harder?

If you proceed to repeat yourself, adding tests to the first sample is definitely going to take longer because you’d have to copy and tweak the extensive logic from the previous test. Your test suite would become verbose and, therefore, harder to debug. In contrast, the second sample facilitates writing new tests because each request takes a single line and is easily understandable. In the second sample, you also don’t have to worry about managing a complex chain of nested promises.

Besides keeping tests readable and avoiding duplication, another crucial attitude to decrease tests’ costs is to make them loosely coupled. Your tests should assert what your code does, not how it does it. Ideally, you should have to change them only when your application presents behavior that’s different from what the test expected.

Take into account the function below.

```JavaScript
const pow = (a, b, acc = 1) => {
    if (b === 0) return acc;
    const nextB = b < 0 ? b + 1 : b - 1;
    const nextAcc = b < 0 ? acc / a : acc * a;
    return pow(a, nextB, nextAcc);
};
```

This function calculates powers using recursion. A good test for this function would provide it with a few inputs and check whether it produces the correct output.

```JavaScript
const pow = require("./pow");

test("calculates powers", () => {
    expect(pow(2, 0)).toBe(1);
    expect(pow(2, -3)).toBe(0.125);
    expect(pow(2, 2)).toBe(4);
    expect(pow(2, 5)).toBe(32);
    expect(pow(0, 5)).toBe(0);
    expect(pow(1, 4)).toBe(1);
});
```

This test doesn’t make any assumptions about how the pow function works. If you refactor the pow function, it should still pass.

Refactor the pow function so that it uses a loop instead, and rerun your tests.

```JavaScript
const pow = (a, b) => {
    let result = 1;
    for (let i = 0; i < Math.abs(b); i++) {
        if (b < 0) result = result / a;
        if (b > 0) result = result * a;
    }
    return result;
}
```

Because the function is still correct, the test passes. This test was costefficient because it was written once but was able to validate your function multiple times. If your tests check irrelevant implementation details, you will need to update them whenever you update a function, even if it still works. You want tests to fail only when a function’s observable behavior changes.

There are, however, exceptions to this rule. Sometimes you will have to deal with side effects or call third-party APIs. If these implementation details are critical to what your software does, then it’s advisable to test them. Let’s use the following function as an example.

```JavaScript
const addItemToCart = async (a, b) => {
    try {
        return await db("carts_items").insert({ cartId, itemName });
    } catch(error) {
        loggingService(error);
        throw error;
    }
}
```

In this function, you want to ensure you will log any errors that customers may experience when adding items to their carts.

If logging errors is critical for debugging your application, you should enforce it with tests. You should have tests that verify whether addToCart calls the loggingService when an error happens. In this case, examining that implementation detail is important because you want to enforce it.

I like to think of tests as guarantees. Whenever I want to confirm that my application behaves in a certain way, I will write a test for it. If you require a function to be implemented in a particular manner, you can encode that demand into an automated test.

Don’t worry about whether you are checking implementation details. Worry about whether you are checking relevant behavior.

An alternative to asserting on whether loggingService is called is to check the log file to which it writes. But that approach also has downsides. If you decide to change how you implement loggingService so that it logs to a different file, the test for addItemToCart—and probably many others that rely on this same behavior—will fail, too, as shown in figure 2.14.

![Figure](ScreenshotsForNotes/Chapter2/Figure_2_14.PNG)

By asserting that addToCart calls loggingService—an implementation detail—you avoid unrelated tests failing when loggingService changes, as shown in figure 2.15. If you have rigorous tests for loggingService, they will be the only ones to break when you change the file to which loggingService writes. Fewer breaking tests mean you have fewer tests to update and, therefore, fewer costs to maintain them.

![Figure](ScreenshotsForNotes/Chapter2/Figure_2_15.PNG)

> *NOTE:* We will talk about how to write tests that inspect a function’s calls when we talk about mocks, stubs, and spies in chapter 3. For now, the most important thing is to understand why you’d want to do that.

When you create tests that complement each other, you create what I call a transitive guarantee. If, for example, you have tests to ensure that function a works, then you will be fine by just checking if function a is called by other functions, instead of rechecking its behavior on every test.

Transitive guarantees are a great way to decrease the cost of your tests. They work in the same way as abstractions—they decrease coupling. Instead of all tests repetitively checking the same behavior, they delegate that responsibility to another test. Transitive guarantees are encapsulation at the testing level.

If you must assert on a function’s implementation detail, it’s advisable to create a transitive guarantee so that you can encapsulate that check into a separate test. Even though this separation distances tests from reality and, therefore, decreases its value, it can considerably reduce its maintenance cost.

It’s your job to balance the maintenance cost of tests versus the value they provide. Rigorous tests can provide excellent fine-grained feedback, but if they’re too coupled, they’ll be expensive to maintain. On the other hand, tests that never break don’t produce information. Achieving a balance between maintainability and rigorous quality control is what turns a good tester into an excellent one.

> *TIP:* One of the most heated debates when it comes to testing is whether people should create a test for every single line of code they write. As I have mentioned many times in this book, I don’t like absolute thinking. The word always is hazardous, and so is the word never. What I’d say is that the longer the period your code is going to survive, the more critical it is to write tests. The value a test produces depends on how often it runs. If a test saves you five minutes of manual testing, by the time you’ve run it for the 15th time, you’ll have saved an hour. If you are in a hackathon, for example, you probably shouldn’t add too many tests (if any). In hackathons, the code you write will usually be gone sooner than the coffee and pizzas provided by the host. Therefore, it will not have enough opportunities to deliver value. Another case when you should probably avoid writing tests is if you’re exploring a particular API or just experimenting with possibilities. In that case, it’s perhaps wiser to play around first and write tests only once you’re confident of what you want to do. When deciding whether you should write tests, consider that the longer a specific piece of code will survive, the more critical it is to add tests for it.

## Summary

* All tests follow a similar formula: they set up a scenario, trigger an action, and check the results produced. This pattern is easy to remember by using the three As mnemonic: arrange, act, and assert.
* Test runners are tools we use to write tests. They provide helpful and concise ways for you to organize tests and obtain readable and meaningful output from them. Some test runners, like Jest, also ship with assertion libraries, which help us compare the actual output of an action with what was expected.
* To facilitate the setup and teardown process of tests, Jest provides you with hooks that can run at different stages of the testing process. You can use beforeEach to run a function before each test, beforeAll to run it once before all tests, afterEach to run it after each test, and afterAll to run it once after all tests.
* The testing pyramid is a visual metaphor that helps us separate types into different categories based on how often they should run, how many of them should exist, how big their scope is, and how strong the quality guarantees they produce are. As we ascend the pyramid, tests get scarcer, more valuable, cover a broader scope, and run less frequently.
* Unit tests are designed to run against functions. They are essential to assert the quality of your software at the most granular level possible, providing quick and precise feedback. These tests import your functions, feed them input, and check the output against what you expected.
* Integration tests are written to ensure that different parts of an application can work together. They verify whether you are using third-party libraries appropriately, such as database adapters. These tests act through your own software, but they may need access to external components, like a database or the filesystem, to set up a scenario and to check whether your application produced the desired result.
* End-to-end tests run against all layers of a program. Instead of directly calling functions, they interact with your application as a user would: by using a browser or sending HTTP requests, for example. They consider the application to be a “black box.” These tests produce the strongest quality guarantees since they most closely resemble real usecase scenarios.
* Acceptance tests are different from end-to-end tests. Acceptance tests focus on validating whether your applications fulfill functional requirements. These tests verify whether your user is acceptable from a business perspective, taking into account your target users. On the other hand, end-to-end tests focus on validating whether your application is correct from an engineering perspective. End-to-end tests can serve as acceptance tests, but not all acceptance tests need to be end-to-end tests.
* Automated tests can’t fully replace quality assurance professionals. Automated tests complement the work of QA analysts by freeing them to do tasks that only humans can do, such as exploratory testing or providing detailed user-centric feedback.
* QA and development teams must work collaboratively instead of seeing each other as adversaries. Developers should write rigorous automated tests to shorten the feedback loop and support QA’s validation tasks. QA professionals should communicate with engineering and product teams to define priorities and should provide detailed feedback on how to improve the product instead of setting the bar to an unreachable level.
* Tests, just like code, have maintenance costs associated to them. The more often you have to update tests, the more expensive they are. You can reduce tests’ costs by keeping code readable, avoiding duplication, decreasing coupling between tests and application code, and separating your verifications into multiple tests to create transitive guarantees