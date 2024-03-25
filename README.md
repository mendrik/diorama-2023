# Diorama v2

Almost 10 years ago I [wrote an algorithm](https://github.com/mendrik/diorama) that layouts a set of images into a fixed-size rectangle. The old algorithm was heavily optimized for speed, making the code hard to read and even harder to maintain.

Recently (2023) I had an idea how to simplify the algorithm and decided to put this on to a more modern foundation.
The algorithm works now with full binary trees instead of full and balanced ones, reducing the amount of calculations needed. Further more, for smaller amount of images we can now use a generator to get all tree permutations before switching to a random strategy, making this really snappy for smaller image sets.

The demo uses some css sugar (paddings, borders and rotation) for dramatic effect but under the bonnet the algorithm still creates gap-less rectangles.

The demo [can be seen here](https://mendrik.github.io/diorama-2023/). 

## Layout algorithm

If you want to use this algorithm in your own project you can install the library via `npm i diorama` which exports a single function "findSolution".

```typescript
export const findSolution = (
  pictures: Picture[],
  targetDimension: Dimension,
  config?: Config
): Promise<Solution>
```

`targetDimension` is the rectangle into which the list of `pictures` is going to be placed in. Config can customize the behavior of the algorithm. Beware that this is a long running task and it runs inside a WebWorker. The returned `Solution` contains all you need to know, so let the types guide you. Note that a solution has its own property `dimension` which might slightly differ from the targetDimension. It's up to you to scale the solution, however the solution's dimension never exceeds the `targetDimension`.

## Configuration

```typescript
export type Config = {
  maxComputationTime: number // ms how long the algorithm is allowed to search for a good solution, default 300ms
  randomizeThreshold: number // when to switch to random tree layout strategy
}
```

## 2024 update
