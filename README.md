# Diorama v2 - 27.03.2023

Almost 10 years ago I [wrote an algorithm](https://github.com/mendrik/diorama) that layouts a set of images into a fixed-size rectangle. The old algorithm was heavily optimized for speed, making the code hard to read and even harder to maintain.

Recently (2023) I had an idea how to simplify the algortihm and decided to put this on to a more modern foundation.
The current configuration values size uniformity over cropping.

The result [can be seen here](https://mendrik.github.io/diorama-2023/).

I will probably make this an installable React component in the near future.

## Layout alogorithm

If you want to use this algorithm in your own project you can install the library via `npm i diorama` which exports a single function "findSolution".

```typescript
export const findSolution = (
  pictures: Picture[],
  targetDimension: Dimension,
  config: Config
): Solution
```

`targetDimension` is the rectangle the list of `pictures` are going to be placed in. Config can customize the behavior of the algorithm. Beware that this is a long running task and you are advised to wrap it in a Promise or use a WebWorker for it. Check this repository how it can be done. The result object `Solution` contains all you need to know, so let the types guide you. Note that a solution has its own property `dimension` which might slightly differ from the targetDimension. It's up to you to scale the solution up or down.

## Configuration

```typescript
export type Config = {
  maxComputationTime: number // ms how long the algorithm is allowed to search for a good solution
  sizeHomogenity: number // how imporant equal picture-sizes are. If you don't care about cropping at all set this to 1000
  aspectRatioThreshold: number // minimum requirement for aspect ratio match, should be somewhere around 0.95 - 0.995.
  minImages: number // the minimum amount of images where the algorithm even bothers to search solutions
}
```
