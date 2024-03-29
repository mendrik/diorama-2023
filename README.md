
<p align="center">
<img  src="https://github.com/mendrik/diorama-2023/assets/160805/e63a65e2-495f-431d-8b03-4af5ed0abf3d" width="300" heigh="auto">
</p>

In 2013, I developed an algorithm* designed to arrange a set of images within a fixed-size rectangle. The original algorithm was optimized for speed, resulting in code that was challenging to read and even more difficult to maintain.

A decade later, I decided to put the code on a more modern foundation combined with a few ideas how to simplify the logic. This update includes enhanced code-splitting, the incorporation of functional patterns, generators, and web workers. Previously, the algorithm needed a balanced and full binary tree structure. Now, it is utilizing just a full binary tree, significantly reducing the required computations. For sets up to 10-11 images, it's possible to examine every potential combination on an average personal computer. Additionally, with fewer images (currently set to 10) we get stable solutions.

Here's the gist of the algorithm: Combining two images either vertically or horizontally, we can deduce new aspect ratios without needing to calculate specific widths and heights. The strategy involves continuously merging these combinations (either horizontally or vertically) until no further combinations are possible, effectively generating a full binary tree. The root of this tree presents a final aspect ratio, which is then compared to the aspect ratio of the target canvas to determine fit. The closer the match, the better the images will align. However, this initial iteration encountered a drawback: some combinations, despite fitting well, produced significantly uneven sizes when rendered onto the canvas. To counter this, it became necessary to compute scores for each potential solution, considering both aspect ratio compatibility and size uniformity. With these metrics, we can evaluate and select the most visually appealing solutions. It's worth noting that, outcomes may occasionally appear less than ideal, especially with smaller image sets.

The demonstration uses css sugar for added visual impact, the algorithm maintains its core functionality of creating gap-less rectangles.

![image](https://github.com/mendrik/diorama-2023/assets/160805/de360ce6-e9b6-4260-975b-9c3cc7888a16)

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

<img src="https://github.com/mendrik/diorama-2023/assets/160805/919d8a2c-555e-4020-9306-30cf6cabc46a" height="60"/>

(From left to right)

- Image set to show

- Refresh: For image sets exceeding 11, the algorithm defaults to a random tree generation strategy due to the impracticality of evaluating all possible layouts. This button regenerates the layout, offering a fresh arrangement with each execution.

- Add Image: Incorporate a new image into the collection.

- Remove Image: Eliminate an image from the set.

- Fullscreen: Activates the browser's full-screen mode for an immersive experience.


*) ([archived repo](https://github.com/mendrik/diorama))
