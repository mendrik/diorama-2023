# Diorama v2

In 2013, I developed an algorithm ([accessible here](https://github.com/mendrik/diorama)) designed to arrange a collection of images within a fixed-size rectangle. The original algorithm was intensely optimized for speed, resulting in code that was challenging to read and even more difficult to maintain.

A decade later, inspired by a new approach to streamline the algorithm, I embarked on updating its foundation. This update includes enhanced code-splitting, the incorporation of functional patterns, generators, and web workers. Previously, the algorithm compensated for irregular image counts by adding dummy images to achieve a balanced and full binary tree structure. Now, it achieves efficiency by utilizing just a full binary tree, significantly reducing the required computations. Remarkably, for sets up to 10-11 images, it's possible to examine every potential combination on an average personal computer. Additionally, fewer images not only expedite the solution process but also stabilize it.

Here's a brief overview of the process: Combining two images either vertically or horizontally, we can deduce new aspect ratios without needing to calculate specific widths and heights. The strategy involves continuously merging these combinations (either horizontally or vertically) until no further combinations are possible, effectively generating a full binary tree. The root of this tree presents a final aspect ratio, which is then compared to the aspect ratio of the target canvas to determine fit. The closer the match, the better the images will align. However, this initial iteration encountered a drawback: some combinations, despite fitting well, produced significantly uneven sizes when rendered onto the canvas. To counter this, it became necessary to compute scores for each potential solution, considering both aspect ratio compatibility and size uniformity. With these metrics, we can evaluate and select the most visually appealing solutions. It's worth noting that, given the algorithm's reliance on the specific images and canvas aspect ratio, outcomes may occasionally appear less than ideal, especially with smaller image sets.

The demonstration incorporates stylistic enhancements such as padding, borders, and rotation for added visual impact, yet the algorithm maintains its core functionality of creating gap-less rectangles.

The demo [can be seen here](https://mendrik.github.io/diorama-2023/). 

## Layout algorithm

For those interested in integrating this algorithm into their own projects, the library is available for installation via npm: `npm i diorama`. It exports a single function, findSolution, detailed as follows:

```typescript
export const findSolution = (
  pictures: Picture[],
  targetDimension: Dimension,
  config?: Config
): Promise<Solution>
```

Here, `targetDimension` refers to the rectangle where the pictures will be positioned. The Config parameter allows for customization of the algorithm's behavior. It's important to note that this function operates within a WebWorker. The returned Solution provides comprehensive details for implementation, including a dimension property that may slightly vary from the targetDimension. Adjusting the solution to fit within these dimensions is left to the user, ensuring the solution never surpasses the specified targetDimension.

## Configuration

```typescript
export type Config = {
  maxComputationTime: number // ms how long the algorithm is allowed to search for a good solution, default 300ms
  randomizeThreshold: number // when to switch to random tree layout strategy
}
```

## Controls

<img src="https://github.com/mendrik/diorama-2023/assets/160805/f89574db-6b33-4268-ae17-636e2b4c2622" height="60"/>

(From left to right)

- Refresh: For image sets exceeding 11, the algorithm defaults to a random tree generation strategy due to the impracticality of evaluating all possible layouts. This button regenerates the layout, offering a fresh arrangement with each execution.

- Add Image: Incorporate a new image into the collection.

- Remove Image: Eliminate an image from the set.

- Strategy Toggle: Alternates between two strategies: one focusing on minimizing gaps and the other on equalizing image sizes. Though interrelated, each mode emphasizes a different aspect.

- Fullscreen: Activates the browser's full-screen mode for an immersive experience.


