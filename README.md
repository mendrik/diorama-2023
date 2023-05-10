# Diorama v2

Almost 10 years ago I [wrote an algorithm](https://github.com/mendrik/diorama) that layouts a set of images into a fixed-size rectangle. The old algorithm was heavily optimized for speed, making the code hard to read and even harder to maintain.

Recently (2023) I had an idea how to simplify the algortihm and decided to put this on to a more modern foundation.
The current configuration values size uniformity over cropping.

The result [can be seen here](https://mendrik.github.io/diorama-2023/).

## Layout algorithm

If you want to use this algorithm in your own project you can install the library via `npm i diorama` which exports a single function "findSolution".

```typescript
export const findSolution = (
  pictures: Picture[],
  targetDimension: Dimension,
  config?: Config
): Promise<Solution>
```

`targetDimension` is the rectangle into which the list of `pictures` is going to be placed in. Config can customize the behavior of the algorithm. Beware that this is a long running task and it runns inside a WebWorker. The returned `Solution` contains all you need to know, so let the types guide you. Note that a solution has its own property `dimension` which might slightly differ from the targetDimension. It's up to you to scale the solution, however the solution's dimension never exceeds the `targetDimension`.

## Configuration

```typescript
export type Config = {
  maxComputationTime: number // ms how long the algorithm is allowed to search for a good solution, default 300ms
  sizeHomogenity: number // how imporant equal picture-sizes are. If you don't care about cropping at all set this to 1000
  aspectRatioThreshold: number // minimum requirement for aspect ratio match, should be somewhere around 0.95 - 0.995.
  minImages: number // the minimum amount of images where the algorithm even bothers to search solutions
}
```
